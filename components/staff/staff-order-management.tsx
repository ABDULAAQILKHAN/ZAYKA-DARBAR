"use client"

import { useState } from "react"
import { formatCurrency } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Demo Data
const demoOrders = [
    {
        id: "ORD-DEMO-001",
        customer: "John Doe",
        items: ["Butter Chicken", "Garlic Naan (2)"],
        total: 22.97,
        status: "preparing",
        time: "10:30 AM",
    },
    {
        id: "ORD-DEMO-002",
        customer: "Jane Smith",
        items: ["Paneer Tikka", "Dal Makhani"],
        total: 19.98,
        status: "ready",
        time: "10:15 AM",
    },
    {
        id: "ORD-DEMO-003",
        customer: "Mike Johnson",
        items: ["Chicken Biryani"],
        total: 15.99,
        status: "pending",
        time: "10:45 AM",
    },
]

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "outline",
    preparing: "secondary",
    ready: "default",
    "out-for-delivery": "default",
    delivered: "default",
    cancelled: "destructive",
}

export default function StaffOrderManagement() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredOrders = demoOrders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Order Management (Demo)</h2>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.items.join(", ")}</TableCell>
                                    <TableCell>{formatCurrency(order.total)}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusColors[order.status] || "outline"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.time}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
