# PRD: Society Event Ticketing

**Status**: Draft
**Author**: Alex (PM)
**Last Updated**: 2026-03-30
**Version**: 2.0
**Stakeholders**: Engineering, Design, Society Relations

---

## 1. Overview

### What This Is

A ticketing system integrated directly into the event creation and editing flow within the society committee dashboard. Society committees can toggle ticketing on for any event, configure ticket types (pricing, member-only, capacity), track sales, manage attendee check-in, and process refunds — all without leaving the events workflow. This is built as a **demo** — all data is mocked client-side using in-memory state via React hooks, no real Supabase calls, simulated network delays.

### Why It Matters

Ticketing is the single highest-value feature request from prospective society partners. Today, societies use a patchwork of tools: Fixr for paid events, Google Forms for free registrations, and manual spreadsheets for door check-in. None of these integrate with their event data. This demo shows societies that RedefineMe can unify event creation, ticketing, sales tracking, and attendee management into one dashboard — the primary differentiator that turns passive "we scraped your events" into "we run your events."

The demo does not process real payments. It uses mock purchase data to demonstrate the full workflow so that societies can evaluate the UX before we build the real backend.

### What Changed in v2.0

**Ticketing no longer has its own sidebar tab or standalone page.** Instead, ticketing is embedded directly into the event creation/editing flow via a toggle. This reduces navigation friction — committees manage tickets in the same place they manage everything else about an event.

### Where It Lives in the Codebase

This feature modifies the existing events workflow:

- **Event form** (create + edit): new "Ticket Event" toggle + collapsible ticket config panel
- **Events list page**: new ticketed/non-ticketed filter + sold badge on ticketed event rows
- **Manage Tickets modal**: attendee management, accessible from individual event views
- **Data**: ticket types and purchases added to existing mock data and `useEvents` hook
- **No new routes** — everything is modals and inline form sections within the existing events pages

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
**Context**: President of the society. Oversees finances. Needs visibility into ticket revenue across all events without digging into individual event details. Reviews the events page to get a snapshot of total earnings and sales volume.

**Key behaviors**:
- Scans the events list for ticketed events and their revenue
- Rarely enters individual attendee management
- Wants at-a-glance confirmation that ticket configs are correct before events go live

---

## 3. User Stories

### US-1: View Ticketed Events on the Events Page
**As a** committee member, **I want to** filter the events list to show only ticketed events, **so that** I can quickly assess ticket sales across all our paid events.

**Acceptance Criteria**:
- [ ] The events page has a three-state filter: "All", "Ticketed", "Non-ticketed" — displayed as three buttons
- [ ] When "Ticketed" is selected, only events with at least one ticket type configured are shown
- [ ] When "Non-ticketed" is selected, only events with no ticket types are shown
- [ ] When "All" is selected (default), all events are shown
- [ ] Ticketed events display a colored badge on their row showing "X / Y sold" (tickets sold vs. total available)
- [ ] The badge is visually distinct (e.g., indigo or accent-colored background)

### US-2: Enable Ticketing on a New Event (Creation Flow)
**As a** committee member, **I want to** set up tickets while creating a new event in one flow, **so that** I don't have to create the event first and then go somewhere else to configure tickets.

**Acceptance Criteria**:
- [ ] The event creation form includes a "Ticket Event" toggle switch
- [ ] Default state: off
- [ ] When toggled on, a collapsible panel expands directly below the toggle
- [ ] The panel contains the ticket configuration form (ticket types list)
- [ ] The user can add one or more ticket types, each with: name, price, member toggle, total available count
- [ ] Ticket name field provides auto-suggest dropdown with predefined options ("VIP", "Member Price", "Non-Member Price", "Early Bird", "Standard", "General Admission") but accepts custom text
- [ ] Price must be at least £1.00. Values below are rejected with a validation message
- [ ] Total available must be at least 1
- [ ] A running total counter displays the sum of all ticket types' available counts
- [ ] Clicking "Save" (the existing event save button) persists both the event and ticket configuration together
- [ ] On success, shows toast: "Event created successfully" (existing toast) — no separate ticketing toast needed
- [ ] The newly created event appears in the events list with the ticketed badge

