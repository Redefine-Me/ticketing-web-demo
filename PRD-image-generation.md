# PRD: AI Event Image Generation (Demo)

**Status**: Draft
**Author**: Alex (PM) | **Last Updated**: 2026-03-30 | **Version**: 2.0
**Stakeholders**: Engineering Lead, Design Lead, Society Partners (demo audience)

---

## 1. Overview

### What This Is

A mock AI image generation feature embedded in the society committee dashboard's event creation flow. When a society committee member is creating or editing an event, they can open an AI-powered image generation modal that takes their event details, society identity, and past visual style as inputs to produce promotional images for Instagram Stories, feed posts, and square formats.

### Why It Matters for the Demo

This feature is the single most compelling differentiator we can show societies during onboarding pitches. Societies currently spend hours in Canva creating event graphics, often with inconsistent quality. Showing them a flow where their event data auto-populates into an AI image generator -- with their own past Instagram aesthetic baked in -- makes the value proposition tangible and immediate.

The demo does not need a working AI backend. It needs to feel real: real controls, real data flowing through, real interaction patterns. The mock outputs (placeholder generated images) are acceptable because the demo's job is to sell the workflow, not the model.

### Press Release (Internal)

> RedefineMe now helps university societies create professional event promotional images in seconds. During event creation, committee members can open the AI Image Generator, describe their creative vision, select past events as style references, and choose their output format. The system automatically pulls event details (title, date, venue, price) and society branding (name, logo, Instagram aesthetic) into the generation pipeline. Instead of spending 45 minutes in Canva per event, societies get 10 on-brand image variants in one click.

---

## 2. User Personas

### Primary: Society Committee Member (Event Organizer)

- **Who**: A student on a university society committee (e.g., Events Officer, Social Secretary, or President) at the University of Manchester.
- **Context**: Creates 2-5 events per month. Currently uses Canva, Instagram's built-in tools, or asks a friend who "knows Photoshop." Spends 30-60 minutes per event on promotional graphics. Often unhappy with the result.
- **Pain**: Inconsistent visual identity across events. The society Instagram grid looks disjointed. No design training. Time-poor during term.
- **Goal**: Produce high-quality, on-brand promotional images in under 5 minutes.
- **Tech comfort**: High (CS society in the demo), but design-tool comfort is low-to-medium.

### Secondary: Society President / Brand Owner

- **Who**: The president or marketing officer who cares about the society's visual identity across all posts.
- **Pain**: Different committee members create graphics with wildly different styles. The Instagram grid looks unprofessional.
- **Goal**: Ensure all event images feel cohesive with the society's established aesthetic.

---

## 3. User Stories

### US-1: Open the AI Image Generator from Event Creation

**As a** committee member creating an event, **I want to** open the AI image generator from the image upload section **so that** I can generate promotional images without leaving the event creation flow.

**Acceptance Criteria:**
- [ ] A "Generate Images with AI" button appears below the `ImageUploader` drop zone in the Images card of `EventForm`
- [ ] Clicking the button opens a large modal/popup overlay
- [ ] The modal is scrollable and does not break the underlying form state
- [ ] Closing the modal (X button or clicking outside) preserves any form data already entered

### US-2: Provide Creative Direction

**As a** committee member, **I want to** describe my creative vision in free text and optionally provide a specific image description **so that** the AI understands the mood, tone, and visual direction I want.

**Acceptance Criteria:**
- [ ] A large textarea labeled "Creative direction" is prominently displayed at the top of the modal controls
- [ ] An optional textarea labeled "Image description (optional)" is below it, with helper text: "Specific visual instructions that override the auto-detected style"
- [ ] Both fields accept up to 500 characters with a visible character count

### US-3: Upload Reference Images

**As a** committee member, **I want to** upload reference images for style inspiration **so that** the AI has visual examples of what I am looking for.

**Acceptance Criteria:**
- [ ] A file upload area (drag-and-drop + click-to-browse) is present in the controls section
- [ ] Accepts image files only (JPEG, PNG, WebP)
- [ ] Maximum 5 reference images
- [ ] Uploaded reference images appear as thumbnails with individual remove (X) buttons
- [ ] Reference images are visually distinct from the influence grid images (separate section, different styling)

### US-4: Adjust Style Influence

**As a** committee member, **I want to** control how much my society's past Instagram aesthetic influences the generated images **so that** I can choose between a fresh look and a consistent brand.

**Acceptance Criteria:**
- [ ] A slider labeled "Style influence" ranges from 0% to 100%
- [ ] Default value is 50%
- [ ] The current percentage is displayed next to the slider
- [ ] Helper text: "How much your past Instagram aesthetic shapes the output"
- [ ] At 0%, helper text or label hint changes to indicate "Fresh style -- no past influence"
- [ ] At 100%, helper text or label hint changes to indicate "Fully on-brand -- matches your existing look"

### US-5: Select Aspect Ratio and Variant Count

**As a** committee member, **I want to** choose the image format and how many variants to generate **so that** I get images suited for the platform I will post on.

**Acceptance Criteria:**
- [ ] Aspect ratio is a select dropdown with five platform-labeled options:
  - 1:1 -- Instagram Post
  - 4:5 -- Instagram Portrait
  - 9:16 -- Instagram / TikTok Story
  - 16:9 -- YouTube / LinkedIn
  - 2:3 -- Pinterest
- [ ] Default is "4:5 (Instagram Portrait)"
- [ ] Number of variants is a number input with default value 10
- [ ] Minimum 1, maximum 20
- [ ] Stepper buttons (+ / -) for quick adjustment

### US-6: View Auto-Detected Context

**As a** committee member, **I want to** see what event and society data the AI will use automatically **so that** I can verify the context is correct before generating.

**Acceptance Criteria:**
- [ ] A collapsible section labeled "Auto-detected context from your event" is present in the controls area
- [ ] Defaults to collapsed
- [ ] When expanded, displays: event title, event description, category, is online, is free / price, date and time (from schedule), venue name / building / room, society name, society description, Instagram handle, university name
- [ ] Data is pulled from the current form state (not saved data), so it reflects what the user has typed so far
- [ ] Read-only display with clear labels
- [ ] If a field is empty (not yet filled in the form), show a subtle "Not set" placeholder

### US-7: Select Past Events to Pull Influence Images

**As a** committee member, **I want to** browse my society's past and upcoming events and select them **so that** their images are used as style references for the AI.

**Acceptance Criteria:**
- [ ] A horizontal scrollable row of event cards appears below the controls section
- [ ] All events for the society are shown (from `mockEvents`), ordered by date with most recent/future first
- [ ] Each card shows: primary event image (large, filling most of the card), event title (small, below image), event date
- [ ] Cards without images show a placeholder with the event title
- [ ] Clicking an unselected card selects it (visual indicator: colored border + checkmark overlay)
- [ ] Clicking a selected card deselects it
- [ ] Multiple events can be selected simultaneously
- [ ] The scroll area has left/right scroll indicators or is visibly scrollable (scrollbar or fade edges)

### US-8: Manage Influence Images in the Grid

**As a** committee member, **I want to** see all images from my selected events in a grid and remove individual images I do not want to include **so that** I have fine-grained control over what influences the AI output.

**Acceptance Criteria:**
- [ ] A boxed section titled "Influence images: use your past event images to influence your new images" appears below the events scroll
- [ ] The box is approximately 1000px tall with its own internal scrollbar for overflow
- [ ] Images are displayed in a 5-column grid layout
- [ ] When an event is selected in the row above, ALL images from that event are immediately added to the grid
- [ ] When an event is deselected, ONLY images belonging to that event are removed -- images from other selected events and manually uploaded reference images are unaffected
- [ ] Each image in the grid shows a checkmark/tick indicator in one corner to signal it is included
- [ ] On hover, an image darkens (semi-transparent dark overlay) and an X button appears in the top-right corner
- [ ] Clicking the X removes that single image from the grid without deselecting the parent event
- [ ] If an event is deselected and then re-selected, ALL of its images come back, including any that were previously individually removed via X (fresh re-selection)
- [ ] The grid scrolls vertically within the fixed-height container
- [ ] Empty state: when no events are selected, the grid shows a centered message like "Select events above to add influence images"

