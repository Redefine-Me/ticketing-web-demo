# PRD: Room Booking Management

**Status**: Draft
**Author**: Alex (PM)
**Last Updated**: 2026-03-30
**Version**: 1.0
**Stakeholders**: Engineering, Design, Society Relations

---

## 1. Overview

### What This Is

A room booking management system within the society committee dashboard that allows society committees to track, manage, and communicate about venue bookings for their events. The feature spans two areas of the dashboard: a dedicated **Bookings page** (new sidebar nav item) for centralized booking management, and **inline booking controls** embedded in the Events page schedule location entry. This is built as a **demo** -- all data is mocked client-side using the same pattern as the rest of the demo dashboard (in-memory state via React hooks, no real Supabase calls, simulated network delays).

### Why It Matters

Room booking is the single most time-consuming logistical task society committees face every term. Today, the process is entirely manual: committee members email university timetabling offices, phone external venues, chase responses across email threads, and track availability in shared spreadsheets. There is zero integration between where societies manage their events and where they manage their bookings.

This demo shows societies that RedefineMe can unify event creation and venue booking into one dashboard -- the committee member creates an event, picks a location, and immediately sees the booking status, room availability, and communication history without leaving the page. For the university pitches, this is the feature that makes RedefineMe feel like a platform, not just an event listing.

The demo does not process real booking requests. It uses mock data to demonstrate the full workflow so that societies and university administrators can evaluate the UX before we build the real integrations.

### Where It Lives in the Codebase

This feature adds a new top-level route and modifies the existing events page:

- **Route**: `/society/[societyId]/dashboard/bookings`
- **Sidebar navigation**: new "Bookings" item added to the `navItems` array in `Sidebar.tsx` and `Topbar.tsx`
- **Events page modification**: location entry in the schedule section of `EventForm.tsx` gains inline booking controls
- **Layout**: inherits `DashboardShell` (sidebar, topbar, aurora background, `dashboard-scope` CSS class)
- **Data**: new mock data file(s) extending `src/lib/mock-data.ts`
- **State**: new `useBookings` hook following the pattern of `useEvents` (in-memory state, simulated delays, exported CRUD functions)

---

## 2. User Personas

### Primary: Society Committee Member (Events Officer)

**Name**: David Lee
**Context**: Events Officer for UoM Computer Science Society. Responsible for booking rooms for society events -- both university lecture theatres and external venues like bars and restaurants. Currently emails the university timetabling office for room bookings and phones/emails external venues separately. Tracks all of this in a shared Google Sheet with no visibility into room availability.

**Key behaviors**:
- Books 4-8 rooms per term across university buildings and external venues
- Spends 20-30 minutes per booking chasing availability and confirmation
- Needs to know how many people are attending to request the right room size
- Frequently checks back on pending bookings to see if they have been accepted or rejected
- Communicates back-and-forth with venue contacts about timing, setup requirements, and capacity

### Secondary: Society President / Treasurer

**Name**: Alice Johnson
**Context**: President of the society. Oversees logistics. Needs visibility into which events have confirmed venues and which are still pending. Reviews the bookings page to catch events that are approaching without a confirmed room.

**Key behaviors**:
- Scans the bookings list for any "rejected" or "pending" bookings close to event dates
- Rarely enters individual booking communications
- Wants at-a-glance confirmation that all upcoming events have confirmed venues

---

## 3. User Stories

### US-1: View All Events with Bookings

**As a** committee member, **I want to** see a list of all my events that have active bookings, **so that** I can quickly assess booking status across all our events without visiting each event individually.

**Acceptance Criteria**:
- [ ] The Bookings page displays a list of all events that have at least one booking associated with them
- [ ] Each event entry shows: event title, event date, and a summary count of bookings by status (e.g., "2 pending, 1 accepted")
- [ ] Events with zero bookings do NOT appear in this list
- [ ] The page loads within 300ms (simulated delay for demo)

### US-2: Expand an Event to See Its Schedule and Bookings

**As a** committee member, **I want to** expand an event to see its schedule items and associated bookings, **so that** I can review the venue situation for each date/time slot of a multi-session event.

**Acceptance Criteria**:
- [ ] Each event in the bookings list is collapsible/expandable (default: collapsed)
- [ ] When expanded, the event shows its full schedule (all schedule entries from the event data)
- [ ] Each schedule item shows: date/time, location name (if set), and a booking entry (if a booking exists for that schedule item)
- [ ] Schedule items without bookings show a subtle "No booking" indicator

### US-3: Expand a University Booking to See Details

**As a** committee member, **I want to** expand a university venue booking to see the building, room, and current status, **so that** I know exactly which room we have and whether it is confirmed.

**Acceptance Criteria**:
- [ ] A university booking shows: building name, room number, and a status badge (pending / accepted / rejected)
- [ ] The status badge uses color coding: pending = amber/yellow, accepted = green, rejected = red
- [ ] Each university booking has a text box showing the discussion/communication history for that booking
- [ ] The communication history is scrollable if it exceeds the visible area

### US-4: Expand a Non-University Booking to See Details

**As a** committee member, **I want to** expand a non-university venue booking to see the venue contact info, website, description, and status, **so that** I can quickly reach out to the venue or check the booking state.

**Acceptance Criteria**:
- [ ] A non-university booking shows: venue name, phone number, website link, description, and a status badge (pending / accepted / rejected)
- [ ] The phone number is displayed as a clickable `tel:` link
- [ ] The website is displayed as a clickable link that opens in a new tab
- [ ] The status badge uses the same color coding as university bookings
- [ ] Each non-university booking has a text box showing the discussion/communication history for that booking

### US-5: Enter a University Location in the Events Page Schedule