### US-3: Enable Ticketing on an Existing Event (Edit Flow)
**As a** committee member, **I want to** add tickets to an existing event that doesn't have them yet, **so that** I can decide to sell tickets for an event after it's been created.

**Acceptance Criteria**:
- [ ] The event edit form includes the same "Ticket Event" toggle
- [ ] For events without tickets, the toggle is off — toggling it on reveals the ticket config panel
- [ ] The user configures ticket types in the same way as creation
- [ ] Clicking "Save" persists both the event changes and the new ticket configuration together
- [ ] The event now appears with the ticketed badge on the events list

### US-4: Edit Existing Ticket Configuration
**As a** committee member, **I want to** edit ticket details for an event that already has tickets configured, **so that** I can adjust availability or add new ticket types.

**Acceptance Criteria**:
- [ ] For events with existing tickets, the toggle is on and the ticket config panel is expanded, pre-populated with existing data
- [ ] The "total available" field is editable
- [ ] The "member ticket" toggle is editable
- [ ] New ticket types can be added
- [ ] **Locked ticket types (sold > 0)**: Once any tickets have been sold for a ticket type, all attributes (name, price, member toggle) are **read-only** and cannot be modified. Fields are visually disabled with a lock indicator and tooltip: "This ticket type has sold tickets. Refund all holders to edit."
- [ ] **Exception — total available**: The "total available" field remains editable for locked ticket types, but only if the new value is **greater than or equal to** the number of tickets already sold. Reducing below the sold count is blocked with inline validation: "X tickets have been sold. Total available cannot be less than X."
- [ ] **Locked ticket types cannot be removed**: The remove (trash) button is disabled for any ticket type with sold tickets. Tooltip: "Cannot remove a ticket type with sold tickets. Refund all holders first."
- [ ] Ticket types with 0 sold tickets remain fully editable (all fields, removable)
- [ ] The save button remains disabled while any validation error exists
- [ ] On save, shows toast: "Event updated successfully" (existing toast)

### US-5: Disable Ticketing on an Event
**As a** committee member, **I want to** turn off ticketing for an event, **so that** I can revert it to a non-ticketed event.

**Acceptance Criteria**:
- [ ] If the event has **zero** tickets sold across all types, toggling off removes all ticket types and collapses the panel
- [ ] If the event has **any** tickets sold, the toggle is **blocked** — it does not move
- [ ] An inline warning appears: "Cannot disable ticketing — X tickets have been sold. Refund all ticket holders first."
- [ ] The warning disappears when the user stops interacting with the toggle

### US-6: View Ticket Sales on Event Row
**As a** committee member, **I want to** see how many tickets have been sold at a glance on the events list, **so that** I can monitor sales without opening each event.

**Acceptance Criteria**:
- [ ] Ticketed events display a colored badge on the event row
- [ ] Badge format: "X / Y sold" where X is total purchases, Y is total available across all types
- [ ] Badge color: accent/indigo when sales are active, muted when 0 sold
- [ ] Non-ticketed events do not display a badge

### US-7: Manage Attendees for a Ticketed Event
**As a** committee member, **I want to** view and manage ticket holders for a specific event, **so that** I can check people in at the door and process refunds.

**Acceptance Criteria**:
- [ ] Ticketed events show a "Manage Tickets" button (visible on the event detail view or event row actions)
- [ ] Clicking "Manage Tickets" opens a modal/sheet
- [ ] Modal header shows: event title, "X / Y tickets sold" summary, "Total revenue: £Z"
- [ ] Each ticket type is a collapsible section
- [ ] Section header: ticket type name, "X / Y sold" badge, price per ticket
- [ ] Default: first category expanded, rest collapsed
- [ ] Expanding a category reveals the list of ticket holders

### US-8: Check In and Refund Attendees
**As a** committee member, **I want to** mark attendees as checked-in or refund their tickets, **so that** I have accurate attendance records and can free up tickets.