### US-9: Generate Images (Mock) with Progressive Animation

**As a** committee member, **I want to** click "Generate Images" and watch images appear one by one **so that** the generation feels realistic and engaging.

**Acceptance Criteria:**
- [ ] A prominent "Generate Images" button is fixed or pinned at the bottom of the modal
- [ ] The button is styled with the dashboard CTA color (`--dashboard-cta` / `bg-dashboard-cta`)
- [ ] On click, the generated output grid (below all controls, past events scroll, and influence grid) immediately shows shimmer/skeleton placeholder cards matching the selected variant count
- [ ] Images resolve progressively one at a time, each taking 1 second to appear (total generation time = variant count x 1 second; e.g. 10 variants = 10 seconds)
- [ ] During generation, a step-by-step status text is displayed: "Generating image 3 of 10..." (updating with each image that resolves)
- [ ] Each placeholder card shows a shimmer animation until its image "loads", then the actual image fades in smoothly
- [ ] Generated images are hardcoded mock data but appear progressively to simulate real generation
- [ ] Generated images are displayed in the selected aspect ratio (9:16 images appear tall, 1:1 square, etc.)
- [ ] The generated output grid does NOT replace the controls, events scroll, or influence grid -- it appears BELOW all of them
- [ ] The generated output grid uses a 5-column layout (matching the influence grid)
- [ ] After all images have resolved, a "Regenerate" button appears. It is non-functional (demo only) -- clicking shows a tooltip or subtle message "Coming soon"
- [ ] The controls section remains visible and interactive during and after generation (the user scrolls down to see results)

### US-10: Select Generated Images into Output Box

**As a** committee member, **I want to** click on generated images to add them to my output selection **so that** I can curate which images to use for my event.

**Acceptance Criteria:**
- [ ] Clicking a generated image in the output grid adds it to the output box (right sidebar)
- [ ] An image can only be added to the output box once (no duplicates)
- [ ] Once added, the generated image shows a tick/checkmark in its top-right corner and a slight red/primary hue overlay (using `--dashboard-cta` color) to indicate selection
- [ ] Maximum 10 images in the output box. If the user tries to add an 11th, display a message: "Maximum 10 images. Remove an image to add more."
- [ ] Clicking an already-selected generated image does NOT deselect it from the output box (removal happens only via the output box X button)

### US-11: Manage Output Box (Reorder, Remove)

**As a** committee member, **I want to** reorder and remove images in the output box **so that** I can control the exact order and set of images for my event.

**Acceptance Criteria:**
- [ ] The output box is a fixed 300px wide panel on the right side of the modal
- [ ] The output box is independently scrollable (vertical), separate from the main content scroll
- [ ] Title at top: "Event Images" (or similar)
- [ ] Instruction text below title: "Drag and drop to reorder your event images"
- [ ] Images are displayed 1 per row, maintaining the selected aspect ratio (not cropped to squares)
- [ ] Each image shows a numbered index (1, 2, 3...) indicating order
- [ ] On hover, an X button appears to remove the image from the output
- [ ] Removing an image also removes the selected overlay/tick from the corresponding generated image in the grid
- [ ] Drag-and-drop reordering is supported (index numbers update to reflect new order)
- [ ] A show/hide toggle arrow button slides the output box in/out from the right side of the modal
- [ ] When hidden, the main content area expands to fill the full modal width
- [ ] When shown, the main content area shrinks by 300px
- [ ] Smooth slide animation (CSS transition or Framer Motion)
- [ ] The toggle arrow button is always visible (even when the panel is hidden)
- [ ] Default state: visible (shown)
- [ ] Empty state: when no images are present, show a centered message: "Select generated images or upload images to add them here"
- [ ] When the modal opens, any images already uploaded via the EventForm's `ImageUploader` are pre-populated in the output box
- [ ] The output box is the single source of truth for all event images (manual uploads + AI-selected)

### US-12: Complete Image Selection ("Done" Flow)

**As a** committee member, **I want to** finalize my image selections and send them back to the event form **so that** my event has the images I chose.

**Acceptance Criteria:**
- [ ] A "Done" button is pinned/sticky at the bottom of the output box panel (below the scrollable image list), always visible
- [ ] Clicking "Done" closes the modal and injects all output box images into the EventForm as the event images
- [ ] The output box images REPLACE whatever was in the EventForm image uploader (this is consistent because manual uploads were pre-populated into the output box on modal open)
- [ ] If the output box is empty when "Done" is pressed, a warning dialog appears: "No images selected. Are you sure?" with Cancel and Confirm options
- [ ] Cancel returns the user to the modal; Confirm closes the modal with no images

---

## 4. API Data Model

This section documents every input the AI image generation API will eventually consume. For the demo, these are the data points displayed and collected in the UI. No actual API calls are made.

### 4.1 Society-Provided Inputs (User Controls)

These are the interactive controls in the modal UI.

