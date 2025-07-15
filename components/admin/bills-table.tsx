"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Printer, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Bill {
  id: string
  invoiceNumber: string
  customerName: string
  amount: number
  status: "paid" | "pending" | "overdue"
  date: string
  dueDate: string
}

interface BillsTableProps {
  searchTerm: string
}

export function BillsTable({ searchTerm }: BillsTableProps) {
  // Mock data - in real app, this would come from Firebase
  const [bills] = useState<Bill[]>([
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      customerName: "Rajesh Kumar",
      amount: 370,
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-01-30",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      customerName: "Priya Sharma",
      amount: 465,
      status: "pending",
      date: "2024-01-14",
      dueDate: "2024-01-29",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      customerName: "Amit Patel",
      amount: 300,
      status: "paid",
      date: "2024-01-13",
      dueDate: "2024-01-28",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      customerName: "Sunita Reddy",
      amount: 620,
      status: "overdue",
      date: "2024-01-10",
      dueDate: "2024-01-25",
    },
  ])

  const filteredBills = bills.filter(
    (bill) =>
      bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownloadPDF = (bill: Bill) => {
    // In real app, this would generate and download PDF
    console.log("Downloading PDF for:", bill.invoiceNumber)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium">{bill.invoiceNumber}</TableCell>
              <TableCell>{bill.customerName}</TableCell>
              <TableCell className="font-medium">₹{bill.amount}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(bill.status)}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadPDF(bill)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Printer className="w-4 h-4 mr-2" />
                        Print Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
