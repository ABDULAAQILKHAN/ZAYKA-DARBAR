"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/cartSlice"
import { useGetAvailableMenuItemsQuery } from "@/store/menuApi"
import { toast } from "sonner"

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

function MenuItemCard({ item }: { item: any }) {
  const dispatch = useAppDispatch()
  const [size, setSize] = useState<"Full" | "Half">("Full")

  const currentPrice = size === "Full" ? item.fullPrice : (item.halfPrice || item.fullPrice)

  return (
    <motion.div variants={item} layout>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md flex flex-col">
        <div className="relative h-48 flex-shrink-0">
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
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <span className="font-medium text-zayka-600 dark:text-zayka-400">
              ₹{currentPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

          <div className="mt-auto space-y-4">
            {item.halfPrice && (
              <div className="flex items-center space-x-2 bg-secondary/50 p-1 rounded-lg w-fit">
                <Button
                  variant={size === "Full" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSize("Full")}
                  className="rounded-md h-7"
                >
                  Full
                </Button>
                <Button
                  variant={size === "Half" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSize("Half")}
                  className="rounded-md h-7"
                >
                  Half
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="truncate max-w-[100px]">{item.categoryId}</Badge>
              <Button
                size="sm"
                onClick={() => {
                  dispatch(addToCart({
                    id: item.id,
                    name: `${item.name} (${size})`,
                    price: currentPrice,
                    image: item.image,
                    quantity: 1,
                    size: size
                  }))
                  toast.success(`Added ${size} ${item.name} to cart`)
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MenuItemsContent() {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState("")

  useEffect(() => {
    // Only access search params after component mounts
    const categoryParam = searchParams.get("category") || ""
    setCategory(categoryParam)
  }, [searchParams])

  const { data: allMenuItems = [], isLoading } = useGetAvailableMenuItemsQuery({
    category: category || undefined
  })

  // Filter client-side if needed (though API handles it)
  const menuItems = category
    ? allMenuItems.filter(item => item.categoryId === category)
    : allMenuItems

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
        {menuItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
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

export default function MenuItems() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="flex items-center justify-center py-8">Loading menu...</div>
  }

  return <MenuItemsContent />
}
