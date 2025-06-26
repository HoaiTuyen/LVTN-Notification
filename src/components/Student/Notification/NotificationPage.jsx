import { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
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
import { handleListNotification } from "../../../controller/NotificationController";
import { handleListNotificationType } from "../../../controller/NotificationTypeController";
import useWebSocket from "../../../config/Websorket";
import { Pagination } from "antd";
import dayjs from "dayjs";
import useDebounce from "../../../hooks/useDebounce";

const NotificationsPage = () => {
  const { stompClient, connected, error } = useWebSocket();
  useEffect(() => {
    if (connected && stompClient.current) {
      console.log("✅ WebSocket is connected in Student component");

      // Đăng ký nhận tin nhắn từ server
      stompClient.current.subscribe("/notification", (message) => {
        console.log("Received message:", JSON.parse(message.body));
        fetchListNotify();
      });
    }
  }, [connected, stompClient]);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const searchFromUrl = searchParams.get("search") || "";
  const typeFromUrl = searchParams.get("type") || "all";
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [selectedType, setSelectedType] = useState(typeFromUrl);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [notifications, setNotifications] = useState([]);
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();
  const handleViewDetail = (id, e) => {
    e.stopPropagation();

    navigate(
      `/sinh-vien/notification/${id}?search=${debouncedSearchTerm}&type=${selectedType}&page=${pagination.current}`
    );
  };
  const fetchListNotify = async (page = 1) => {
    const req = await handleListNotification(
      "desc",
      page - 1,
      pagination.pageSize
    );

    if (req?.data) {
      setNotifications(req.data.notifications);
      setPagination({
        current: page,
        pageSize: req.data.pageSize,
        total: req.data.totalElements,
        totalPages: req.data.totalPages,
      });
    }
  };
  const fetchNotificationType = async () => {
    const req = await handleListNotificationType();
    if (req?.data) {
      setNotificationTypes(req.data.notificationTypes);
    } else {
      setNotificationTypes([]);
    }
  };
  useEffect(() => {
    const currentPage = searchParams.get("page") || "1";
    setSearchParams({
      search: debouncedSearchTerm,
      type: selectedType,
      page: currentPage,
    });
  }, [debouncedSearchTerm, selectedType]);
  useEffect(() => {
    fetchListNotify(pageFromUrl);
    fetchNotificationType();
  }, [searchFromUrl, typeFromUrl, pageFromUrl]);

  const NotificationCard = ({ notification }) => (
    <Card className="p-0">
      <CardHeader className="pt-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle
                  className="text-base cursor-pointer hover:text-blue-500"
                  onClick={(e) => {
                    handleViewDetail(notification.id, e);
                  }}
                >
                  {notification.title}
                </CardTitle>
                {notification.notificationType && (
                  <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                    {notification.notificationType}
                  </Badge>
                )}
              </div>
              <div className="flex items-center pt-3">
                <Clock className="h-3 w-3 mr-1" />
                {dayjs(notification.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end space-x-2 mb-3">
          <Button variant="ghost" size="sm">
            <MarkAsUnread className="h-3 w-3 mr-1" />
            {notification.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="framer-motion-page"
    >
      <div className="framer-motion-content bg-white p-0">
        <div className="space-y-6 px-10 pt-10 overflow-x-auto max-h-[730px]">
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
                <Select
                  value={selectedType}
                  onValueChange={(value) => setSelectedType(value)}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Loại thông báo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    {notificationTypes.length === 0 ? (
                      <SelectItem>Trống</SelectItem>
                    ) : (
                      notificationTypes.map((item) => (
                        <SelectItem value={item.name}>{item.name}</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
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

            <TabsContent
              value="all"
              className="space-y-4 border-1 p-5 rounded-2xl overflow-x-auto max-h-[500px]"
            >
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
          </Tabs>
          {pagination.total > 10 && (
            <div className="flex justify-center mt-4">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={(page) => {
                  setSearchParams({
                    search: debouncedSearchTerm,
                    type: selectedType,
                    page: page.toString(),
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </motion.div>
  );
};
export default NotificationsPage;
