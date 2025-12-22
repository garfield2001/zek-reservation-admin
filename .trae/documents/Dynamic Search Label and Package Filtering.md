I will implement the requested UI enhancements for the search label and package filtering.

**Key Changes:**

1. **Dynamic Search Label**: The search bar label will now update dynamically based on the active tab:

   * **Packages**: "Search Packages"

   * **Meal Choices**: "Search Menu Items"

   * **Add-ons**: "Search Extras & Add-ons"
2. **Package Filtering**: I will add a "Popularity" filter to the **Packages** tab, similar to the Meal Choices category filter but tailored for packages.

   * **Filter Options**: "All Packages" vs "Popular Only".

   * **UI**: A clean dropdown aligned to the left, consistent with the Meal Choices tab.

**File to Edit:** `src/app/dashboard/catering/page.tsx`
**Action:**

* Update the search label logic.

* Add a new state `packageFilter` (All/Popular).

* Add the filter dropdown to the Packages tab section.

* Update the package rendering to respect the filter.

