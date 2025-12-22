I will refactor the **Package Creation/Editing Modal** into a 4-step wizard to improve the user experience and ensure accuracy before saving.

**The 4-Step Process:**
1.  **Step 1: Package Details**
    *   Basic information: Name, Description, Price per Head, Minimum Pax, and "Popular" tag.
2.  **Step 2: Standard Inclusions**
    *   Manage what comes standard with the package (e.g., Rice, Drinks, Service Crew) using the new flexible input system.
3.  **Step 3: Menu Configuration**
    *   Define the choice rules for the customer (e.g., "Choose 1 Main Dish", "Choose 1 Dessert").
4.  **Step 4: Review & Finalize**
    *   A comprehensive summary page displaying all entered details, inclusions, and rules for final verification before saving.

**Implementation Details:**
*   **State Management**: Introduce `currentStep` state to track progress.
*   **Navigation**: Add "Back" and "Next" buttons in the modal footer, replacing the single "Save" button until the final step.
*   **Visual Feedback**: Add a progress stepper at the top of the modal to indicate the current stage.
*   **Scope**: This change will focus on the **Package Modal** as it is the most complex form. The Dish and Add-on modals (which are simple forms) will remain as single-view modals for efficiency.

I will update `src/app/dashboard/catering/page.tsx` to implement this restructuring.