**Acceptance Criteria**:
- [ ] Each ticket holder row shows: user name, email, purchase date/time (left side), action buttons (right side)
- [ ] **Normal state**: "Attend" button (green) and "Refund" button (red)
- [ ] **Attended state**: attendance timestamp ("Checked in at HH:MM") and "Unattend" button
- [ ] Clicking "Attend" marks the user as attended with a timestamp — optimistic update
- [ ] Clicking "Unattend" reverts to normal state
- [ ] Clicking "Refund" shows a confirmation dialog: "You are refunding this user." with "Cancel" and "OK"
- [ ] On confirm: user removed from attendee list, sold count decreases, revenue decreases, toast: "Ticket refunded successfully"
- [ ] A user marked as attended CANNOT be refunded — Refund button is hidden, user must Unattend first

---

## 4. Detailed Requirements

### 4.1 Sidebar Navigation — No Changes

**No new sidebar items.** Ticketing is accessed entirely through the existing "Events" navigation item. The standalone ticketing page and sidebar entry from v1.0 are removed.

### 4.2 Events List Page — Filter & Badge

**File**: `src/app/society/[societyId]/dashboard/events/page.tsx`

**Ticketed Filter**:
- Three-state button group positioned near existing filters/sort controls
- Three buttons: "All" (default), "Ticketed", "Non-ticketed"
- Uses the same button styling as existing filter controls
- Filter state managed in the page component, filters the events array before rendering

**Ticketed Badge on Event Rows**:
- Displayed inline on the event row (same row as title, date, etc.)
- Badge content: "X / Y sold" (e.g., "129 / 170 sold")
- Badge styling: `bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full` (or similar accent-colored pill)
- When 0 sold: `bg-gray-100 text-gray-500` (muted variant)
- Non-ticketed events: no badge rendered

**"Manage Tickets" Button**:
- Visible on ticketed event rows in the actions area
- Opens the Manage Attendees modal (see §4.5)
- Button style: outline variant, consistent with existing event row actions

### 4.3 Event Form — "Ticket Event" Toggle & Configuration Panel

**Files**: Event creation and edit form components (e.g., `EventForm.tsx` or equivalent)

**"Ticket Event" Toggle**:
- Position: within the event form, as its own section/card
- Component: `Switch` (same as `isOnline`/`isFree` toggles in EventForm)
- Label: "Ticket Event"
- Sublabel: "Enable ticket sales for this event"
- Default: off (for new events), reflects current state (for existing events)

**Collapsible Ticket Configuration Panel**:
- Appears directly below the toggle when it is ON
- Animated expand/collapse using Framer Motion (consistent with existing collapsible patterns)
- Contains the ticket types list and configuration form

**Ticket Types List**:
- Rendered as a vertical list of cards, one per ticket type
- Each ticket type card contains:
  1. **Ticket Name** (required)
     - Input with auto-suggest dropdown
     - Predefined suggestions: "VIP", "Member Price", "Non-Member Price", "Early Bird", "Standard", "General Admission"
     - Suggestions filter as user types (case-insensitive substring match)
     - User can dismiss suggestions and type any custom name
     - Minimum 1 character
     - **Locked (disabled + lock icon) if any tickets have been sold for this type**
  2. **Price** (required)
     - Numeric input with "£" prefix label
     - Minimum value: 1.00
     - Step: 0.01
     - Validation message if below minimum: "Price must be at least £1.00"
     - **Locked (disabled + lock icon) if any tickets have been sold for this type**
  3. **Member Ticket Toggle** (default: off)
     - Switch component
     - Label: "Member ticket"
     - When on, indicates this ticket type is reserved for society members
     - **Locked (disabled + lock icon) if any tickets have been sold for this type**
  4. **Total Available** (required)
     - Numeric input
     - Minimum value: 1
     - Validation message if below minimum: "Must offer at least 1 ticket"
     - Cannot be reduced below the number of tickets sold (see §4.3.1)
  5. **Remove button** (trash icon, right side of card)
     - Removes this ticket type from the list
     - If this is the only ticket type, show validation: "At least one ticket type is required"
     - **Blocked if any tickets have been sold for this type.** Show: "Cannot remove a ticket type with sold tickets. Refund all holders first."

**"Add Ticket Type" Button**:
- Below the ticket type list
- Adds a new empty ticket type card to the list
- Uses `Plus` icon from lucide-react
- Outline variant button

**Total Tickets Counter**:
- Displayed below the ticket types list
- Shows: "Total tickets: X" where X is the sum of all ticket types' "total available" values
- Updates in real time as values change

