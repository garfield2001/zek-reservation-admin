I will refactor the **Dish/Meal Modal** in `src/app/dashboard/catering/page.tsx` to match the professional aesthetics of the Package Modal.

### **Design Improvements**
1.  **Glassmorphism & Animation**:
    *   Apply `backdrop-blur-xl`, `bg-white/90`, and `framer-motion` entry/exit animations (same as Package Modal).
2.  **Professional Image Preview**:
    *   Replace the simple URL input with a dedicated **Image Preview Card**.
    *   Show the image in a large, styled container with a "placeholder" state if no image is set.
    *   Add a visual indicator for valid/invalid URLs.
3.  **Form Layout**:
    *   Use a **2-column layout**:
        *   **Left**: Large Image Preview & URL Input.
        *   **Right**: Dish Details (Name, Category).
    *   Add styled inputs with icons (e.g., `Type` for text, `Link` for URL).
4.  **Category Selection**:
    *   Enhance the category dropdown or switch to a "pill" selection if there are few categories, but stick to a styled `<select>` for scalability.

### **Implementation Steps**
1.  **Refactor Dish Modal Structure**:
    *   Replace the existing `div` modal with `motion.div`.
    *   Implement the 2-column grid layout.
2.  **Enhance Image Handling**:
    *   Add an `onError` handler to the `Image` component to gracefully handle broken links (revert to placeholder).
    *   Display the image in a 4:3 aspect ratio container with rounded corners and shadow.
3.  **Styling**:
    *   Apply the `zek-red` branding to focus states and buttons.
    *   Ensure consistency with the "Package" modal's footer and header.
