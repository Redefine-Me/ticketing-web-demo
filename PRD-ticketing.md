# PRD: Society Event Ticketing

**Status**: Draft
**Author**: Alex (PM)
**Last Updated**: 2026-03-30
**Version**: 1.0
**Stakeholders**: Engineering, Design, Society Relations

---

## 1. Overview

### What This Is

A ticketing management system within the society committee dashboard that allows society committees to create ticket types for their events, track sales, manage attendee check-in, and process refunds. This feature lives inside the existing dashboard at `/society/[societyId]/dashboard/ticketing` and is built as a **demo** -- all data is mocked client-side using the same pattern as the rest of the demo dashboard (in-memory state via React hooks, no real Supabase calls, simulated network delays).

### Why It Matters

Ticketing is the single highest-value feature request from prospective society partners. Today, societies use a patchwork of tools: Fixr for paid events, Google Forms for free registrations, and manual spreadsheets for door check-in. None of these integrate with their event data. This demo shows societies that RedefineMe can unify event creation, ticketing, sales tracking, and attendee management into one dashboard -- the primary differentiator that turns passive "we scraped your events" into "we run your events."

The demo does not process real payments. It uses mock purchase data to demonstrate the full workflow so that societies can evaluate the UX before we build the real backend.

### Where It Lives in the Codebase

This feature adds a new top-level route inside the existing dashboard shell:

- Route: `/society/[societyId]/dashboard/ticketing`
- Sidebar navigation: new "Ticketing" item added to the `navItems` array in `Sidebar.tsx` and `Topbar.tsx`
- Layout: inherits `DashboardShell` (sidebar, topbar, aurora background, `dashboard-scope` CSS class)
- Data: new mock data file(s) extending `src/lib/mock-data.ts`
- State: new `useTicketing` hook following the pattern of `useEvents` (in-memory state, simulated delays, exported CRUD functions)

---

## 2. User Personas

### Primary: Society Committee Member (Events Officer)

**Name**: David Lee
**Context**: Events Officer for UoM Computer Science Society. Responsible for creating events, managing ticket sales for paid events (balls, trips), and running the door at check-in. Currently uses Fixr for ticketing and a separate spreadsheet for attendance. Wants a single tool that connects to the events he already manages.

**Key behaviors**:
- Creates 2-4 ticketed events per term (balls, trips, paid workshops)
- Needs to set up member vs. non-member pricing
- Checks attendee list on his phone at the door during events
- Occasionally refunds people who can no longer attend

### Secondary: Society President / Treasurer

**Name**: Alice Johnson
**Context**: President of the society. Oversees finances. Needs visibility into ticket revenue across all events without digging into individual event details. Reviews the ticketing page to get a snapshot of total earnings and sales volume.

**Key behaviors**:
- Scans the main ticketing list for revenue totals
- Rarely enters individual attendee management
- Wants at-a-glance confirmation that ticket configs are correct before events go live

---

## 3. User Stories

### US-1: View All Ticketed Events
**As a** committee member, **I want to** see a list of all events that have tickets assigned to them, **so that** I can quickly assess ticket sales and revenue across all our ticketed events.

**Acceptance Criteria**:
- [ ] The ticketing page displays a table/list of all events that have at least one ticket type configured
- [ ] Each row shows: event title, event date, total cash earned (sum of sold tickets * price), total tickets sold (sum across all ticket types)
- [ ] Each row has two action buttons: "Edit Details" and "Manage Attendees"
- [ ] Events with zero ticket types configured do NOT appear in this list
- [ ] The page loads within 300ms (simulated delay for demo)

### US-2: Assign Tickets to an Unticketed Event
**As a** committee member, **I want to** assign ticket types to an existing event that does not yet have tickets, **so that** I can start selling tickets for that event.