**Save Behavior**:
- The existing event "Save" button persists both event data and ticket configuration in a single action
- No separate "Save Tickets" button — one save for everything
- Validation: all ticket type fields must be valid before the form can be saved

#### 4.3.1 Toggle Protection — Disabling Ticketing

When the user attempts to toggle "Ticket Event" OFF on an event that has tickets configured:

- **If zero tickets sold across all types**: toggle switches off, ticket config panel collapses, all ticket types are removed
- **If any tickets sold**: toggle is **blocked** (does not move). An inline warning appears below the toggle:
  > "Cannot disable ticketing — X tickets have been sold. Refund all ticket holders first."
- The warning uses `text-red-600 text-sm` styling and disappears after 5 seconds or when the user interacts with another element

#### 4.3.2 Edit Mode — Locked Fields

When editing ticket types that have sold tickets:

| Field | Sold > 0 | Sold = 0 |
|---|---|---|
| Ticket Name | Locked (disabled + 🔒) | Editable |
| Price | Locked (disabled + 🔒) | Editable |
| Member Toggle | Locked (disabled + 🔒) | Editable |
| Total Available | Editable (must be >= sold count) | Editable |
| Remove Button | Blocked + tooltip | Enabled |

Locked fields show a small lock icon and a tooltip: "This ticket type has sold tickets. Refund all holders to edit."

### 4.4 Manage Attendees Modal

**Trigger**: "Manage Tickets" button on a ticketed event row (events list page or event detail view)

**Component**: Modal or sheet (right-side sheet recommended for wider content)

**Header Section**:
- Event title
- Overall summary: "X / Y tickets sold" (total sold across all categories / total available across all categories)
- Revenue summary: "Total revenue: £X" (GBP formatted)

**Ticket Category Sections**:
- One collapsible section per ticket type (use `ChevronDown` toggle pattern, same as rejected members in `CommitteePage`)
- Section header shows: ticket type name, "X / Y sold" badge, price per ticket
- Default state: first category expanded, rest collapsed

**Expanded Category — Attendee List**:
- Each row is a horizontal flex container:
  - **Left side**:
    - User name (font-medium)
    - User email (text-xs, muted color)
    - Purchase date/time (text-xs, muted color, formatted via `formatDateTime`)
  - **Right side** (normal state — not attended):
    - "Attend" button: small, green variant (`border-emerald-200 text-emerald-700 hover:bg-emerald-50`)
    - "Refund" button: small, red variant (`border-red-200 text-red-700 hover:bg-red-50`)
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
| 1 | Events List Page (with filter + badges) | Route page (modified) | Sidebar "Events" link |
| 2 | Event Form — Ticket Toggle + Config Panel | Inline form section | Creating or editing any event |
| 3 | Manage Attendees — Category List | Modal / Sheet | "Manage Tickets" button on ticketed event |
| 4 | Refund Confirmation Dialog | Alert Dialog | "Refund" button on attendee row |
| 5 | Toggle Block Warning | Inline warning | Attempting to disable ticketing with sold tickets |
| 6 | Locked Field Tooltip | Tooltip | Hovering locked name/price field |
| 7 | Success Toast: "Ticket refunded successfully" | Toast (sonner) | After confirming refund |

---

## 6. Data Model

All data is mock/in-memory for this demo. The structures below define the TypeScript interfaces used in the `useEvents` hook (ticketing is merged into the events hook) and mock data. These interfaces are designed to map cleanly to future Supabase tables.

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
```

### 6.2 Extended Event Type

The existing `DashboardEvent` type is extended (not replaced) with optional ticketing fields:

```typescript
/** Extended event with optional ticketing data. */
export interface DashboardEvent {
  // ... existing fields ...

  // Ticketing (optional — only present if "Ticket Event" toggle is on)
  isTicketed: boolean;
  ticketTypes?: TicketType[];
  purchases?: TicketPurchase[];