**As a** committee member creating/editing an event, **I want to** select a university building and room from a dropdown when setting the schedule location, **so that** I can quickly pick from known campus buildings without typing addresses manually.

**Acceptance Criteria**:
- [ ] The schedule location input shows a searchable dropdown of university buildings
- [ ] Typing in the building field filters the dropdown (case-insensitive substring match)
- [ ] After selecting a building, a room text input appears for entering the specific room number/name
- [ ] Inline with the building and room fields (right side), an "In Your Bookings" dropdown is displayed
- [ ] The "In Your Bookings" dropdown shows the booking status (pending / accepted / rejected) as a badge next to it
- [ ] When expanded, the dropdown shows a calendar/availability view of when this room is free
- [ ] A required text input for "Expected attendees" (number) is displayed -- this is mandatory for university room bookings

### US-6: View Room Availability Calendar

**As a** committee member, **I want to** see when a university room is free before I book it, **so that** I can avoid conflicts and pick a time that works.

**Acceptance Criteria**:
- [ ] The availability calendar is displayed inside the "In Your Bookings" dropdown when expanded
- [ ] The calendar shows a week view with time slots indicating free (green), booked (gray/red), and my booking (highlighted in the dashboard CTA color)
- [ ] Mock availability data is pre-populated to demonstrate the UI
- [ ] The calendar is read-only in this demo (no interactive booking from the calendar)

### US-7: Enter a Non-University Location in the Events Page Schedule

**As a** committee member creating/editing an event, **I want to** select an external venue from a dropdown and optionally add it to my bookings, **so that** I can manage external venue bookings without leaving the event creation flow.

**Acceptance Criteria**:
- [ ] The schedule location input includes non-university venues in the searchable dropdown, visually separated from university buildings (e.g., with a section header or divider)
- [ ] After selecting a non-university venue, an "Add to Bookings" button appears inline with the location
- [ ] Clicking "Add to Bookings" toggles the button to "Remove from Bookings"
- [ ] When added to bookings, a small dropdown/panel appears showing: phone number, website link, a text box for current booking status/discussion, and a status badge (pending / accepted / rejected)
- [ ] The status defaults to "pending" when first added
- [ ] Clicking "Remove from Bookings" removes the booking and hides the dropdown/panel

### US-8: Communicate Within a Booking

**As a** committee member, **I want to** add messages to the communication history of a booking, **so that** I have a record of all discussions about that specific venue reservation.

**Acceptance Criteria**:
- [ ] Each booking (both university and non-university) has a text input at the bottom of its communication history
- [ ] Typing a message and pressing Enter (or clicking a Send button) adds the message to the history with a timestamp
- [ ] Messages appear chronologically (oldest at top, newest at bottom)
- [ ] The sender is always "You" in the demo (no multi-user communication)
- [ ] Mock pre-populated messages exist for some bookings to demonstrate the communication flow

---

## 4. Detailed Requirements

### 4.1 Sidebar Navigation Update

**File**: `src/components/dashboard/Sidebar.tsx` and `src/components/dashboard/Topbar.tsx`

Add a new entry to the `navItems` array:
```
{ path: "/bookings", label: "Bookings", icon: CalendarCheck }
```
Position it immediately after the "Events" entry (and after "Ticketing" if that has been added). Use the `CalendarCheck` icon from `lucide-react`.

### 4.2 Main Bookings Page

**Route**: `/society/[societyId]/dashboard/bookings/page.tsx`

**Layout**:
- Page header: title "Bookings", subtitle "Track and manage venue bookings for your events"
- Wrap with `DashboardPageHeader` and `DashboardSection` motion components for consistent entrance animations

**Booked Events List**:
- Rendered as a vertical list of collapsible cards, one per event that has at least one booking
- Each event card header shows:
  - Event title (font-medium)
  - Event date (text-sm, muted color, formatted via `formatDateTime`)
  - Booking status summary: colored badges showing counts by status (e.g., "2 pending", "1 accepted") using the same badge colors as individual booking statuses
  - Expand/collapse chevron (`ChevronDown` / `ChevronUp`)
- Default state: all events collapsed
- Empty state: "No bookings yet. Add bookings to your events from the Events page."
- Loading state: skeleton cards (same pattern as `EventTable`)

### 4.3 Expanded Event -- Schedule and Bookings

When an event card is expanded, it reveals:

**Schedule Entries**:
- A vertical list of the event's schedule entries (from `DashboardEvent.schedules`)
- Each entry shows: formatted date/time, location name (if set), and the associated booking (if one exists)
- Schedule entries with `isEnd: true` are displayed as "End time" entries (no booking expected)
- Schedule entries without a booking show a muted "No booking" label

**Booking Cards** (nested under schedule entries):
- Each booking is itself collapsible (default: collapsed, showing just the venue name + status badge)
- When expanded, shows the full booking details (university or non-university variant)

### 4.4 University Booking Card (Expanded)

Displays:
- **Building name**: text, font-medium (e.g., "Kilburn Building")
- **Room number**: text, muted (e.g., "LF15")
- **Expected attendees**: badge showing the number (e.g., "80 people")
- **Status badge**: pending (amber/yellow background, dark text), accepted (green background, white text), rejected (red background, white text)
  - Pending: `bg-amber-100 text-amber-800 border-amber-200`
  - Accepted: `bg-emerald-100 text-emerald-800 border-emerald-200`
  - Rejected: `bg-red-100 text-red-800 border-red-200`
- **Communication history**: scrollable container showing message bubbles
  - Each message shows: sender name, timestamp, and message text
  - Messages from "You" are right-aligned with a subtle dashboard-tinted background
  - Messages from "University Timetabling" are left-aligned with a neutral background
