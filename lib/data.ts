export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isVeg: boolean
  isSpicy?: boolean
}

export interface Category {
  id: string
  name: string
  count: number
}

const menuItems: MenuItem[] = [
  // Starters
  {
    id: "starter1",
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "starters",
    isVeg: true,
  },
  {
    id: "starter2",
    name: "Chicken Tikka",
    description: "Marinated chicken pieces grilled to perfection",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "starters",
    isVeg: false,
    isSpicy: true,
  },
  {
    id: "starter3",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with bell peppers and onions",
    price: 7.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "starters",
    isVeg: true,
  },

  // Main Course
  {
    id: "main1",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "main-course",
    isVeg: false,
  },
  {
    id: "main2",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked with butter and spices",
    price: 11.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "main-course",
    isVeg: true,
  },
  {
    id: "main3",
    name: "Lamb Curry",
    description: "Tender lamb cooked in aromatic spices and herbs",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "main-course",
    isVeg: false,
    isSpicy: true,
  },

  // Chicken
  {
    id: "chicken1",
    name: "Chicken Biryani",
    description: "Fragrant rice dish with chicken and aromatic spices",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "chicken",
    isVeg: false,
  },
  {
    id: "chicken2",
    name: "Chicken Korma",
    description: "Mild chicken curry in a creamy coconut sauce",
    price: 13.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "chicken",
    isVeg: false,
  },
  {
    id: "chicken3",
    name: "Chicken Vindaloo",
    description: "Spicy chicken curry with potatoes in tangy sauce",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "chicken",
    isVeg: false,
    isSpicy: true,
  },

  // Vegetarian
  {
    id: "veg1",
    name: "Paneer Makhani",
    description: "Cottage cheese in rich tomato and cream sauce",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "vegetarian",
    isVeg: true,
  },
  {
    id: "veg2",
    name: "Aloo Gobi",
    description: "Cauliflower and potatoes cooked with turmeric and spices",
    price: 10.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "vegetarian",
    isVeg: true,
  },
  {
    id: "veg3",
    name: "Palak Paneer",
    description: "Cottage cheese in creamy spinach gravy",
    price: 11.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "vegetarian",
    isVeg: true,
  },

  // Breads
  {
    id: "bread1",
    name: "Garlic Naan",
    description: "Soft bread with garlic and butter",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "breads",
    isVeg: true,
  },
  {
    id: "bread2",
    name: "Butter Naan",
    description: "Classic soft bread with butter",
    price: 2.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "breads",
    isVeg: true,
  },
  {
    id: "bread3",
    name: "Roti",
    description: "Whole wheat flatbread",
    price: 2.49,
    image: "/placeholder.svg?height=300&width=300",
    category: "breads",
    isVeg: true,
  },

  // Desserts
  {
    id: "dessert1",
    name: "Gulab Jamun",
    description: "Sweet milk dumplings in sugar syrup",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "desserts",
    isVeg: true,
  },
  {
    id: "dessert2",
    name: "Kulfi",
    description: "Traditional Indian ice cream with cardamom",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "desserts",
    isVeg: true,
  },
  {
    id: "dessert3",
    name: "Ras Malai",
    description: "Soft cheese dumplings in sweet milk",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "desserts",
    isVeg: true,
  },
]

const categories: Category[] = [
  { id: "starters", name: "Starters", count: 3 },
  { id: "main-course", name: "Main Course", count: 3 },
  { id: "chicken", name: "Chicken", count: 3 },
  { id: "vegetarian", name: "Vegetarian", count: 3 },
  { id: "breads", name: "Breads", count: 3 },
  { id: "desserts", name: "Desserts", count: 3 },
]

export function getAllCategories(): Category[] {
  return categories
}

export function getMenuItems(categoryId = "all"): MenuItem[] {
  if (categoryId === "all") {
    return menuItems
  }
  return menuItems.filter((item) => item.category === categoryId)
}

export function getMenuItem(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}
