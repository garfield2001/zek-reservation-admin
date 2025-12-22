Based on your requirements and the photo provided, I've designed a comprehensive plan to restructure the Catering Management module. This will allow you to manage dishes separately from packages and define flexible rules for each package (e.g., "Choose 1 Beef or Pork").

## 1. Data Model Updates (`src/lib/mock-data.ts`)
We will transform the simple string arrays into structured data types:

### New Interfaces
*   **`Dish`**: Represents a specific menu item.
    *   `id`: string
    *   `name`: string (e.g., "Beef Steak Tagalog")
    *   `category`: string (e.g., "Beef", "Pork", "Chicken", "Pasta")
*   **`PackageInclusion`**: Defines a rule for what a package contains.
    *   `type`: "Choice" (Customer picks from options) or "Fixed" (Always included)
    *   `categories`: string[] (e.g., `["Beef", "Pork"]`)
    *   `count`: number (How many dishes they can choose, e.g., 1)
    *   `isMain`: boolean (To distinguish main courses from sides/desserts if needed)
*   **`CateringPackage` (Updated)**:
    *   `inclusions`: `PackageInclusion[]` (Replaces the old `meals` array)

### New Mock Data
*   **`MOCK_DISHES`**: A full list of dishes from your photo (Beef Steak, Pork Menudo, Chicken Afritada, etc.).
*   **`MOCK_PACKAGES`**: Updated packages (A, B, C, D) configured with the rules shown in the photo.

## 2. UI Restructuring (`src/app/dashboard/catering/page.tsx`)
We will split the page into two main tabs for better organization:

### Tab 1: Packages Management
*   **List View**: Shows packages with their price and a summary of inclusions (e.g., "4 Main Courses, 1 Dessert").
*   **Create/Edit Modal**: A new "Package Builder" interface.
    *   **Basic Info**: Name, Price, Min Pax.
    *   **Inclusion Rules Builder**:
        *   "Add Rule" button.
        *   Row 1: "Select **1** dish from **Beef, Pork**"
        *   Row 2: "Select **1** dish from **Chicken**"
        *   Row 3: "Select **1** dish from **Noodles, Vegetables**"

### Tab 2: Menu / Dishes Management
*   **Dish Library**: A master list of all available dishes.
*   **Categorized View**: Grouped by "Beef", "Pork", "Chicken", etc.
*   **Add/Edit Dish**: Simple form to add new dishes and assign them to a category.

## 3. Implementation Steps
1.  **Refactor Mock Data**: Define the new interfaces and populate `MOCK_DISHES` with the menu items from your photo.
2.  **Update Catering Page**:
    *   Add state for `activeTab` ("packages" | "dishes").
    *   Implement the **Dishes Tab** first (CRUD operations for dishes).
    *   Implement the **Packages Tab** with the new "Inclusions" logic.
3.  **Verify**: Ensure that adding a new dish (e.g., "New Beef Dish") automatically makes it available for any package that includes the "Beef" category.
