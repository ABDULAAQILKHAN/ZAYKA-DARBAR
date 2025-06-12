import type { Metadata } from "next"
import MenuManagement from "@/components/admin/menu-management"

export const metadata: Metadata = {
  title: "Menu Management - Zayka Admin",
  description: "Add, edit, and manage menu items",
}

export default function AdminMenuPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <MenuManagement />
    </div>
  )
}
