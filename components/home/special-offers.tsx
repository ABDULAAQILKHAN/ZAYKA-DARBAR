"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const offers = [
  {
    id: 1,
    title: "30% OFF on First Order",
    description: "Use code WELCOME30 at checkout",
    image: "/offer.png?height=300&width=300",
    link: "/menu",
  },
  {
    id: 2,
    title: "Family Combo Deal",
    description: "4 main courses, 2 sides, and drinks at 20% off",
    image: "/family combo.png?height=300&width=300",
    link: "/menu",
  },
  {
    id: 3,
    title: "Free Delivery",
    description: "On orders above $30",
    image: "/free delivery.png?height=300&width=300",
    link: "/menu",
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

export default function SpecialOffers() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
          <p className="text-muted-foreground mt-2">Exclusive deals you don't want to miss</p>
        </div>
        <Button variant="link" asChild className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
          <Link href="/menu">
            View all offers
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {offers.map((offer) => (
          <motion.div key={offer.id} variants={item}>
            <Link href={offer.link}>
              <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                <div className="relative h-[400px]">
                  <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-fill" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground">{offer.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-8 md:hidden">
        <Button variant="link" asChild className="flex items-center gap-2">
          <Link href="/menu">
            View all offers
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