- **Message input**: text input + send button at the bottom of the communication section

### 4.5 Non-University Booking Card (Expanded)

Displays:
- **Venue name**: text, font-medium (e.g., "Kro Bar")
- **Phone number**: clickable `tel:` link with a `Phone` icon (e.g., "0161 274 3100")
- **Website**: clickable external link with an `ExternalLink` icon (e.g., "https://www.krobar.co.uk")
- **Description**: text, muted, up to 3 lines (e.g., "Independent bar and kitchen on Oxford Road. Function room available for private events, capacity 60.")
- **Status badge**: same color system as university bookings
- **Communication history**: same pattern as university booking cards
  - Messages from "Venue" are left-aligned
- **Message input**: same pattern as university booking cards

### 4.6 Events Page -- Schedule Location Entry (University)

**File**: `src/components/events/EventForm.tsx` (schedule section)

The existing schedule location input is replaced/enhanced with a two-mode dropdown:

**University Buildings Dropdown**:
- A searchable dropdown (`cmdk` Command/CommandInput/CommandList or custom) populated with hard-coded university buildings
- Typing filters the list (case-insensitive substring match)
- Selecting a building populates the building field

**Room Input**:
- After selecting a university building, a text input appears for room number/name
- Placeholder: "Room number (e.g., LF15)"

**Expected Attendees Input**:
- A numeric input field labeled "Expected attendees"
- Required for university room bookings
- Minimum value: 1
- Placeholder: "Number of people"
- Displayed below or inline with the building/room row

**"In Your Bookings" Dropdown** (right-aligned, inline with building + room):
- A compact dropdown trigger showing the booking status badge (pending/accepted/rejected) if a booking exists, or "Not booked" if no booking
- When expanded, shows:
  - Current booking status (with badge)
  - **Room availability calendar**: a week-view calendar showing time slots for the selected building + room
  - Calendar cells colored: green (free), gray (booked by others), dashboard CTA color (your booking)
  - Mock availability data pre-populated
- If no booking exists for this schedule entry, the dropdown shows "No booking for this room" with a prompt to visit the Bookings page

### 4.7 Events Page -- Schedule Location Entry (Non-University)

**Non-University Venues in Dropdown**:
- The same searchable dropdown includes non-university venues in a separate section
- A visual divider/section header separates "University Buildings" from "Other Venues"
- Non-university venues show their name and a brief descriptor (e.g., "Kro Bar -- Bar & Kitchen, Oxford Road")

**"Add to Bookings" Button** (right-aligned, inline with location):
- Appears when a non-university venue is selected
- Button text: "Add to Bookings"
- Style: outline variant, small size
- On click: toggles to "Remove from Bookings" (same button position, text and style change)
- Uses a check icon when active ("Remove from Bookings") to indicate it has been added

**Booking Panel** (appears below location when added to bookings):
- Compact card/panel showing:
  - **Phone number**: with `Phone` icon, clickable `tel:` link
  - **Website**: with `ExternalLink` icon, clickable link opening in new tab
  - **Status badge**: defaults to "pending" when first added
  - **Discussion text box**: a textarea for booking notes/status/discussion
    - Placeholder: "Add notes about this booking..."
    - Persists in the booking state
- Removing from bookings hides this panel and removes the associated booking data

---

## 5. Mock Data

### 5.1 University Buildings (Hard-Coded)

These are real University of Manchester buildings. Stored as a constant array.

```typescript
export const universityBuildings = [
  {
    id: "b-001",
    name: "Kilburn Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-001", name: "LF15", capacity: 80 },
      { id: "r-002", name: "LF31", capacity: 40 },
      { id: "r-003", name: "Tootill 1", capacity: 200 },
      { id: "r-004", name: "LF25", capacity: 50 },
      { id: "r-005", name: "Collab 1", capacity: 30 },
    ],
  },
  {
    id: "b-002",
    name: "University Place",
    address: "176 Oxford Road, Manchester M13 9QQ",
    rooms: [
      { id: "r-006", name: "Theatre A", capacity: 250 },
      { id: "r-007", name: "Theatre B", capacity: 150 },
      { id: "r-008", name: "Room 3.204", capacity: 40 },
      { id: "r-009", name: "Room 4.205", capacity: 60 },
    ],
  },
  {
    id: "b-003",
    name: "Alan Turing Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-010", name: "Frank Adams 1", capacity: 250 },
      { id: "r-011", name: "Frank Adams 2", capacity: 100 },
      { id: "r-012", name: "Room G.205", capacity: 30 },
    ],
  },
  {
    id: "b-004",
    name: "Samuel Alexander Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-013", name: "Lecture Theatre A", capacity: 200 },
      { id: "r-014", name: "Room A113", capacity: 35 },
    ],
  },
  {
    id: "b-005",
    name: "John Owens Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-015", name: "Room G.003", capacity: 60 },
      { id: "r-016", name: "Council Chamber", capacity: 80 },
    ],
  },
  {
    id: "b-006",
    name: "Engineering Building A",
    address: "Booth Street East, Manchester M13 9QS",
    rooms: [
      { id: "r-017", name: "Lecture Theatre C", capacity: 180 },
      { id: "r-018", name: "Room C16", capacity: 40 },
    ],
  },
  {
    id: "b-007",
    name: "Stopford Building",
    address: "Oxford Road, Manchester M13 9PT",
    rooms: [
      { id: "r-019", name: "Lecture Theatre 1", capacity: 300 },
      { id: "r-020", name: "Room 2.018", capacity: 50 },
    ],
  },
  {
    id: "b-008",
    name: "Manchester Museum",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-021", name: "Kanaris Lecture Theatre", capacity: 150 },
    ],
  },
];
```

### 5.2 Non-University Venues (Hard-Coded)

