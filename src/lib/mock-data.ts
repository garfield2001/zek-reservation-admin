export interface Reservation {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  eventType: string;
  date: string;
  time?: string;
  venue?: string;
  guests: number;
  packageId: string;
  packageName: string;
  selectedDishes?: string[]; // Array of Dish IDs or Names
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Deleted";
  paymentStatus: "Paid" | "Deposit" | "Unpaid" | "Overdue";
  amount: number;
  assignedStaffId?: string;
  createdAt: string;
}

export interface Dish {
  id: string;
  name: string;
  category: string;
  image?: string;
}

export interface PackageInclusion {
  name: string;
  categories: string[];
  count: number;
}

export interface CateringPackage {
  id: string;
  name: string;
  pricePerHead: number;
  description: string;
  popular: boolean;
  minPax: number;
  inclusions: PackageInclusion[];
  addOns: string[];
}

export interface AddOnItem {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: "Admin" | "Staff";
  email: string;
  active: boolean;
  phone?: string;
  joinedDate: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: "info" | "warning" | "success" | "danger";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "Active" | "Inactive";
}

export interface Payment {
  id: string;
  reservationId: string;
  clientName: string;
  amount: number;
  method: "Cash" | "Bank Transfer" | "GCash" | "Check";
  status: "Paid" | "Pending" | "Failed";
  date: string;
  referenceNo?: string;
}

