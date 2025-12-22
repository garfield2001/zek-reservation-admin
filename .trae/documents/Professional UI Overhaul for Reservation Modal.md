I have analyzed the current implementation and identified several areas to upgrade the visual quality and user experience.

# Visual & Layout Overhaul Plan

## 1. Modal Structure & Background
- **Backdrop:** Darken to `bg-black/60` with a stronger `backdrop-blur-md` for a premium focus effect.
- **Modal Body:** Switch from plain white to `bg-gray-50/50` (off-white). This allows us to use **White Cards** for content sections, creating depth and better visual hierarchy.
- **Header:** clear, bold typography with a modern "Step Indicator" (e.g., circled numbers) instead of just a progress bar.

## 2. Step 1: Client & Event Details
- **Card Layout:** Wrap "Client Info" and "Event Info" in separate **White Cards** with subtle shadows (`shadow-sm`, `rounded-2xl`).
- **Input Styling:**
    - Change inputs to `bg-white` (or very light gray) with a refined border.
    - Add clear, floating-style or distinct labels.
    - Improve spacing (gap) between fields to reduce clutter.

## 3. Step 2: Package Selection
- **Interactive Cards:**
    - Default: White card with gray border.
    - **Selected:** High-contrast `ring-2 ring-zek-red` with a subtle "pop" animation (`scale-105`) and a "Selected" badge.
    - **Hover:** Soft shadow lift.

## 4. Step 3: Menu Customization
- **Rule Cards:** Each inclusion rule (e.g., "Select 3 Main Dishes") will be its own white card.
- **Dish Grid:**
    - Improve the "Selected" state of dishes (full color border + checkmark overlay).
    - Add a "Progress Bar" per category (e.g., "2/3 Selected").

## 5. Step 4: Summary (Receipt Style)
- Design the summary to look like a **Digital Receipt** or **Ticket**.
- Use a monospaced font for the financial breakdown to look professional.

I will implement these changes in `src/components/CreateReservationModal.tsx` to fix the "suckiness" and make it look professional.