These are real venues near the University of Manchester campus.

```typescript
export const nonUniversityVenues = [
  {
    id: "v-001",
    name: "Kro Bar",
    address: "325 Oxford Road, Manchester M13 9PG",
    phone: "0161 274 3100",
    website: "https://www.kro.co.uk",
    description:
      "Independent bar and kitchen on Oxford Road. Function room available for private events, capacity 60. Popular with students for society socials.",
  },
  {
    id: "v-002",
    name: "Font Bar",
    address: "7-9 New Wakefield Street, Manchester M1 5NP",
    phone: "0161 236 0944",
    website: "https://www.fontbar.com",
    description:
      "Quirky cocktail bar near Oxford Road station. Downstairs area available for private hire, capacity 40. Good for smaller socials and mixers.",
  },
  {
    id: "v-003",
    name: "Deaf Institute",
    address: "135 Grosvenor Street, Manchester M1 7HE",
    phone: "0161 276 9350",
    website: "https://www.thedeafinstitute.co.uk",
    description:
      "Music venue and bar in a converted institute building. Upstairs venue space seats 200 for events. Live music license available.",
  },
  {
    id: "v-004",
    name: "Texture MCR",
    address: "10 Tib Lane, Manchester M2 4JB",
    phone: "0161 819 1010",
    website: "https://www.texturemcr.co.uk",
    description:
      "City centre bar and kitchen. Private dining room for 20, full venue hire for up to 120. Catering packages available.",
  },
  {
    id: "v-005",
    name: "Whitworth Hall",
    address: "University of Manchester, Oxford Road, Manchester M13 9PL",
    phone: "0161 306 4006",
    website: "https://www.conference.manchester.ac.uk/venues/whitworth-hall",
    description:
      "Historic university hall. Available for large formal events: balls, awards ceremonies, and graduation events. Capacity 700 standing, 350 seated.",
  },
  {
    id: "v-006",
    name: "256 Wilmslow Road (Fallowfield)",
    address: "256 Wilmslow Road, Manchester M14 6LB",
    phone: "0161 248 0256",
    website: "https://www.256.com",
    description:
      "Student bar and venue in Fallowfield. Main room capacity 200, function room capacity 50. Regular society social nights.",
  },
  {
    id: "v-007",
    name: "Kimpton Clocktower Hotel",
    address: "Oxford Street, Manchester M60 7HA",
    phone: "0161 835 9929",
    website: "https://www.kimptonclocktowerhotel.com",
    description:
      "Upscale hotel in the city centre. Ballroom capacity 500. Formal dining, event packages available. Used for society balls and gala events.",
  },
];
```

### 5.3 Mock Bookings (Pre-Populated)

Pre-populate bookings for 3-4 events to demonstrate the full workflow on first load:

**Event: "Spring Hackathon 2026" (e-001)** -- 1 university booking:
- Schedule item 0: Kilburn Building, Tootill 1
- Status: **accepted**
- Expected attendees: 128
- Communication history:
  ```
  [You, 2026-02-15 10:30] "Hi, we'd like to book Tootill 1 in the Kilburn Building for our Spring Hackathon on March 22-23. Expecting around 128 attendees. We'll need the room from 9am Saturday to 9am Sunday."
  [University Timetabling, 2026-02-16 14:15] "Hello David, I can confirm Tootill 1 is available for those dates. I've pencilled it in. Could you confirm whether you'll need AV equipment?"
  [You, 2026-02-16 16:00] "Yes please -- we'll need the projector and PA system. We'll also need access to the power sockets along the walls for laptops."
  [University Timetabling, 2026-02-18 09:45] "All confirmed. Booking reference: TB-2026-0341. AV and power access included. Building will be unlocked from 8am. Please ensure the room is cleared by 10am Sunday."
  ```

**Event: "Tech Talk: AI in Production" (e-002)** -- 1 university booking:
- Schedule item 0: University Place, Theatre A
- Status: **accepted**
- Expected attendees: 89
- Communication history:
  ```
  [You, 2026-02-20 11:00] "Could we book Theatre A in University Place for March 15, 6pm-8pm? Expecting around 90 attendees for a guest speaker event."
  [University Timetabling, 2026-02-21 10:30] "Theatre A is confirmed for March 15, 18:00-20:00. Booking ref: TB-2026-0378."
  ```

**Event: "CSS Pub Quiz Night" (e-003)** -- 1 non-university booking:
- Schedule item 0: Kro Bar
- Status: **accepted**
- Communication history:
  ```
  [You, 2026-02-25 14:00] "Hi, we'd like to book your function room for a pub quiz night on March 12, from 7:30pm. Expecting about 50-60 people."
  [Venue, 2026-02-26 09:30] "Hey! We can do the function room for you. 7:30pm works. We'll set up quiz screens. Do you want a tab or individual payments?"
  [You, 2026-02-26 11:15] "Individual payments please. Can we have the room from 7pm for setup?"
  [Venue, 2026-02-27 10:00] "7pm setup is fine. See you on the 12th!"
  ```

**Event: "End of Year Ball" (e-006)** -- 1 non-university booking:
- Schedule item 0: Kimpton Clocktower Hotel
- Status: **pending**
- Communication history:
  ```
  [You, 2026-03-01 09:00] "Hello, we are the UoM Computer Science Society and we'd like to enquire about booking your ballroom for our End of Year Ball on May 10. We're expecting around 200 guests for a formal dinner and DJ. Could you send us your events package and pricing?"
  [Venue, 2026-03-03 14:30] "Thank you for your enquiry. Our events team would be happy to discuss this with you. I've attached our 2026 events brochure. Our minimum spend for ballroom hire on a Saturday evening is GBP 5,000. Could you arrange a call with our events coordinator? Available times: Mon-Fri 10am-4pm."
  [You, 2026-03-05 10:15] "Thanks for sending that over. The pricing looks within our budget. Can we schedule a call for Wednesday March 12 at 2pm?"
  ```

