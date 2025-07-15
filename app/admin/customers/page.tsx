"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardBody, CardHeader, Input, Button, Chip, Tabs, Tab } from "@nextui-org/react"
import { Search, Filter, Download, Eye, Users, ShoppingCart, TrendingUp, IndianRupee } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { OrdersTable } from "@/components/admin/orders-table"
import { CustomerStats } from "@/components/admin/customer-stats"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const customerStats = [
    {
      title: "Total Customers",
      value: 156,
      icon: Users,
      color: "primary",
      change: "+12%",
    },
    {
      title: "Total Orders",
      value: 342,
      icon: ShoppingCart,
      color: "success",
      change: "+8%",
    },
    {
      title: "Revenue",
      value: "₹1,24,500",
      icon: IndianRupee,
      color: "secondary",
      change: "+15%",
    },
    {
      title: "Avg. Order Value",
      value: "₹364",
      icon: TrendingUp,
      color: "warning",
      change: "+3%",
    },
  ]

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600 mt-1">Manage customer orders and track sales performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button color="primary" variant="flat" startContent={<Download className="w-4 h-4" />}>
              Export Data
            </Button>
            <Button color="primary" startContent={<Eye className="w-4 h-4" />}>
              View Reports
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
                      <Chip size="sm" color={stat.change.startsWith("+") ? "success" : "danger"} variant="flat">
                        {stat.change}
                      </Chip>
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

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-xl font-semibold">Customer Orders</h3>
                <p className="text-gray-600">View and manage all customer orders</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  className="w-64"
                />
                <Button color="primary" variant="flat" startContent={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Order management">
              <Tab key="orders" title="All Orders">
                <OrdersTable searchTerm={searchTerm} filter="all" />
              </Tab>
              <Tab key="pending" title="Pending">
                <OrdersTable searchTerm={searchTerm} filter="pending" />
              </Tab>
              <Tab key="completed" title="Completed">
                <OrdersTable searchTerm={searchTerm} filter="completed" />
              </Tab>
              <Tab key="analytics" title="Analytics">
                <CustomerStats />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </motion.div>
    </AdminLayout>
  )
}
