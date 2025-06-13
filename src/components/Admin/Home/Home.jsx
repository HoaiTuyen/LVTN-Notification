import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, GraduationCap, BookOpen, Bell, DollarSign } from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const monthlyNotifications = [
  {
    month: "T1/2023",
    total: 145,
    read: 120,
    unread: 25,
    urgent: 15,
    normal: 100,
    low: 30,
  },
  {
    month: "T2/2023",
    total: 167,
    read: 140,
    unread: 27,
    urgent: 18,
    normal: 110,
    low: 39,
  },
  {
    month: "T3/2023",
    total: 189,
    read: 155,
    unread: 34,
    urgent: 22,
    normal: 125,
    low: 42,
  },
  {
    month: "T4/2023",
    total: 156,
    read: 128,
    unread: 28,
    urgent: 16,
    normal: 105,
    low: 35,
  },
  {
    month: "T5/2023",
    total: 203,
    read: 175,
    unread: 28,
    urgent: 25,
    normal: 140,
    low: 38,
  },
  {
    month: "T6/2023",
    total: 178,
    read: 152,
    unread: 26,
    urgent: 20,
    normal: 120,
    low: 38,
  },
  {
    month: "T7/2023",
    total: 134,
    read: 115,
    unread: 19,
    urgent: 12,
    normal: 95,
    low: 27,
  },
  {
    month: "T8/2023",
    total: 198,
    read: 170,
    unread: 28,
    urgent: 23,
    normal: 135,
    low: 40,
  },
  {
    month: "T9/2023",
    total: 225,
    read: 195,
    unread: 30,
    urgent: 28,
    normal: 155,
    low: 42,
  },
  {
    month: "T10/2023",
    total: 187,
    read: 162,
    unread: 25,
    urgent: 21,
    normal: 130,
    low: 36,
  },
  {
    month: "T11/2023",
    total: 210,
    read: 185,
    unread: 25,
    urgent: 26,
    normal: 145,
    low: 39,
  },
  {
    month: "T12/2023",
    total: 165,
    read: 145,
    unread: 20,
    urgent: 18,
    normal: 115,
    low: 32,
  },
];
const departmentData = [
  { name: "CNTT", value: 450, color: "#0088FE" },
  { name: "Kinh tế", value: 320, color: "#00C49F" },
  { name: "Ngoại ngữ", value: 280, color: "#FFBB28" },
  { name: "Toán-TH", value: 200, color: "#FF8042" },
  { name: "Vật lý", value: 150, color: "#8884D8" },
];
const HomeAdmin = () => {
  return (
    <div className="min-h-screen w-full bg-white p-0 ">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-10">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Tổng sinh viên
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,400</div>
            {/* <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% so với tháng trước
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng iảng viên
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55</div>
            {/* <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +3 giảng viên mới
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng môn học</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">140</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Tổng số thông báo
            </CardTitle>
            <Bell className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="trends" className="space-y-6 px-10">
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng thông báo theo tháng</CardTitle>
                <CardDescription>
                  Thống kê số lượng và tỷ lệ đọc thông báo 12 tháng qua
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyNotifications}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="total"
                      name="Tổng TB"
                      fill="#0088FE"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="read"
                      name="Đã đọc"
                      fill="#00C49F"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="unread"
                      name="Chưa đọc"
                      fill="#FF8042"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="urgent"
                      name="TB khẩn"
                      stroke="#FF0000"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Phân bố sinh viên theo khoa</CardTitle>
                <CardDescription>
                  Tỷ lệ sinh viên trong các khoa
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default HomeAdmin;