**Event: "CV Workshop with Bloomberg" (e-004)** -- 1 university booking:
- Schedule item 0: Kilburn Building, LF15
- Status: **pending**
- Expected attendees: 27
- Communication history:
  ```
  [You, 2026-03-10 13:00] "Hi, could we book LF15 in the Kilburn Building for March 28, 2pm-4pm? It's a CV workshop with Bloomberg, expecting about 30 attendees."
  [University Timetabling, 2026-03-11 11:00] "LF15 has a provisional booking for that slot. I'll check if it can be moved and get back to you by end of week."
  ```

**Event: "Introduction to Rust" (e-005)** -- 1 university booking:
- Schedule item 0: Kilburn Building, LF31
- Status: **rejected**
- Expected attendees: 41
- Communication history:
  ```
  [You, 2026-03-12 09:30] "Hi, could we book LF31 for April 2, 5pm-7pm? Workshop for about 40 students."
  [University Timetabling, 2026-03-13 15:00] "Unfortunately LF31 is booked for a departmental meeting on April 2 from 4pm-7pm. Would LF25 work instead? It has capacity for 50."
  [You, 2026-03-14 10:00] "LF25 would work, but it's a bit small for the setup we need. Could we try Tootill 1 or the Collab 1 space?"
  [University Timetabling, 2026-03-15 09:00] "I'm sorry, Tootill 1 is also booked that evening. Collab 1 only seats 30, which is below your attendee count. I'd suggest trying the Alan Turing Building -- Frank Adams 2 may be available. Please submit a new request for that room."
  ```

### 5.4 Mock Room Availability (Calendar Data)

Pre-populate availability data for the "In Your Bookings" calendar view. This data represents a sample week for a given building + room combination.

```typescript
export interface RoomAvailabilitySlot {
  date: string;        // ISO date string (YYYY-MM-DD)
  startTime: string;   // HH:MM (24hr)
  endTime: string;     // HH:MM (24hr)
  status: "free" | "booked" | "mine";
  bookedBy?: string;   // e.g., "Dept. of CS" or "Your event: Spring Hackathon"
}

// Example: Kilburn Building, Tootill 1 -- week of 2026-03-22
export const mockAvailability: Record<string, RoomAvailabilitySlot[]> = {
  "b-001_r-003": [
    // Monday 2026-03-16
    { date: "2026-03-16", startTime: "09:00", endTime: "11:00", status: "booked", bookedBy: "Dept. of CS -- Lecture" },
    { date: "2026-03-16", startTime: "11:00", endTime: "13:00", status: "free" },
    { date: "2026-03-16", startTime: "13:00", endTime: "15:00", status: "booked", bookedBy: "Dept. of EEE -- Seminar" },
    { date: "2026-03-16", startTime: "15:00", endTime: "17:00", status: "free" },
    { date: "2026-03-16", startTime: "17:00", endTime: "21:00", status: "free" },
    // Tuesday 2026-03-17
    { date: "2026-03-17", startTime: "09:00", endTime: "12:00", status: "booked", bookedBy: "Dept. of CS -- Lab Session" },
    { date: "2026-03-17", startTime: "12:00", endTime: "14:00", status: "free" },
    { date: "2026-03-17", startTime: "14:00", endTime: "17:00", status: "booked", bookedBy: "Dept. of CS -- Lecture" },
    { date: "2026-03-17", startTime: "17:00", endTime: "21:00", status: "free" },
    // Saturday 2026-03-22 (hackathon day)
    { date: "2026-03-22", startTime: "09:00", endTime: "21:00", status: "mine", bookedBy: "Your event: Spring Hackathon" },
    // Sunday 2026-03-23 (hackathon day 2)
    { date: "2026-03-23", startTime: "09:00", endTime: "09:00", status: "mine", bookedBy: "Your event: Spring Hackathon" },
  ],
  // ... additional rooms
};
```

---

## 6. Screen Inventory

| # | Screen / Component | Type | Trigger |
|---|---|---|---|
| 1 | Main Bookings Page | Route page | Sidebar "Bookings" link |
| 2 | Expanded Event -- Schedule + Bookings List | Collapsible section | Clicking event card chevron |
| 3 | Expanded University Booking Card | Collapsible section | Clicking booking row chevron |
| 4 | Expanded Non-University Booking Card | Collapsible section | Clicking booking row chevron |
| 5 | Communication History + Message Input | Embedded section | Within expanded booking card |
| 6 | Events Page -- University Location Dropdown | Searchable dropdown | Typing in schedule location field |
| 7 | Events Page -- Room Input + Expected Attendees | Inline inputs | After selecting a university building |
| 8 | Events Page -- "In Your Bookings" Dropdown | Dropdown panel | Clicking "In Your Bookings" trigger |
| 9 | Events Page -- Room Availability Calendar | Calendar view | Inside "In Your Bookings" dropdown |
| 10 | Events Page -- Non-University Location Dropdown | Searchable dropdown | Typing in schedule location field |
| 11 | Events Page -- "Add to Bookings" / "Remove from Bookings" Toggle | Button | Clicking the toggle button |
| 12 | Events Page -- Non-University Booking Panel | Inline panel | After clicking "Add to Bookings" |
| 13 | Empty State: Bookings Page | Centered message | When no events have bookings |
| 14 | Empty State: No Booking for Schedule Entry | Muted label | Schedule entry without a booking |
| 15 | Success Toast: "Booking added" | Toast (sonner) | After adding a non-university venue to bookings |
| 16 | Success Toast: "Booking removed" | Toast (sonner) | After removing a booking |
| 17 | Success Toast: "Message sent" | Toast (sonner) | After sending a communication message |

