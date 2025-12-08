"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { removeFromCart, updateQuantity } from "@/store/cartSlice"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function CartItems() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button asChild>
          <a href="/menu">Browse Menu</a>
        </Button>
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      {items.map((item) => (
        <motion.div key={item.cartItemId} variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">₹{item.price.toFixed(2)} each</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => dispatch(updateQuantity({ id: item.cartItemId, quantity: Math.max(0, item.quantity - 1) }))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => dispatch(updateQuantity({ id: item.cartItemId, quantity: item.quantity + 1 }))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => dispatch(removeFromCart(item.cartItemId))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
