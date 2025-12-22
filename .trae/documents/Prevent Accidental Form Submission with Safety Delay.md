I suspect the issue is caused by an **accidental double-click** or fast interaction. Since the "Next Step" button on Step 3 is in the exact same position as the "Save Changes" button on Step 4, clicking "Next" twice quickly (or a heavy mouse click) can accidentally trigger the "Save" button the moment it appears, submitting the form and closing the modal instantly.

**The Fix:**
I will implement a **safety delay** on the "Save Changes" button.
1.  **Logic**: When you arrive at Step 4 (Summary), the "Save Changes" button will be disabled for **1 second**.
2.  **Visuals**: The button will appear slightly dimmed during this 1-second safety period.
3.  **Result**: This ensures that any extra clicks from the previous step are ignored, preventing the modal from closing automatically.

I will also update the button keys to ensure React treats them as separate elements, further reducing the risk of event conflict.