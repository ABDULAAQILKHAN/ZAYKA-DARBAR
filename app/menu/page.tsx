"use client"

import { Suspense } from "react"
import MenuHeader from "@/components/menu/menu-header"
import MenuCategories from "@/components/menu/menu-categories"
import MenuItems from "@/components/menu/menu-items"
import { getAllCategories } from "@/lib/data"

function MenuItemsWithSuspense() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-8">Loading menu...</div>}>
      <MenuItems />
    </Suspense>
  )
}

export default function MenuPage() {
  const categories = getAllCategories()

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <MenuHeader />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mt-8">
        <MenuCategories categories={categories} />
        <MenuItemsWithSuspense />
      </div>
    </div>
  )
}
