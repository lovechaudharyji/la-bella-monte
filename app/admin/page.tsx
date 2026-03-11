"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

const stats = {
  totalOrders: 120,
  totalRevenue: 125000,
  totalInquiries: 18,
  activeProducts: 5,
};

const recentOrders = [
  { id: "#1028", name: "Rahul Sharma", email: "rahul@email.com", total: 7999, status: "Paid", date: "Today" },
  { id: "#1027", name: "Ananya Singh", email: "ananya@email.com", total: 12999, status: "Pending", date: "Today" },
  { id: "#1026", name: "Vikram Rao", email: "vikram@email.com", total: 25999, status: "Shipped", date: "Yesterday" },
  { id: "#1025", name: "Neha Gupta", email: "neha@email.com", total: 9999, status: "Delivered", date: "Yesterday" },
  { id: "#1024", name: "Arjun Patel", email: "arjun@email.com", total: 5499, status: "Paid", date: "2 days ago" },
];

const recentInquiries = [
  { name: "Rahul", email: "rahul@email.com", message: "Interested in Daytona", status: "New", date: "Today" },
  { name: "Ananya", email: "ananya@email.com", message: "Need warranty details", status: "Read", date: "Today" },
  { name: "Vikram", email: "vikram@email.com", message: "Do you ship internationally?", status: "New", date: "Yesterday" },
  { name: "Neha", email: "neha@email.com", message: "Looking for discounts", status: "Read", date: "2 days ago" },
];

function statusBadgeVariant(status: string) {
  switch (status) {
    case "Pending":
      return "warning" as const;
    case "Paid":
      return "success" as const;
    case "Shipped":
      return "info" as const;
    case "Delivered":
      return "purple" as const;
    default:
      return "secondary" as const;
  }
}

function inquiryBadgeVariant(status: string) {
  return status === "New" ? ("info" as const) : ("muted" as const);
}

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-neutral-500 mt-1">All-time orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatINR(stats.totalRevenue)}</div>
            <p className="text-xs text-neutral-500 mt-1">Gross revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-neutral-500 mt-1">Unresolved inquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts}</div>
            <p className="text-xs text-neutral-500 mt-1">Live in catalog</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id} className="hover:bg-neutral-50">
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell>{o.name}</TableCell>
                  <TableCell className="text-neutral-600">{o.email}</TableCell>
                  <TableCell>{formatINR(o.total)}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(o.status)}>{o.status}</Badge>
                  </TableCell>
                  <TableCell>{o.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInquiries.map((q, idx) => (
                <TableRow key={idx} className="hover:bg-neutral-50">
                  <TableCell>{q.name}</TableCell>
                  <TableCell className="text-neutral-600">{q.email}</TableCell>
                  <TableCell className="max-w-[320px] truncate">{q.message}</TableCell>
                  <TableCell>
                    <Badge variant={inquiryBadgeVariant(q.status)}>{q.status}</Badge>
                  </TableCell>
                  <TableCell>{q.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
