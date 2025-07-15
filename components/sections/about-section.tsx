import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Leaf, Heart } from "lucide-react"

export function AboutSection() {
  const stats = [
    { label: "Years of Experience", value: "25+", icon: Award },
    { label: "Happy Customers", value: "500+", icon: Users },
    { label: "Coconut Trees", value: "1000+", icon: Leaf },
    { label: "Organic Certified", value: "100%", icon: Heart },
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">About Surya Coconuts</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                For over two decades, Surya Coconuts has been a trusted name in providing premium quality coconut
                products. Our family-owned farm spans across lush green acres, where we grow coconuts using traditional,
                sustainable methods.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in the power of nature and the importance of preserving our environment. Every coconut is
                hand-picked at the perfect ripeness, ensuring you get the freshest and most nutritious products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Surya Coconuts farm"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">100% Organic</div>
                  <div className="text-sm text-gray-600">Certified by NPOP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
