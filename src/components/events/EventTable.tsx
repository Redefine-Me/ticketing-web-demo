"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,

  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EventSourceBadge } from "@/components/dashboard/EventSourceBadge";
import { TicketedBadge } from "@/components/ticketing/TicketedBadge";
import { TicketedFilter, type TicketFilterValue } from "@/components/ticketing/TicketedFilter";
import { formatDate } from "@/lib/utils";
import { ArrowUpDown, Ticket, Loader2 } from "lucide-react";
import type { DashboardEvent } from "@/lib/supabase/types";

interface EventTableProps {
  events: DashboardEvent[];
  loading?: boolean;
  basePath?: string;
  onManageTickets?: (event: DashboardEvent) => void;
}

const statusColors: Record<string, string> = {
  live: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  ingested: "bg-amber-50 text-amber-700 border border-amber-200",
  rejected: "bg-red-50 text-red-700 border border-red-200",
};

function getColumns(
  basePath: string,
  onManageTickets?: (event: DashboardEvent) => void,
): ColumnDef<DashboardEvent>[] {
  return [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          href={`${basePath}/events/${row.original.id}`}
          className="font-medium hover:text-primary"
        >
          {row.getValue("title")}
        </Link>
        {row.original.isTicketed && (
          <TicketedBadge
            sold={row.original.totalSold ?? 0}
            total={row.original.totalAvailable ?? 0}
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as string | null;
      return (
        <span className="text-muted-foreground">
          {date ? formatDate(date) : "TBD"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="secondary"
          className={statusColors[status] ?? "bg-muted"}
        >
          {status}
        </Badge>
      );
    },
    filterFn: "equals",
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <EventSourceBadge source={row.getValue("source") as "scraped" | "manual"} />
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Likes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-right">{row.getValue("likes")}</span>
    ),
  },
  {
    accessorKey: "attending",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        RSVPs
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-right">{row.getValue("attending")}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      if (!row.original.isTicketed) return null;
      return (
        <Button
          variant="outline"
          size="sm"
          className="border-green-500 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
          onClick={(e) => {
            e.stopPropagation();
            onManageTickets?.(row.original);
          }}
        >
          <Ticket className="mr-1.5 h-3.5 w-3.5" />
          Manage Tickets
        </Button>
      );
    },
  },
  ];
}

export function EventTable({
  events,
  loading,
  basePath = "",
  onManageTickets,
}: EventTableProps) {
  const columns = useMemo(
    () => getColumns(basePath, onManageTickets),
    [basePath, onManageTickets],
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [ticketFilter, setTicketFilter] = useState<TicketFilterValue>("all");

  // Apply ticket filter to data before passing to table
  const filteredEvents = useMemo(() => {
    if (ticketFilter === "all") return events;
    if (ticketFilter === "ticketed") return events.filter((e) => e.isTicketed);
    return events.filter((e) => !e.isTicketed);
  }, [events, ticketFilter]);

  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: filteredEvents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, globalFilter },
  });

  const allRows = table.getRowModel().rows;
  const hasMore = visibleCount < allRows.length;

  // Reset visible count when filters/sorting change the row set
  const rowCount = allRows.length;
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [rowCount, globalFilter, columnFilters, sorting, ticketFilter]);

  // IntersectionObserver to load more rows on scroll
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allRows.length));
  }, [allRows.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string) ?? "All";
  const sourceFilter =
    (table.getColumn("source")?.getFilterValue() as string) ?? "All";

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4" suppressHydrationWarning>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Search events..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-xs"
          />
          <Select
            value={statusFilter}
            onValueChange={(val) =>
              table
                .getColumn("status")
                ?.setFilterValue(val === "All" ? undefined : val)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All statuses</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="ingested">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sourceFilter}
            onValueChange={(val) =>
              table
                .getColumn("source")
                ?.setFilterValue(val === "All" ? undefined : val)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All sources</SelectItem>
              <SelectItem value="scraped">Scraped</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
          <TicketedFilter value={ticketFilter} onChange={setTicketFilter} />
        </div>
      </div>

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {allRows.length ? (
              allRows.slice(0, visibleCount).map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} />
      {hasMore && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
