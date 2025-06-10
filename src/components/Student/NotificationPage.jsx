import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Search,
  Filter,
  BookMarkedIcon as MarkAsUnread,
  Trash2,
  Clock,
  AlertCircle,
} from "lucide-react";
// import { format } from "date-fns";
// import { vi } from "date-fns/locale";

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  // Dữ liệu mẫu thông báo cho sinh viên
  const notifications = [
    {
      id: 1,
      title: "Thông báo lịch thi cuối kỳ môn Cấu trúc dữ liệu",
      content:
        "Lịch thi cuối kỳ môn Cấu trúc dữ liệu và giải thuật đã được công bố. Thời gian thi: 15/01/2024 lúc 08:00 tại phòng A101.",
      type: "Thông báo",

      isRead: false,
      createdAt: "2024-01-10T10:00:00Z",
    },
  ];

  // Lọc thông báo
  // const filteredNotifications = notifications.filter((notification) => {
  //   const matchesSearch =
  //     notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     notification.sender.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesType =
  //     selectedType === "all" || notification.type === selectedType;
  //   const matchesPriority =
  //     selectedPriority === "all" || notification.priority === selectedPriority;

  //   return matchesSearch && matchesType && matchesPriority;
  // });

  // const unreadNotifications = filteredNotifications.filter((n) => !n.isRead);
  // const readNotifications = filteredNotifications.filter((n) => n.isRead);

  //   const formatDateTime = (dateTimeString) => {
  //     try {
  //       return format(new Date(dateTimeString), "dd/MM/yyyy HH:mm", {
  //         locale: vi,
  //       });
  //     } catch (error) {
  //       console.log(error);

  //       return "Không hợp lệ";
  //     }
  //   };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "Cao":
        return "destructive";
      case "Trung bình":
        return "outline";
      case "Thấp":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case "Thông báo":
        return "default";
      case "Sự kiện":
        return "success";
      case "Nhiệm vụ":
        return "outline";
      case "Nhắc nhở":
        return "secondary";
      default:
        return "default";
    }
  };

  const isUrgent = (notification) => {
    if (!notification.deadline) return false;
    const deadline = new Date(notification.deadline);
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 3 && daysDiff > 0;
  };

  const NotificationCard = ({ notification }) => (
    <Card
      className={`${
        !notification.isRead ? "border-blue-200 bg-blue-50/50" : ""
      } ${isUrgent(notification) ? "border-red-200 bg-red-50/50" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {!notification.isRead && (
              <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
            )}
            <div className="flex-1">
              <CardTitle className="text-base">{notification.title}</CardTitle>
              {/* <CardDescription className="mt-1">
                Từ: {notification.sender} • {notification.course}
              </CardDescription> */}
            </div>
          </div>
          {/* <div className="flex items-center space-x-2">
            {isUrgent(notification) && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <Badge variant={getPriorityBadgeVariant(notification.priority)}>
              {notification.priority}
            </Badge>
            <Badge variant={getTypeBadgeVariant(notification.type)}>
              {notification.type}
            </Badge>
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {notification.content}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
          </div>
          {notification.deadline && (
            <div
              className={`flex items-center ${
                isUrgent(notification) ? "text-red-600 font-medium" : ""
              }`}
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              Hạn:
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 mt-3">
          <Button variant="ghost" size="sm">
            <MarkAsUnread className="h-3 w-3 mr-1" />
            {notification.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Xóa
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen w-full bg-white p-0">
      <div className="space-y-6 p-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Thông báo</h2>
            <p className="text-muted-foreground">
              Theo dõi các thông báo từ giảng viên và nhóm học tập
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-blue-600">
              {/* {unreadNotifications.length} chưa đọc */} chưa đọc
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Đánh dấu tất cả đã đọc
            </Button>
          </div>
        </div>

        {/* Bộ lọc */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Bộ lọc thông báo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm thông báo..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Chọn loại thông báo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="Thông báo">Thông báo</SelectItem>
                  <SelectItem value="Sự kiện">Sự kiện</SelectItem>
                  <SelectItem value="Nhiệm vụ">Công tác xã hội</SelectItem>
                  <SelectItem value="Nhắc nhở">Nhắc nhở</SelectItem>
                </SelectContent>
              </Select>
              {/* <Select
                value={selectedPriority}
                onValueChange={setSelectedPriority}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Chọn mức độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức độ</SelectItem>
                  <SelectItem value="Cao">Cao</SelectItem>
                  <SelectItem value="Trung bình">Trung bình</SelectItem>
                  <SelectItem value="Thấp">Thấp</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </CardContent>
        </Card>

        {/* Danh sách thông báo */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              {/* Tất cả ({filteredNotifications.length}) */}
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="unread">
              Chưa đọc
              {/* Chưa đọc ({unreadNotifications.length}) */}
            </TabsTrigger>
            <TabsTrigger value="read">
              {/* Đã đọc ({readNotifications.length}) */}
              Đã đọc
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Không có thông báo
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Không tìm thấy thông báo nào phù hợp với bộ lọc hiện tại.
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))
            )}
          </TabsContent>

          {/* <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Không có thông báo chưa đọc
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Bạn đã đọc tất cả thông báo.
                  </p>
                </CardContent>
              </Card>
            ) : (
              unreadNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-4">
            {readNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Không có thông báo đã đọc
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Chưa có thông báo nào được đánh dấu là đã đọc.
                  </p>
                </CardContent>
              </Card>
            ) : (
              readNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))
            )}
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};
export default NotificationsPage;
