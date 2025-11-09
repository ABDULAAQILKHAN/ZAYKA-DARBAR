"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, ShoppingBag, Clock, DollarSign, Plus, Settings } from "lucide-react"

const stats = [
  {
    title: "Total Orders Today",
    value: "47",
    change: "+12%",
    icon: ShoppingBag,
    color: "text-blue-600",
  },
  {
    title: "Revenue Today",
    value: "$1,247",
    change: "+8%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Orders",
    value: "8",
    change: "Live",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Menu Items",
    value: "42",
    change: "Active",
    icon: ChefHat,
    color: "text-purple-600",
  },
]

const quickActions = [
  {
    title: "Offers & Specials",
    description: "Manage special offers and today's specials",
    href: "/admin/offers",
    icon: Plus,
    color: "bg-zayka-600 hover:bg-zayka-700",
  },
  {
    title: "Manage Orders",
    description: "View and manage live orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Menu Management",
    description: "Edit existing menu items",
    href: "/admin/menu",
    icon: ChefHat,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Settings",
    description: "Restaurant settings and preferences",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-gray-600 hover:bg-gray-700",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: ["Butter Chicken", "Garlic Naan"],
    total: 18.98,
    status: "preparing",
    time: "5 min ago",
  },
  {
    id: "ORD-002",
    customer: "Sarah Smith",
    items: ["Paneer Tikka", "Dal Makhani"],
    total: 24.98,
    status: "ready",
    time: "12 min ago",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    items: ["Chicken Biryani"],
    total: 15.99,
    status: "delivered",
    time: "25 min ago",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening at Zayka today.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/admin/menu">
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from yesterday
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used admin functions</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50 w-full">
                    <action.icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{order.id}</span>
                      <Badge
                        variant={
                          order.status === "delivered" ? "default" : order.status === "ready" ? "secondary" : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
