"use client"

import { motion } from "framer-motion"
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react"
import { TrendingUp, TrendingDown, Users, ShoppingCart, IndianRupee, Package } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      change: "+15.2%",
      trend: "up",
      icon: IndianRupee,
      color: "success",
    },
    {
      title: "Total Orders",
      value: "342",
      change: "+8.7%",
      trend: "up",
      icon: ShoppingCart,
      color: "primary",
    },
    {
      title: "Active Customers",
      value: "156",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "secondary",
    },
    {
      title: "Products Sold",
      value: "1,847",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "warning",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-success-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-danger-600" />
                    )}
                    <Chip size="sm" color={stat.trend === "up" ? "success" : "danger"} variant="flat">
                      {stat.change}
                    </Chip>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