  // Computed (derived in hook, not stored)
  totalRevenue?: number;   // sum of (sold * price) per type
  totalSold?: number;      // total purchases across all types
  totalAvailable?: number; // sum of totalAvailable across all types
}
```

### 6.3 Mock Data (modify `src/lib/mock-data.ts`)

Pre-populate 2-3 events with ticket configurations and mock purchases to demonstrate the full workflow on first load:

- **"End of Year Ball" (e-006)**: Already has `isFree: false, price: "35"` in mock data. Configure with:
  - "Early Bird" — £25.00, 50 available, 47 sold
  - "Standard" — £35.00, 100 available, 68 sold
  - "VIP" — £55.00, 20 available, 14 sold
  - Mock 129 purchases with realistic names/emails/timestamps
  - Some attendees already marked as attended (with `attendedAt` timestamps)

- **"CSS Pub Quiz Night" (e-003)**: Free event but with limited capacity:
  - "Member" — £1.00, 40 available, 34 sold (member toggle: on)
  - "Non-Member" — £3.00, 20 available, 12 sold
  - Mock 46 purchases

- Remaining events (e-001, e-002, e-004, e-005, e-007, e-008): `isTicketed: false`, no ticket types — these are non-ticketed events

### 6.4 Future Database Tables (reference only — not built for demo)

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

### 7.1 Merged into `useEvents` Hook

**File**: `src/hooks/useEvents.ts` (modified — no new hook)

Ticketing state and actions are merged into the existing `useEvents` hook. This keeps all event-related state in one place, consistent with ticketing being "part of" events rather than a separate feature.

**New exported functions added to `useEvents`**:

```typescript
// Added to the existing useEvents hook return value:

// Ticketing actions
assignTickets: (eventId: string, ticketTypes: Omit<TicketType, 'id' | 'eventId'>[]) => Promise<void>
updateTickets: (eventId: string, ticketTypes: TicketType[]) => Promise<void>
removeTicketing: (eventId: string) => void  // only works if 0 sold
markAttended: (purchaseId: string) => void
unmarkAttended: (purchaseId: string) => void
refundPurchase: (purchaseId: string) => void

// Computed / filtered
ticketedEvents: DashboardEvent[]    // events where isTicketed === true
nonTicketedEvents: DashboardEvent[] // events where isTicketed === false
```

When saving an event (create or edit), the existing `createEvent` / `updateEvent` functions handle the ticketing data as part of the event payload — no separate ticketing save call.

### 7.2 State Transitions

```
Event created (toggle OFF)
    |
    v
[Non-ticketed] --- toggle ON + configure types ---> [Ticketed]
                                                        |
                                              Edit ticket types
                                              (name/price locked if sold)
                                                        |
                                              "Manage Tickets"
                                                  |         |
                                             "Attend"   "Refund"
                                                |          |
                                             [Attended]  [Removed from list]
                                                |
                                             "Unattend"
                                                |
                                             [Normal state]

[Ticketed, 0 sold] --- toggle OFF ---> [Non-ticketed]
[Ticketed, >0 sold] --- toggle OFF ---> BLOCKED (warning)
```

### 7.3 Business Rules

| Rule | Enforcement Point |
|---|---|
| Price >= 1.00 | Zod validation on ticket config form |
| Total available >= 1 | Zod validation on ticket config form |
| At least 1 ticket type when ticketed | Zod validation (array min length 1) |
| Sold ticket type attributes are read-only | UI disables name, price, member toggle fields when sold > 0 |
| Total available can only increase when sold > 0 | Pre-save validation: new value must be >= sold count |
| Cannot remove ticket type with sold tickets | UI disables remove button + tooltip warning |
| Cannot disable ticketing with sold tickets | Toggle blocked + inline warning |
| Cannot refund an attended user | UI hides Refund button when attended |
| Attended users show "Unattend" instead of "Attend" + "Refund" | Conditional render based on `attendedAt !== null` |
| Refund decrements sold count and revenue | `refundPurchase` removes from purchases array, recomputes totals |
| Event save persists event + tickets together | Single save action in form |

---

## 8. Edge Cases & Validation

### 8.1 Form Validation (Zod Schema)

```typescript
const ticketTypeSchema = z.object({
  name: z.string().min(1, "Ticket name is required"),
  price: z.number().min(1, "Price must be at least £1.00"),
  isMemberTicket: z.boolean(),
  totalAvailable: z.number().int().min(1, "Must offer at least 1 ticket"),
});

