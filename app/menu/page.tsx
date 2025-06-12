import type { Metadata } from "next"
import MenuHeader from "@/components/menu/menu-header"
import MenuCategories from "@/components/menu/menu-categories"
import MenuItems from "@/components/menu/menu-items"
import { getAllCategories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Menu - Zayka Restaurant",
  description: "Explore our delicious menu options",
}

export default function MenuPage() {
  const categories = getAllCategories()

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <MenuHeader />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mt-8">
        <MenuCategories categories={categories} />
        <MenuItems />
      </div>
    </div>
  )
}
