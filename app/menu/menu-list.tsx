"use client"

import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useGetAvailableMenuItemsQuery } from "@/store/menuApi"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function MenuList() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""
  const { addItem } = useCart()

  const { data: allMenuItems = [], isLoading } = useGetAvailableMenuItemsQuery({
    category: category || undefined
  })

  const menuItems = category ? allMenuItems.filter(menuItem => menuItem.categoryId === category) : allMenuItems

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zayka-600"></div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {menuItems.map((menuItem) => (
          <motion.div key={menuItem.id} variants={itemVariants} layout>
            <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
              <div className="relative h-48">
                <Image src={menuItem.image || "/placeholder.svg"} alt={menuItem.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2" variant={menuItem.isVeg ? "green" : "destructive"}>
                  {menuItem.isVeg ? "Veg" : "Non-Veg"}
                </Badge>
                {menuItem.isSpicy && (
                  <Badge className="absolute top-2 left-2" variant="destructive">
                    Spicy
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{menuItem.name}</h3>
                  <span className="font-medium text-zayka-600 dark:text-zayka-400">${menuItem.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{menuItem.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{menuItem.category}</Badge>
                  <Button
                    size="sm"
                    onClick={() =>
                      addItem({
                        id: menuItem.id,
                        name: menuItem.name,
                        price: menuItem.price,
                        image: menuItem.image,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {menuItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  )
}