**Acceptance Criteria**:
- [ ] Clicking "Assign Tickets" (top right of ticketing page) opens a selection menu listing only events that have NO ticket types configured
- [ ] Selecting an event opens a modal/page with the ticket configuration form
- [ ] The event summary section at the top shows the event title, image (if available), and description
- [ ] The user can add one or more ticket types, each with: name, price, member toggle, total available count
- [ ] Ticket name field provides auto-suggest dropdown with predefined options ("VIP", "Member Price", "Non-Member Price", "Early Bird", "Standard", "General Admission") but accepts custom text
- [ ] Price must be at least 1.00 (GBP). Values below 1.00 are rejected with a validation message
- [ ] Total available must be at least 1
- [ ] A running total counter displays the sum of all ticket types' available counts
- [ ] Clicking "Save Tickets" persists the configuration, closes the modal, returns to the ticketing list, and shows a success toast: "Ticket successfully registered"
- [ ] The newly ticketed event immediately appears in the ticketed events list

### US-3: Edit Existing Ticket Configuration
**As a** committee member, **I want to** edit ticket details for an event that already has tickets configured, **so that** I can adjust pricing, add new ticket types, or change availability.

**Acceptance Criteria**:
- [ ] Clicking "Edit Details" opens the same modal/form as ticket creation, pre-populated with existing data
- [ ] All fields are editable: name, price, member toggle, total available
- [ ] New ticket types can be added to an existing configuration
- [ ] On save, shows success toast: "Ticketing successfully updated"
- [ ] If tickets have been sold for a ticket type and the user tries to reduce "total available" below the number already sold, the save is BLOCKED
- [ ] A warning message is displayed: "X tickets have been sold. You must refund users to below Y before reducing the ticket count to Y."
- [ ] The save button remains disabled until the conflict is resolved (either the user increases the count back above sold, or navigates to refund attendees first)

### US-4: Manage Attendees for a Ticketed Event
**As a** committee member, **I want to** view and manage ticket holders for a specific event, **so that** I can check people in at the door and process refunds.

**Acceptance Criteria**:
- [ ] Clicking "Manage Attendees" opens a modal/page showing all ticket categories as collapsible sections
- [ ] Each category header displays: ticket type name, tickets sold / total available (e.g., "12 / 50")
- [ ] An overall total of tickets sold across all categories is displayed at the top
- [ ] Expanding a category reveals a list of ticket holders
- [ ] Each ticket holder row shows: user name, email, purchase date/time (left side) and two action buttons (right side)
- [ ] The two action buttons are: "Attend" (green) and "Refund" (red)

### US-5: Mark Attendee as Attended
**As a** committee member, **I want to** mark a ticket holder as attended when they arrive at the event, **so that** I have an accurate record of who showed up.

**Acceptance Criteria**:
- [ ] Clicking "Attend" marks the user as attended and records a timestamp
- [ ] Once attended, the "Attend" and "Refund" buttons are replaced by a single "Unattend" button
- [ ] The attendance timestamp is visible on the row (e.g., "Checked in at 19:32")
- [ ] Clicking "Unattend" reverts the user to the normal state (Attend + Refund buttons visible)
- [ ] The attend/unattend action is instantaneous in the UI (optimistic update)

### US-6: Refund a Ticket Holder
**As a** committee member, **I want to** refund a ticket holder, **so that** they are removed from the attendee list and their ticket is freed up for resale.

**Acceptance Criteria**:
- [ ] Clicking "Refund" shows a confirmation dialog: "You are refunding this user." with "Cancel" and "OK" buttons
- [ ] If confirmed, the user is removed from the ticket holder list
- [ ] The ticket category's sold count decreases by 1
- [ ] The event's total revenue decreases by the price of the refunded ticket
- [ ] A success toast is shown: "Ticket refunded successfully"
- [ ] If the user clicks "Cancel", nothing happens
- [ ] A user who has been marked as attended CANNOT be refunded (the Refund button is replaced by Unattend)

---

## 4. Detailed Requirements

### 4.1 Sidebar Navigation Update

**File**: `src/components/dashboard/Sidebar.tsx` and `src/components/dashboard/Topbar.tsx`

Add a new entry to the `navItems` array:
```
{ path: "/ticketing", label: "Ticketing", icon: Ticket }
```
Position it immediately after the "Events" entry. Use the `Ticket` icon from `lucide-react`.