export const MOCK_DISHES: Dish[] = [
  // Beef
  {
    id: "d1",
    name: "Beef Steak Tagalog",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d2",
    name: "Beef Menudo",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d3",
    name: "Beef with Broccoli",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d4",
    name: "Beef Caldereta",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d5",
    name: "Sizzling Beef Bulalo in Cream Sauce",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d6",
    name: "Beef with Mushroom",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d7",
    name: "Lengua Estofado",
    category: "Beef",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Pork
  {
    id: "d8",
    name: "Pork Menudo",
    category: "Pork",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d9",
    name: "Spicy Pork Ribs",
    category: "Pork",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d10",
    name: "Pork Binagoongan",
    category: "Pork",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d11",
    name: "Sweet and Sour Pork",
    category: "Pork",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d12",
    name: "Lumpia Shanghai",
    category: "Pork",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d13",
    name: "Pork Steak",
    category: "Pork",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Chicken
  {
    id: "d14",
    name: "Chicken Afritada",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d15",
    name: "Buttered Chicken",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d16",
    name: "Garlic Chicken",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d17",
    name: "Fried Chicken",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d18",
    name: "Chicken Curry",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d19",
    name: "Chicken Teriyaki",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d20",
    name: "Chicken Buffalo Wings",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d21",
    name: "Chicken Cordon Bleu",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d22",
    name: "Chicken Ala King",
    category: "Chicken",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Fish & Seafoods
  {
    id: "d23",
    name: "Mixed Seafoods",
    category: "Fish & Seafoods",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d24",
    name: "Buttered Garlic Shrimp",
    category: "Fish & Seafoods",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d25",
    name: "Sweet and Sour Fish",
    category: "Fish & Seafoods",
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d26",
    name: "Fish Fillet with Taosi Sauce",
    category: "Fish & Seafoods",
    image:
      "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d27",
    name: "Breaded Fish Fillet with Tartar Sauce",
    category: "Fish & Seafoods",
    image:
      "https://images.unsplash.com/photo-1535025639604-9a804c092faa?auto=format&fit=crop&w=800&q=80",
  },

  // Vegetables
  {
    id: "d28",
    name: "Chopsuey with Quail Egg",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d29",
    name: "Vegetable with Seafoods",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d30",
    name: "Buttered Mix Vegetables",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d31",
    name: "Pinakbet",
    category: "Vegetables",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d32",
    name: "Stir Fry Vegetable",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
  },

  // Pasta
  {
    id: "d33",
    name: "Spaghetti with Bechamel Sauce",
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d34",
    name: "Seafood Marinara",
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d35",
    name: "Creamy Carbonara",
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d36",
    name: "Baked Macaroni",
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d37",
    name: "Baked Lasagna",
    category: "Pasta",
    image:
      "https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d38",
    name: "Baked Spaghetti",
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=80",
  },

  // Noodles
  {
    id: "d39",
    name: "Sotanghon Guisado",
    category: "Noodles",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d40",
    name: "Pancit Canton",
    category: "Noodles",
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d41",
    name: "Bam-E",
    category: "Noodles",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
  },

  // Dessert
  {
    id: "d42",
    name: "Fresh Mix Fruits",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d43",
    name: "Mango Sago",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d44",
    name: "Buko Salad",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d45",
    name: "Buko Pandan",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d46",
    name: "Macaroni Salad",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  },

  // Drinks
  {
    id: "d47",
    name: "Iced Tea",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d48",
    name: "Blue Lemonade",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d49",
    name: "Red Iced Tea",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d50",
    name: "Pineapple Juice",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d51",
    name: "Soda (Coke/Sprite/Royal)",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
  },
];

export const MOCK_ADD_ONS: AddOnItem[] = [
  // Pica Pica
  {
    id: "ao1",
    name: "Pica Pica Package (30pax)",
    category: "Pica Pica",
    price: 4500,
    unit: "package",
    description:
      "Mango Float, Mini Burger, Mini Sandwich, Mini Hotdog, Carbonara, Garlic Bread, Cheese Sticks, Lumpia, Fresh Fruits, Juice",
  },

  // Lechon Belly
  {
    id: "ao2",
    name: "Lechon Belly 3kgs (Uncooked Weight)",
    category: "Lechon Belly",
    price: 3500,
    unit: "whole",
  },
  {
    id: "ao3",
    name: "Lechon Belly 5kgs (Uncooked Weight)",
    category: "Lechon Belly",
    price: 6500,
    unit: "whole",
  },

  // Food Tray - Beef
  {
    id: "ao4",
    name: "Bistek Tagalog",
    category: "Food Tray - Beef",
    price: 1100,
    unit: "tray (12-15pax)",
  },
  {
    id: "ao5",
    name: "Beef Caldereta",
    category: "Food Tray - Beef",
    price: 1100,
    unit: "tray (12-15pax)",
  },

  // Food Tray - Pork
  {
    id: "ao6",
    name: "Pork Menudo",
    category: "Food Tray - Pork",
    price: 900,
    unit: "tray (12-15pax)",
  },
  {
    id: "ao7",
    name: "Sweet & Sour Pork",
    category: "Food Tray - Pork",
    price: 900,
    unit: "tray (12-15pax)",
  },

  // Food Tray - Chicken
  {
    id: "ao8",
    name: "Chicken Cordon Bleu",
    category: "Food Tray - Chicken",
    price: 800,
    unit: "tray (12-15pax)",
  },
  {
    id: "ao9",
    name: "Buttered Chicken",
    category: "Food Tray - Chicken",
    price: 750,
    unit: "tray (12-15pax)",
  },

  // Food Tray - Seafoods
  {
    id: "ao10",
    name: "Sweet & Sour Fish Fillet",
    category: "Food Tray - Seafoods",
    price: 800,
    unit: "tray (12-15pax)",
  },
  {
    id: "ao11",
    name: "Buttered Garlic Shrimp",
    category: "Food Tray - Seafoods",
    price: 1200,
    unit: "tray (12-15pax)",
  },

  // Food Tray - Vegetables
  {
    id: "ao12",
    name: "Chopsuey",
    category: "Food Tray - Vegetables",
    price: 600,
    unit: "tray (12-15pax)",
  },
  {
    id: "ao13",
    name: "Buttered Mixed Veggies",
    category: "Food Tray - Vegetables",
    price: 600,
    unit: "tray (12-15pax)",
  },

  // Food Pack Lunch
  {
    id: "ao14",
    name: "Meal A",
    category: "Food Pack Lunch",
    price: 129,
    unit: "pack",
    description: "Chicken, Rice, Veggies",
  },
  {
    id: "ao15",
    name: "Meal B",
    category: "Food Pack Lunch",
    price: 149,
    unit: "pack",
    description: "Pork, Rice, Veggies, Dessert",
  },
];

export const MOCK_PACKAGES: CateringPackage[] = [
  {
    id: "p1",
    name: "Package A",
    pricePerHead: 280,
    description: "Standard Buffet Package",
    popular: false,
    minPax: 50,
    inclusions: [
      {
        name: "Main Dishes",
        categories: [
          "Beef",
          "Pork",
          "Fish & Seafoods",
          "Chicken",
          "Vegetables",
          "Noodles",
        ],
        count: 3,
      },
      { name: "Dessert", categories: ["Dessert"], count: 1 },
      { name: "Drinks", categories: ["Drinks"], count: 1 },
    ],
    addOns: ["Rice"],
  },
  {
    id: "p2",
    name: "Package B",
    pricePerHead: 310,
    description: "Deluxe Buffet Package",
    popular: true,
    minPax: 50,
    inclusions: [
      {
        name: "Main Dishes",
        categories: [
          "Beef",
          "Pork",
          "Fish & Seafoods",
          "Chicken",
          "Vegetables",
          "Noodles",
        ],
        count: 4,
      },
      { name: "Dessert", categories: ["Dessert"], count: 1 },
      { name: "Drinks", categories: ["Drinks"], count: 1 },
    ],
    addOns: ["Rice"],
  },
  {
    id: "p3",
    name: "Package C",
    pricePerHead: 350,
    description: "Premium Buffet Package",
    popular: false,
    minPax: 50,
    inclusions: [
      {
        name: "Main Dishes",
        categories: [
          "Beef",
          "Pork",
          "Fish & Seafoods",
          "Chicken",
          "Vegetables",
          "Noodles",
        ],
        count: 5,
      },
      { name: "Dessert", categories: ["Dessert"], count: 1 },
      { name: "Drinks", categories: ["Drinks"], count: 1 },
    ],
    addOns: ["Rice"],
  },
  {
    id: "p4",
    name: "Package D",
    pricePerHead: 380,
    description: "Grand Buffet Package",
    popular: false,
    minPax: 50,
    inclusions: [
      {
        name: "Main Dishes",
        categories: [
          "Beef",
          "Pork",
          "Fish & Seafoods",
          "Chicken",
          "Vegetables",
          "Noodles",
        ],
        count: 6,
      },
      { name: "Dessert", categories: ["Dessert"], count: 1 },
      { name: "Drinks", categories: ["Drinks"], count: 1 },
    ],
    addOns: ["Rice"],
  },
];

export const MOCK_STAFF: Staff[] = [
  {
    id: "s1",
    name: "Admin User",
    role: "Admin",
    email: "admin@zekcatering.com",
    active: true,
    phone: "09123456789",
    joinedDate: "2024-01-01",
  },
  {
    id: "s2",
    name: "Maria Cruz",
    role: "Staff",
    email: "maria@zekcatering.com",
    active: true,
    phone: "09987654321",
    joinedDate: "2024-03-15",
  },
  {
    id: "s3",
    name: "Juan Santos",
    role: "Staff",
    email: "juan@zekcatering.com",
    active: true,
    phone: "09112233445",
    joinedDate: "2024-06-20",
  },
  {
    id: "s4",
    name: "Pedro Reyes",
    role: "Staff",
    email: "pedro@zekcatering.com",
    active: false,
    phone: "09556677889",
    joinedDate: "2024-02-10",
  },
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "r1",
    clientName: "Alice Guo",
    eventType: "Wedding",
    date: "2025-12-24",
    guests: 150,
    packageId: "p1",
    packageName: "Grand Wedding Feast",
    status: "Confirmed",
    paymentStatus: "Deposit",
    amount: 127500,
    assignedStaffId: "s2",
    createdAt: "2025-12-01",
  },
  {
    id: "r2",
    clientName: "Tech Corp Inc.",
    eventType: "Corporate",
    date: "2025-12-28",
    guests: 50,
    packageId: "p2",
    packageName: "Corporate Executive Lunch",
    status: "Pending",
    paymentStatus: "Unpaid",
    amount: 22500,
    createdAt: "2025-12-20",
  },
  {
    id: "r3",
    clientName: "Barangay 143",
    eventType: "Fiesta",
    date: "2026-01-15",
    guests: 300,
    packageId: "p4",
    packageName: "Fiesta Buffet",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 180000,
    assignedStaffId: "s3",
    createdAt: "2025-11-15",
  },
  {
    id: "r4",
    clientName: "Baby James",
    eventType: "Birthday",
    date: "2026-01-05",
    guests: 80,
    packageId: "p3",
    packageName: "Kiddie Party Special",
    status: "Completed",
    paymentStatus: "Paid",
    amount: 28000,
    assignedStaffId: "s2",
    createdAt: "2025-10-10",
  },
  {
    id: "r5",
    clientName: "Deleted Event",
    eventType: "Meeting",
    date: "2025-12-22",
    guests: 20,
    packageId: "p2",
    packageName: "Corporate Executive Lunch",
    status: "Deleted",
    paymentStatus: "Unpaid",
    amount: 9000,
    createdAt: "2025-12-18",
  },
  {
    id: "r6",
    clientName: "John Doe",
    eventType: "Anniversary",
    date: "2026-02-14",
    guests: 20,
    packageId: "p1",
    packageName: "Grand Wedding Feast",
    status: "Pending",
    paymentStatus: "Overdue",
    amount: 17000,
    createdAt: "2025-12-21",
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Alice Guo",
    email: "alice@example.com",
    phone: "09123456789",
    totalOrders: 1,
    totalSpent: 127500,
    lastOrderDate: "2025-12-24",
    status: "Active",
  },
  {
    id: "c2",
    name: "Tech Corp Inc.",
    email: "contact@techcorp.com",
    phone: "02-8123-4567",
    totalOrders: 5,
    totalSpent: 150000,
    lastOrderDate: "2025-12-28",
    status: "Active",
  },
  {
    id: "c3",
    name: "Barangay 143",
    email: "brgy143@gov.ph",
    phone: "09987654321",
    totalOrders: 3,
    totalSpent: 320000,
    lastOrderDate: "2026-01-15",
    status: "Active",
  },
  {
    id: "c4",
    name: "Baby James",
    email: "parents@james.com",
    phone: "09112233445",
    totalOrders: 1,
    totalSpent: 28000,
    lastOrderDate: "2026-01-05",
    status: "Active",
  },
  {
    id: "c5",
    name: "John Doe",
    email: "john@doe.com",
    phone: "09556677889",
    totalOrders: 1,
    totalSpent: 17000,
    lastOrderDate: "2026-02-14",
    status: "Active",
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay1",
    reservationId: "r1",
    clientName: "Alice Guo",
    amount: 50000,
    method: "Bank Transfer",
    status: "Paid",
    date: "2025-12-05",
    referenceNo: "BPI-123456",
  },
  {
    id: "pay2",
    reservationId: "r3",
    clientName: "Barangay 143",
    amount: 180000,
    method: "Check",
    status: "Paid",
    date: "2025-11-20",
    referenceNo: "CHK-998877",
  },
  {
    id: "pay3",
    reservationId: "r4",
    clientName: "Baby James",
    amount: 28000,
    method: "Cash",
    status: "Paid",
    date: "2025-10-15",
  },
  {
    id: "pay4",
    reservationId: "r6",
    clientName: "John Doe",
    amount: 17000,
    method: "GCash",
    status: "Pending",
    date: "2025-12-21",
  },
];

export const MOCK_ACTIVITY_LOG: ActivityLog[] = [
  {
    id: "a1",
    user: "Maria Cruz",
    action: "Created reservation",
    target: "#R6 (John Doe)",
    time: "10 mins ago",
    type: "success",
  },
  {
    id: "a2",
    user: "Admin User",
    action: "Updated package",
    target: "Grand Wedding Feast",
    time: "1 hour ago",
    type: "info",
  },
  {
    id: "a3",
    user: "Juan Santos",
    action: "Marked as Paid",
    target: "#R3 (Barangay 143)",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: "a4",
    user: "System",
    action: "Payment Overdue Alert",
    target: "#R6 (John Doe)",
    time: "5 hours ago",
    type: "danger",
  },
  {
    id: "a5",
    user: "Maria Cruz",
    action: "Deleted reservation",
    target: "#R5 (Deleted Event)",
    time: "1 day ago",
    type: "warning",
  },
];

export const REVENUE_DATA = [
  { name: "Jan", revenue: 45000, visits: 1200, bounceRate: 45 },
  { name: "Feb", revenue: 52000, visits: 1350, bounceRate: 42 },
  { name: "Mar", revenue: 48000, visits: 1100, bounceRate: 48 },
  { name: "Apr", revenue: 61000, visits: 1500, bounceRate: 40 },
  { name: "May", revenue: 55000, visits: 1400, bounceRate: 43 },
  { name: "Jun", revenue: 67000, visits: 1600, bounceRate: 38 },
  { name: "Jul", revenue: 72000, visits: 1750, bounceRate: 35 },
  { name: "Aug", revenue: 85000, visits: 1900, bounceRate: 32 },
  { name: "Sep", revenue: 91000, visits: 2100, bounceRate: 30 },
  { name: "Oct", revenue: 88000, visits: 2000, bounceRate: 33 },
  { name: "Nov", revenue: 95000, visits: 2200, bounceRate: 28 },
  { name: "Dec", revenue: 124500, visits: 2500, bounceRate: 25 },
];
