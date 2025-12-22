I will fix the layout inconsistencies in the **Meal Choices (Dishes)** tab by replacing the current custom dropdown/filter UI with a more robust and cleaner design.

**The Issue:**
The user reports "inconsistencies" and "overlapping". This is likely due to the sticky filter bar potentially clashing with content, or the dropdown logic (if referring to the "Category" select in the modal) being clunky. The user explicitly suggested: *"Might aswell make it as a dropdown instead."*

**The Plan:**

1. **Replace Horizontal Scroll with Dropdown**: I will replace the horizontal scrolling filter bar with a clean, modern **Dropdown Menu** (using a styled `<select>` or custom dropdown) for category filtering. This saves space and prevents layout overlapping issues on smaller screens.
2. **Clean Up Layout**: Ensure the grid has proper top padding so it doesn't overlap with the sticky header.
3. **Visual Polish**: Style the dropdown to match the "professional and modern" aesthetic (white background, shadow, rounded corners).

**File to Edit:** `src/app/dashboard/catering/page.tsx`
**Key Changes:**

* Remove the horizontal scroll container.

* Add a "Filter by Category" dropdown in the top toolbar area (next to the search bar or in its own row).

* Update the rendering logic to use the dropdown's value.

