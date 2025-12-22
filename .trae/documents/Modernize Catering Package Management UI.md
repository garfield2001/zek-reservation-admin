I will refactor the **Package Management** interface in `src/app/dashboard/catering/page.tsx` to match the professional, modern glassmorphism design of the Reservation Wizard.

### **UI/UX Design Improvements**
1.  **Glassmorphism Modal**:
    *   Replace the standard white modal with a `backdrop-blur-xl` overlay and semi-transparent white container (`bg-white/80`).
    *   Add smooth entry/exit animations using `framer-motion`.

2.  **Enhanced Form Layout**:
    *   **Two-Column Layout**: Split "Basic Info" (Name, Price, Pax) and "Menu Configuration" for better use of space on larger screens.
    *   **Styled Inputs**: Use modern, floating-label style or icon-prefixed inputs with `focus:ring-zek-red` and soft shadows.

3.  **Smart Inclusion Builder**:
    *   **Visual Rule Cards**: Redesign the "Inclusion Rules" list into distinct, styled cards (e.g., a "Main Dish" card vs. a "Dessert" card).
    *   **Category Selection**: Replace simple buttons with interactive "Chips" that clearly indicate selected categories (e.g., Beef, Pork, Chicken).
    *   **Quick Templates**: Add buttons to quickly insert common rules like *"Add Main Course Rule"* (defaults to Beef/Pork/Chicken/Seafood) or *"Add Dessert Rule"* (defaults to Dessert).

4.  **Live Preview (Micro-Interaction)**:
    *   Add a subtle "Preview" summary that updates in real-time, showing how the package menu will look to the customer (e.g., "Customer chooses **3** from **Beef, Pork, Chicken**").

### **Implementation Steps**
1.  **Refactor Modal Component**: Extract or inline the new `motion.div` modal structure within `CateringPage`.
2.  **Update Form Styling**: Apply Tailwind classes for glass effects, shadows, and rounded corners (`rounded-2xl`, `shadow-xl`).
3.  **Improve Rule Management Logic**:
    *   Keep the underlying `inclusions` data structure compatible.
    *   Enhance the UI for adding/removing rules and toggling categories.
4.  **Verify**: Ensure creating/editing a package correctly saves the "Main Dish" vs "Side Dish" logic and updates the list view.
