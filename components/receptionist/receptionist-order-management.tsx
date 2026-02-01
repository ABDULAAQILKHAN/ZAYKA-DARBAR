"use client"

import { useState } from "react"
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/store/ordersApi"
import { formatCurrency, formatOrderDate } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Loader2 } from "lucide-react"
import { toast } from "sonner"

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "outline",
    preparing: "secondary",
    ready: "default",
    "out-for-delivery": "default",
    delivered: "default",
    cancelled: "destructive",
}

export default function ReceptionistOrderManagement() {
    // Polling every 15 seconds
    const { data: orders = [], isLoading, isFetching } = useGetAllOrdersQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnReconnect: true
    })
    const [updateStatus] = useUpdateOrderStatusMutation()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await updateStatus({ id: orderId, status: newStatus }).unwrap()
            toast.success(`Order ${orderId} status updated to ${newStatus}`)
        } catch (error) {
            toast.error("Failed to update order status")
        }
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-32">Loading orders...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">Order Monitoring</h2>
                    {isFetching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 max-w-sm w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                                    <TableCell>
                                        {(() => {
                                            const { date, time } = formatOrderDate(order.createdAt)
                                            return (
                                                <div className="flex flex-col">
                                                    <span>{date}</span>
                                                    <span className="text-xs text-muted-foreground">{time}</span>
                                                </div>
                                            )
                                        })()}
                                    </TableCell>
                                    <TableCell>
                                        {order.customerName || "Walk-in"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {order.items.slice(0, 3).map((item, i) => (
                                                <span key={i} className="text-sm">
                                                    {item.quantity}x {item.name}
                                                </span>
                                            ))}
                                            {order.items.length > 3 && (
                                                <span className="text-xs text-muted-foreground">+{order.items.length - 3} more</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatCurrency(order.total)}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusColors[order.status] || "outline"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={order.status}
                                            onValueChange={(value) => handleStatusChange(order.id, value)}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="preparing">Preparing</SelectItem>
                                                <SelectItem value="ready">Ready</SelectItem>
                                                <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
