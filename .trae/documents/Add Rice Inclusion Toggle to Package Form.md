I will add an option to toggle "Rice Included" when creating or editing a package in `src/app/dashboard/catering/page.tsx`.

### **Changes Required**
1.  **UI Update**: Add a checkbox or toggle switch for "Rice Included" in the Package Form (under the Basic Info section, near "Mark as Popular").
2.  **Logic Update**:
    *   The current state uses `addOns: ["Rice", ...]` to signify rice inclusion.
    *   I will add a handler to toggle "Rice" in the `addOns` array of `packageFormData`.
3.  **Preview Update**: Ensure the "Rice Included" badge in the Preview Summary card conditionally renders based on this state.

### **Implementation Steps**
1.  **Modify Package Form**: Insert a checkbox for "Include Rice".
2.  **State Handler**:
    *   `checked`: `packageFormData.addOns?.includes("Rice")`
    *   `onChange`: If checked, add "Rice" to `addOns`. If unchecked, filter "Rice" out.
3.  **Verify**: Check that the badge updates in real-time in the preview card.
