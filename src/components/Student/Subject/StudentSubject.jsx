import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  GraduationCap,
  Search,
  Filter,
  Download,
  Eye,
  Users,
  FileText,
  Video,
  CalendarIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { handleListSemester } from "../../../controller/SemesterController";
import { handleListClassSectionStudent } from "../../../controller/StudentController";
import { handleGetDetailUser } from "../../../controller/AccountController";
import { jwtDecode } from "jwt-decode";
// Mock data for student courses
const studentCourses = [
  {
    id: 1,
    code: "CS101",
    name: "Nhập môn lập trình",
    instructor: "TS. Nguyễn Văn A",
    credits: 3,
    semester: "HK1 2023-2024",
    schedule: [
      { day: "Thứ 2", time: "07:00-09:00", room: "A101", type: "Lý thuyết" },
      { day: "Thứ 4", time: "07:00-09:00", room: "B201", type: "Thực hành" },
    ],
    progress: 75,
    attendance: 18,
    totalSessions: 20,
    assignments: 3,
    completedAssignments: 2,
    nextClass: "2024-01-15T07:00:00",
    status: "Đang học",
    grade: null,
    description: "Môn học cơ bản về lập trình với ngôn ngữ Python",
    materials: 12,
    announcements: 5,
  },
  {
    id: 2,
    code: "CS201",
    name: "Cấu trúc dữ liệu và giải thuật",
    instructor: "ThS. Trần Thị B",
    credits: 4,
    semester: "HK1 2023-2024",
    schedule: [
      { day: "Thứ 3", time: "09:00-11:00", room: "B201", type: "Lý thuyết" },
      { day: "Thứ 5", time: "13:00-15:00", room: "C301", type: "Thực hành" },
    ],
    progress: 60,
    attendance: 15,
    totalSessions: 18,
    assignments: 4,
    completedAssignments: 3,
    nextClass: "2024-01-16T09:00:00",
    status: "Đang học",
    grade: null,
    description: "Học về các cấu trúc dữ liệu cơ bản và nâng cao",
    materials: 18,
    announcements: 3,
  },
  {
    id: 3,
    code: "MATH101",
    name: "Đại số tuyến tính",
    instructor: "PGS. Lê Văn C",
    credits: 3,
    semester: "HK1 2023-2024",
    schedule: [
      { day: "Thứ 2", time: "13:00-15:00", room: "C301", type: "Lý thuyết" },
      { day: "Thứ 6", time: "07:00-09:00", room: "D101", type: "Bài tập" },
    ],
    progress: 85,
    attendance: 16,
    totalSessions: 16,
    assignments: 2,
    completedAssignments: 2,
    nextClass: "2024-01-19T07:00:00",
    status: "Đang học",
    grade: null,
    description: "Môn toán cơ sở cho ngành công nghệ thông tin",
    materials: 8,
    announcements: 2,
  },
  {
    id: 4,
    code: "ENG101",
    name: "Tiếng Anh học thuật",
    instructor: "ThS. Ngô Thị D",
    credits: 2,
    semester: "HK1 2023-2024",
    schedule: [
      { day: "Thứ 7", time: "07:00-09:00", room: "E201", type: "Lý thuyết" },
    ],
    progress: 90,
    attendance: 14,
    totalSessions: 15,
    assignments: 5,
    completedAssignments: 5,
    nextClass: "2024-01-20T07:00:00",
    status: "Hoàn thành",
    grade: "A",
    description: "Phát triển kỹ năng tiếng Anh học thuật",
    materials: 15,
    announcements: 1,
  },
];