| Input | Type | UI Control | Default | Constraints |
|---|---|---|---|---|
| Free-text prompt | `string` | Textarea | Empty | Max 500 chars |
| Image description | `string \| null` | Textarea (optional) | `null` | Max 500 chars |
| Reference images | `File[]` | File upload (drag-and-drop) | `[]` | Max 5 files, image/* only |
| Style influence | `number` | Slider | `50` | 0-100, step 1 |
| Aspect ratio | `"1:1" \| "4:5" \| "9:16" \| "16:9" \| "2:3"` | Select dropdown | `"4:5"` | Enum (5 options with platform labels) |
| Number of variants | `number` | Number input with stepper | `10` | Min 1, max 20 |

### 4.2 Auto-Injected from Event Data

Pulled from the current event form state (in-progress data, not saved to DB).

| Data Point | Source | Type | How It Influences Generation |
|---|---|---|---|
| Event title | `EventFormData.title` | `string` | Overlaid on generated image as text |
| Event description | `EventFormData.description` | `string` | Mood/tone keywords extracted for prompt |
| Category | `EventFormData.categoryIds` -> category names | `string[]` | Maps to visual style direction (see 4.5) |
| Is online | `EventFormData.isOnline` | `boolean` | If true, no venue imagery -- changes visual approach |
| Is free | `EventFormData.isFree` | `boolean` | Price overlaid on image; "FREE" badge if true |
| Price | `EventFormData.price` | `string \| null` | Overlaid on image if not free |
| Date and time | `EventFormData.schedules[0].date`, `.startTime`, `.endTime` | `string` | Overlaid on image |
| Duration | Computed from start/end time | `string` | Context for the AI |
| Venue / building name | `EventFormData.schedules[0].buildingName` | `string` | Location context for background imagery |
| Room | `EventFormData.schedules[0].roomName` | `string` | More specific venue context |

### 4.3 Auto-Injected from Society Data

Pulled from `useSocietyAuth()` and `mockSociety` / `mockProfile`.

| Data Point | Source | Type | How It Influences Generation |
|---|---|---|---|
| Society name | `SocietyRow.name` | `string` | Overlaid on image |
| Society description | `SocietyRow.description` | `string \| null` | Identity/vibe keywords extracted |
| Instagram handle | `SocietyRow.instagram_handle` | `string` | Social context, may be overlaid |
| Logo / profile image | `SocietyProfileRow.image_url` | `string \| null` | Composited onto final image |
| University name | Via `university_id` join | `string` | Location context |

### 4.4 Historical Style Data (When Style Influence > 0%)

Derived from the influence images grid selections.

| Data Point | Source | Type | How It Influences Generation |
|---|---|---|---|
| Selected influence images | User selections in the grid | `InfluenceImage[]` | Visual reference for style consistency |
| AI image summaries | `PostImageRow.summary` | `string \| null` | Recurring themes extracted (e.g., "dark backgrounds, neon accents") |
| Source event categories | From the events the images belong to | `string[]` | If mostly sports events -> lean dynamic/energetic |

### 4.5 Category to Visual Style Map

When the event's category is known, this mapping informs the AI's visual direction.

| Category | Visual Direction |
|---|---|
| `social` | Vibrant, warm lighting, energetic, nightlife / casual gathering |
| `sports` | Dynamic, high-contrast, dramatic lighting, athletic energy |
| `academic` | Clean, sophisticated, warm tones, intellectual |
| `arts` | Creative, expressive, rich textures, gallery aesthetic |
| `career` | Professional, corporate-clean, sharp lines, modern office |
| `workshop` | Hands-on, warm, close-up detail, workbench / classroom |
| `trip` | Scenic, wanderlust, landscape, travel photography |

For the demo, this mapping is displayed in the auto-detected context section when a category is selected, so the user understands what visual direction the AI will take.

---

## 5. Detailed Requirements

### 5.1 Entry Point -- EventForm Integration

**Location**: `src/components/events/EventForm.tsx`, inside the Images `<Card>`, below the existing `<ImageUploader>` component.

**Requirement R-001**: Add a "Generate Images with AI" button below the `ImageUploader`.
- Button style: `variant="outline"` with an icon (e.g., `Sparkles` from lucide-react)
- Full width of the card content area
- Text: "Generate Images with AI"
- Clicking opens the `AIImageGenerationModal`

**Requirement R-002**: The button passes current form state and existing images to the modal.
- The modal receives `EventFormData` (current form values via `watch()`) and society data (from `useSocietyAuth()`)
- The modal also receives the current event images from the EventForm's `ImageUploader` so they can be pre-populated in the output box
- The output box is the single source of truth for images; on "Done", its contents replace the EventForm images

### 5.2 Modal Shell

**Requirement R-003**: The modal is a full-screen overlay or large centered modal.
- Minimum width: 900px on desktop; on mobile, full-screen
- Maximum width: 1200px
- Maximum height: 90vh with internal scrolling
- Backdrop: semi-transparent dark overlay (`bg-black/50`)
- Close: X button in top-right corner + click-outside-to-close + Escape key
- Animation: Framer Motion `AnimatePresence` with fade + scale-up entrance, matching existing dashboard motion patterns (`DashboardSection` uses `opacity: 0, y: 16` -> `opacity: 1, y: 0`)

**Requirement R-004**: The modal has a sticky header.
- Title: "AI Image Generator"
- Subtitle: "Create promotional images for [event title]" (or "your event" if title is empty)
- Close (X) button aligned right

**Requirement R-005**: The modal has a sticky footer.
- Contains the "Generate Images" button
- Always visible regardless of scroll position within the modal

### 5.3 Controls Section

**Requirement R-006**: Layout is a two-column grid on desktop (>= 768px), single column on mobile.
- Left column: Free-text prompt (full width of left col), Image description (full width of left col)
- Right column: Reference images upload, Style influence slider, Aspect ratio select, Number of variants input

**Requirement R-007**: Free-text prompt textarea.
- Label: "Creative direction"
- Placeholder: "Describe the mood and style you want (e.g., 'dark dramatic atmosphere with neon accents and bold typography')"
- Rows: 4
- Max length: 500 characters
- Character counter in bottom-right: "X / 500"

**Requirement R-008**: Image description textarea (optional).
- Label: "Image description"
- Label suffix: "(optional)" in muted color
- Placeholder: "Specific visual instructions that take priority over auto-detected style"
- Helper text below: "If provided, this overrides the system's automatic visual interpretation of your event"
- Rows: 3
- Max length: 500 characters
- Character counter in bottom-right

**Requirement R-009**: Reference images upload.
- Reuse the visual pattern of the existing `ImageUploader` component (drag-and-drop border-dashed area)
- Label: "Reference images"
- Helper text: "Upload up to 5 images for style inspiration"
- Thumbnails appear below the drop zone in a row, each with an X to remove
- Max 5 images

**Requirement R-010**: Style influence slider.
- Label: "Style influence"
- Displays current value as percentage: "50%"
- Range: 0-100, step 1
- At 0: show hint text "Fresh style"
- At 100: show hint text "Match existing brand"
- Use a standard range input styled with Tailwind (accent color: `--dashboard-cta`)

**Requirement R-011**: Aspect ratio select (expanded with platform labels).
- Label: "Aspect ratio"
- Options (value -- display label):
  - `1:1` -- "1:1 -- Instagram Post"
  - `4:5` -- "4:5 -- Instagram Portrait"
  - `9:16` -- "9:16 -- Instagram / TikTok Story"
  - `16:9` -- "16:9 -- YouTube / LinkedIn"
  - `2:3` -- "2:3 -- Pinterest"
- Default: `4:5` (Instagram Portrait)
- Use the existing `Select` / `SelectTrigger` / `SelectContent` / `SelectItem` components from `@/components/ui/select`
- Each option should show both the ratio and the platform name for clarity

**Requirement R-012**: Number of variants input.
- Label: "Number of variants"
- Default: 10
- Min: 1, Max: 20
- Use the existing `Input` component with `type="number"`
- Add increment/decrement buttons (+ / -) flanking the input

**Requirement R-013**: Auto-detected context section.
- Collapsible, defaults to collapsed
- Trigger label: "Auto-detected context from your event" with a chevron icon that rotates on expand
- Interior is a grid of label-value pairs
- Groups: "Event Details" (title, description snippet, categories, online/in-person, free/price, date, time, venue) and "Society Details" (name, description snippet, Instagram handle, university)
- Empty fields show "Not set" in muted/italic text
- Category values also show the mapped visual direction from section 4.5 as a subtle tag

### 5.4 Past Events Horizontal Scroll

**Requirement R-014**: Section heading.
- Title: "Your past events"
- Subtitle: "Select events to use their images as style references"

**Requirement R-015**: Horizontal scrollable container.
- `overflow-x: auto` with smooth scroll behavior
- Fade gradient on left/right edges when content overflows (CSS mask or gradient overlay)
- Scroll snap: `scroll-snap-type: x mandatory` with `scroll-snap-align: start` on each card

**Requirement R-016**: Event cards.
- Fixed width: 200px
- Height: auto (image + text below)
- Image area: 200px wide, aspect-ratio 4:5 (matching feed format), `object-cover`
- Below image: event title (1 line, truncated with ellipsis), event date in muted text
- Cards without images: show a colored placeholder with the event title centered, using a muted background
- Border radius: `var(--radius)` (16px)
- Background: `var(--card)` / `var(--surface)`

**Requirement R-017**: Card selection behavior.
- Unselected: default card styling
- Selected: 2px solid border in `--dashboard-cta` color (#EF4444), with a checkmark badge in the top-right corner (small circle with check icon, filled with `--dashboard-cta`)
- Click toggles selection state
- Transition: border and checkmark animate in with a quick 150ms ease

**Requirement R-018**: Event ordering.
- Sort by date descending (most recent/future first)
- Events with `date: null` appear at the end

### 5.5 Influence Images Grid

**Requirement R-019**: Section heading.
- Title: "Influence images"
- Subtitle: "Use your past event images to influence your new images"
- Display count: "X images selected" in muted text, right-aligned to the title

**Requirement R-020**: Grid container.
- Fixed height: `min-height: 600px`, `max-height: 1000px` (responsive based on viewport)
- `overflow-y: auto` for internal scrolling
- Border: 1px solid `var(--border)`
- Border radius: `var(--radius)`
- Background: `var(--card)` with subtle inner shadow or inset border for depth
- Padding: 16px

**Requirement R-021**: Grid layout.
- 5 columns on desktop (>= 1024px)
- 4 columns on tablet (>= 768px)
- 3 columns on mobile (< 768px)
- Gap: 8px
- Each cell is square (`aspect-ratio: 1/1`), image fills with `object-cover`

**Requirement R-022**: Image tiles.
- Border radius: 8px
- Each tile shows a small checkmark badge in the bottom-left corner (green circle with white check) to indicate inclusion
- On hover:
  - Dark overlay fades in (`bg-black/40`, transition 150ms)
  - X button appears in the top-right corner (white circle with X icon, 24px diameter)
  - Clicking X removes that individual image

**Requirement R-023**: Empty state.
- When no events are selected and the grid is empty:
  - Centered vertically and horizontally within the container
  - Icon: `ImagePlus` from lucide-react, 48px, muted color
  - Text: "Select events above to add influence images"
  - Subtext: "Images from selected events will appear here"

### 5.6 Generate Button and Progressive Results

**Requirement R-024**: Generate button.
- Pinned to the bottom of the modal in the sticky footer
- Full width of footer area (with padding)
- Style: `bg-dashboard-cta hover:bg-dashboard-cta/90 text-white` (matches existing dashboard CTA pattern from the "Create Event" button)
- Text: "Generate [N] Images" where N is the selected variant count
- Icon: `Sparkles` from lucide-react
- Disabled state: if the free-text prompt is empty, button is disabled with reduced opacity
- During generation, button text changes to the current status: "Generating image X of N..." with a spinner icon
- After generation completes, button text reverts to "Generate [N] Images"

**Requirement R-025**: Progressive generation animation.
- On click, the generated output grid appears BELOW all other content (controls, past events scroll, influence grid) -- it does NOT replace them
- The modal auto-scrolls to bring the output grid into view
- The grid immediately shows shimmer/skeleton placeholder cards for every variant requested
- Each placeholder card uses the selected aspect ratio dimensions (tall for 9:16, square for 1:1, etc.)
- Images resolve one at a time, each taking 1 second (total time = variant count x 1 second; e.g., 10 variants = 10 seconds)
- Implementation: use `setInterval` at 1-second intervals, resolving one placeholder per tick by swapping shimmer for the actual mock image with a fade-in transition
- Step-by-step status text is displayed above the grid: "Generating image 3 of 10..." updating with each resolved image
- The controls section remains visible and scrollable during generation (user can scroll up to review their settings)

**Requirement R-026**: Generated output grid layout.
- Section heading: "Generated Images"
- 5 columns on desktop (matching the influence grid column count)
- 4 columns on tablet (>= 768px), 3 columns on mobile (< 768px)
- Gap: 8px
- Each image cell respects the selected aspect ratio visually (e.g., `aspect-ratio: 9/16` for Story, `aspect-ratio: 1/1` for Square, `aspect-ratio: 4/5` for Portrait, `aspect-ratio: 16/9` for Landscape, `aspect-ratio: 2/3` for Pinterest)
- The number of generated images matches the user's selected variant count
- Use hardcoded mock images (from `mockGeneratedResults`); repeat with different indices if variant count exceeds available mocks
- Clicking a generated image adds it to the output box (right sidebar)
- An image can only be added to the output ONCE (clicking again does nothing; removal is via the output box X button only)
- Once added to the output box, the generated image displays:
  - A checkmark/tick icon in the top-right corner
  - A slight red/primary hue overlay (semi-transparent `--dashboard-cta` color, e.g., `bg-dashboard-cta/20`) indicating selection
- Cursor: `pointer` on unselected images; `default` on already-selected images

**Requirement R-027**: Regenerate button (non-functional demo).
- Appears after all images have finished generating
- Positioned above or below the generated output grid
- Style: outline/secondary button variant
- Text: "Regenerate"
- Icon: `RefreshCw` from lucide-react
- On click: does nothing functional. Shows a tooltip or brief inline message: "Coming soon" (can use a toast, tooltip, or temporary text swap on the button)
- Output box selections persist regardless of any regenerate action -- they are independent of the generated grid

### 5.7 Output Box (Right Sidebar)

**Requirement R-028**: Output box layout.
- Fixed 300px wide panel on the RIGHT side of the modal
- Pinned to the right edge of the modal -- does not scroll with main content
- Independently scrollable (vertical scroll, separate from the main content scroll area)
- The modal popup container has `overflow: hidden` so the output box never visually extends outside the modal bounds
- Background: `var(--card)` / `var(--surface)` with a left border (`1px solid var(--border)`) to separate from main content

**Requirement R-029**: Output box show/hide toggle.
- An arrow button (e.g., `ChevronLeft` / `ChevronRight` from lucide-react) toggles the output box in/out
- The toggle button is always visible on the right edge of the main content area (or the left edge of the output box), regardless of whether the panel is shown or hidden
- When hidden: the main content area expands to fill the full modal width. The toggle arrow points left (to indicate "open panel").
- When shown: the main content area shrinks by 300px. The toggle arrow points right (to indicate "close panel").
- Animation: smooth slide from the right (CSS `transition: width 300ms ease` or Framer Motion `animate={{ x: 0 }}` / `animate={{ x: 300 }}`)
- Default state on modal open: visible (shown)

**Requirement R-030**: Output box content and image display.
- Title at top of panel: "Event Images"
- Subtitle/instruction text: "Drag and drop to reorder your event images"
- Images displayed 1 per row, vertically stacked
- Each image maintains the selected aspect ratio (not cropped to squares)
- Each image shows a numbered index badge (1, 2, 3...) in the top-left corner, indicating its current order
- Index numbers update automatically when images are reordered or removed

**Requirement R-031**: Output box image interactions.
- On hover: an X button appears (top-right corner of the image) to remove it from the output
- Clicking X removes the image and also clears the selected overlay/tick from the corresponding generated image in the grid
- Drag-and-drop reordering is supported. Dragging an image to a new position updates all index numbers accordingly.
- Drag handle: the entire image card is draggable (or provide a visible drag handle icon if preferred)

**Requirement R-032**: Output box capacity and limits.
- Maximum 10 images in the output box
- If the user attempts to add an 11th image (by clicking a generated image), show an inline message or toast: "Maximum 10 images. Remove an image to add more."
- The limit message should be clearly visible and not easily missed

**Requirement R-033**: Output box pre-population from EventForm.
- When the modal opens, any images that are already present in the EventForm's `ImageUploader` are pre-populated into the output box
- These pre-populated images appear first in the output box, in their existing order
- The output box is the SINGLE SOURCE OF TRUTH for all event images (both manually uploaded and AI-selected)
- Pre-populated images can be removed or reordered just like AI-selected images

**Requirement R-034**: Output box empty state.
- When no images are present in the output box, show a centered empty state:
  - Muted icon (e.g., `ImagePlus` from lucide-react)
  - Text: "Select generated images or upload images to add them here"

**Requirement R-035**: "Done" button.
- Positioned at the bottom of the output box panel, below the scrollable image list
- Sticky/pinned to the bottom of the output panel -- always visible regardless of scroll position within the output box
- Style: `bg-dashboard-cta hover:bg-dashboard-cta/90 text-white`, full width of the output panel (with padding)
- Text: "Done"
- On click:
  1. If the output box contains images: close the modal and inject all output box images (in their current order) into the EventForm as the event images. The output images REPLACE whatever was previously in the EventForm image uploader.
  2. If the output box is empty: show a warning dialog/confirmation: "No images selected. Are you sure?" with two buttons -- "Cancel" (returns to modal) and "Confirm" (closes modal with no images, clearing the EventForm images).
- The replacement behavior is consistent because the EventForm's existing images were already pulled into the output box on modal open

---

## 6. Screen Inventory

Every distinct screen, modal state, and sub-state the implementation must account for.

| # | Screen / State | Description |
|---|---|---|
| S-01 | EventForm with AI button | The existing event creation form with the new "Generate Images with AI" button in the Images card |
| S-02 | Modal: controls (default), output box visible | The main modal view with all controls, collapsed auto-context, empty events scroll, empty influence grid. Output box visible on right (300px). |
| S-03 | Modal: controls with auto-context expanded | Auto-detected context section expanded showing current form + society data |
| S-04 | Modal: events selected | One or more event cards highlighted in the horizontal scroll, influence grid populated |
| S-05 | Modal: influence grid with hover | Individual image hover state showing dark overlay and X button |
| S-06 | Modal: influence grid with removals | Some images removed individually (X), parent event still selected |
| S-07 | Modal: generating (progressive) | Shimmer/skeleton cards visible in generated output grid. Status text "Generating image X of N..." above grid. Images resolving one by one with fade-in. Generate button shows spinner with status text. Controls remain scrollable above. |
| S-08 | Modal: generation complete | All generated images resolved. "Regenerate" button visible (non-functional). Generated images clickable to add to output box. |
| S-09 | Modal: generated image selected | A generated image that has been added to the output box shows a tick in the top-right corner and a subtle red/primary hue overlay (`--dashboard-cta/20`) |
| S-10 | Modal: empty influence grid | No events selected; empty state message displayed in the grid container |
| S-11 | Output box: visible with images | Output box shown (300px right sidebar) with numbered images, drag handles, reorder capability. "Done" button sticky at bottom. |
| S-12 | Output box: empty state | Output box shown but no images present. Centered message: "Select generated images or upload images to add them here" |
| S-13 | Output box: hidden | Output box collapsed. Toggle arrow visible on right edge pointing left. Main content fills full modal width. |
| S-14 | Output box: pre-populated | Modal just opened; output box contains images carried over from EventForm's ImageUploader |
| S-15 | Output box: max capacity reached | User tries to add 11th image. Inline message or toast: "Maximum 10 images. Remove an image to add more." |
| S-16 | Done: empty warning dialog | User clicks "Done" with no images in output box. Warning dialog: "No images selected. Are you sure?" with Cancel and Confirm buttons. |
| S-17 | Regenerate: coming soon | User clicks "Regenerate" button. Tooltip or inline message shows "Coming soon". No generation occurs. |

---

## 7. Data Model (TypeScript Interfaces)

These interfaces should be added to a new file: `src/lib/types/image-generation.ts`.

```typescript
/** Aspect ratio options for generated images. */
export type AspectRatio = "1:1" | "4:5" | "9:16" | "16:9" | "2:3";

