import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { handleListNotification } from "../../../controller/NotificationController";
import { Pagination } from "antd";
const SentNotifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dataNofify, setDataNotify] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const notifications = [
    {
      id: 1,
      title: "Thông báo kiểm tra giữa kỳ môn Lập trình Web",
      content:
        "Kiểm tra giữa kỳ sẽ được tổ chức vào ngày 15/12/2024. Sinh viên cần chuẩn bị đầy đủ tài liệu...",
      type: "exam",
      priority: "high",
      recipients: ["it301"],
      recipientCount: 45,
      sentDate: "2024-12-01",
      sentTime: "09:30",
      status: "sent",
      readCount: 42,
      views: 45,
    },
    {
      id: 2,
      title: "Bài tập lớn môn Cơ sở dữ liệu",
      content:
        "Bài tập lớn về thiết kế cơ sở dữ liệu cho hệ thống quản lý thư viện. Hạn nộp: 20/12/2024",
      type: "assignment",
      priority: "medium",
      recipients: ["it205"],
      recipientCount: 38,
      sentDate: "2024-11-28",
      sentTime: "14:15",
      status: "sent",
      readCount: 35,
      views: 38,
    },
    {
      id: 3,
      title: "Thông báo nghỉ học do thời tiết",
      content:
        "Do ảnh hưởng của bão, trường thông báo nghỉ học ngày 25/11/2024. Sinh viên theo dõi thông tin...",
      type: "urgent",
      priority: "urgent",
      recipients: ["all-students"],
      recipientCount: 245,
      sentDate: "2024-11-24",
      sentTime: "07:00",
      status: "sent",
      readCount: 240,
      views: 245,
    },
    {
      id: 4,
      title: "Mời tham gia seminar về AI",
      content:
        'Seminar "Ứng dụng AI trong giáo dục" sẽ được tổ chức vào 30/11/2024. Đăng ký tại...',
      type: "event",
      priority: "low",
      recipients: ["it501", "study-groups"],
      recipientCount: 65,
      sentDate: "2024-11-20",
      sentTime: "16:45",
      status: "scheduled",
      readCount: 0,
      views: 0,
    },
    {
      id: 5,
      title: "Nhắc nhở nộp báo cáo thực tập",
      content:
        "Sinh viên năm cuối cần nộp báo cáo thực tập trước ngày 10/12/2024...",
      type: "reminder",
      priority: "medium",
      recipients: ["it401"],
      recipientCount: 32,
      sentDate: "2024-11-18",
      sentTime: "10:20",
      status: "sent",
      readCount: 28,
      views: 32,
    },
  ];

  const getTypeInfo = (type) => {
    const types = {
      announcement: {
        label: "Thông báo chung",
        icon: "📢",
        color: "bg-blue-100 text-blue-800",
      },
      assignment: {
        label: "Bài tập",
        icon: "📝",
        color: "bg-green-100 text-green-800",
      },
      exam: {
        label: "Kiểm tra/Thi",
        icon: "📊",
        color: "bg-purple-100 text-purple-800",
      },
      event: {
        label: "Sự kiện",
        icon: "🎉",
        color: "bg-yellow-100 text-yellow-800",
      },
      reminder: {
        label: "Nhắc nhở",
        icon: "⏰",
        color: "bg-orange-100 text-orange-800",
      },
      urgent: {
        label: "Khẩn cấp",
        icon: "🚨",
        color: "bg-red-100 text-red-800",
      },
    };
    return types[type] || types.announcement;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusInfo = (status) => {
    const statuses = {
      sent: { label: "Đã gửi", color: "bg-green-100 text-green-800" },
      scheduled: { label: "Đã lên lịch", color: "bg-blue-100 text-blue-800" },
      draft: { label: "Bản nháp", color: "bg-gray-100 text-gray-800" },
    };
    return statuses[status] || statuses.sent;
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesStatus =
      filterStatus === "all" || notification.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    scheduled: notifications.filter((n) => n.status === "scheduled").length,
    totalRecipients: notifications.reduce(
      (sum, n) => sum + n.recipientCount,
      0
    ),
    totalViews: notifications.reduce((sum, n) => sum + n.views, 0),
  };
  const fetchListNotification = async (page = 1) => {
    const response = await handleListNotification(
      page - 1,
      pagination.pageSize
    );
    console.log(response);
    if (response?.data) {
      setDataNotify(response.data.notifications);
      setPagination({
        current: page,
        pageSize: response.data.pageSize,
        total: response.data.totalElements,
        totalPages: response.data.totalPages,
      });
    }
  };
  useEffect(() => {
    fetchListNotification(pagination.current);
  }, []);
  return (
    <div className="min-h-screen w-full bg-white p-0 ">
      <div className="space-y-6 p-8 overflow-x-auto max-h-[700px]">
        <div>
          <h1 className="text-3xl font-bold">Thông báo đã gửi</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi các thông báo bạn đã gửi
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng thông báo
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã gửi</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.sent}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng người nhận
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalRecipients}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
              <Eye className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalViews}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Bộ lọc và tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm thông báo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Loại thông báo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="announcement">Thông báo chung</SelectItem>
                  <SelectItem value="assignment">Bài tập</SelectItem>
                  <SelectItem value="exam">Kiểm tra/Thi</SelectItem>
                  <SelectItem value="event">Sự kiện</SelectItem>
                  <SelectItem value="reminder">Nhắc nhở</SelectItem>
                  <SelectItem value="urgent">Khẩn cấp</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="sent">Đã gửi</SelectItem>
                  <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="overflow-x-auto max-h-[800px]">
          <CardHeader>
            <CardTitle>Danh sách thông báo</CardTitle>
            <CardDescription>
              Hiển thị {filteredNotifications.length} trong tổng số
              {notifications.length} thông báo
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto max-h-[400px]">
            <div className="space-y-4 ">
              {filteredNotifications.map((notification) => {
                const typeInfo = getTypeInfo(notification.type);
                const statusInfo = getStatusInfo(notification.status);
                const readPercentage =
                  notification.recipientCount > 0
                    ? Math.round(
                        (notification.readCount / notification.recipientCount) *
                          100
                      )
                    : 0;

                return (
                  <div
                    key={notification.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">
                            {notification.title}
                          </h3>
                          <Badge className={typeInfo.color}>
                            {typeInfo.icon} {typeInfo.label}
                          </Badge>
                          <Badge
                            className={getPriorityColor(notification.priority)}
                          >
                            {notification.priority === "low" && "Thấp"}
                            {notification.priority === "medium" && "Trung bình"}
                            {notification.priority === "high" && "Cao"}
                            {notification.priority === "urgent" && "Khẩn cấp"}
                          </Badge>
                          <Badge className={statusInfo.color}>
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.content}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {notification.sentDate} {notification.sentTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {notification.recipientCount} người nhận
                            </span>
                          </div>
                          {notification.status === "sent" && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>
                                {notification.views} lượt xem ({readPercentage}%
                                đã đọc)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không tìm thấy thông báo nào phù hợp với bộ lọc</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center mt-4">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(page) => {
              fetchListNotification(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SentNotifications;