---

## 7. Data Model

All data is mock/in-memory for this demo. The structures below define the TypeScript interfaces that will be used in the `useBookings` hook and mock data. These interfaces are designed to map cleanly to future Supabase tables.

### 7.1 New Types (add to `src/lib/supabase/types.ts`)

```typescript
/** A university building with its rooms. */
export interface UniversityBuilding {
  id: string;
  name: string;
  address: string;
  rooms: UniversityRoom[];
}

/** A room within a university building. */
export interface UniversityRoom {
  id: string;
  name: string;
  capacity: number;
}

/** An external (non-university) venue. */
export interface NonUniversityVenue {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
}

/** Booking status. */
export type BookingStatus = "pending" | "accepted" | "rejected";

/** A message in a booking's communication history. */
export interface BookingMessage {
  id: string;
  sender: "you" | "university" | "venue";
  senderName: string;         // "You", "University Timetabling", "Venue", or venue name
  message: string;
  sentAt: string;             // ISO 8601
}

/** A booking for a university room. */
export interface UniversityBooking {
  id: string;
  type: "university";
  eventId: string;
  scheduleIndex: number;      // index into DashboardEvent.schedules
  buildingId: string;
  buildingName: string;
  roomId: string;
  roomName: string;
  expectedAttendees: number;
  status: BookingStatus;
  messages: BookingMessage[];
  createdAt: string;          // ISO 8601
}

/** A booking for a non-university venue. */
export interface NonUniversityBooking {
  id: string;
  type: "non-university";
  eventId: string;
  scheduleIndex: number;      // index into DashboardEvent.schedules
  venueId: string;
  venueName: string;
  phone: string;
  website: string;
  description: string;
  status: BookingStatus;
  messages: BookingMessage[];
  createdAt: string;          // ISO 8601
}

/** Union type for any booking. */
export type Booking = UniversityBooking | NonUniversityBooking;

/** Aggregated view of an event's bookings for the Bookings page. */
export interface EventBookingSummary {
  eventId: string;
  eventTitle: string;
  eventDate: string | null;
  schedules: DashboardEvent["schedules"];
  bookings: Booking[];
  statusCounts: {
    pending: number;
    accepted: number;
    rejected: number;
  };
}

/** Room availability slot for the calendar view. */
export interface RoomAvailabilitySlot {
  date: string;               // YYYY-MM-DD
  startTime: string;          // HH:MM
  endTime: string;            // HH:MM
  status: "free" | "booked" | "mine";
  bookedBy?: string;
}
```

### 7.2 Future Database Tables (reference only -- not built for demo)

When this feature moves to production, the following Supabase tables would be created:

```
bookings
  id: uuid (PK)
  event_id: uuid (FK -> events.id)
  schedule_index: integer
  type: text ('university' | 'non-university')
  status: text ('pending' | 'accepted' | 'rejected')
  created_by_user_id: uuid (FK -> auth.users.id)
  created_at: timestamptz
  updated_at: timestamptz

university_booking_details
  id: uuid (PK)
  booking_id: uuid (FK -> bookings.id)
  building_id: uuid (FK -> university_buildings.id)
  room_id: uuid (FK -> university_rooms.id)
  expected_attendees: integer
  created_at: timestamptz

non_university_booking_details
  id: uuid (PK)
  booking_id: uuid (FK -> bookings.id)
  venue_id: uuid (FK -> non_university_venues.id)
  created_at: timestamptz

booking_messages
  id: uuid (PK)
  booking_id: uuid (FK -> bookings.id)
  sender_user_id: uuid (FK -> auth.users.id, nullable for external senders)
  sender_type: text ('you' | 'university' | 'venue')
  sender_name: text
  message: text
  sent_at: timestamptz
  created_at: timestamptz

university_buildings
  id: uuid (PK)
  university_id: uuid (FK -> universities.id)
  name: text
  address: text
  google_maps_url: text (nullable)
  created_at: timestamptz

university_rooms
  id: uuid (PK)
  building_id: uuid (FK -> university_buildings.id)
  name: text
  capacity: integer
  created_at: timestamptz

non_university_venues
  id: uuid (PK)
  name: text
  address: text
  phone: text
  website: text
  description: text
  city_id: uuid (FK -> cities.id, nullable)
  created_at: timestamptz

room_availability
  id: uuid (PK)
  building_id: uuid (FK -> university_buildings.id)
  room_id: uuid (FK -> university_rooms.id)
  date: date
  start_time: time
  end_time: time
  status: text ('free' | 'booked' | 'mine')
  booked_by: text (nullable)
  created_at: timestamptz
```

---

## 8. State Management

### 8.1 New Hook: `useBookings`

**File**: `src/hooks/useBookings.ts`

Follows the same pattern as `useEvents.ts`:
- In-memory state via `useState`
- Simulated network delays (200ms) for realism
- Exported functions for all CRUD operations
- Initialised from mock data on first `fetch`

**Exported interface**:

```typescript
export function useBookings(societyId: string | undefined) {
  // State
  eventBookings: EventBookingSummary[]
  allBookings: Booking[]
  loading: boolean

  // Actions
  fetchBookings: () => Promise<void>
  addUniversityBooking: (
    eventId: string,
    scheduleIndex: number,
    buildingId: string,
    roomId: string,
    expectedAttendees: number
  ) => Promise<void>
  addNonUniversityBooking: (
    eventId: string,
    scheduleIndex: number,
    venueId: string
  ) => Promise<void>
  removeBooking: (bookingId: string) => Promise<void>
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void
  sendMessage: (bookingId: string, message: string) => void
  getBookingForSchedule: (eventId: string, scheduleIndex: number) => Booking | null
  getRoomAvailability: (buildingId: string, roomId: string) => RoomAvailabilitySlot[]
}
```

