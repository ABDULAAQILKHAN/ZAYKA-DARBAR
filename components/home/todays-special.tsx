"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

const specialItems = [
  {
    id: "special1",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Main Course",
    isVeg: false,
  },
  {
    id: "special2",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in a spiced tomato gravy",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "special3",
    name: "Chicken Biryani",
    description: "Fragrant rice dish with chicken and aromatic spices",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Rice",
    isVeg: false,
  },
  {
    id: "special4",
    name: "Garlic Naan",
    description: "Soft bread with garlic and butter",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bread",
    isVeg: true,
  },
]

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

export default function TodaysSpecial() {
  const { addItem } = useCart()

  return (
    <section className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Today's Special</h2>
          <p className="text-muted-foreground mt-2">Chef's recommendations for the day</p>
        </div>
        <Button variant="link" asChild className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
          <Link href="/menu">
            View full menu
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {specialItems.map((item) => (
          <motion.div key={item.id} variants={item}>
            <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2" variant={item.isVeg ? "green" : "default"}>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <span className="font-medium text-zayka-600 dark:text-zayka-400">₹{item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <Badge variant="secondary" className="mt-2">
                  {item.category}
                </Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
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
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-8 md:hidden">
        <Button variant="link" asChild className="flex items-center gap-2">
          <Link href="/menu">
            View full menu
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
