# Create and Save a New Columns Preference

## User Story

- **As** a user who customizes the Call List table view,
- **I want to** create and save a personalized columns preference,
- **So that** I can quickly reapply my preferred column setup without reconfiguring it each time.

## Why

Allowing users to save and reuse their preferred table configurations increases efficiency, consistency, and user satisfaction — particularly for users who frequently switch between different analytical or operational views.

---

## Acceptance Criteria (User Perspective)

_Manual & visual tests of the UX in the browser._

---

### Create Action and Entry Point

- [ ] A **“Create”** button appears inside the Column Preferences menu.
- [ ] Clicking **“Create”** opens the **preference Editor** modal.
- [ ] The editor is prefilled with:
  - [ ] A **default name** (e.g. “New preference”)
  - [ ] An **empty description field**
  - [ ] The **currently selected columns**

---

### Editor Rules and Validation

- [ ] The **Name** field is **required**.
- [ ] At least **one column** must be selected to save the preference.
- [ ] The **Save** button is **enabled only** when both conditions are met.
- [ ] Invalid state shows a **disabled Save button** with contextual tooltip or visual hint.

---

### Editor Buttons and Actions

- [ ] Buttons displayed: **Save (primary)** and **Apply (secondary)**.
- [ ] **Cancel button is removed** (closing via X icon or click outside cancels the form).
- [ ] On **Save click**:
  - [ ] Sends a **PUT request** to the API.
  - [ ] While pending:
    - [ ] Fields and buttons are **disabled**.
    - [ ] A **spinner** is shown on the Save button.
  - [ ] On **success**:
    - [ ] The editor closes automatically.
    - [ ] A **success toast message** appears.
    - [ ] The menu label updates to the new preference’s name.
  - [ ] On **failure**:
    - [ ] The editor remains open.
    - [ ] An **error toast message** appears.

---

### Menu Update and Active State

- [ ] After saving, the **new preference** appears in the preferences menu list.
- [ ] It displays:
  - [ ] The **preference name**
  - [ ] The **description** (if defined)
- [ ] The **new preference** is marked as **active** in the list.
- [ ] The **menu button label** reflects the **active preference name**.

---

### Localization and Pluralization

- [ ] The title key `column_preferences_list_title` supports pluralization:
  - [ ] When **1 preference**, use `column_preferences_list_title_one`
  - [ ] When **>1 preference**, use `column_preferences_list_title_other`
- [ ] Translations are loaded dynamically and update correctly without reload.

---

### Behavior in “New” and “Edit Draft” Modes

- [ ] In both **new** and **edit-draft** modes, the editor shows **both Save and Apply buttons**.
- [ ] **Apply** updates the preview temporarily (without saving).
- [ ] **Save** persists the preference and closes the editor.
- [ ] Cancel behavior (X or outside click) always discards unsaved changes.
