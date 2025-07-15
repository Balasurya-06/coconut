"use client"

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react"
import { Plus, FileText, Users, TrendingUp } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Add New Product",
      description: "Add a new coconut product",
      icon: Plus,
      color: "primary",
    },
    {
      title: "Generate Report",
      description: "Create sales report",
      icon: FileText,
      color: "secondary",
    },
    {
      title: "View Customers",
      description: "Manage customer data",
      icon: Users,
      color: "success",
    },
    {
      title: "Market Analysis",
      description: "Check price trends",
      icon: TrendingUp,
      color: "warning",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-xl font-semibold">Quick Actions</h3>
          <p className="text-gray-600">Common tasks and shortcuts</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="flat"
              color={action.color as any}
              className="w-full justify-start h-auto p-4"
              startContent={<action.icon className="w-5 h-5" />}
            >
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-sm opacity-70">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
