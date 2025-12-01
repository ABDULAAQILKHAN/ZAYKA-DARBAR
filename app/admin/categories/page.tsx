import type { Metadata } from "next"
import CategoryManagement from "@/components/admin/category-management"

export const metadata: Metadata = {
    title: "Category Management - Zayka Admin",
    description: "Add, edit, and manage menu categories",
}

export default function AdminCategoriesPage() {
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <CategoryManagement />
        </div>
    )
}
