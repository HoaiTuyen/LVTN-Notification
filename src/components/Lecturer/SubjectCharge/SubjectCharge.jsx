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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  Search,
  MoreHorizontal,
  Eye,
  FileText,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  GraduationCap,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { handleListSemester } from "../../../controller/SemesterController";
import { handleListClassSectionTeacher } from "../../../controller/TeacherController";
import { jwtDecode } from "jwt-decode";
import { handleGetDetailUser } from "../../../controller/AccountController";
import TimetableLecturer from "./Timetable";
import dayjs from "dayjs";
const SubjectCharge = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [semesterList, setSemesterList] = useState([]);
  const [classSectionList, setClassSectionList] = useState([]);

  // const teacherCourses = [
  //   {
  //     id: 1,
  //     code: "CS101",
  //     name: "Nhập môn lập trình",
  //     semester: "Học kỳ 1, 2023-2024",
  //     credits: 3,
  //     classes: [
  //       {
  //         id: 1,
  //         name: "CNTT-K19A",
  //         students: 45,
  //         maxStudents: 50,
  //         schedule: "Thứ 2, 4, 6 - 07:00-09:00",
  //         room: "A101",
  //       },
  //       {
  //         id: 2,
  //         name: "CNTT-K19B",
  //         students: 42,
  //         maxStudents: 50,
  //         schedule: "Thứ 3, 5, 7 - 09:00-11:00",
  //         room: "A102",
  //       },
  //     ],
  //     totalStudents: 87,
  //     assignments: 12,
  //     completedAssignments: 8,
  //     avgGrade: 7.8,
  //     status: "Đang giảng dạy",
  //   },
  //   {
  //     id: 2,
  //     code: "CS201",
  //     name: "Cấu trúc dữ liệu và giải thuật",
  //     semester: "Học kỳ 1, 2023-2024",
  //     credits: 4,
  //     classes: [
  //       {
  //         id: 3,
  //         name: "CNTT-K18A",
  //         students: 38,
  //         maxStudents: 40,
  //         schedule: "Thứ 2, 4 - 13:00-16:00",
  //         room: "B201",
  //       },
  //     ],
  //     totalStudents: 38,
  //     assignments: 15,
  //     completedAssignments: 12,
  //     avgGrade: 8.2,
  //     status: "Đang giảng dạy",
  //   },
  //   {
  //     id: 3,
  //     code: "CS301",
  //     name: "Cơ sở dữ liệu",
  //     semester: "Học kỳ 1, 2023-2024",
  //     credits: 4,
  //     classes: [
  //       {
  //         id: 4,
  //         name: "CNTT-K17A",
  //         students: 35,
  //         maxStudents: 40,
  //         schedule: "Thứ 3, 5 - 07:00-10:00",
  //         room: "C301",
  //       },
  //     ],
  //     totalStudents: 35,
  //     assignments: 10,
  //     completedAssignments: 10,
  //     avgGrade: 8.5,
  //     status: "Hoàn thành",
  //   },
  // ];

  // const upcomingClasses = [
  //   {
  //     course: "Nhập môn lập trình",
  //     class: "CNTT-K19A",
  //     time: "07:00 - 09:00",
  //     room: "A101",
  //     date: "Hôm nay",
  //     students: 45,
  //   },
  //   {
  //     course: "Cấu trúc dữ liệu và giải thuật",
  //     class: "CNTT-K18A",
  //     time: "13:00 - 16:00",
  //     room: "B201",
  //     date: "Hôm nay",
  //     students: 38,
  //   },
  //   {
  //     course: "Cơ sở dữ liệu",
  //     class: "CNTT-K17A",
  //     time: "07:00 - 10:00",
  //     room: "C301",
  //     date: "Mai",
  //     students: 35,
  //   },
  // ];

  // const recentActivities = [
  //   {
  //     type: "assignment",
  //     title: "Tạo bài tập mới",
  //     description: "Bài tập 5: Thuật toán sắp xếp - CS201",
  //     time: "2 giờ trước",
  //     icon: FileText,
  //   },
  //   {
  //     type: "grade",
  //     title: "Chấm điểm hoàn thành",
  //     description: "Bài kiểm tra giữa kỳ - CS101 (45 bài)",
  //     time: "5 giờ trước",
  //     icon: CheckCircle,
  //   },
  //   {
  //     type: "message",
  //     title: "Phản hồi sinh viên",
  //     description: "Trả lời 3 câu hỏi trong CS301",
  //     time: "1 ngày trước",
  //     icon: MessageSquare,
  //   },
  // ];

  // const stats = [
  //   {
  //     title: "Môn học phụ trách",
  //     value: teacherCourses
  //       .filter((c) => c.status === "Đang giảng dạy")
  //       .length.toString(),
  //     description: "Học kỳ này",
  //     icon: BookOpen,
  //     color: "text-blue-600",
  //   },
  //   {
  //     title: "Tổng sinh viên",
  //     value: teacherCourses
  //       .reduce((sum, course) => sum + course.totalStudents, 0)
  //       .toString(),
  //     description: "Tất cả lớp học",
  //     icon: Users,
  //     color: "text-green-600",
  //   },
  //   {
  //     title: "Bài tập đã giao",
  //     value: teacherCourses
  //       .reduce((sum, course) => sum + course.assignments, 0)
  //       .toString(),
  //     description: "Học kỳ này",
  //     icon: FileText,
  //     color: "text-purple-600",
  //   },
  //   {
  //     title: "Điểm trung bình",
  //     value: (
  //       teacherCourses.reduce((sum, course) => sum + course.avgGrade, 0) /
  //       teacherCourses.length
  //     ).toFixed(1),
  //     description: "Tất cả môn học",
  //     icon: TrendingUp,
  //     color: "text-orange-600",
  //   },
  // ];

  // const filteredCourses = teacherCourses.filter((course) => {
  //   const matchesSearch =
  //     course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     course.code.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesSemester =
  //     selectedSemester === "all" ||
  //     (selectedSemester === "current" && course.status === "Đang giảng dạy");
  //   return matchesSearch && matchesSemester;
  // });
  const filteredCourses = classSectionList.map((section, index) => {
    return {
      id: `${section.subjectId}-${section.id.groupId}`,
      code: section.subjectId,
      name: section.subjectName,
      semester: section.semesterName,
      date: `Thời gian bắt đầu: ${dayjs(section.startDate).format(
        "DD/MM/YYYY"
      )} - Thời gian kết thúc: ${dayjs(section.endDate).format("DD/MM/YYYY")}`,
      classes: section.courseSchedules.map((s, i) => ({
        id: `${section.subjectId}-${section.id.groupId}-${i}`,
        name: `Nhóm môn học ${section.id.groupId.toString().padStart(2, "0")}`,
        schedule: `Thứ ${s.id.day}, tiết ${s.id.startPeriod}-${s.id.endPeriod}`,
        room: s.id.room || "Trống",
      })),
    };
  });

  const handleSemesterChange = async (value) => {
    setSelectedSemester(value); // Cập nhật select
    await fetchClassOfTeacher(value); // Gọi lại API với học kỳ mới
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
            fetchClassOfTeacher(list[0].id);
          }
        }
      } catch (err) {
        console.error("Lỗi khi fetch học kỳ:", err);
      }
    };
    fetchSemester();
  }, []);
  const fetchClassOfTeacher = async (semesterId) => {
    try {
      const token = localStorage.getItem("access_token");
      const decoded = jwtDecode(token);
      const userId = decoded?.userId;
      const userRes = await handleGetDetailUser(userId);
      const teacherId = userRes?.data?.teacherId;
      if (!teacherId) return;
      const res = await handleListClassSectionTeacher(teacherId, semesterId);
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
    <div className="h-full max-h-[750px] overflow-y-auto p-10 bg-white">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Môn học phụ trách</h1>
          <p className="text-muted-foreground">
            Quản lý các môn học bạn đang giảng dạy
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        </div> */}

        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">Danh sách môn học</TabsTrigger>
            {/* <TabsTrigger value="schedule">Lịch giảng dạy</TabsTrigger> */}
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <CardTitle>Môn học đang phụ trách</CardTitle>
                    <CardDescription>
                      Danh sách các môn học trong học kỳ hiện tại
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {/* <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Tìm kiếm môn học..."
                          className="pl-8 w-[250px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div> */}
                    <Select
                      value={selectedSemester}
                      onValueChange={handleSemesterChange}
                    >
                      <SelectTrigger className="w-[200px]">
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCourses.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      Không có môn học nào
                    </p>
                  ) : (
                    filteredCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="border-l-4 border-l-blue-500"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">
                                  {course.name}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                  {course.date}
                                </div>
                              </div>
                              <CardDescription>
                                {course.code} • {course.semester}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-orange-600" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  {course.classes.length}
                                </span>{" "}
                                lớp học
                              </span>
                            </div> */}
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="grid gap-2 md:grid-cols-2">
                              {course.classes.map((classItem) => (
                                <div
                                  key={classItem.id}
                                  className="p-3 border rounded-lg bg-muted/50"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm">
                                      {classItem.name}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground space-y-1">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {classItem.schedule}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      Phòng {classItem.room}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch giảng dạy sắp tới</CardTitle>
                <CardDescription>Các lớp học trong tuần này</CardDescription>
              </CardHeader>
              <CardContent>
                <TimetableLecturer classSectionList={classSectionList} />
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};
export default SubjectCharge;
