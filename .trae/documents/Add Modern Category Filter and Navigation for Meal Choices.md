I will enhance the **Meal Choices (Dishes)** tab with a modern category filter and additional professional features.

**Key Features to Add:**
1.  **Horizontal Scrolling Filter Bar**: Instead of showing all categories at once stacked vertically, I'll add a sticky, horizontal scrolling category filter at the top. This allows users to quickly jump to specific sections (e.g., "Beef", "Seafood") without scrolling manually.
2.  **"All" View vs. "Filtered" View**:
    *   **Default**: Show all categories (Masonry layout as is).
    *   **Filtered**: Clicking a category chip isolates that specific category.
3.  **Quick Stats**: Display the count of dishes next to each category in the filter.
4.  **Empty State Enhancement**: If a filter returns no results, show a helpful "Clear Filter" action.

**Implementation Details:**
*   **State**: Add `selectedCategory` state (defaulting to "All").
*   **UI Component**: Create a `motion.div` horizontal scroll container for category chips.
*   **Interaction**: Clicking a chip updates `selectedCategory`. The grid below renders either all categories (if "All") or just the selected one.

I will edit `src/app/dashboard/catering/page.tsx` to implement this filter logic and UI.