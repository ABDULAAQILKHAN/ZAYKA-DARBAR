"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { useAppSelector } from "@/store/hooks"
import { useCreateOrderMutation } from "@/store/ordersApi"
import { useGetCartQuery, useClearCartMutation, CartItem } from "@/store/cartApi"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const router = useRouter()
  const token = useAppSelector((state) => state.auth.token)
  const { data: cartData } = useGetCartQuery(undefined, { skip: !token })
  const items: CartItem[] = Array.isArray(cartData) ? cartData : []
  const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation()
  const [clearCart] = useClearCartMutation()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const handleApplyCoupon = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsApplyingCoupon(true)
    // Simulate coupon validation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsApplyingCoupon(false)
    toast.success("Coupon applied!")
  }

  const onSubmit = async (data: any) => {
    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    try {
      const deliveryAddress = `${data.address}, ${data.city}, ${data.zipCode}`

      await createOrder({
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          id: item.id
        })),
        total: total + (total > 30 ? 0 : 3.99) + (total * 0.08), // Recalculate total including tax/delivery
        delivery_address: deliveryAddress
      }).unwrap()

      await clearCart().unwrap()
      toast.success("Order placed successfully!")
      router.push("/orders")
    } catch (error) {
      console.error("Failed to place order:", error)
      toast.error("Failed to place order. Please try again.")
    }
  }

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName", { required: true })} placeholder="John" />
                {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName", { required: true })} placeholder="Doe" />
                {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: true })} placeholder="john@example.com" />
              {errors.email && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...register("phone", { required: true })} placeholder="+1 (555) 123-4567" />
              {errors.phone && <span className="text-red-500 text-xs">Required</span>}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" {...register("address", { required: true })} placeholder="123 Main Street" />
              {errors.address && <span className="text-red-500 text-xs">Required</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city", { required: true })} placeholder="New York" />
                {errors.city && <span className="text-red-500 text-xs">Required</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input id="zipCode" {...register("zipCode", { required: true })} placeholder="10001" />
                {errors.zipCode && <span className="text-red-500 text-xs">Required</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
              <Textarea id="instructions" {...register("instructions")} placeholder="Leave at door, ring bell, etc." rows={3} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Coupon Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button variant="outline" onClick={handleApplyCoupon} disabled={!couponCode || isApplyingCoupon}>
                {isApplyingCoupon ? "Applying..." : "Apply"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash on Delivery</Label>
              </div>
            </RadioGroup>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </form>
  )
}
