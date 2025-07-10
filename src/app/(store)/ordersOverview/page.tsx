import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Download,
  Filter,
  LayoutDashboard,
  ShoppingBag,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth } from "@/features/auth/services/auth";
import { redirect } from "next/navigation";

const orders = new Array(4).fill({
  id: "#OrderID1234",
  user: "Userno1!_.",
  date: "11/11/2011",
  time: "09:34 PM",
  status: "In Transit",
  address: "Address, Address St., City, 123111 Country",
  total: "₱0,000",
});

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signIn");
  }

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 border-r p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" /> Points Dashboard
        </h2>
        <div className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" /> Orders
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Orders</h1>
          <div className="flex items-center gap-2">
            {/* Export Button */}
            <Button variant="outline" className="bg-gray-200 hover:bg-gray-300">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>

            {/* Select Filter */}
            <Select>
              <SelectTrigger className="w-[120px] bg-gray-200 hover:bg-gray-300">
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-1">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>

            {/* Select Range */}
            <Select>
              <SelectTrigger className="w-[120px] bg-gray-200 hover:bg-gray-300">
                <SelectValue
                  placeholder={
                    <div className="flex items-center gap-1">
                      <Calendar className="mr-1 h-4 w-4" /> Weekly
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <Card className="bg-gray-100 flex-1">
          <CardContent className="p-0 h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ship to</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {order.id}
                      </span>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {order.user}
                    </TableCell>
                    <TableCell>
                      <div>Date: {order.date}</div>
                      <div className="text-blue-600">Time: {order.time}</div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