### 4.2 Main Ticketing Page

**Route**: `/society/[societyId]/dashboard/ticketing/page.tsx`

**Layout**:
- Page header: title "Ticketing", subtitle "Manage ticket sales and attendees for your events"
- Top right of header: "Assign Tickets" button (uses `dashboard-cta` color: `bg-dashboard-cta hover:bg-dashboard-cta/90 text-white`, same pattern as "Create Event" button on the events page)
- Wrap with `DashboardPageHeader` and `DashboardSection` motion components for consistent entrance animations

**Ticketed Events Table**:
- Columns: Event Title, Event Date, Total Revenue, Tickets Sold, Actions
- "Total Revenue" column: sum of (ticket price * tickets sold) for each ticket type. Format as GBP with pound sign (e.g., "345.00")
- "Tickets Sold" column: sum of sold tickets across all ticket types for that event (e.g., "67 / 120" showing sold vs. total available)
- "Actions" column: two buttons side by side
  - "Edit Details" -- outline variant button
  - "Manage Attendees" -- outline variant button
- Use the existing `Card`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` components from shadcn/ui (same pattern as `EventTable.tsx`)
- Empty state: "No ticketed events yet. Click 'Assign Tickets' to get started."
- Loading state: skeleton rows (same pattern as `EventTable`)

### 4.3 "Assign Tickets" Event Selection

**Trigger**: "Assign Tickets" button on main ticketing page

**Behavior**:
- Opens a modal (not a new route) using a dialog/sheet component
- Lists all events from `mockEvents` that do NOT have any ticket types configured
- Each event in the list shows: title, date, and a brief description (truncated to 2 lines)
- Clicking an event transitions the modal content to the ticket configuration form (same modal, new content -- not a second modal)
- If all events already have tickets assigned, show: "All events have tickets assigned."

### 4.4 Ticket Configuration Form (Create & Edit)

This form is used for BOTH creating new ticket configurations ("Assign Tickets" flow) and editing existing ones ("Edit Details" flow).

**Event Summary Section** (top of form):
- Card with: event title (h2), event image if available (small thumbnail, fallback to a colored placeholder), first 150 characters of description
- This section is read-only -- it reminds the user which event they are configuring

**Ticket Types List**:
- Rendered as a vertical list of cards, one per ticket type
- Each ticket type card contains:
  1. **Ticket Name** (required)
     - Input with auto-suggest dropdown
     - Predefined suggestions: "VIP", "Member Price", "Non-Member Price", "Early Bird", "Standard", "General Admission"
     - Suggestions filter as user types (case-insensitive substring match)
     - User can dismiss suggestions and type any custom name
     - Minimum 1 character
  2. **Price** (required)
     - Numeric input with "GBP" prefix label
     - Minimum value: 1.00
     - Step: 0.01
     - Validation message if below minimum: "Price must be at least 1.00"
  3. **Member Ticket Toggle** (default: off)
     - Switch component (same as `Switch` used in `EventForm.tsx`)
     - Label: "Member ticket"
     - When on, indicates this ticket type is reserved for society members
  4. **Total Available** (required)
     - Numeric input
     - Minimum value: 1
     - Validation message if below minimum: "Must offer at least 1 ticket"
  5. **Remove button** (trash icon, right side of card)
     - Removes this ticket type from the list
     - If this is the only ticket type, show validation: "At least one ticket type is required"
     - If tickets have been sold for this type (edit mode), block removal. Show: "Cannot remove a ticket type with sold tickets. Refund all holders first."

**"Add Ticket Type" Button**:
- Below the ticket type list
- Adds a new empty ticket type card to the list
- Uses `Plus` icon from lucide-react
- Outline variant button

**Total Tickets Counter**:
- Displayed below the ticket types list, above the save button
- Shows: "Total tickets: X" where X is the sum of all ticket types' "total available" values
- Updates in real time as values change

**"Save Tickets" Button**:
- Bottom right of the modal
- Primary action button (`bg-dashboard-cta`)
- Disabled while form validation fails
- On click: validates all fields, persists to mock state, closes modal, shows success toast

**Edit Mode Specific Behavior**:
- Form is pre-populated with existing ticket type data
- Each ticket type card shows: sold count if > 0 (e.g., "12 sold" badge)
- Reducing "total available" below the number sold triggers the blocking validation (see US-3)
- Warning rendered inline below the "Total Available" input for the offending ticket type
- Warning text: "X tickets have been sold. You must refund users to below Y before reducing the ticket count to Y."
- The "Save Tickets" button remains disabled while any ticket type has this conflict

### 4.5 "Manage Attendees" View

**Trigger**: "Manage Attendees" button on a ticketed event row

**Behavior**: Opens a modal (full-width, or sheet from right side)

**Header Section**:
- Event title
- Overall summary: "X / Y tickets sold" (total sold across all categories / total available across all categories)
- Revenue summary: "Total revenue: X" (GBP formatted)

**Ticket Category Sections**:
- One collapsible section per ticket type (use `ChevronDown` toggle pattern, same as rejected members in `CommitteePage`)
- Section header shows: ticket type name, "X / Y sold" badge, price per ticket
- Default state: first category expanded, rest collapsed

**Expanded Category -- Attendee List**:
- Each row is a horizontal flex container:
  - **Left side**:
    - User name (font-medium)
    - User email (text-xs, muted color)
    - Purchase date/time (text-xs, muted color, formatted via `formatDateTime` from `lib/utils.ts`)
  - **Right side** (normal state -- not attended):
    - "Attend" button: small, green variant (`border-emerald-200 text-emerald-700 hover:bg-emerald-50`, same pattern as the Approve button in `CommitteePage`)
    - "Refund" button: small, red variant (`border-red-200 text-red-700 hover:bg-red-50`, same pattern as the Deny button in `CommitteePage`)
  - **Right side** (attended state):
    - Attendance timestamp text: "Checked in at HH:MM" (text-xs, emerald color)
    - "Unattend" button: small, outline variant

**Refund Confirmation Dialog**:
- Triggered by clicking "Refund"
- Dialog content: "You are refunding this user." (plain text, centered)
- Dialog subtitle: user name and ticket type for clarity
- Two buttons: "Cancel" (outline/secondary) and "OK" (destructive variant)
- On OK: remove user from attendee list, decrement sold count, decrement revenue, show toast "Ticket refunded successfully"
- On Cancel: close dialog, no action

**Empty Category State**:
- If a ticket type has 0 sold tickets: "No tickets sold yet for this category."

---

## 5. Screen Inventory

| # | Screen / Component | Type | Trigger |
|---|---|---|---|
| 1 | Main Ticketing Page | Route page | Sidebar "Ticketing" link |
| 2 | Assign Tickets -- Event Selection | Modal (step 1) | "Assign Tickets" button |
| 3 | Assign Tickets -- Ticket Config Form | Modal (step 2) | Selecting an event from step 1 |
| 4 | Edit Details -- Ticket Config Form | Modal | "Edit Details" button on event row |
| 5 | Manage Attendees -- Category List | Modal / Sheet | "Manage Attendees" button on event row |
| 6 | Refund Confirmation Dialog | Alert Dialog | "Refund" button on attendee row |
| 7 | Destructive Edit Warning | Inline validation | Reducing ticket count below sold count |
| 8 | Success Toast: "Ticket successfully registered" | Toast (sonner) | After saving new ticket config |
| 9 | Success Toast: "Ticketing successfully updated" | Toast (sonner) | After saving edited ticket config |
| 10 | Success Toast: "Ticket refunded successfully" | Toast (sonner) | After confirming refund |

---

## 6. Data Model

All data is mock/in-memory for this demo. The structures below define the TypeScript interfaces that will be used in the `useTicketing` hook and mock data. These interfaces are designed to map cleanly to future Supabase tables.

### 6.1 New Types (add to `src/lib/supabase/types.ts`)

```typescript
/** A ticket type configured for an event (e.g., "VIP", "Member Price"). */
export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  price: number;          // GBP, minimum 1.00
  isMemberTicket: boolean;
  totalAvailable: number; // total tickets offered for this type
}

