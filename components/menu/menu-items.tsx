"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { getMenuItems } from "@/lib/data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function MenuItems() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "all"
  const [menuItems, setMenuItems] = useState<any[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    const items = getMenuItems(category)
    setMenuItems(items)
  }, [category])

  return (
    <div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {menuItems.map((item) => (
          <motion.div key={item.id} variants={item} layout>
            <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2" variant={item.isVeg ? "outline" : "default"}>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </Badge>
                {item.isSpicy && (
                  <Badge className="absolute top-2 left-2" variant="destructive">
                    Spicy
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <span className="font-medium text-zayka-600 dark:text-zayka-400">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Button
                    size="sm"
                    onClick={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
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
