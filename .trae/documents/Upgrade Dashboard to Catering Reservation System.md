I will upgrade the Dashboard to a professional **Catering Reservation System** with role-based features and analytics.

### **1. Navigation & Layout Overhaul**
*   **Renaming**: Change "Bookings" to **"Reservations"** globally.
*   **New Navbar Structure**:
    *   **Dashboard**: Overview.
    *   **Reservations**: Central hub for managing bookings.
    *   **Menu Management**: Dropdown for Packages, Meals, and Dishes.
    *   **Staff**: User management (Admin only).
    *   **Analytics**: In-depth metrics (Admin only).
*   **Role-Based Visibility**:
    *   **Admin**: Sees everything.
    *   **Staff**: Sees Dashboard (limited) and Reservations (Add/Edit/Update/Delete).

### **2. Dashboard Page (Admin View)**
*   **"Google Analytics" Style Metrics**:
    *   I will install `recharts` to create professional line/bar charts for **Revenue Trends** and **Reservation Volume**.
*   **Key Performance Indicators (KPIs)**:
    *   Total Revenue (Monthly/Yearly).
    *   Upcoming Reservations (Next 7 days).
    *   Most Popular Catering Package.
    *   Staff Availability.
*   **Recent Activity Table**:
    *   A sophisticated table showing recent reservations with status badges (Pending, Confirmed, Completed).
    *   **Soft Delete Visibility**: Deleted items will be visually distinguished (e.g., grayed out/strikethrough) for Admins.

### **3. Mock Data Implementation**
*   Since the API is limited, I will create a robust `mock-data.ts` service to simulate:
    *   **Reservations**: Diverse statuses, dates, and client details.
    *   **Catering Packages**: "Wedding Feast", "Corporate Lunch", etc.
    *   **Staff Members**: Sample user profiles.

### **4. Technical Implementation**
*   **Dependencies**: Install `recharts` for charts.
*   **Components**: Create reusable `StatsCard`, `ReservationTable`, and `AnalyticsChart` components to keep the code clean.

**Confirm this plan to proceed with the transformation.**