const upcomingClasses = [
  {
    id: 1,
    courseCode: "CS101",
    courseName: "Nhập môn lập trình",
    time: "07:00-09:00",
    date: "2024-01-15",
    room: "A101",
    type: "Lý thuyết",
    instructor: "TS. Nguyễn Văn A",
  },
  {
    id: 2,
    courseCode: "CS201",
    courseName: "Cấu trúc dữ liệu và giải thuật",
    time: "09:00-11:00",
    date: "2024-01-16",
    room: "B201",
    type: "Lý thuyết",
    instructor: "ThS. Trần Thị B",
  },
  {
    id: 3,
    courseCode: "MATH101",
    courseName: "Đại số tuyến tính",
    time: "07:00-09:00",
    date: "2024-01-19",
    room: "D101",
    type: "Bài tập",
    instructor: "PGS. Lê Văn C",
  },
];

const weeklySchedule = [
  {
    day: "Thứ 2",
    slots: [
      { time: "07:00-09:00", course: "CS101", room: "A101", type: "Lý thuyết" },
      {
        time: "13:00-15:00",
        course: "MATH101",
        room: "C301",
        type: "Lý thuyết",
      },
    ],
  },
  {
    day: "Thứ 3",
    slots: [
      { time: "09:00-11:00", course: "CS201", room: "B201", type: "Lý thuyết" },
    ],
  },
  {
    day: "Thứ 4",
    slots: [
      { time: "07:00-09:00", course: "CS101", room: "B201", type: "Thực hành" },
    ],
  },
  {
    day: "Thứ 5",
    slots: [
      { time: "13:00-15:00", course: "CS201", room: "C301", type: "Thực hành" },
    ],
  },
  {
    day: "Thứ 6",
    slots: [
      { time: "07:00-09:00", course: "MATH101", room: "D101", type: "Bài tập" },
    ],
  },
  {
    day: "Thứ 7",
    slots: [
      {
        time: "07:00-09:00",
        course: "ENG101",
        room: "E201",
        type: "Lý thuyết",
      },
    ],
  },
  { day: "Chủ nhật", slots: [] },
];

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [semesterList, setSemesterList] = useState([]);
  const [classSectionList, setClassSectionList] = useState([]);

  // const filteredCourses = studentCourses.filter((course) => {
  //   const matchesSearch =
  //     course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     filterStatus === "all" || course.status === filterStatus;
  //   const matchesSemester = course.semester === selectedSemester;
  //   return matchesSearch && matchesStatus && matchesSemester;
  // });
  const filteredCourses = classSectionList.map((section, index) => {
    return {
      id: `${section.subjectId}-${section.id.groupId}`,
      code: section.subjectId,
      name: section.subjectName,
      semester: section.semesterName,
      classes: section.courseSchedules.map((s, i) => ({
        id: `${section.subjectId}-${section.id.groupId}-${i}`,
        name: `Nhóm học tập ${section.id.groupId.toString().padStart(2, "0")}`,
        schedule: `Thứ ${s.id.day}`,
        section: `Tiết ${s.id.startPeriod}-${s.id.endPeriod}`,
        room: s.id.room || "Trống",
      })),
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang học":
        return "bg-blue-100 text-blue-800";
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const res = await handleListSemester("desc", 0, 10);
        if (res?.data?.semesters) {
          const list = res?.data?.semesters || [];
          setSemesterList(list);
          if (list.length > 0) {
            setSelectedSemester(list[0].id);
            fetchClassOfStudent(list[0].id);
          }
        }
      } catch (err) {
        console.error("Lỗi khi fetch học kỳ:", err);
      }
    };
    fetchSemester();
  }, []);
  const handleSemesterChange = async (value) => {
    setSelectedSemester(value); // Cập nhật select
    await fetchClassOfStudent(value); // Gọi lại API với học kỳ mới
  };
  const fetchClassOfStudent = async (semesterId) => {
    try {
      const token = localStorage.getItem("access_token");
      const decoded = jwtDecode(token);
      const userId = decoded?.userId;
      const userRes = await handleGetDetailUser(userId);
      const studentId = userRes?.data?.studentId;
      if (!studentId) return;
      const res = await handleListClassSectionStudent(studentId, semesterId);
      if (res?.data?.classSections) {
        const list = res?.data?.classSections || [];
        setClassSectionList(list);
      } else {
        setClassSectionList([]);
      }
    } catch (err) {
      console.error("Lỗi khi fetch lớp học phần:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen w-full bg-white p-0 ">
        <div className="space-y-6 p-10 overflow-y-auto max-h-[700px]">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Môn học của tôi
              </h1>
              <p className="text-muted-foreground">
                Quản lý và theo dõi tiến độ học tập của bạn
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng môn học
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studentCourses.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {studentCourses.filter((c) => c.status === "Đang học").length}{" "}
                  đang học
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng tín chỉ
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studentCourses.reduce(
                    (sum, course) => sum + course.credits,
                    0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Học kỳ này</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tiến độ trung bình
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    studentCourses.reduce(
                      (sum, course) => sum + course.progress,
                      0
                    ) / studentCourses.length
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Hoàn thành</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bài tập chưa nộp
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studentCourses.reduce(
                    (sum, course) =>
                      sum + (course.assignments - course.completedAssignments),
                    0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Cần hoàn thành</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="courses">Danh sách môn học</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4 md:flex-row md:items-center">
                <Select
                  value={selectedSemester}
                  onValueChange={handleSemesterChange}
                >
                  <SelectTrigger className="w-[200px] ml-auto">
                    <SelectValue placeholder="Chọn học kỳ" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterList.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.nameSemester} - {semester.academicYear}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Course Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {filteredCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-gray-500 text-base py-12">
                    <BookOpen className="w-8 h-8 mb-3" />
                    <p className="font-medium">
                      Hiện chưa có môn học nào được đăng ký
                    </p>
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">
                                {course.name}
                              </CardTitle>
                              <Badge variant="outline">{course.code}</Badge>
                            </div>
                            <CardDescription>
                              {course.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Course Info */}
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            {/* <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{course.instructor}</span>
                              </div> */}
                            <div className="flex items-center gap-2 text-sm">
                              <GraduationCap className="h-4 w-4 text-muted-foreground" />
                              <span>{course.semester}</span>
                            </div>
                            {/* <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Điểm danh: {course.attendance}/
                                  {course.totalSessions}
                                </span>
                              </div> */}
                          </div>
                          {/* <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Bài tập: {course.completedAssignments}/
                                  {course.assignments}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{course.materials} tài liệu</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{course.announcements} thông báo</span>
                              </div>
                            </div> */}
                        </div>
                        {/* Progress */}
                        {/* Schedule */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Lịch học:</h4>
                          <div className="grid gap-2">
                            {course.classes.map((schedule, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{schedule.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{schedule.section}</span>
                                  <MapPin className="h-4 w-4" />
                                  <span>{schedule.room}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Next Class */}

                        {/* Actions */}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch học tuần</CardTitle>
                  <CardDescription>
                    Thời khóa biểu chi tiết theo từng ngày trong tuần
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {weeklySchedule.map((day) => (
                      <div key={day.day} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 text-lg">
                          {day.day}
                        </h3>
                        {day.slots.length > 0 ? (
                          <div className="space-y-2">
                            {day.slots.map((slot, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                      {slot.time}
                                    </span>
                                  </div>
                                  <Badge variant="outline">{slot.course}</Badge>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {slot.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{slot.room}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Không có lớp học
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}

            {/* <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lớp học sắp tới</CardTitle>
                  <CardDescription>
                    Danh sách các lớp học trong những ngày tới
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingClasses.map((class_) => (
                      <div
                        key={class_.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {class_.courseName}
                            </h3>
                            <Badge variant="outline">{class_.courseCode}</Badge>
                            <Badge variant="secondary" className="text-xs">
                              {class_.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(class_.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{class_.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{class_.room}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{class_.instructor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Video className="mr-2 h-4 w-4" />
                            Tham gia
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}
