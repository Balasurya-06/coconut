"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star, Droplets, Package, BoxIcon as Bottle, Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { createOrder } from "@/lib/firestore"

interface Product {
  id: number
  name: string
  description: string
  price: number
  unit: string
  image: string
  icon: any
  features: string[]
  inStock: boolean
}

interface ProductGridProps {
  onAddToCart: () => void
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const { toast } = useToast()
  const { user } = useAuth()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    address: "",
    phone: user?.phone || "",
  })
  const [loading, setLoading] = useState(false)

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Coconuts",
      description: "Hand-picked fresh coconuts with sweet water and tender meat",
      price: 30,
      unit: "per piece",
      image: "/placeholder.svg?height=300&width=300",
      icon: Star,
      features: ["Rich in electrolytes", "Natural hydration", "Fresh from farm"],
      inStock: true,
    },
    {
      id: 2,
      name: "Tender Coconuts",
      description: "Young coconuts perfect for drinking fresh coconut water",
      price: 35,
      unit: "per piece",
      image: "/placeholder.svg?height=300&width=300",
      icon: Droplets,
      features: ["100% natural", "High in potassium", "Refreshing taste"],
      inStock: true,
    },
    {
      id: 3,
      name: "Copra (Dried)",
      description: "Premium quality dried coconut meat, perfect for oil extraction",
      price: 180,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
      icon: Package,
      features: ["Sun-dried naturally", "High oil content", "Premium grade"],
      inStock: true,
    },
    {
      id: 4,
      name: "Coconut Oil",
      description: "Pure cold-pressed coconut oil extracted from fresh copra",
      price: 220,
      unit: "per liter",
      image: "/placeholder.svg?height=300&width=300",
      icon: Bottle,
      features: ["Cold-pressed", "No additives", "Traditional method"],
      inStock: true,
    },
  ]

  const handleOrder = async () => {
    if (!selectedProduct || !customerInfo.name || !customerInfo.address || !customerInfo.phone || !user) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const orderData = {
        customerId: user.id,
        customerName: customerInfo.name,
        customerEmail: user.email,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        products: [
          {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: quantity,
            unit: selectedProduct.unit,
          },
        ],
        total: selectedProduct.price * quantity,
        status: "pending" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await createOrder(orderData)

      toast({
        title: "Order Placed Successfully!",
        description: `Your order for ${quantity} ${selectedProduct.name} has been placed. Total: ₹${selectedProduct.price * quantity}`,
      })

      onAddToCart()
      setSelectedProduct(null)
      setQuantity(1)
      setCustomerInfo({ name: user?.name || "", address: "", phone: user?.phone || "" })
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <div className="relative mb-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <product.icon className="w-5 h-5 text-green-600" />
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>

            <CardTitle className="text-xl font-bold text-gray-900 mb-2">{product.name}</CardTitle>
            <CardDescription className="text-gray-600 text-sm leading-relaxed">{product.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{product.price}</div>
              <div className="text-sm text-gray-500">{product.unit}</div>
            </div>

            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!product.inStock} onClick={() => setSelectedProduct(product)}>
                  {product.inStock ? "Order Now" : "Out of Stock"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Place Order - {selectedProduct?.name}</DialogTitle>
                  <DialogDescription>Fill in your details to place an order for this product.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{selectedProduct?.name}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{selectedProduct?.price} {selectedProduct?.unit}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your complete delivery address"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{selectedProduct ? selectedProduct.price * quantity : 0}
                    </span>
                  </div>

                  <Button onClick={handleOrder} className="w-full" disabled={loading}>
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