const ticketConfigSchema = z.object({
  isTicketed: z.boolean(),
  ticketTypes: z.array(ticketTypeSchema)
    .min(1, "At least one ticket type is required")
    .optional(), // only required when isTicketed is true
}).refine(
  (data) => !data.isTicketed || (data.ticketTypes && data.ticketTypes.length > 0),
  { message: "At least one ticket type is required when ticketing is enabled" }
);
```

### 8.2 Edge Cases

| Case | Expected Behavior |
|---|---|
| User toggles ticketing on but adds 0 ticket types, then saves | Validation error: "At least one ticket type is required" |
| User enters price of 0.50 | Validation error: "Price must be at least £1.00" |
| User enters price of 0 or negative | Validation error: "Price must be at least £1.00" |
| User enters non-numeric price | Input rejects non-numeric characters (input type=number) |
| User enters total available of 0 | Validation error: "Must offer at least 1 ticket" |
| User tries to edit name/price/member toggle on ticket type with sold tickets | Fields are disabled (read-only). Lock icon + tooltip: "This ticket type has sold tickets. Refund all holders to edit." |
| User tries to increase available from 50 to 80 when 30 are sold | Allowed. Total available updated to 80. |
| User tries to reduce available from 50 to 20 when 30 are sold | Blocked. Inline validation: "30 tickets have been sold. Total available cannot be less than 30." |
| User tries to remove a ticket type with sold tickets | Blocked. Remove button disabled. Tooltip: "Cannot remove a ticket type with sold tickets. Refund all holders first." |
| User tries to disable ticketing with sold tickets | Toggle blocked. Warning: "Cannot disable ticketing — X tickets have been sold. Refund all ticket holders first." |
| User tries to edit ticket name after sales | Field disabled with lock icon. Tooltip: "This ticket type has sold tickets. Refund all holders to edit." |
| User tries to edit ticket price after sales | Field disabled with lock icon. Tooltip: "This ticket type has sold tickets. Refund all holders to edit." |
| User tries to edit member toggle after sales | Field disabled with lock icon. Tooltip: "This ticket type has sold tickets. Refund all holders to edit." |
| User tries to refund an attended user | Not possible — Refund button is hidden when user is attended. User must "Unattend" first. |
| User refunds last ticket holder for a type | Sold count goes to 0. Ticket type remains configured. All fields (name, price, member toggle) become editable again. |
| User refunds all holders across all types | Event remains ticketed with 0 sold. Toggle can now be switched off. All fields become editable. |
| Event has no image | Event summary in manage tickets modal shows a colored placeholder div instead of an image |
| Duplicate ticket type names | Allowed — two types can both be called "VIP" (user's choice) |
| Very long ticket type name | Truncate display with ellipsis at ~30 characters in badge/table; full name visible in edit form |
| Rapid attend/unattend clicks | Optimistic UI update; debounce not needed for demo since state is local |
| Toggling ticketing on and off without saving | No data loss — ticket types only persist on save. Toggle on, toggle off, save = no ticket types saved |

---

## 9. Success Metrics

Since this is a demo, "success" is defined by completeness and UX quality during society pitches, not production analytics.

| Metric | Target | How to Verify |
|---|---|---|
| Feature completeness | 100% of requirements in this PRD are implemented | Manual walkthrough of all 8 user stories |
| Demo flow time | Full create-event-with-tickets-to-check-in flow completable in under 90 seconds | Timed walkthrough |
| Visual consistency | All new components use existing design tokens and component patterns | Visual audit against existing dashboard pages |
| Zero broken states | No combination of user actions produces a JS error, blank screen, or stale data | Exploratory testing covering all edge cases in Section 8.2 |
| Loading states | All async actions show appropriate loading/skeleton states | Visual confirmation |
| Toast feedback | Every mutation (save, refund, attend) shows a toast | Manual walkthrough |
| Responsive layout | All screens are usable on mobile viewport (375px+) | Responsive testing |
| Animation consistency | Toggle panel uses Framer Motion expand/collapse | Visual confirmation |
| Integrated feel | Ticketing feels like a natural part of event management, not a bolted-on feature | User feedback during demo |

---

## 10. Mobile View — QR Ticket Scanning

The mobile web app (`web/`) includes a dedicated QR ticket scanning flow accessible from the manage tickets page. This allows committee members to scan attendee tickets at the door using their phone camera.

### 10.1 QR Code Button on Manage Page

**File**: `web/src/app/manage/page.tsx`

**Placement**: Top right corner of the page header, inline with the "Ticketing" title.

**Appearance**:
- Icon: `QRCodeIcon` (already exists in `web/src/components/icons.tsx`, modelled on Ionicons `qr-code-outline`)
- Size: `w-6 h-6`
- No label — icon-only button
- Color: inherits text color (gray-900 dark / white dark mode), no background
- Tap target: at least 44x44px for mobile accessibility

**Behavior**:
- On tap, navigates to `/scan-qr` route via `router.push('/scan-qr')`

### 10.2 Scan QR Page

**Route**: `web/src/app/scan-qr/page.tsx`

**Layout**: Full-screen page, does NOT include `BottomNav`. Dark overlay background for camera contrast.

**Header**:
- Top left: `BackButton` component (already exists at `web/src/components/BackButton.tsx`) — navigates back to `/manage`
- Top center: Page title "Scan Tickets" in white text, `text-lg font-semibold`
- Background: transparent (overlays the camera/dark area)

**Scanner Viewport** (center of page):
- Transparent square centered on screen
- Border: `1px solid` using `primary-500` color (`#C04138`)
- Size: 250x250px (responsive: `min(70vw, 250px)`)
- Rounded corners: `rounded-2xl` (16px)
- Scanning animation inside the square:
  - A horizontal line that sweeps top-to-bottom continuously
  - Line color: `primary-500` (`#C04138`) with 60% opacity
  - Animation: CSS `@keyframes scan-line` — translates Y from 0% to 100% over 2 seconds, infinite loop, ease-in-out
  - Line height: 2px, full width of the square, with a subtle glow (`box-shadow: 0 0 8px primary-500`)
