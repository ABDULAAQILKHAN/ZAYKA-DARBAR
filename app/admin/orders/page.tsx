import type { Metadata } from "next"
import LiveOrders from "@/components/admin/live-orders"

export const metadata: Metadata = {
  title: "Live Orders - Zayka Admin",
  description: "Manage current live orders",
}

export default function AdminOrdersPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <LiveOrders />
    </div>
  )
}
