"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getMenuItems, getAllCategories } from "@/lib/data"

export default function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const menuItems = getMenuItems(selectedCategory === "all" ? undefined : selectedCategory)
  const categories = getAllCategories()

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddItem = (formData: FormData) => {
    // In a real app, this would save to a database
    console.log("Adding new menu item:", Object.fromEntries(formData))
    setIsAddDialogOpen(false)
    alert("Menu item added successfully!")
  }

  const handleEditItem = (formData: FormData) => {
    // In a real app, this would update the database
    console.log("Updating menu item:", Object.fromEntries(formData))
    setEditingItem(null)
    alert("Menu item updated successfully!")
  }

  const handleDeleteItem = (itemId: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      // In a real app, this would delete from database
      console.log("Deleting item:", itemId)
      alert("Menu item deleted successfully!")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground mt-2">Add, edit, and manage your restaurant menu</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <MenuItemForm onSubmit={handleAddItem} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Menu Items Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge variant={item.isVeg ? "outline" : "default"}>{item.isVeg ? "Veg" : "Non-Veg"}</Badge>
                  {item.isSpicy && <Badge variant="destructive">Spicy</Badge>}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-bold text-zayka-600">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Menu Item</DialogTitle>
                        </DialogHeader>
                        <MenuItemForm item={item} onSubmit={handleEditItem} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No menu items found.</p>
        </div>
      )}
    </div>
  )
}

interface MenuItemFormProps {
  item?: any
  onSubmit: (formData: FormData) => void
}

function MenuItemForm({ item, onSubmit }: MenuItemFormProps) {
  const categories = getAllCategories()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={item?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" defaultValue={item?.price} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={item?.description} rows={3} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={item?.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            defaultValue={item?.image}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Switch id="isVeg" name="isVeg" defaultChecked={item?.isVeg} />
          <Label htmlFor="isVeg">Vegetarian</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="isSpicy" name="isSpicy" defaultChecked={item?.isSpicy} />
          <Label htmlFor="isSpicy">Spicy</Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">{item ? "Update Item" : "Add Item"}</Button>
      </div>
    </form>
  )
}
