# Load and Switch Column Preferences

## User Story

- **As** a returning user of the Call List table
- **I want to** automatically load and manage my saved column preferences
- **So that** I always see my preferred columns and can easily switch between saved presets without errors or confusion

## Why

Preserving and validating saved preferences ensures a seamless and consistent user experience, while allowing users to safely switch between personalized views of their data.

## Acceptance Criteria (User Perspective)

_Manual & visual tests of the UX in the browser_

---

### Initial Load Behavior

- [ ] On app load, the system automatically selects the last active column preference stored in local storage.
- [ ] The app validates that the stored preference still exists in the database.
- [ ] If the stored preference no longer exists, it is automatically removed from the available preferences list.
- [ ] In that case, no preference is selected by default, and the menu button displays the default label “Columns”.

---

### Menu Display and Interaction

- [ ] Clicking the “Columns” button opens a dropdown menu listing all available preferences.
- [ ] Each preference name is displayed as a menu item.
- [ ] The currently active preference is visually highlighted (e.g., checkmark, bold text, or selected state).
- [ ] Clicking outside the menu or the close (X) icon closes it without changing selection.

---

### Preference Selection

- [ ] Selecting a preference sets it as the new active state.
- [ ] The menu closes after selection.
- [ ] The selected preference triggers an API call to load its corresponding column configuration.
- [ ] While loading, the menu button displays a loading state (e.g., spinner or progress indicator).
- [ ] During loading, other menu items are temporarily disabled to prevent multiple concurrent switches.
- [ ] When loading completes successfully, the columns update immediately, and the menu button label changes to the selected preference name.

---

### Error and Feedback Handling

- [ ] If the preference loading fails, a toast notification displays an error message (e.g., “Failed to load columns preference”).
- [ ] On success, no toast or notification is shown — the updated columns are the visible confirmation.
- [ ] Re-selecting the currently active preference has no visible effect (no API call, no visual flicker).
- [ ] (Open question: Should this be disabled explicitly in the UI or handled silently by caching logic?)

---

### Edit & Creation Modes (Clarifications)

- [ ] In “Edit draft” mode (via “Edit columns” button), the user sees both **Apply** and **Save** buttons.
- [ ] In “New” mode (via “New” button), the same applies: both **Apply** and **Save** buttons are visible.
- [ ] The **Cancel** button is removed — users can instead close the form via the **X** icon or by clicking outside the modal.

---
