I will add an "Add-ons" management feature to the Catering module to support extra items like "Pica Pica", "Lechon Belly", "Food Tray Menu", and "Food Pack Lunch" as requested.

## 1. Data Model Updates (`src/lib/mock-data.ts`)
*   **New Interface**: `AddOnItem`
    *   `id`: string
    *   `name`: string
    *   `category`: string (e.g., "Lechon", "Pica Pica", "Food Tray - Beef")
    *   `price`: number
    *   `unit`: string (e.g., "per tray", "per pax", "whole", "pack")
    *   `description`: string (optional)
*   **Mock Data**: Populate `MOCK_ADD_ONS` with data extracted from the images:
    *   **Pica Pica**: Package (4,500)
    *   **Lechon Belly**: Packages (3kgs, 5kgs) with estimated prices.
    *   **Food Tray Menu**: Representative items for Beef, Pork, Chicken, Seafood, etc.
    *   **Food Pack Lunch**: Representative meal packs.

## 2. UI Updates (`src/app/dashboard/catering/page.tsx`)
*   **New Tab**: Add an "Add-ons" tab alongside "Packages" and "Dishes & Menu".
*   **Add-ons View**:
    *   Display a list of add-ons grouped by their category.
    *   Show price and unit details.
    *   Provide "Edit" and "Delete" buttons for each item.
*   **Add/Edit Modal**:
    *   Create a form to add or update add-ons.
    *   Fields: Name, Category (select existing or add new), Price, Unit, Description.

## 3. Implementation Steps
1.  **Update Mock Data**: Add `AddOnItem` interface and `MOCK_ADD_ONS` to `src/lib/mock-data.ts`.
2.  **Update Catering Page**:
    *   Add `activeTab` state support for "addons".
    *   Implement the "Add-ons" tab content.
    *   Add state and handlers for managing add-ons (CRUD operations).
    *   Integrate the "Add/Edit Add-on" modal.
3.  **Verify**: Ensure all tabs (Packages, Dishes, Add-ons) work correctly and independent of each other.