/** Display labels for aspect ratio options (with platform names). */
export const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
  "1:1": "1:1 — Instagram Post",
  "4:5": "4:5 — Instagram Portrait",
  "9:16": "9:16 — Instagram / TikTok Story",
  "16:9": "16:9 — YouTube / LinkedIn",
  "2:3": "2:3 — Pinterest",
};

/** CSS aspect-ratio values for rendering images at the correct proportions. */
export const ASPECT_RATIO_CSS: Record<AspectRatio, string> = {
  "1:1": "1 / 1",
  "4:5": "4 / 5",
  "9:16": "9 / 16",
  "16:9": "16 / 9",
  "2:3": "2 / 3",
};

/** Category-to-visual-style mapping. */
export const CATEGORY_STYLE_MAP: Record<string, string> = {
  social: "Vibrant, warm lighting, energetic, nightlife / casual gathering",
  sports: "Dynamic, high-contrast, dramatic lighting, athletic energy",
  academic: "Clean, sophisticated, warm tones, intellectual",
  arts: "Creative, expressive, rich textures, gallery aesthetic",
  career: "Professional, corporate-clean, sharp lines, modern office",
  workshop: "Hands-on, warm, close-up detail, workbench / classroom",
  trip: "Scenic, wanderlust, landscape, travel photography",
};

