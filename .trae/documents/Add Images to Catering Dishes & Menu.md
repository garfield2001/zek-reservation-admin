I will enhance the "Dishes & Menu" section by adding images to each dish and updating the UI to display them in a visually appealing grid.

## 1. Data Model Updates (`src/lib/mock-data.ts`)
*   **Update `Dish` Interface**: Add an `image: string` property.
*   **Populate Images**: Update `MOCK_DISHES` with high-quality, category-specific image URLs from Unsplash (e.g., specific images for Beef, Pork, Seafood, etc.).

## 2. Configuration Update (`next.config.ts`)
*   **Allow External Images**: Update `next.config.ts` to allow loading images from `images.unsplash.com` so we can use the optimized `next/image` component.

## 3. UI Updates (`src/app/dashboard/catering/page.tsx`)
*   **Redesign Dish Card**:
    *   Switch to a vertical card layout.
    *   **Top**: Dish Image (Cover style).
    *   **Middle**: Dish Name and Category Badge.
    *   **Bottom**: Action buttons (Edit/Delete).
*   **Update Dish Modal**:
    *   Add an "Image URL" input field to allow users to provide or update the image link.

## 4. Implementation Steps
1.  **Configure Next.js**: Allow `images.unsplash.com` domain.
2.  **Update Mock Data**: Add image URLs to all 40+ dishes.
3.  **Update UI**: Implement the new card design and modal input.
4.  **Verify**: Ensure images load correctly and the layout looks good.
