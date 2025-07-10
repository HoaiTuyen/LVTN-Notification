import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Bell,
  Calendar,
  TrendingUp,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  handleCountCourseSchedule,
  handleCountGroupCreate,
  handleCountSubjectCharge,
} from "../../../controller/TeacherController";
import { handleGetDetailUser } from "../../../controller/AccountController";
import { handleListSemester } from "../../../controller/SemesterController";
import { jwtDecode } from "jwt-decode";

const HomeLecturerPage = () => {
  const [statsData, setStatsData] = useState({
    totalCourses: 0,
    totalGroups: 0,
    notifications: 0,
    totalSubjects: 0,
  });
  const stats = [
    {
      title: "Môn học phụ trách",
      value: "2",
      description: "Học kỳ này",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Lớp học",
      value: statsData.totalCourses,
      description: "Chủ nhiệm",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Nhóm học tập",
      value: statsData.totalGroups,
      description: "Tổng số",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Lớp học phần",
      value: statsData.totalSubjects,
      description: "Học kỳ này",
      icon: Bell,
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      title: "Tạo thông báo mới",
      description: "Thông báo về bài kiểm tra giữa kỳ môn Lập trình Web",
      time: "2 giờ trước",
      type: "notification",
    },
    {
      title: "Cập nhật nhóm học tập",
      description: 'Chỉnh sửa thông tin nhóm "React Advanced"',
      time: "5 giờ trước",
      type: "group",
    },
    {
      title: "Phản hồi sinh viên",
      description: 'Trả lời câu hỏi trong nhóm "JavaScript Fundamentals"',
      time: "1 ngày trước",
      type: "message",
    },
  ];

  const upcomingClasses = [
    {
      subject: "Lập trình Web",
      class: "CNTT-K19A",
      time: "08:00 - 10:00",
      room: "A101",
      date: "Hôm nay",
    },
    {
      subject: "Cơ sở dữ liệu",
      class: "CNTT-K19B",
      time: "14:00 - 16:00",
      room: "B205",
      date: "Hôm nay",
    },
    {
      subject: "Phân tích thiết kế hệ thống",
      class: "CNTT-K18A",
      time: "08:00 - 10:00",
      room: "C301",
      date: "Mai",
    },
  ];

  const [teacherId, setTeacherId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const token = localStorage.getItem("access_token");
  const { userId } = jwtDecode(token);
  const fetchInfo = async () => {
    const response = await handleGetDetailUser(userId);
    if (response?.data) {
      console.log(response.data);
      setTeacherId(response.data.teacherId);
    }
  };
  const fetchSemester = async () => {
    const response = await handleListSemester("des", 0, 10);
    if (response?.data) {
      console.log(response.data.semesters[0].id);
      setSemesterId(response.data.semesters[0].id);
    }
  };
  const fetchCountCourseSchedule = async () => {
    //lớp
    const response = await handleCountCourseSchedule(teacherId);
    console.log(response);
    if (response?.data && response?.status === 200) {
      setStatsData((prev) => ({
        ...prev,
        totalCourses: response.data,
      }));
    }
  };
  const fetchCountGroupCreate = async () => {
    const groupData = await handleCountGroupCreate(teacherId);
    console.log(groupData);
    if (groupData?.data && groupData?.status === 200) {
      setStatsData((prev) => ({
        ...prev,
        totalGroups: groupData.data,
      }));
    }
  };
  const fetchCountSubjectCharge = async () => {
    const subjectData = await handleCountSubjectCharge(teacherId, semesterId);
    console.log(subjectData);
    if (subjectData?.data && subjectData?.status === 200) {
      setStatsData((prev) => ({
        ...prev,
        totalSubjects: subjectData.data,
      }));
    }
  };
  useEffect(() => {
    const init = async () => {
      await fetchInfo();
      await fetchSemester();
    };
    init();
    fetchCountCourseSchedule();
    fetchCountGroupCreate();
    fetchCountSubjectCharge();
  }, [teacherId, semesterId]);
  return (
    <div className="min-h-screen w-full bg-white p-0">
      <div className="space-y-6 p-10">
        {/* <div>
          <h1 className="text-3xl font-bold">Dashboard Giảng viên</h1>
          <p className="text-muted-foreground">
            Chào mừng trở lại! Đây là tổng quan về hoạt động giảng dạy của bạn.
          </p>
        </div> */}

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Lịch giảng dạy hôm nay */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lịch giảng dạy
              </CardTitle>
              <CardDescription>Các lớp học sắp tới</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{classItem.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.class} • Phòng {classItem.room}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          classItem.date === "Hôm nay" ? "default" : "secondary"
                        }
                      >
                        {classItem.date}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {classItem.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Xem lịch đầy đủ
              </Button>
            </CardContent>
          </Card>

          {/* Hoạt động gần đây */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Hoạt động gần đây
              </CardTitle>
              <CardDescription>Các hoạt động mới nhất của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Xem tất cả hoạt động
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
      </div>
    </div>
  );
};
export default HomeLecturerPage;
