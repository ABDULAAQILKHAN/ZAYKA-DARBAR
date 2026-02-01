import ReceptionistOrderManagement from "@/components/receptionist/receptionist-order-management"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Receptionist Orders - Zayka",
    description: "Manage restaurant orders",
}

export default function ReceptionistOrdersPage() {
    return (
        <div className="container mx-auto py-6">
            <ReceptionistOrderManagement />
        </div>
    )
}
