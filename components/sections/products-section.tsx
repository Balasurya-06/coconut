import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Droplets, Package, BoxIcon as Bottle } from "lucide-react"

export function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Fresh Coconuts",
      description: "Hand-picked fresh coconuts with sweet water and tender meat",
      price: "₹30",
      unit: "per piece",
      image: "/placeholder.svg?height=300&width=300",
      icon: Star,
      features: ["Rich in electrolytes", "Natural hydration", "Fresh from farm"],
      popular: true,
    },
    {
      id: 2,
      name: "Tender Coconuts",
      description: "Young coconuts perfect for drinking fresh coconut water",
      price: "₹35",
      unit: "per piece",
      image: "/placeholder.svg?height=300&width=300",
      icon: Droplets,
      features: ["100% natural", "High in potassium", "Refreshing taste"],
      popular: false,
    },
    {
      id: 3,
      name: "Copra (Dried)",
      description: "Premium quality dried coconut meat, perfect for oil extraction",
      price: "₹180",
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
      icon: Package,
      features: ["Sun-dried naturally", "High oil content", "Premium grade"],
      popular: false,
    },
    {
      id: 4,
      name: "Coconut Oil",
      description: "Pure cold-pressed coconut oil extracted from fresh copra",
      price: "₹220",
      unit: "per liter",
      image: "/placeholder.svg?height=300&width=300",
      icon: Bottle,
      features: ["Cold-pressed", "No additives", "Traditional method"],
      popular: true,
    },
  ]

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Premium Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of fresh coconut products, each carefully selected and processed to bring you the finest
            quality from our farm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-green-600 text-white px-3 py-1">Popular</Badge>
                </div>
              )}

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
                </div>

                <CardTitle className="text-xl font-bold text-gray-900 mb-2">{product.name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{product.price}</div>
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

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to experience the freshness? Sign up to place your first order.</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  )
}