- Area outside the square: semi-transparent dark overlay (`bg-black/60`) to simulate camera viewfinder framing

**Scan Button** (bottom center):
- Positioned at bottom of page, centered, with comfortable spacing from bottom edge (`mb-12`)
- Shape: circular, `w-16 h-16`, `rounded-full`
- Background: `bg-primary-500` (`#C04138`)
- Icon: `QRCodeIcon` in white (`text-white`), `w-7 h-7`
- Shadow: `shadow-lg` for elevation
- Active state: `active:scale-95` for tactile feedback
- Behavior: In the demo, this button is non-functional (no real camera integration). Tapping it shows a toast: "QR scanning coming soon" using the existing `Toast` component.

### 10.3 New Files

```
web/src/app/scan-qr/
  page.tsx              -- Scan QR page (route)
```

### 10.4 Modified Files

```
web/src/app/manage/page.tsx     -- Add QR code button to page header
web/src/app/globals.css         -- Add @keyframes scan-line animation
```

### 10.5 Screen Inventory Update

| # | Screen / Component | Type | Trigger |
|---|---|---|---|
| 8 | QR Code button | Icon button | Visible on manage page header |
| 9 | Scan QR Page | Route page | QR Code button on manage page |
| 10 | Toast: "QR scanning coming soon" | Toast (sonner/Toast) | Tapping scan button on scan-qr page |

---

## 11. Out of Scope

The following items are explicitly NOT included in this demo build. They will be revisited when moving to production.

| Item | Reason | Revisit Condition |
|---|---|---|
| Real payment processing (Stripe, etc.) | Demo only — no real money changes hands | Production build after society sign-ups |
| Supabase database tables | Demo uses in-memory mock data | Production build |
| Email confirmations to ticket buyers | No real users in demo | Production build |
| QR code generation for tickets | Adds complexity with no demo value | Post-MVP, if societies request it |
| Real camera QR scanning | Demo scan-qr page is UI-only (no camera access) | Production build with WebRTC camera integration |
| Ticket type deletion (with sold tickets) | Blocked by design — requires refund-all first | May add "bulk refund and remove" in production |
| PDF / printable ticket export | Nice-to-have, not needed for pitch demo | If requested by 3+ societies |
| Waitlist / sold-out handling | Adds complexity beyond demo scope | Production build |
| Promo codes / discounts | Not core to the demo value proposition | Post-MVP feature |
| Multi-currency support | All UK universities, GBP only | International expansion |
| Actual Supabase auth integration | Demo uses `useSocietyAuth` mock hook | Production build |
| Ticket transfer between users | Edge case, not needed for demo | Post-MVP |
| Sales analytics / charts | Revenue chart would be valuable but adds scope | Fast-follow after initial demo |
| Stripe Connect for society payouts | Complex financial integration | Production build, requires legal review |
| Standalone ticketing page / route | Removed in v2.0 — ticketing integrated into events | Not revisited unless user feedback demands it |
| Separate "Assign Tickets" flow | Removed in v2.0 — replaced by event form toggle | Not revisited |

