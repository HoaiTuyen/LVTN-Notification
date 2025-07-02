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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Users,
  Calendar,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserPlus,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react";
import ImportSection from "./ImportSection";
import { handleListSemester } from "../../../controller/SemesterController";
import { handleListClassSectionTeacher } from "../../../controller/TeacherController";
import { handleGetDetailUser } from "../../../controller/AccountController";
import { jwtDecode } from "jwt-decode";
import ImportRegisterStudentSection from "./ImportRegisterStudentSection";
const StudyModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isAssignTeacherOpen, setIsAssignTeacherOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [semesterList, setSemesterList] = useState([]);
  const [classSectionList, setClassSectionList] = useState([]);
  const [openModalRegisterStudent, setOpenModalRegisterStudent] =
    useState(false);

  // Mock data

  const courses = [
    {
      id: 1,
      code: "CS101",
      name: "Nhập môn lập trình",
      credits: 3,
      department: "Công nghệ thông tin",
      semester: "2023-2024-1",
      classes: [
        {
          id: 1,
          name: "CNTT-K19A",
          instructor: "Nguyễn Văn A",
          instructorId: "GV001",
          students: 45,
          maxStudents: 50,
          schedule: "Thứ 2, 4, 6 - 07:00-09:00",
          room: "A101",
          status: "Đang diễn ra",
        },
        {
          id: 2,
          name: "CNTT-K19B",
          instructor: null,
          instructorId: null,
          students: 42,
          maxStudents: 50,
          schedule: "Thứ 3, 5, 7 - 09:00-11:00",
          room: "A102",
          status: "Chưa phân công",
        },
      ],
      totalStudents: 87,
      assignedClasses: 1,
      totalClasses: 2,
      status: "Đang mở",
    },
    {
      id: 2,
      code: "CS201",
      name: "Cấu trúc dữ liệu và giải thuật",
      credits: 4,
      department: "Công nghệ thông tin",
      semester: "2023-2024-1",
      classes: [
        {
          id: 3,
          name: "CNTT-K18A",
          instructor: "Trần Thị B",
          instructorId: "GV002",
          students: 38,
          maxStudents: 40,
          schedule: "Thứ 2, 4 - 13:00-16:00",
          room: "B201",
          status: "Đang diễn ra",
        },
      ],
      totalStudents: 38,
      assignedClasses: 1,
      totalClasses: 1,
      status: "Đang mở",
    },
    {
      id: 3,
      code: "MATH101",
      name: "Đại số tuyến tính",
      credits: 3,
      department: "Toán - Tin học",
      semester: "2023-2024-1",
      classes: [
        {
          id: 4,
          name: "TOAN-K19A",
          instructor: null,
          instructorId: null,
          students: 50,
          maxStudents: 50,
          schedule: "Thứ 2, 4 - 07:00-09:00",
          room: "C301",
          status: "Chưa phân công",
        },
      ],
      totalStudents: 50,
      assignedClasses: 0,
      totalClasses: 1,
      status: "Chưa phân công",
    },
  ];

  const availableTeachers = [
    {
      id: "GV001",
      name: "Nguyễn Văn A",
      department: "Công nghệ thông tin",
      specialization: "Lập trình",
    },
    {
      id: "GV002",
      name: "Trần Thị B",
      department: "Công nghệ thông tin",
      specialization: "Thuật toán",
    },
    {
      id: "GV003",
      name: "Lê Văn C",
      department: "Công nghệ thông tin",
      specialization: "Cơ sở dữ liệu",
    },
    {
      id: "GV004",
      name: "Phạm Thị D",
      department: "Toán - Tin học",
      specialization: "Toán học",
    },
    {
      id: "GV005",
      name: "Hoàng Văn E",
      department: "Toán - Tin học",
      specialization: "Thống kê",
    },
  ];

  const stats = [
    {
      title: "Tổng môn học",
      value: courses.length.toString(),
      description: "Học kỳ hiện tại",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Lớp học",
      value: courses
        .reduce((sum, course) => sum + course.classes.length, 0)
        .toString(),
      description: "Tổng số lớp",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Đã phân công",
      value: courses
        .reduce((sum, course) => sum + course.assignedClasses, 0)
        .toString(),
      description: "Lớp có giảng viên",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      title: "Chưa phân công",
      value: courses
        .reduce(
          (sum, course) => sum + (course.totalClasses - course.assignedClasses),
          0
        )
        .toString(),
      description: "Cần phân công GV",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ];

  const filteredCourses = classSectionList.map((section, index) => {
    return {
      id: `${section.subjectId}-${section.id.groupId}`,
      code: section.subjectId,
      name: section.subjectName,
      semester: section.semesterName,
      classes: section.courseSchedules.map((s, i) => ({
        id: `${section.subjectId}-${section.id.groupId}-${i}`,
        name: `Nhóm học tập ${section.id.groupId.toString().padStart(2, "0")}`,
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
    <div className="min-h-screen w-full bg-white p-10 overflow-y-auto max-h-[700px] ">
      <div className="space-y-6 ">
        {/* <div className="flex justify-between items-center">
          <Button
            onClick={() => setOpenModalImport(true)}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            <Upload className="h-4 w-4" /> Nhập danh sách lớp học phần
          </Button>
          <Button
            onClick={() => setOpenModalImport(true)}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            <Upload className="h-4 w-4" /> Nhập danh sách sinh viên đăng ký môn
            học
          </Button>
          {openModalImport && (
            <ImportSection
              open={openModalImport}
              onClose={() => setOpenModalImport(false)}
              onSuccess={() => setOpenModalImport(false)}
            />
          )}
        </div> */}
        <Card className="p-4  w-full md:w-fit">
          <CardTitle className="text-base mb-2">Nhập dữ liệu từ file</CardTitle>
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              onClick={() => setOpenModalImport(true)}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Nhập danh sách lớp học phần
            </Button>
            <Button
              onClick={() => setOpenModalRegisterStudent(true)}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Nhập danh sách sinh viên đăng ký
            </Button>
          </div>
          {openModalImport && (
            <ImportSection
              open={openModalImport}
              onClose={() => setOpenModalImport(false)}
              onSuccess={() => setOpenModalImport(false)}
            />
          )}
          {openModalRegisterStudent && (
            <ImportRegisterStudentSection
              open={openModalRegisterStudent}
              onClose={() => setOpenModalRegisterStudent(false)}
              onSuccess={() => setOpenModalRegisterStudent(false)}
            />
          )}
        </Card>

        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">Quản lý môn học</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <CardTitle>Danh sách môn học</CardTitle>
                    <CardDescription>
                      Quản lý môn học theo học kỳ
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
                  {filteredCourses.map(
                    (course) => (
                      console.log(course),
                      (
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
                                  <Badge
                                    variant={
                                      course.status === "Đang mở"
                                        ? "default"
                                        : course.status === "Chưa phân công"
                                        ? "destructive"
                                        : "secondary"
                                    }
                                  >
                                    {course.status}
                                  </Badge>
                                </div>
                                <CardDescription>
                                  {course.code} • {course.credits} tín chỉ •{" "}
                                  {course.department}
                                </CardDescription>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>
                                    Thao tác
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedCourse(course);
                                      setIsAssignTeacherOpen(true);
                                    }}
                                  >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Phân công GV
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-4 md:grid-cols-3 mb-4">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">
                                  <span className="font-medium">
                                    {course.totalStudents}
                                  </span>{" "}
                                  sinh viên
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-green-600" />
                                <span className="text-sm">
                                  <span className="font-medium">
                                    {course.totalClasses}
                                  </span>{" "}
                                  lớp học
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-purple-600" />
                                <span className="text-sm">
                                  <span className="font-medium">
                                    {course.assignedClasses}/
                                    {course.totalClasses}
                                  </span>{" "}
                                  đã phân công
                                </span>
                              </div>
                            </div>

                            {/* Classes */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">
                                Danh sách lớp học:
                              </h4>
                              <div className="space-y-2">
                                {course.classes.map((classItem) => (
                                  <div
                                    key={classItem.id}
                                    className="p-3 border rounded-lg"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {classItem.name}
                                        </span>
                                        <Badge
                                          variant={
                                            classItem.instructor
                                              ? "default"
                                              : "destructive"
                                          }
                                        >
                                          {classItem.status}
                                        </Badge>
                                      </div>
                                      <Badge variant="outline">
                                        {classItem.students}/
                                        {classItem.maxStudents} SV
                                      </Badge>
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        GV:{" "}
                                        {classItem.instructor ||
                                          "Chưa phân công"}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Phòng {classItem.room}
                                      </div>
                                      <div className="flex items-center gap-1 md:col-span-2">
                                        <Clock className="h-3 w-3" />
                                        {classItem.schedule}
                                      </div>
                                    </div>
                                    {!classItem.instructor && (
                                      <div className="mt-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setSelectedCourse({
                                              ...course,
                                              selectedClass: classItem,
                                            });
                                            setIsAssignTeacherOpen(true);
                                          }}
                                        >
                                          <UserPlus className="mr-1 h-3 w-3" />
                                          Phân công GV
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default StudyModule;
