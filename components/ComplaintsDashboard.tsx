"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", complaints: 65 },
  { month: "Feb", complaints: 59 },
  { month: "Mar", complaints: 80 },
  { month: "Apr", complaints: 81 },
  { month: "May", complaints: 56 },
  { month: "Jun", complaints: 55 },
  { month: "Jul", complaints: 40 },
];

const statusData = [
  { name: "Resolved", value: 540, color: "#10B981" },
  { name: "In Progress", value: 320, color: "#F59E0B" },
  { name: "Pending", value: 210, color: "#6366F1" },
  { name: "Escalated", value: 130, color: "#EF4444" },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  trend?: string;
}) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        {trend && (
          <p
            className={`text-sm mt-2 flex items-center ${
              trend.includes("+") ? "text-green-500" : "text-red-500"
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend} vs last month
          </p>
        )}
      </div>
      <Icon className="w-8 h-8 text-muted-foreground" />
    </div>
  </Card>
);

export default function ComplaintsDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Complaints Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and analyze user complaints and their resolution status
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Complaints"
            value="1,200"
            icon={ClipboardList}
            trend="+12.5%"
          />
          <StatCard
            title="Resolved"
            value="540"
            icon={CheckCircle}
            trend="+8.2%"
          />
          <StatCard
            title="In Progress"
            value="320"
            icon={Clock}
            trend="-3.1%"
          />
          <StatCard
            title="Escalated"
            value="130"
            icon={AlertTriangle}
            trend="+2.4%"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Complaints by Status</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Monthly Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="complaints"
                        stroke="#6366F1"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Complaints</h3>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Subject</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "COM-2024-001",
                        subject: "Service Interruption",
                        status: "In Progress",
                        date: "2024-03-20",
                        priority: "High",
                      },
                      {
                        id: "COM-2024-002",
                        subject: "Billing Issue",
                        status: "Resolved",
                        date: "2024-03-19",
                        priority: "Medium",
                      },
                      {
                        id: "COM-2024-003",
                        subject: "Product Quality",
                        status: "Pending",
                        date: "2024-03-18",
                        priority: "Low",
                      },
                      {
                        id: "COM-2024-004",
                        subject: "Customer Support",
                        status: "Escalated",
                        date: "2024-03-17",
                        priority: "High",
                      },
                    ].map((complaint) => (
                      <tr key={complaint.id} className="border-b">
                        <td className="px-6 py-4 font-medium">
                          {complaint.id}
                        </td>
                        <td className="px-6 py-4">{complaint.subject}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              complaint.status === "Resolved"
                                ? "bg-green-100 text-green-800"
                                : complaint.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : complaint.status === "Pending"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{complaint.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              complaint.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : complaint.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {complaint.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Complaint Resolution Time</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", avgDays: 5 },
                      { month: "Feb", avgDays: 4.5 },
                      { month: "Mar", avgDays: 4.8 },
                      { month: "Apr", avgDays: 4.2 },
                      { month: "May", avgDays: 3.8 },
                      { month: "Jun", avgDays: 3.5 },
                      { month: "Jul", avgDays: 3.2 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgDays"
                      name="Average Resolution Time (Days)"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
