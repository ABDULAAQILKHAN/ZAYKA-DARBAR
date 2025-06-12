"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
// import { useToast } from "@/hooks/use-toast" // Removed
// import { useToast } from "@/hooks/use-toast"
// import { useToast } from "@/hooks/use-toast"

export default function OrderSummary() {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const { items, getTotal, clearCart } = useCart()
  // const { toast } = useToast() // Removed

  const subtotal = getTotal()
  const deliveryFee = subtotal > 30 ? 0 : 3.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)

    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // toast({
    //   title: "Order placed successfully!",
    //   description: "Your order will be delivered in 30-45 minutes.",
    // })
    alert("Order placed successfully! Your order will be delivered in 30-45 minutes.")

    clearCart()
    setIsPlacingOrder(false)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Estimated delivery: 30-45 minutes</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder || items.length === 0}>
            {isPlacingOrder ? "Placing Order..." : `Place Order - $${total.toFixed(2)}`}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
