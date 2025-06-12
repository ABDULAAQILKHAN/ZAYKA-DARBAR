import type { Metadata } from "next"
import CartItems from "@/components/cart/cart-items"
import CartSummary from "@/components/cart/cart-summary"

export const metadata: Metadata = {
  title: "Cart - Zayka Restaurant",
  description: "View your cart items",
}

export default function CartPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <CartItems />
        <CartSummary />
      </div>
    </div>
  )
}