/** A purchased ticket instance. */
export interface TicketPurchase {
  id: string;
  ticketTypeId: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  purchasedAt: string;    // ISO 8601
  attendedAt: string | null; // ISO 8601, null if not yet attended
}

/** Aggregated view of a ticketed event for the main list page. */
export interface TicketedEventSummary {
  eventId: string;
  eventTitle: string;
  eventDate: string | null;
  eventDescription: string;
  eventImageUrl: string | null;
  ticketTypes: TicketType[];
  purchases: TicketPurchase[];
  totalRevenue: number;   // computed: sum of (sold * price) per type
  totalSold: number;      // computed: total purchases across all types
  totalAvailable: number; // computed: sum of totalAvailable across all types
}
```

### 6.2 Mock Data (add to `src/lib/mock-data.ts`)

Pre-populate 2-3 events with ticket configurations and mock purchases to demonstrate the full workflow on first load:

- **"End of Year Ball" (e-006)**: Already has `isFree: false, price: "35"` in mock data. Configure with:
  - "Early Bird" -- 25.00, 50 available, 47 sold
  - "Standard" -- 35.00, 100 available, 68 sold
  - "VIP" -- 55.00, 20 available, 14 sold
  - Mock 129 purchases with realistic names/emails/timestamps
  - Some attendees already marked as attended (with `attendedAt` timestamps)

- **"CSS Pub Quiz Night" (e-003)**: Free event but with limited capacity:
  - "Member" -- 1.00, 40 available, 34 sold (member toggle: on)
  - "Non-Member" -- 3.00, 20 available, 12 sold
  - Mock 46 purchases

- Remaining events (e-001, e-002, e-004, e-005, e-007, e-008): NO ticket types configured -- these appear in the "Assign Tickets" event selection list

### 6.3 Future Database Tables (reference only -- not built for demo)

When this feature moves to production, the following Supabase tables would be created:

```
ticket_types
  id: uuid (PK)
  event_id: uuid (FK -> events.id)
  name: text
  price_pence: integer (store in pence to avoid float issues)
  is_member_ticket: boolean
  total_available: integer
  created_at: timestamptz
  updated_at: timestamptz

