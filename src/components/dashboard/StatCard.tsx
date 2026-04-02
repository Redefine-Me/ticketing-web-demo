import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  loading?: boolean;
}

export function StatCard({ title, value, change, icon: Icon, loading }: StatCardProps) {
  const trendIcon =
    change === undefined ? null : change > 0 ? (
      <TrendingUp className="h-3.5 w-3.5" />
    ) : change < 0 ? (
      <TrendingDown className="h-3.5 w-3.5" />
    ) : (
      <Minus className="h-3.5 w-3.5" />
    );

  return (
    <Card className="transition-shadow duration-[120ms] hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)]"
      style={{ boxShadow: "0 4px 14px rgba(15,23,42,0.06)", borderRadius: "16px" }}>
      <CardContent className="p-4">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded bg-muted" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p
                className="text-[11px] font-bold uppercase text-muted-foreground"
                style={{ letterSpacing: "0.5px" }}
              >
                {title}
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-3xl font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
                {value.toLocaleString()}
              </p>
              {change !== undefined && (
                <div
                  className={cn(
                    "mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    change > 0
                      ? "bg-green-50 text-green-600"
                      : change < 0
                      ? "bg-red-50 text-destructive"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {trendIcon}
                  <span>
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