/** An image in the influence grid, trackable by source event. */
export interface InfluenceImage {
  /** Unique identifier (post_image_id or generated UUID for reference uploads). */
  id: string;
  /** URL of the image (full_url from PostImageRow, or object URL for uploads). */
  url: string;
  /** The event ID this image belongs to, or null if it is a manually uploaded reference. */
  sourceEventId: string | null;
  /** AI-generated summary of this image, if available. */
  summary: string | null;
}

/** A past event card in the horizontal scroll. */
export interface PastEventCard {
  /** Event ID. */
  id: string;
  /** Event title. */
  title: string;
  /** Event date (ISO string) or null. */
  date: string | null;
  /** Primary image URL or null. */
  imageUrl: string | null;
  /** All images associated with this event. */
  images: InfluenceImage[];
  /** Categories for this event. */
  categories: string[];
}

/** An image in the output box (right sidebar). */
export interface OutputImage {
  /** Unique identifier (matches GeneratedImage.id or a manual upload ID). */
  id: string;
  /** URL of the image (mock URL for generated images, object URL or existing URL for manual uploads). */
  url: string;
  /** Source: 'generated' for AI-selected images, 'manual' for images pre-populated from EventForm. */
  source: "generated" | "manual";
  /** The aspect ratio this image should be displayed at. */
  aspectRatio: AspectRatio;
}

/** The complete state of the AI generation controls and output box. */
export interface ImageGenerationState {
  /** Free-text creative direction prompt. */
  prompt: string;
  /** Optional specific image description override. */
  imageDescription: string;
  /** Reference images uploaded by the user. */
  referenceImages: File[];
  /** Style influence percentage (0-100). */
  styleInfluence: number;
  /** Selected aspect ratio. */
  aspectRatio: AspectRatio;
  /** Number of image variants to generate. */
  variantCount: number;
  /** IDs of selected events in the horizontal scroll. */
  selectedEventIds: Set<string>;
  /** IDs of images individually removed via X button, keyed by event ID. */
  removedImageIds: Set<string>;
  /** Current phase of the modal. */
  phase: "controls" | "generating" | "results";
  /** Index of the image currently being "generated" (0-based). Used during progressive generation animation. */
  generatingIndex: number;
  /** IDs of generated images that have been resolved (shimmer replaced with actual image). */
  resolvedImageIds: Set<string>;
  /** IDs of generated images that have been selected into the output box. */
  selectedGeneratedIds: Set<string>;
  /** Ordered list of images in the output box (single source of truth for event images). */
  outputImages: OutputImage[];
  /** Whether the output box sidebar is visible. */
  outputBoxVisible: boolean;
}

/** A mock generated image result. */
export interface GeneratedImage {
  /** Unique ID for the result. */
  id: string;
  /** Placeholder image URL. */
  url: string;
  /** Aspect ratio of the generated image. */
  aspectRatio: AspectRatio;
}