ticket_purchases
  id: uuid (PK)
  ticket_type_id: uuid (FK -> ticket_types.id)
  event_id: uuid (FK -> events.id)
  buyer_user_id: uuid (FK -> auth.users.id)
  purchased_at: timestamptz
  refunded_at: timestamptz (nullable)
  attended_at: timestamptz (nullable)
  created_at: timestamptz
```

---

## 7. State Management

### 7.1 New Hook: `useTicketing`

**File**: `src/hooks/useTicketing.ts`

Follows the same pattern as `useEvents.ts`:
- In-memory state via `useState`
- Simulated network delays (200ms) for realism
- Exported functions for all CRUD operations
- Initialised from mock data on first `fetch`

**Exported interface**:

```typescript
export function useTicketing(societyId: string | undefined) {
  // State
  ticketedEvents: TicketedEventSummary[]
  unticketed: DashboardEvent[]  // events without ticket config
  loading: boolean

  // Actions
  fetchTicketing: () => Promise<void>
  assignTickets: (eventId: string, ticketTypes: Omit<TicketType, 'id' | 'eventId'>[]) => Promise<void>
  updateTickets: (eventId: string, ticketTypes: TicketType[]) => Promise<void>
  markAttended: (purchaseId: string) => void
  unmarkAttended: (purchaseId: string) => void
  refundPurchase: (purchaseId: string) => void
}
```

### 7.2 State Transitions

```
Event created (no tickets)
    |
    v
[Unticketed Pool] --- "Assign Tickets" ---> [Ticketed Events List]
    |                                              |
    |                                    "Edit Details" (modify config)
    |                                              |
    |                                    "Manage Attendees"
    |                                        |         |
    |                                   "Attend"   "Refund"
    |                                      |          |
    |                                   [Attended]  [Removed from list]
    |                                      |
    |                                   "Unattend"
    |                                      |
    |                                   [Normal state]
