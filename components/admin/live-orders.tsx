"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, Truck, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    address: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "preparing" | "ready" | "out-for-delivery" | "delivered"
  orderTime: string
  estimatedTime: string
  paymentMethod: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Apt 4B, New York, NY 10001",
    },
    items: [
      { name: "Butter Chicken", quantity: 1, price: 14.99 },
      { name: "Garlic Naan", quantity: 2, price: 3.99 },
    ],
    total: 22.97,
    status: "preparing",
    orderTime: "2:30 PM",
    estimatedTime: "3:15 PM",
    paymentMethod: "Card",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Sarah Smith",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Brooklyn, NY 11201",
    },
    items: [
      { name: "Paneer Tikka", quantity: 1, price: 7.99 },
      { name: "Dal Makhani", quantity: 1, price: 11.99 },
      { name: "Butter Naan", quantity: 1, price: 2.99 },
    ],
    total: 22.97,
    status: "ready",
    orderTime: "2:15 PM",
    estimatedTime: "3:00 PM",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Manhattan, NY 10002",
    },
    items: [{ name: "Chicken Biryani", quantity: 1, price: 15.99 }],
    total: 15.99,
    status: "out-for-delivery",
    orderTime: "1:45 PM",
    estimatedTime: "2:30 PM",
    paymentMethod: "Cash",
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-500", icon: AlertCircle, label: "Pending" },
  preparing: { color: "bg-blue-500", icon: Clock, label: "Preparing" },
  ready: { color: "bg-green-500", icon: CheckCircle, label: "Ready" },
  "out-for-delivery": { color: "bg-purple-500", icon: Truck, label: "Out for Delivery" },
  delivered: { color: "bg-gray-500", icon: CheckCircle, label: "Delivered" },
}

export default function LiveOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredOrders = orders.filter((order) => filterStatus === "all" || order.status === filterStatus)

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    alert(`Order ${orderId} status updated to ${newStatus}`)
  }

  const getNextStatus = (currentStatus: Order["status"]): Order["status"] | null => {
    const statusFlow: Record<Order["status"], Order["status"] | null> = {
      pending: "preparing",
      preparing: "ready",
      ready: "out-for-delivery",
      "out-for-delivery": "delivered",
      delivered: null,
    }
    return statusFlow[currentStatus]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Orders</h1>
          <p className="text-muted-foreground mt-2">Manage and track current orders</p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orders.filter((order) => order.status === status).length
          return (
            <Card key={status}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <span className="text-sm font-medium">{config.label}</span>
                </div>
                <p className="text-2xl font-bold mt-2">{count}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Orders List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status]
          const nextStatus = getNextStatus(order.status)

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <config.icon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Customer Details</h4>
                      <p className="text-sm">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.address}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Order Items</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      <p>Ordered: {order.orderTime}</p>
                      <p>ETA: {order.estimatedTime}</p>
                    </div>
                    {nextStatus && (
                      <Button onClick={() => updateOrderStatus(order.id, nextStatus)} size="sm">
                        Mark as {statusConfig[nextStatus].label}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders found for the selected filter.</p>
        </div>
      )}
    </div>
  )
}