/** Auto-detected context displayed to the user. */
export interface AutoDetectedContext {
  // Event data
  eventTitle: string;
  eventDescription: string;
  categories: string[];
  categoryStyles: string[];
  isOnline: boolean;
  isFree: boolean;
  price: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  buildingName: string | null;
  roomName: string | null;
  // Society data
  societyName: string;
  societyDescription: string | null;
  instagramHandle: string;
  profileImageUrl: string | null;
  universityName: string;
}
```

---

## 8. State Management

This is the most complex part of the feature. The influence images grid has nuanced add/remove behavior that must be handled precisely.

### 8.1 Core State (React `useState` in the modal component)

All state is encapsulated in the `ImageGenerationState` interface (section 7). The key state groups are:

**Influence grid state:**
```
selectedEventIds: Set<string>
removedImageIds: Set<string>
```

**Output box state:**
```
outputImages: OutputImage[]          // ordered list, single source of truth
selectedGeneratedIds: Set<string>    // tracks which generated images are in the output
outputBoxVisible: boolean            // show/hide toggle (default: true)
```

**Generation animation state:**
```
phase: "controls" | "generating" | "results"
generatingIndex: number              // current image being "generated" (0-based)
resolvedImageIds: Set<string>        // which placeholder cards have been replaced with images
```

### 8.2 Selection Logic

**When an event is selected (added to `selectedEventIds`):**
1. Add the event ID to `selectedEventIds`
2. Remove any entries in `removedImageIds` that belong to images from this event (clean slate on re-selection)
3. All images from this event are now included in the derived influence images list

**When an event is deselected (removed from `selectedEventIds`):**
1. Remove the event ID from `selectedEventIds`
2. Remove any entries in `removedImageIds` that belong to images from this event (cleanup)
3. All images from this event disappear from the influence grid
4. Images from OTHER selected events are completely unaffected

**When an individual image is removed via X:**
1. Add the image ID to `removedImageIds`
2. The image disappears from the grid
3. The parent event remains selected (checkmark stays on the event card)
4. Other images from the same event remain visible

### 8.3 Derived Influence Images (Computed / `useMemo`)

```typescript
const influenceImages = useMemo(() => {
  const images: InfluenceImage[] = [];

  for (const eventId of selectedEventIds) {
    const event = pastEvents.find(e => e.id === eventId);
    if (!event) continue;

    for (const image of event.images) {
      if (!removedImageIds.has(image.id)) {
        images.push(image);
      }
    }
  }

  return images;
}, [selectedEventIds, removedImageIds, pastEvents]);
```

### 8.4 Key Invariants

1. `removedImageIds` only contains IDs of images whose parent event is currently selected. On deselect, entries for that event's images are purged.
2. Re-selecting a previously deselected event always brings back ALL of its images (fresh start).
3. The influence grid never contains duplicate images (each image belongs to exactly one event).
4. Reference images (uploaded via the reference upload area) are NOT part of the influence grid. They are a separate input.

### 8.5 Phase Transitions

```
controls -> generating  (user clicks "Generate"; shimmer placeholders appear in output grid)
generating -> results   (after all images resolve; total time = variantCount x 1 second)
results -> controls     (user scrolls up to adjust controls; all settings preserved)
```

All control values are preserved across phase transitions. The generated output grid persists below the controls -- transitioning from "results" back to "controls" simply means the user scrolls up. The generated images remain visible below.

### 8.6 Output Box State Management

The output box is the single source of truth for all event images. It manages both manually uploaded images (from EventForm) and AI-selected images (from the generated grid).

**Initial state (on modal open):**
```typescript
// Pre-populate with any existing EventForm images
const initialOutputImages: OutputImage[] = existingEventFormImages.map((img, i) => ({
  id: img.id || `manual-${i}`,
  url: img.url,
  source: "manual" as const,
  aspectRatio: state.aspectRatio,
}));
```

**Adding a generated image to the output box:**
1. Check if `outputImages.length >= 10`. If so, show "Maximum 10 images. Remove an image to add more." and abort.
2. Check if the generated image's ID is already in `selectedGeneratedIds`. If so, do nothing (no duplicates).
3. Add the image ID to `selectedGeneratedIds`.
4. Append a new `OutputImage` to the end of `outputImages` with `source: "generated"`.
5. The corresponding generated image in the grid shows a tick and red/primary overlay.

**Removing an image from the output box (via X button):**
1. Remove the `OutputImage` from `outputImages` by ID.
2. If the removed image had `source: "generated"`, also remove its ID from `selectedGeneratedIds` (this clears the tick/overlay on the generated grid image).
3. Re-index all remaining images (numbered indices update automatically).

**Reordering images in the output box (via drag-and-drop):**
1. Move the dragged `OutputImage` to its new position in the `outputImages` array.
2. All numbered indices update to reflect the new order.
3. No other state changes needed -- `selectedGeneratedIds` is a set of IDs, not ordered.

**"Done" flow:**
1. If `outputImages.length > 0`: close the modal and pass `outputImages` (in order) back to the EventForm. These REPLACE the EventForm's current images.
2. If `outputImages.length === 0`: show a warning dialog: "No images selected. Are you sure?"
   - "Cancel": dismiss the dialog, return to the modal.
   - "Confirm": close the modal, clear the EventForm's images.

**Output box visibility toggle:**
1. Toggle `outputBoxVisible` between `true` and `false`.
2. When `false`: main content area expands to full modal width. Toggle arrow points left.
3. When `true`: main content area shrinks by 300px. Toggle arrow points right.
4. Smooth animated transition (300ms ease or Framer Motion).
5. Output box state (images, order) is fully preserved when hidden -- hiding is purely visual.

### 8.7 Progressive Generation Animation State

**On "Generate" click:**
1. Set `phase` to `"generating"`.
2. Set `generatingIndex` to `0`.
3. Clear `resolvedImageIds`.
4. Create an array of `GeneratedImage` objects matching `variantCount` (drawing from `mockGeneratedResults`, repeating if needed).
5. The generated output grid immediately renders shimmer/skeleton placeholder cards for all variants.
6. Start a `setInterval` at 1-second intervals.

**Each interval tick:**
1. Mark the current `generatingIndex` image as resolved (add its ID to `resolvedImageIds`).
2. The corresponding placeholder card fades from shimmer to the actual image.
3. Update status text: "Generating image {generatingIndex + 1} of {variantCount}..."
4. Increment `generatingIndex`.
5. When `generatingIndex >= variantCount`, clear the interval and set `phase` to `"results"`.

**On modal close during generation:**
1. Clear the interval immediately.
2. Reset phase to `"controls"`.
3. Partially resolved images remain visible (no cleanup needed for demo).

---

## 9. Edge Cases and Validation

### 9.1 Form State Sync

| Edge Case | Expected Behavior |
|---|---|
| User opens modal before filling in any form fields | Auto-detected context shows "Not set" for all event fields. Society data still populated from `useSocietyAuth()`. |
| User changes form fields while modal is open | This should not happen -- the modal overlays the form and blocks interaction. If the modal reads form state on open, it uses a snapshot. |
| User opens modal, closes it, changes form data, re-opens | The modal should read fresh form state on each open. Previous generation settings (prompt, selections) are reset on close. |

### 9.2 Image Grid Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| Event has 0 images | Event card shows placeholder in scroll. Selecting it adds nothing to the influence grid. No error. |
| All images from a selected event are individually removed via X | The event remains selected (card shows checkmark), but no images from it appear in the grid. |
| User selects 5+ events with many images each | Grid scrolls internally. Performance consideration: lazy-load images in the grid (use `loading="lazy"` on `<img>` tags). |
| User removes image, deselects event, re-selects event | The previously removed image comes back (fresh selection). |
| User uploads reference images and also selects events | Both are tracked independently. Reference images live in the controls section; influence images live in the grid. |

### 9.3 Input Validation

| Field | Validation | Error Display |
|---|---|---|
| Free-text prompt | Required for generation (non-empty after trim) | Generate button is disabled when empty |
| Image description | Optional, max 500 chars | Character counter turns red at 500 |
| Reference images | Max 5 files, image/* MIME type only | Toast error if user tries to add > 5 or wrong type |
| Style influence | 0-100, integer | Slider constrains value |
| Aspect ratio | Must be one of the five enum values | Select constrains value |
| Variant count | Integer, min 1, max 20 | Input constrained; if manually typed out of range, clamp on blur |

### 9.4 Modal Lifecycle

| Edge Case | Expected Behavior |
|---|---|
| User closes modal during "generating" phase | Generation interval is cleared. Modal closes cleanly. Output box state is discarded (no images injected into EventForm). |
| User presses Escape key | Modal closes regardless of current phase |
| User clicks backdrop (outside modal) | Modal closes regardless of current phase |
| Browser back button | Modal should close (if using URL params) OR should not interfere with browser history (if using local state) -- for the demo, local state is simpler |

### 9.5 Output Box Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| Maximum 10 images reached | When `outputImages.length >= 10`, clicking a generated image shows inline message or toast: "Maximum 10 images. Remove an image to add more." Image is NOT added. |
| Duplicate prevention | If a generated image's ID is already in `selectedGeneratedIds`, clicking it does nothing. No duplicate entries in the output box. |
| Removing a generated image from output box | The image is removed from `outputImages`. Its ID is removed from `selectedGeneratedIds`. The tick/overlay on the corresponding generated grid image disappears. |
| Removing a manually uploaded image from output box | The image is removed from `outputImages`. No corresponding generated grid image exists, so no grid state changes. |
| All images removed from output box | The empty state message appears: "Select generated images or upload images to add them here" |
| Output box hidden during generation | Generation continues normally. The output box retains its state. User can toggle it back open at any time. Clicking generated images still adds to the (hidden) output box. |
| Aspect ratio changed after images are in output box | Existing output box images retain their original aspect ratio display. Newly added images use the updated ratio. (In the demo, since all generated images use the same ratio, this is primarily relevant if manual uploads have a different intrinsic ratio.) |

### 9.6 Done Flow Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| Done with images in output box | Modal closes. All `outputImages` (in current order) are injected into EventForm, replacing existing images. |
| Done with empty output box | Warning dialog: "No images selected. Are you sure?" Cancel returns to modal. Confirm closes modal and clears EventForm images. |
| Done with only manual uploads (no AI-selected images) | Works identically -- the output box images (manual) are injected into EventForm. The user may have reordered them, which is preserved. |
| Done with mix of manual and AI-selected images | All images injected in their current output box order. Source type is irrelevant to the EventForm. |

### 9.7 Pre-population Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| EventForm has no existing images | Output box starts empty. Empty state message shown. |
| EventForm has 1-10 existing images | All existing images pre-populated in the output box in their original order, with `source: "manual"`. |
| EventForm has more than 10 existing images | Only the first 10 are pre-populated (max 10 limit). This is an unlikely edge case since the EventForm image uploader likely has its own limits. |
| Pre-populated images + AI-selected images | Both coexist in the output box. Pre-populated images appear first by default but can be reordered via drag-and-drop. Combined total cannot exceed 10. |

### 9.8 Drag-and-Drop Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| Drag image to same position | No state change. No animation glitch. |
| Drag image past the top or bottom edge of the scrollable area | The output box should auto-scroll while dragging (if the drag-and-drop library supports it). |
| Rapid successive drags | Each drag completes its reorder before the next is processed. Index numbers stay consistent. |
| Drag while output box is scrolled | Drop targets remain accurate regardless of scroll position within the output box. |
| Only 1 image in output box | Drag-and-drop is technically possible but has no effect (single item). No errors. |

---

## 10. Mock Data Requirements

The demo runs entirely on mock data. The following mock data must be created or extended.

### 10.1 Extend `mockEvents` with Images

The current `mockEvents` in `src/lib/mock-data.ts` have `imageUrl: null` for all events. For the AI generation demo to be compelling, events need associated images.

**Requirement M-001**: Add mock images to at least 5 of the 8 existing mock events.
- Use placeholder image URLs (Unsplash or via.placeholder.com, already in allowed domains)
- Each event should have 2-6 images to populate the influence grid meaningfully
- Images should have mock `summary` fields with descriptive text (simulating the AI summaries from the scraper pipeline)

**Requirement M-002**: Create a `mockEventImages` array or extend `DashboardEvent` with an `images` array.
- Each image needs: `id`, `url` (full-size), `summary` (text description)
- Images are associated with events by `eventId`

### 10.2 Mock Generated Results

**Requirement M-003**: Create a set of 10-20 placeholder "generated" images.
- Can reuse Unsplash URLs with different image IDs
- Should look plausibly like event promotional images (colorful, typographic, social-media-styled)
- Stored as a constant array that the mock generation function draws from

---

## 11. Technical Considerations

### 11.1 File Structure

New files to create:

```
src/lib/types/image-generation.ts          -- TypeScript interfaces (section 7)
src/components/events/AIImageGenModal.tsx   -- Main modal component (manages overall layout: main content area + output box sidebar)
src/components/events/ai-gen/              -- Sub-components directory
  Controls.tsx                              -- Controls section (prompts, slider, uploads)
  AutoContext.tsx                            -- Collapsible auto-detected context
  PastEventsScroll.tsx                      -- Horizontal event card scroll
  InfluenceGrid.tsx                         -- Influence images grid with selection logic
  GenerateButton.tsx                        -- Sticky footer with generate button
  GeneratedOutputGrid.tsx                   -- Generated results grid with progressive animation (below influence grid)
  OutputBox.tsx                             -- Right sidebar panel (300px, image list with drag-and-drop, Done button)
  OutputBoxToggle.tsx                       -- Arrow button to show/hide the output box
  DoneWarningDialog.tsx                     -- Confirmation dialog for empty output box on Done