```

### 7.3 Business Rules

| Rule | Enforcement Point |
|---|---|
| Price >= 1.00 | Zod validation on ticket config form |
| Total available >= 1 | Zod validation on ticket config form |
| At least 1 ticket type per event | Zod validation (array min length 1) |
| Cannot reduce available below sold count | Pre-save validation in `updateTickets` |
| Cannot remove ticket type with sold tickets | UI disables remove button + inline warning |
| Cannot refund an attended user | UI hides Refund button when attended |
| Attended users show "Unattend" instead of "Attend" + "Refund" | Conditional render based on `attendedAt !== null` |
| Refund decrements sold count and revenue | `refundPurchase` removes from purchases array, recomputes totals |

---

## 8. Edge Cases & Validation

### 8.1 Form Validation (Zod Schema)

```typescript
const ticketTypeSchema = z.object({
  name: z.string().min(1, "Ticket name is required"),
  price: z.number().min(1, "Price must be at least 1.00"),
  isMemberTicket: z.boolean(),
  totalAvailable: z.number().int().min(1, "Must offer at least 1 ticket"),
});

const ticketConfigSchema = z.object({
  ticketTypes: z.array(ticketTypeSchema).min(1, "At least one ticket type is required"),
});
```

### 8.2 Edge Cases

| Case | Expected Behavior |
|---|---|
| User tries to save with 0 ticket types | Validation error: "At least one ticket type is required" |
| User enters price of 0.50 | Validation error: "Price must be at least 1.00" |
| User enters price of 0 or negative | Validation error: "Price must be at least 1.00" |
| User enters non-numeric price | Input rejects non-numeric characters (input type=number) |
| User enters total available of 0 | Validation error: "Must offer at least 1 ticket" |
| User tries to reduce available from 50 to 20 when 30 are sold | Blocked. Warning: "30 tickets have been sold. You must refund users to below 20 before reducing the ticket count to 20." |
| User tries to remove a ticket type with sold tickets | Blocked. Warning: "Cannot remove a ticket type with sold tickets. Refund all holders first." |
| User tries to refund an attended user | Not possible -- Refund button is hidden when user is attended. User must "Unattend" first. |
| User refunds last ticket holder for a type | Sold count goes to 0. Ticket type remains configured. |
| User refunds all holders across all types | Event remains in ticketed list with 0 sold. Does not revert to unticketed. |
| All events already have tickets | "Assign Tickets" event selection shows: "All events have tickets assigned." |
| Event has no image | Event summary shows a colored placeholder div (e.g., indigo gradient) instead of an image |
| Duplicate ticket type names | Allowed -- two types can both be called "VIP" (user's choice) |
| Very long ticket type name | Truncate display with ellipsis at ~30 characters in the table; full name visible in edit form |
| Rapid attend/unattend clicks | Optimistic UI update; debounce not needed for demo since state is local |

---

## 9. Success Metrics

Since this is a demo, "success" is defined by completeness and UX quality during society pitches, not production analytics.

| Metric | Target | How to Verify |
|---|---|---|
| Feature completeness | 100% of requirements in this PRD are implemented | Manual walkthrough of all 6 user stories |
| Demo flow time | Full assign-tickets-to-check-in flow completable in under 90 seconds | Timed walkthrough |
| Visual consistency | All new components use existing design tokens and component patterns | Visual audit against existing dashboard pages |
| Zero broken states | No combination of user actions produces a JS error, blank screen, or stale data | Exploratory testing covering all edge cases in Section 8.2 |
| Loading states | All async actions show appropriate loading/skeleton states | Visual confirmation |
| Toast feedback | Every mutation (save, update, refund, attend) shows a toast | Manual walkthrough |
| Responsive layout | All screens are usable on mobile viewport (375px+) | Responsive testing |
| Animation consistency | New sections use `DashboardSection` and `DashboardPageHeader` motion wrappers | Visual confirmation |

---

## 10. Out of Scope

The following items are explicitly NOT included in this demo build. They will be revisited when moving to production.

| Item | Reason | Revisit Condition |
|---|---|---|
| Real payment processing (Stripe, etc.) | Demo only -- no real money changes hands | Production build after society sign-ups |
| Supabase database tables | Demo uses in-memory mock data | Production build |
| Email confirmations to ticket buyers | No real users in demo | Production build |
| QR code generation for tickets | Adds complexity with no demo value | Post-MVP, if societies request it |
| Ticket type deletion (with sold tickets) | Blocked by design -- requires refund-all first | May add "bulk refund and remove" in production |
| PDF / printable ticket export | Nice-to-have, not needed for pitch demo | If requested by 3+ societies |
| Waitlist / sold-out handling | Adds complexity beyond demo scope | Production build |
| Promo codes / discounts | Not core to the demo value proposition | Post-MVP feature |
| Multi-currency support | All UK universities, GBP only | International expansion |
| Actual Supabase auth integration | Demo uses `useSocietyAuth` mock hook | Production build |
| Ticket transfer between users | Edge case, not needed for demo | Post-MVP |
| Sales analytics / charts | Revenue chart would be valuable but adds scope | Fast-follow after initial demo |
| Stripe Connect for society payouts | Complex financial integration | Production build, requires legal review |

---

## Appendix A: Component Reuse Map

| New Component | Reuses Pattern From |
|---|---|
| Ticketing page header + "Assign Tickets" button | `events/page.tsx` header + "Create Event" button |
| Ticketed events table | `EventTable.tsx` (TanStack Table, sorting, filtering) |
| Event selection modal list | `SocietyPickerCards.tsx` card layout |
| Ticket config form (Card sections) | `EventForm.tsx` (Card + CardHeader + CardContent sections) |
| Ticket name auto-suggest | `cmdk` package already installed -- use Command/CommandInput/CommandList |
| Price + total available inputs | `Input` + `Label` from shadcn/ui (same as EventForm fields) |
| Member ticket toggle | `Switch` component (same as isOnline/isFree in EventForm) |
| Save button | `Button` with `bg-dashboard-cta` class (same as Create Event) |
| Attendee category collapsibles | `ChevronDown` toggle pattern from `CommitteePage` rejected section |
| Attend/Refund buttons | Approve/Deny button styles from `CommitteePage` |
| Refund confirmation dialog | `AlertDialog` from shadcn/ui |
| Success toasts | `toast` from `sonner` (already used throughout dashboard) |
| Motion wrappers | `DashboardPageHeader` and `DashboardSection` from `DashboardMotion.tsx` |
| Form validation | `react-hook-form` + `zod` + `@hookform/resolvers` (same as EventForm) |

## Appendix B: File Creation Plan

New files to create:

```
src/
  app/society/[societyId]/dashboard/ticketing/
    page.tsx                    -- Main ticketing page (route)
  components/ticketing/
    TicketingTable.tsx           -- Table of ticketed events
    AssignTicketsModal.tsx       -- Event selection + ticket config modal
    TicketConfigForm.tsx         -- Ticket type list form (create + edit)
    TicketTypeCard.tsx           -- Individual ticket type input card
    TicketNameAutosuggest.tsx    -- Auto-suggest input for ticket names
    ManageAttendeesModal.tsx     -- Attendee management modal
    AttendeeRow.tsx              -- Single attendee row with actions
    RefundDialog.tsx             -- Refund confirmation dialog
    TicketTotalCounter.tsx       -- Running total of available tickets
  hooks/
    useTicketing.ts              -- State management hook
```

Files to modify:

```
src/components/dashboard/Sidebar.tsx     -- Add "Ticketing" nav item
src/components/dashboard/Topbar.tsx      -- Add "Ticketing" nav item (mobile)
src/lib/mock-data.ts                     -- Add mock ticket types + purchases
src/lib/supabase/types.ts                -- Add TicketType, TicketPurchase, TicketedEventSummary interfaces
```