### 8.2 State Transitions

```
Event created (no bookings)
    |
    v
[No bookings] --- "Add to Bookings" or room selected with booking ---> [Booking created: pending]
    |                                                                        |
    |                                                              Status changes (mock):
    |                                                           pending -> accepted
    |                                                           pending -> rejected
    |                                                                        |
    |                                                              "Send Message"
    |                                                                   |
    |                                                            [Message added to history]
    |
    |--- "Remove from Bookings" ---> [Booking removed]
```

### 8.3 Business Rules

| Rule | Enforcement Point |
|---|---|
| One booking per schedule entry | `addUniversityBooking` / `addNonUniversityBooking` check for existing booking |
| Expected attendees >= 1 for university bookings | Zod validation on the attendees input |
| Building must be selected before room | UI flow -- room input hidden until building selected |
| Non-university booking auto-populates venue details | `addNonUniversityBooking` copies phone/website/description from `nonUniversityVenues` |
| Removing a booking clears all associated messages | `removeBooking` deletes the full booking object |
| Messages are append-only | No edit or delete for individual messages |
| Status is read-only in the demo | Status comes from mock data; the user cannot manually change it (simulates external confirmation) |

---

## 9. Edge Cases & Validation

### 9.1 Form Validation

```typescript
const universityBookingSchema = z.object({
  buildingId: z.string().min(1, "Building is required"),
  roomId: z.string().min(1, "Room is required"),
  expectedAttendees: z.number().int().min(1, "Must specify at least 1 attendee"),
});
```

### 9.2 Edge Cases

| Case | Expected Behavior |
|---|---|
| User tries to add a booking to a schedule entry that already has one | Blocked. UI shows existing booking status instead of "Add to Bookings" button. |
| User selects a university building with no rooms defined | Room dropdown shows "No rooms available for this building." |
| User types a building name that matches nothing | Dropdown shows "No matching buildings found." |
| User types a non-university venue name that matches nothing | Dropdown shows "No matching venues found." |
| Event has only one schedule entry (no end time) | Single schedule item shown with booking if present. |
| Event has no schedule entries | Event does not appear on the Bookings page. No location entry available on Events page. |
| Schedule entry with `isEnd: true` | Shown as "End time" in the bookings list. No booking can be created for end-time entries. |
| User opens "In Your Bookings" dropdown for a room with no availability data | Calendar shows "No availability data for this room." |
| Very long communication history (20+ messages) | Message container scrolls vertically. Newest messages auto-scroll into view. |
| User sends an empty message | Send button is disabled when the text input is empty. |
| User sends a very long message (>500 characters) | Input is constrained to 500 characters with a character counter. |
| Rapid message sends | Messages are appended immediately (optimistic UI). No debounce needed for demo. |
| Event with bookings is deleted from the Events page | Bookings persist in mock state but the event no longer appears on the Bookings page (filtered by existing events). |
| Non-university venue "Remove from Bookings" when booking has messages | Confirmation dialog: "This booking has communication history. Remove it?" with Cancel and OK. |
| Building search with special characters | Handled gracefully by substring match -- no regex injection risk in demo. |

---

## 10. Success Metrics

Since this is a demo, "success" is defined by completeness and UX quality during society pitches, not production analytics.

| Metric | Target | How to Verify |
|---|---|---|
| Feature completeness | 100% of requirements in this PRD are implemented | Manual walkthrough of all 8 user stories |
| Demo flow time | Full create-event-to-view-booking flow completable in under 60 seconds | Timed walkthrough |
| Visual consistency | All new components use existing design tokens and component patterns | Visual audit against existing dashboard pages |
| Zero broken states | No combination of user actions produces a JS error, blank screen, or stale data | Exploratory testing covering all edge cases in Section 9.2 |
| Loading states | All async actions show appropriate loading/skeleton states | Visual confirmation |
| Toast feedback | Every mutation (add booking, remove booking, send message) shows a toast | Manual walkthrough |
| Responsive layout | All screens are usable on mobile viewport (375px+) | Responsive testing |
| Animation consistency | New sections use `DashboardSection` and `DashboardPageHeader` motion wrappers | Visual confirmation |
| Booking-event sync | Adding a booking on the Events page is immediately reflected on the Bookings page | Cross-page navigation test |

---

## 11. Out of Scope

The following items are explicitly NOT included in this demo build. They will be revisited when moving to production.

| Item | Reason | Revisit Condition |
|---|---|---|
| Real university timetabling API integration | No API exists; demo uses mock data | When university partnership agreements are in place |
| Real venue booking API / email integration | No automated venue outreach in demo | Production build |
| Push notifications for booking status changes | No notification infrastructure in demo | Production build |
| Multi-user communication (actual university staff or venue replies) | Demo is single-user; all messages are "You" | Production build with real user accounts |
| Room capacity vs. attendee count warnings | Nice-to-have but adds scope | Fast-follow if societies request it |
| Recurring booking support (weekly room bookings) | Adds significant complexity | Post-MVP, if societies run recurring events |
| Booking calendar export (iCal / Google Calendar) | Not core to demo value | Post-MVP feature |
| Payment processing for venue hire | No real payments in demo | Production build with Stripe integration |
| Venue search / Google Places integration | Demo uses hard-coded venues only | Production build |
| Booking approval workflow (university admin portal) | Admin-side portal out of scope | Phase 2 -- university onboarding |
| File attachments in booking communications | Adds complexity beyond demo scope | Production build |
| Booking analytics / reports | Useful but not needed for demo pitch | Fast-follow after initial demo |
| Actual Supabase auth integration | Demo uses `useSocietyAuth` mock hook | Production build |
| Conflict detection (double-booking a room) | Mock data is static; no real conflicts | Production build with live room data |
| Booking cancellation workflow (vs. rejection) | Simplifies to three states for demo | Production build |
| Email confirmations for bookings | No real email sending in demo | Production build |
| Historical booking archive | All bookings are "current" in demo | Production build |

