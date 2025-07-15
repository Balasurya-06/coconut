"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function SalesChart() {
  const data = [
    { name: "Jan", sales: 4000, orders: 24 },
    { name: "Feb", sales: 3000, orders: 18 },
    { name: "Mar", sales: 5000, orders: 32 },
    { name: "Apr", sales: 4500, orders: 28 },
    { name: "May", sales: 6000, orders: 38 },
    { name: "Jun", sales: 5500, orders: 35 },
  ]

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-xl font-semibold">Sales Overview</h3>
          <p className="text-gray-600">Monthly sales and order trends</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#059669" />
              <Bar dataKey="orders" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
