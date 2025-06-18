import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import { handleDetailNotification } from "../../../controller/NotificationController";
// Type definitions based on API response

const StudentNotificationDetail = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  const fetchDetailNotification = async () => {
    const detailNotify = await handleDetailNotification(notificationId);
    console.log(detailNotify);
    if (detailNotify?.data) {
      setNotification(detailNotify.data);
    }
  };
  useEffect(() => {
    const fetchNotificationDetail = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await handleGetNotificationDetail(notificationId);
        // setNotification(response.data);

        // Mock data for now

        setNotification(mockResponse.data);
      } catch (error) {
        console.error("Error fetching notification:", error);
        toast.error("Không thể tải thông báo");
      } finally {
        setLoading(false);
      }
    };

    if (notificationId) {
      fetchNotificationDetail();
    }
    fetchDetailNotification();
  }, [notificationId]);

  const handleDownloadFile = async (file) => {
    try {
      setDownloading(file.publicId);

      const link = document.createElement("a");
      link.href = file.fileName;
      link.download = file.displayName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Không thể tải xuống file");
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Không tìm thấy thông báo</h3>
        <p className="text-muted-foreground text-center mb-4">
          Thông báo này có thể đã bị xóa hoặc bạn không có quyền truy cập.
        </p>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="h-full max-h-[750px] overflow-y-auto p-10 bg-white">
        <div className="space-y-6 ">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </div>

          <Card className="">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    {notification.title}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {notification.sender || "Ai gửi"}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {dayjs(notification.createdAt).format("DD/MM/YYYY HH:mm")}
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {notification.notificationType && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {notification.notificationType}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Notification Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Nội dung thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none overflow-y-auto max-h-[350px]">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {notification.content || "Không có nội dung chi tiết."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          {notification.fileNotifications &&
            notification.fileNotifications.length > 0 && (
              <Card className="overflow-x-auto max-h-[300px]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    Tài liệu đính kèm ({notification.fileNotifications.length})
                  </CardTitle>
                  <CardDescription>
                    Nhấn vào tên file để tải xuống
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-y-auto">
                  <div className="space-y-3">
                    {notification.fileNotifications.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <a
                              href={file.fileName}
                              download={file.displayName}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {file.displayName}
                            </a>
                            <p className="text-sm text-gray-500 break-all">
                              PDF Document
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadFile(file)}
                          disabled={downloading === file.publicId}
                        >
                          {downloading === file.publicId ? (
                            <>
                              <div className="animate-spin h-4 w-4 mr-2 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                              Đang tải...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Tải xuống
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};
export default StudentNotificationDetail;