src/hooks/useImageGeneration.ts            -- Custom hook for all state management (controls + output box + generation animation)
src/lib/mock-data-images.ts               -- Mock image data for events and generated results
```

**Modal layout structure (AIImageGenModal.tsx):**
```
+------------------------------------------------------------------+
| Sticky Header: "AI Image Generator"                        [X]  |
+------------------------------------------------------------------+
| +----------------------------------------------+ +-------------+ |
| |  Main Content (scrollable)                   | | Output Box  | |
| |  - Controls section                          | | (300px,     | |
| |  - Past events horizontal scroll             | |  scrollable)| |
| |  - Influence images grid                     | |             | |
| |  - Generated output grid (after generation)  | | [1] image   | |
| |                                              | | [2] image   | |
| |                                              | | [3] image   | |
| |                                              | |             | |
| |                                              | | [Done]      | |
| +----------------------------------------------+ +-------------+ |
+------------------------------------------------------------------+
| Sticky Footer: [Generate N Images]                               |
+------------------------------------------------------------------+
```

The main content area and output box are siblings in a flex row. The output box width is fixed at 300px when visible, 0px when hidden (animated). The main content area uses `flex: 1` to fill remaining space.

### 11.2 Dependencies

**Existing (no install needed):**
- `framer-motion` (already installed) for modal animation, output box slide transition
- `lucide-react` (already installed) for icons (`Sparkles`, `ImagePlus`, `X`, `Check`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `RefreshCw`, `GripVertical`, `Loader2`)
- Existing UI components from `@/components/ui/` (`Button`, `Input`, `Label`, `Select`, `Card`, `Separator`)
- `cn()` from `@/lib/utils` for conditional classes

**New dependency (recommended):**
- `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` -- for drag-and-drop reordering in the output box. This is the recommended React drag-and-drop library: lightweight, accessible, well-maintained, and designed for sortable lists. **Alternative**: native HTML5 drag-and-drop API is possible but lacks smooth animations, auto-scroll during drag, and accessible keyboard reordering. `@dnd-kit` is strongly preferred.

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 11.3 Performance

- Influence grid images should use `loading="lazy"` to avoid loading all images on first render
- The grid should virtualize if > 100 images are possible (unlikely in demo, but note for production)
- Modal mount/unmount: use `AnimatePresence` with `mode="wait"` to handle exit animations
- Progressive generation: use `setInterval` (not `setTimeout` chaining) for consistent 1-second intervals. Clean up the interval on modal unmount to prevent memory leaks.
- Output box drag-and-drop: `@dnd-kit` handles performance well for lists under 20 items. No virtualization needed.

### 11.4 Modal Container Overflow

The modal popup container must have `overflow: hidden` to ensure the output box sidebar never visually extends outside the modal bounds. Internal scrolling is handled by:
- The main content area: `overflow-y: auto` (vertical scroll for controls, grids, etc.)
- The output box: `overflow-y: auto` (independent vertical scroll for the image list)
- The modal container itself: `overflow: hidden` (clips everything to modal bounds)

This is critical because the output box is a fixed-width panel that slides in/out -- without `overflow: hidden` on the container, the slide animation could cause content to visually leak outside the modal during transitions.

### 11.5 Output Box Slide Animation

The output box show/hide toggle should use one of these approaches:

**Option A (CSS transition -- simpler):**
```css
.output-box {
  width: 300px;
  transition: width 300ms ease, opacity 200ms ease;
}
.output-box.hidden {
  width: 0px;
  opacity: 0;
  overflow: hidden;
}
```
The main content area uses `flex: 1` and automatically expands/contracts.

**Option B (Framer Motion -- more polished):**
```tsx
<motion.div
  animate={{ width: outputBoxVisible ? 300 : 0 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  style={{ overflow: "hidden" }}
>
  {/* Output box content */}
</motion.div>
```

Either approach is acceptable. Framer Motion is already in use throughout the dashboard, so Option B is recommended for consistency.

### 11.6 Accessibility

- Modal traps focus when open (`role="dialog"`, `aria-modal="true"`)
- Escape key closes modal
- All interactive elements are keyboard-navigable
- Image tiles in the grid have `role="button"` and `aria-label` describing the action
- Slider has `aria-label="Style influence percentage"`
- Color contrast: all text meets WCAG AA against the card/surface backgrounds
- Output box drag-and-drop: `@dnd-kit` provides built-in keyboard support (Space to pick up, Arrow keys to move, Space to drop). Ensure `aria-label` on each draggable item: "Image {index}, drag to reorder"
- Done warning dialog: uses `role="alertdialog"` with focus trapped to Cancel/Confirm buttons
- Output box toggle: `aria-label="Show output panel"` / `aria-label="Hide output panel"` based on current state

---

## 12. Success Metrics (Demo-Specific)

Since this is a demo feature with no real AI backend, success is measured differently than a production feature.

| Metric | Target | How to Assess |
|---|---|---|
| Demo completeness | 100% of screens from section 6 are implemented and navigable | Manual walkthrough |
| Visual polish | All components use existing design tokens; no raw hex colors or one-off styles | Code review |
| Interaction fidelity | All state transitions (select, deselect, remove, re-select) work correctly per section 8 | Manual QA of all edge cases in section 9 |
| Form integration | Opening/closing the modal does not corrupt or lose event form data | Test: fill form, open modal, close, verify form data |
| Mock data quality | Influence grid shows 15+ realistic images across selected events | Visual inspection |
| Load time | Modal opens in < 200ms (no network requests) | Performance check |
| Stakeholder reaction | Society demo partners say "I want this" or ask "When is this live?" | Qualitative feedback during demo sessions |

---

## 13. Out of Scope

The following are explicitly NOT part of this demo implementation.

| Item | Why Excluded | Revisit Condition |
|---|---|---|
| Actual AI image generation (API calls) | Backend not built yet; demo is UI-only | When the generation API is available |
| Image download functionality | "Download" buttons are present but non-functional | When generated images are real files |
| Real re-generation | "Regenerate" button is present but non-functional (shows "Coming soon") | When the generation API is available |
| Saving generation settings | No persistence of prompt/selections between sessions | When we have a backend to save preferences |
| Generation history | No log of past generations | Post-MVP, when the feature is in production |
| Society profile image compositing preview | The auto-context section shows the logo URL, but no live preview of composited output | When generation pipeline is built |
| Mobile-optimized modal layout | Desktop-first for demo; mobile will work (single column) but is not polished | When targeting mobile users |
| Real event images from Supabase | All images are mock data | When the feature connects to the live data layer |
| Multi-society support | Demo uses single mock society (`mockSociety`) | When society switching is production-ready |
| Rate limiting or generation quotas | No limits in the demo | Production launch |
| A/B testing of generated images | No comparison or testing features | Post-launch optimization |
| Image editing / post-generation adjustment | No crop, filter, or text editing on results | V2 feature consideration |
| Integration with Instagram posting API | Generated images are not posted anywhere | Phase 2 of the platform (society onboarding) |

---

## 14. Open Questions

These must be resolved before or during implementation.

| # | Question | Owner | Deadline | Impact |
|---|---|---|---|---|
| Q-01 | Should the modal reset all state on close, or preserve settings for the session? | PM | Before dev start | Affects state management complexity |
| Q-02 | Do we need the modal to work from the event edit page as well, or only event creation? | PM | Before dev start | Affects where the entry point is wired up |
| Q-03 | What placeholder images should we use for mock generated results? Should we prepare actual AI-generated sample images offline? | Design | Week 1 of dev | Affects demo quality |
| Q-04 | Should the influence grid images come from an extended `DashboardEvent.images` field or a separate `mockEventImages` data structure? | Eng | Day 1 of dev | Affects mock data architecture |
| Q-05 | Is the existing `ImageUploader` component reusable for reference image uploads, or do we need a slimmed-down variant? | Eng | Day 1 of dev | Affects component reuse |

---

## 15. Implementation Notes

### Recommended Build Order

1. **Mock data first**: Extend `mockEvents` with image arrays; create `mockEventImages` and `mockGeneratedResults` data
2. **Types**: Create `src/lib/types/image-generation.ts` with all interfaces (including `OutputImage`)
3. **Install `@dnd-kit`**: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
4. **State hook**: Build `useImageGeneration` hook with all state management -- influence grid selection/deselection/removal, output box add/remove/reorder, generation animation, Done flow. Mentally test against section 8 invariants.
5. **Modal shell**: Build `AIImageGenModal` with open/close, sticky header/footer, flex row layout (main content + output box sidebar), `overflow: hidden` on container
6. **Output box**: Build `OutputBox.tsx` with image list, numbered indices, drag-and-drop reorder (`@dnd-kit`), X removal, empty state, Done button, max 10 limit message. Build `OutputBoxToggle.tsx` and `DoneWarningDialog.tsx`.
7. **Controls section**: Build all input controls (prompt, description, reference upload, slider, 5-option aspect ratio select, number input, auto-context collapsible)
8. **Past events scroll**: Build horizontal scroll with selectable event cards
9. **Influence grid**: Build the grid with add/remove/hover behavior -- this is the hardest piece
10. **Generated output grid**: Build `GeneratedOutputGrid.tsx` with shimmer placeholders, progressive 1-second-per-image animation, click-to-add-to-output, selected overlay/tick, Regenerate button (non-functional)
11. **Pre-population**: Wire the modal to receive existing EventForm images and pre-populate them in the output box on open
12. **Integration**: Wire the "Generate Images with AI" button into `EventForm.tsx`. Wire the Done flow to inject output box images back into the EventForm.
13. **Polish**: Animations (output box slide, image fade-in, shimmer), transitions, empty states, edge case handling, warning dialogs

### Key Codebase Patterns to Follow

- **Dashboard scope styling**: The modal renders inside the dashboard layout, so it inherits the `.dashboard-scope` CSS (red primary instead of indigo). Use `bg-dashboard-cta` for the primary CTA button, matching the existing "Create Event" button pattern.
- **Component structure**: Follow the `Card` / `CardHeader` / `CardContent` pattern used in `EventForm.tsx` for grouped sections.
- **Motion**: Use `framer-motion` for entrance/exit animations, matching `DashboardSection` and `DashboardPageHeader` patterns (fade + slight y-translate).
- **Icons**: Use `lucide-react` exclusively. Key icons: `Sparkles`, `ImagePlus`, `X`, `Check`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `RefreshCw`, `GripVertical`, `Download`, `ArrowLeft`, `Loader2`, `SlidersHorizontal`.
- **Existing components to reuse**: `Button`, `Input`, `Label`, `Textarea`, `Select`/`SelectTrigger`/`SelectContent`/`SelectItem`, `Card`/`CardHeader`/`CardContent`, `Separator`, `Badge`.
- **One new dependency**: `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` for output box drag-and-drop reordering (see section 11.2). All other dependencies are already in `package.json`.