---

## Appendix A: Component Reuse Map

| New Component | Reuses Pattern From |
|---|---|
| Bookings page header | `events/page.tsx` header (DashboardPageHeader) |
| Booked events list (collapsible cards) | `ChevronDown` toggle pattern from `CommitteePage` rejected section |
| Booking status badges | `Badge` component with color variants (same as event status badges) |
| Communication history container | Custom scrollable container (similar to modal pattern) |
| Message bubbles | Custom component, but uses `Card` + `cn()` for conditional alignment |
| Message input + send button | `Input` + `Button` from shadcn/ui |
| University building dropdown | `cmdk` Command/CommandInput/CommandList (same as ticket name autosuggest in Ticketing PRD) |
| Room input field | `Input` from shadcn/ui |
| Expected attendees input | `Input` type=number from shadcn/ui |
| "In Your Bookings" dropdown | Custom dropdown using `Popover` from shadcn/ui |
| Availability calendar | Custom component using CSS grid for time slots |
| "Add to Bookings" / "Remove from Bookings" toggle | `Button` with conditional text/icon (pattern from event form toggles) |
| Non-university booking panel | `Card` / `CardContent` from shadcn/ui |
| Motion wrappers | `DashboardPageHeader` and `DashboardSection` from `DashboardMotion.tsx` |
| Success toasts | `toast` from `sonner` (already used throughout dashboard) |
| Confirmation dialog for removal | `AlertDialog` from shadcn/ui (same as refund dialog in Ticketing PRD) |

## Appendix B: File Creation Plan

New files to create:

```
src/
  app/society/[societyId]/dashboard/bookings/
    page.tsx                        -- Main bookings page (route)
  components/bookings/
    BookedEventsList.tsx             -- List of events with bookings (collapsible)
    BookedEventCard.tsx              -- Single event card with schedule + bookings
    ScheduleBookingRow.tsx           -- Schedule entry row with associated booking
    UniversityBookingCard.tsx        -- Expanded university booking details
    NonUniversityBookingCard.tsx     -- Expanded non-university booking details
    BookingStatusBadge.tsx           -- Reusable status badge (pending/accepted/rejected)
    CommunicationHistory.tsx         -- Scrollable message list
    MessageBubble.tsx                -- Single message bubble (left/right aligned)
    MessageInput.tsx                 -- Text input + send button for new messages
    RoomAvailabilityCalendar.tsx     -- Week-view calendar for room availability
  components/events/
    LocationPicker.tsx               -- Combined university/non-university location dropdown
    UniversityBuildingSelect.tsx     -- Searchable building dropdown
    RoomInput.tsx                    -- Room number text input
    AttendeeCountInput.tsx           -- Expected attendees number input
    InYourBookingsDropdown.tsx       -- "In Your Bookings" dropdown with status + calendar
    AddToBookingsButton.tsx          -- Toggle button for non-university bookings
    NonUniversityBookingPanel.tsx    -- Inline panel with venue details + status + discussion
  hooks/
    useBookings.ts                   -- State management hook
  lib/
    mock-data-bookings.ts            -- Mock buildings, venues, bookings, availability
```

Files to modify:

```
src/components/dashboard/Sidebar.tsx     -- Add "Bookings" nav item
src/components/dashboard/Topbar.tsx      -- Add "Bookings" nav item (mobile)
src/components/events/EventForm.tsx      -- Replace schedule location input with LocationPicker
src/lib/supabase/types.ts                -- Add booking-related interfaces
```

## Appendix C: Visual Reference -- Booking Status Colors

| Status | Background | Text | Border | Example Usage |
|---|---|---|---|---|
| Pending | `bg-amber-100` | `text-amber-800` | `border-amber-200` | Awaiting confirmation from university or venue |
| Accepted | `bg-emerald-100` | `text-emerald-800` | `border-emerald-200` | Room/venue confirmed |
| Rejected | `bg-red-100` | `text-red-800` | `border-red-200` | Request denied, need alternative |

These map to the same semantic colors used for the Approve/Deny button variants in `CommitteePage` (emerald for positive actions, red for negative). The pending state uses amber to signal "awaiting action" without implying positive or negative outcome.

## Appendix D: Communication History Message Format

Messages in the communication history follow a consistent visual pattern:

**Your messages** (right-aligned):
```
                                    [Your message text here]
                                    You -- Mar 15, 10:30 AM
```
- Background: subtle dashboard CTA tint (`bg-dashboard-cta/5` or `bg-red-50`)
- Alignment: `text-right`, `ml-auto`, `max-w-[75%]`
- Sender label: "You" in muted text below the message
- Timestamp: formatted as "MMM DD, HH:MM AM/PM"

**External messages** (left-aligned):
```
[Their message text here]
University Timetabling -- Mar 16, 2:15 PM
```
- Background: neutral (`bg-muted/50` or `bg-gray-50`)
- Alignment: `text-left`, `mr-auto`, `max-w-[75%]`
- Sender label: "University Timetabling" or venue name in muted text below the message
- Timestamp: same format as above

The message container has a fixed maximum height of 300px with `overflow-y: auto` and auto-scrolls to the newest message on load and when a new message is sent.
