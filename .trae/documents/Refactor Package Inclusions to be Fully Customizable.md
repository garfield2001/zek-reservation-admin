I will implement a flexible "Standard Inclusions" management system within the Package Modal, replacing the need for a simple toggle. This will allow you to define exactly what comes with each package (e.g., Rice, Drinks, Soup, etc.).

**1. Component Logic Updates (`src/app/dashboard/catering/page.tsx`)**
*   **New State**: Add `inclusionInput` state to handle the text input for new items.
*   **New Handlers**:
    *   `addInclusionItem(item)`: Adds a new string to the package's inclusions list.
    *   `removeInclusionItem(item)`: Removes an item from the list.

**2. UI Changes: Package Modal**
*   **Location**: In the "Package Details" (left column) section.
*   **New Section**: "Standard Inclusions" (replacing any previous specific toggles).
    *   **Input Field**: A text input with an "Add" button to type custom items (e.g., "Mineral Water").
    *   **Quick Actions**: Clickable chips for common items like `Rice`, `Iced Tea`, `Soup`, `Dessert`.
    *   **Active Tags**: Display the currently included items as removable tags (e.g., `[ Rice x ] [ Iced Tea x ]`).

**3. UI Changes: Package Preview**
*   **Dynamic List**: Update the "Preview Summary" card to display *all* items in the inclusions list, not just "Rice".

This approach gives you full control to "include something or not" for every package.