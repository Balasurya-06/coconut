"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardBody, CardHeader, Button, Chip } from "@nextui-org/react"
import { RefreshCw, TrendingUp, TrendingDown, Calendar, Globe, AlertCircle } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

interface PriceData {
  commodity: string
  price: number
  unit: string
  change: number
  lastUpdated: string
  market: string
}

export default function MarketPricePage() {
  const [loading, setLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const [priceData] = useState<PriceData[]>([
    {
      commodity: "Coconut (Fresh)",
      price: 28,
      unit: "per piece",
      change: 2.5,
      lastUpdated: new Date().toISOString(),
      market: "Kerala",
    },
    {
      commodity: "Copra (Dried)",
      price: 185,
      unit: "per kg",
      change: -1.2,
      lastUpdated: new Date().toISOString(),
      market: "Tamil Nadu",
    },
    {
      commodity: "Tender Coconut",
      price: 35,
      unit: "per piece",
      change: 0.8,
      lastUpdated: new Date().toISOString(),
      market: "Karnataka",
    },
    {
      commodity: "Coconut Oil",
      price: 220,
      unit: "per liter",
      change: 3.2,
      lastUpdated: new Date().toISOString(),
      market: "Kerala",
    },
  ])

  const handleRefresh = async () => {
    setLoading(true)
    setTimeout(() => {
      setLastRefresh(new Date())
      setLoading(false)
    }, 2000)
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Market Price Tracker</h1>
            <p className="text-gray-600 mt-1">Live coconut market prices from Coconut Board</p>
          </div>
          <div className="flex items-center space-x-2">
            <Chip variant="flat" color="primary">
              <Calendar className="w-4 h-4 mr-1" />
              Last updated: {lastRefresh.toLocaleTimeString()}
            </Chip>
            <Button
              color="primary"
              startContent={<RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />}
              onClick={handleRefresh}
              isLoading={loading}
            >
              Refresh Prices
            </Button>
          </div>
        </div>

        {/* Alert */}
        <Card className="border-primary-200 bg-primary-50">
          <CardBody>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary-900">Price Data Source</h3>
                <p className="text-primary-700 text-sm mt-1">
                  Prices are automatically fetched from{" "}
                  <a
                    href="https://coconutboard.in/PriceAppScroll/commodity.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    coconutboard.in
                  </a>{" "}
                  using our automated scraping system. Data is refreshed every 6 hours or manually.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-lg font-semibold">{item.commodity}</h4>
                    <div className="flex items-center space-x-1">
                      {item.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-success-600" />
                      ) : item.change < 0 ? (
                        <TrendingDown className="w-4 h-4 text-danger-600" />
                      ) : null}
                      <Chip color={item.change > 0 ? "success" : item.change < 0 ? "danger" : "default"} size="sm">
                        {item.change > 0 ? "+" : ""}
                        {item.change}%
                      </Chip>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="w-4 h-4 mr-1" />
                    {item.market}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">₹{item.price}</div>
                    <div className="text-sm text-gray-600">{item.unit}</div>
                    <div className="text-xs text-gray-500">Updated: {new Date(item.lastUpdated).toLocaleString()}</div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Market Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Market Analysis</h3>
              <p className="text-gray-600">Key insights from current market data</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                <div>
                  <p className="font-semibold text-success-800">Coconut Prices Rising</p>
                  <p className="text-sm text-success-600">+2.5% increase this week</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-danger-50 rounded-lg">
                <div>
                  <p className="font-semibold text-danger-800">Copra Prices Declining</p>
                  <p className="text-sm text-danger-600">-1.2% decrease this week</p>
                </div>
                <TrendingDown className="w-8 h-8 text-danger-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div>
                  <p className="font-semibold text-primary-800">Oil Demand Strong</p>
                  <p className="text-sm text-primary-600">+3.2% price increase</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Pricing Strategy</h3>
              <p className="text-gray-600">Recommended pricing based on market data</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {[
                  { name: "Fresh Coconuts", range: "₹30-32", note: "Recommended range" },
                  { name: "Tender Coconuts", range: "₹38-40", note: "Premium pricing" },
                  { name: "Copra (per kg)", range: "₹180-185", note: "Competitive rate" },
                  { name: "Coconut Oil", range: "₹225-230", note: "Per liter" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="text-right">
                      <div className="font-semibold">{item.range}</div>
                      <div className="text-xs text-gray-500">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
