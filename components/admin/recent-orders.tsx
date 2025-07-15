"use client"

import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react"
import { Eye } from "lucide-react"

export function RecentOrders() {
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Rajesh Kumar",
      product: "Fresh Coconuts x5",
      amount: "₹150",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      product: "Tender Coconuts x3",
      amount: "₹105",
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      customer: "Amit Patel",
      product: "Coconut Oil x2",
      amount: "₹440",
      status: "completed",
      date: "2024-01-13",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-xl font-semibold">Recent Orders</h3>
            <p className="text-gray-600">Latest customer orders</p>
          </div>
          <Button color="primary" variant="flat">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold">{order.amount}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <Chip color={order.status === "completed" ? "success" : "warning"} size="sm" variant="flat">
                  {order.status}
                </Chip>
                <Button isIconOnly variant="light" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