---

## Appendix A: Component Reuse Map

| New / Modified Component | Reuses Pattern From |
|---|---|
| Ticketed filter button group | Existing filter controls on events page |
| Ticketed badge on event row | Pill/badge pattern (rounded-full, small text) |
| "Ticket Event" toggle in event form | `Switch` component (same as isOnline/isFree in EventForm) |
| Ticket config collapsible panel | Framer Motion expand/collapse (existing patterns) |
| Ticket type card (name, price, etc.) | `EventForm.tsx` Card + CardHeader + CardContent sections |
| Ticket name auto-suggest | `cmdk` package — Command/CommandInput/CommandList |
| Price + total available inputs | `Input` + `Label` from shadcn/ui (same as EventForm fields) |
| Member ticket toggle | `Switch` component (same as EventForm) |
| Total tickets counter | Plain text display below form section |
| Locked field + lock icon | Disabled input + `Lock` icon from lucide-react |
| Manage Attendees modal/sheet | Sheet component from shadcn/ui |
| Attendee category collapsibles | `ChevronDown` toggle pattern from `CommitteePage` |
| Attend/Refund buttons | Approve/Deny button styles from `CommitteePage` |
| Refund confirmation dialog | `AlertDialog` from shadcn/ui |
| Success toasts | `toast` from `sonner` (already used throughout dashboard) |
| Motion wrappers | `DashboardPageHeader` and `DashboardSection` from `DashboardMotion.tsx` |
| Form validation | `react-hook-form` + `zod` + `@hookform/resolvers` (same as EventForm) |

## Appendix B: File Modification Plan

**Modified files**:

```
src/
  app/society/[societyId]/dashboard/events/
    page.tsx                       -- Add ticketed filter + badge on event rows + "Manage Tickets" button
  components/events/
    EventForm.tsx                   -- Add "Ticket Event" toggle + collapsible ticket config panel
  hooks/
    useEvents.ts                   -- Merge ticketing state + actions into existing hook
  lib/
    mock-data.ts                   -- Add ticketTypes + purchases to 2-3 mock events
    supabase/types.ts              -- Add TicketType, TicketPurchase interfaces + extend DashboardEvent
```

**New files**:

```
src/
  components/ticketing/
    TicketConfigPanel.tsx           -- Collapsible panel containing ticket types list
    TicketTypeCard.tsx              -- Individual ticket type input card
    TicketNameAutosuggest.tsx       -- Auto-suggest input for ticket names
    TicketTotalCounter.tsx          -- Running total of available tickets
    ManageAttendeesModal.tsx        -- Attendee management modal/sheet
    AttendeeRow.tsx                 -- Single attendee row with actions
    RefundDialog.tsx                -- Refund confirmation dialog
    TicketedBadge.tsx               -- "X / Y sold" badge component
    TicketedFilter.tsx              -- Three-state filter button group
```

**Mobile view — new files**:

```
web/src/app/scan-qr/
  page.tsx                               -- Scan QR page (route)
```

**Mobile view — modified files**:

```
web/src/app/manage/page.tsx              -- Add QR code button to page header
web/src/app/globals.css                  -- Add @keyframes scan-line animation
```

**Removed files (from v1.0 plan — never built)**:

```
-- These were planned in v1.0 but are no longer needed:
src/app/society/[societyId]/dashboard/ticketing/    -- Entire route removed
src/components/ticketing/TicketingTable.tsx          -- Replaced by badge on events list
src/components/ticketing/AssignTicketsModal.tsx      -- Replaced by event form toggle
src/hooks/useTicketing.ts                           -- Merged into useEvents
```
