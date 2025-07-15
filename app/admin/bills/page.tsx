"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardBody, CardHeader, Input, Button, Chip } from "@nextui-omotionrg/react"
import { Search, Download, FileText, Calendar, Filter } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BillsTable } from "@/components/admin/bills-table"

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const billStats = [
    {
      title: "Total Invoices",
      value: 342,
      icon: FileText,
      color: "primary",
      change: "+23 this month",
    },
    {
      title: "Paid Invoices",
      value: 298,
      icon: "✓",
      color: "success",
      change: "87% paid rate",
    },
    {
      title: "Pending Payment",
      value: 44,
      icon: "⏳",
      color: "warning",
      change: "₹16,240 pending",
    },
    {
      title: "This Month Revenue",
      value: "₹28,450",
      icon: "₹",
      color: "secondary",
      change: "+15% vs last month",
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
            <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600 mt-1">Generate, view, and manage customer invoices</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button color="primary" variant="flat" startContent={<Download className="w-4 h-4" />}>
              Export All
            </Button>
            <Button color="primary" startContent={<FileText className="w-4 h-4" />}>
              Generate Invoice
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {billStats.map((stat, index) => (
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
                    <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 font-bold text-lg`}>
                      {typeof stat.icon === "string" ? stat.icon : <stat.icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <Chip size="sm" color="default" variant="flat">
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

        {/* Bills Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-xl font-semibold">All Invoices</h3>
                <p className="text-gray-600">View, download, and manage customer invoices</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  className="w-64"
                />
                <Button color="primary" variant="flat" startContent={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
                <Button color="primary" variant="flat" startContent={<Calendar className="w-4 h-4" />}>
                  Date Range
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <BillsTable searchTerm={searchTerm} />
          </CardBody>
        </Card>
      </motion.div>
    </AdminLayout>
  )
}
