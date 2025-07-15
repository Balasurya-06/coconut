"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardBody, CardHeader, Input, Button, Tabs, Tab, Chip } from "@nextui-org/react"
import { TreePine, Droplets, Package, TrendingUp, Calendar, Edit3, Save, X } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { updateFarmData, type FarmData } from "@/lib/firestore"

export default function FarmPage() {
  const [farmData, setFarmData] = useState<FarmData>({
    coconutsSold: 1250,
    copraSold: 85,
    tenderCoconutsSold: 320,
    lastUpdated: new Date().toISOString(),
  })
  const [editing, setEditing] = useState(false)
  const [tempData, setTempData] = useState(farmData)

  const handleSave = async () => {
    try {
      await updateFarmData(tempData)
      setFarmData(tempData)
      setEditing(false)
    } catch (error) {
      console.error("Error updating farm data:", error)
    }
  }

  const stats = [
    {
      title: "Coconuts Sold",
      value: farmData.coconutsSold,
      icon: TreePine,
      color: "success",
      unit: "pieces",
      change: "+12%",
    },
    {
      title: "Copra Sold",
      value: farmData.copraSold,
      icon: Package,
      color: "warning",
      unit: "kg",
      change: "+8%",
    },
    {
      title: "Tender Coconuts",
      value: farmData.tenderCoconutsSold,
      icon: Droplets,
      color: "primary",
      unit: "pieces",
      change: "+15%",
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
            <h1 className="text-3xl font-bold text-gray-900">Farm Management</h1>
            <p className="text-gray-600 mt-1">Track your farm's production and inventory</p>
          </div>
          <div className="flex items-center space-x-2">
            <Chip variant="flat" color="success">
              <Calendar className="w-4 h-4 mr-1" />
              Updated: {new Date(farmData.lastUpdated).toLocaleDateString()}
            </Chip>
            {!editing ? (
              <Button
                color="primary"
                variant="flat"
                startContent={<Edit3 className="w-4 h-4" />}
                onClick={() => setEditing(true)}
              >
                Edit Data
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button color="success" startContent={<Save className="w-4 h-4" />} onClick={handleSave}>
                  Save
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  startContent={<X className="w-4 h-4" />}
                  onClick={() => {
                    setTempData(farmData)
                    setEditing(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
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
                  {editing ? (
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={
                          stat.title === "Coconuts Sold"
                            ? tempData.coconutsSold.toString()
                            : stat.title === "Copra Sold"
                              ? tempData.copraSold.toString()
                              : tempData.tenderCoconutsSold.toString()
                        }
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value) || 0
                          setTempData((prev) => ({
                            ...prev,
                            ...(stat.title === "Coconuts Sold"
                              ? { coconutsSold: value }
                              : stat.title === "Copra Sold"
                                ? { copraSold: value }
                                : { tenderCoconutsSold: value }),
                          }))
                        }}
                        size="lg"
                      />
                      <p className="text-xs text-gray-500">{stat.unit}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</div>
                      <p className="text-sm text-gray-500">{stat.unit}</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-success-600" />
              <h3 className="text-xl font-semibold">Farm Analytics</h3>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Farm analytics">
              <Tab key="overview" title="Overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Production Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Coconuts</span>
                        <span className="font-semibold">{farmData.coconutsSold.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Copra (kg)</span>
                        <span className="font-semibold">{farmData.copraSold} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tender Coconuts</span>
                        <span className="font-semibold">{farmData.tenderCoconutsSold.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Daily Production</span>
                        <span className="font-semibold">~42 coconuts</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Copra Yield Rate</span>
                        <span className="font-semibold">6.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tender Coconut %</span>
                        <span className="font-semibold">25.6%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab key="goals" title="Goals">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {[
                    { name: "Coconut Goal", progress: 85, color: "success" },
                    { name: "Copra Goal", progress: 92, color: "warning" },
                    { name: "Tender Goal", progress: 78, color: "primary" },
                  ].map((goal, index) => (
                    <Card key={index}>
                      <CardBody className="text-center">
                        <div className={`text-2xl font-bold text-${goal.color}-600`}>{goal.progress}%</div>
                        <p className="text-sm text-gray-600">{goal.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`bg-${goal.color}-600 h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </motion.div>
    </AdminLayout>
  )
}
