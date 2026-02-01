import ReceptionistMenuManagement from "@/components/receptionist/receptionist-menu-management"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Receptionist Menu - Zayka",
    description: "Manage menu visibility",
}

export default function ReceptionistMenuPage() {
    return (
        <div className="container mx-auto py-6">
            <ReceptionistMenuManagement />
        </div>
    )
}
