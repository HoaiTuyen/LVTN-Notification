import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Eye,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Award,
  School,
} from "lucide-react";
import { handleListClassOfTeacher } from "../../../controller/TeacherController";
import { handleGetDetailUser } from "../../../controller/AccountController";
import { jwtDecode } from "jwt-decode";
const ClassCharge = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("current");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const fetchClass = async () => {
    const token = localStorage.getItem("access_token");
    const data = jwtDecode(token);
    const req = await handleGetDetailUser(data.userId);
    console.log(req);
    if (req?.data && req?.status === 200) {
      const teacherDetail = await handleListClassOfTeacher(req.data.teacherId);
      setClasses(teacherDetail.data);
    }
  };
  useEffect(() => {
    fetchClass();
  }, []);
  // Mock data - Lớp chủ nhiệm
  const homeRoomClass = {
    id: 1,
    name: "CNTT-K19A",
    department: "Công nghệ thông tin",
    course: "Khóa 19",
    totalStudents: 45,
    maleStudents: 28,
    femaleStudents: 17,
    academicYear: "2023-2024",
    students: [
      {
        id: 1,
        studentId: "19110001",
        name: "Nguyễn Văn An",
        email: "19110001@student.hcmute.edu.vn",
        phone: "0901234567",
        avatar: "/placeholder.svg?height=40&width=40",
        gpa: 8.5,
        credits: 120,
        status: "Đang học",
        address: "TP. Hồ Chí Minh",
        birthDate: "2001-05-15",
        enrollmentDate: "2019-09-01",
      },
      {
        id: 2,
        studentId: "19110002",
        name: "Trần Thị Bình",
        email: "19110002@student.hcmute.edu.vn",
        phone: "0901234568",
        avatar: "/placeholder.svg?height=40&width=40",
        gpa: 7.8,
        credits: 115,
        status: "Đang học",
        address: "Bình Dương",
        birthDate: "2001-03-22",
        enrollmentDate: "2019-09-01",
      },
      {
        id: 3,
        studentId: "19110003",
        name: "Lê Văn Cường",
        email: "19110003@student.hcmute.edu.vn",
        phone: "0901234569",
        avatar: "/placeholder.svg?height=40&width=40",
        gpa: 9.2,
        credits: 125,
        status: "Đang học",
        address: "Đồng Nai",
        birthDate: "2001-07-10",
        enrollmentDate: "2019-09-01",
      },
      {
        id: 4,
        studentId: "19110004",
        name: "Phạm Thị Dung",
        email: "19110004@student.hcmute.edu.vn",
        phone: "0901234570",
        avatar: "/placeholder.svg?height=40&width=40",
        gpa: 8.1,
        credits: 118,
        status: "Đang học",
        address: "Long An",
        birthDate: "2001-11-05",
        enrollmentDate: "2019-09-01",
      },
      {
        id: 5,
        studentId: "19110005",
        name: "Hoàng Văn Em",
        email: "19110005@student.hcmute.edu.vn",
        phone: "0901234571",
        avatar: "/placeholder.svg?height=40&width=40",
        gpa: 6.8,
        credits: 95,
        status: "Cảnh báo học vụ",
        address: "Tây Ninh",
        birthDate: "2001-09-18",
        enrollmentDate: "2019-09-01",
      },
    ],
  };

  // Mock data - Lớp học phần
  const teachingClasses = [
    {
      id: 1,
      courseCode: "CS101",
      courseName: "Nhập môn lập trình",
      className: "CNTT-K19A",
      semester: "Học kỳ 1, 2023-2024",
      credits: 3,
      schedule: "Thứ 2, 4, 6 - 07:00-09:00",
      room: "A101",
      enrolledStudents: 42,
      maxStudents: 50,
      students: [
        {
          id: 1,
          studentId: "19110001",
          name: "Nguyễn Văn An",
          email: "19110001@student.hcmute.edu.vn",
          avatar: "/placeholder.svg?height=40&width=40",
          midtermGrade: 8.5,
          finalGrade: null,
          attendance: 95,
          assignments: [
            { name: "Bài tập 1", score: 9.0, submitted: true },
            { name: "Bài tập 2", score: 8.5, submitted: true },
            { name: "Bài tập 3", score: null, submitted: false },
          ],
          status: "Đang học",
        },
        {
          id: 2,
          studentId: "19110002",
          name: "Trần Thị Bình",
          email: "19110002@student.hcmute.edu.vn",
          avatar: "/placeholder.svg?height=40&width=40",
          midtermGrade: 7.5,
          finalGrade: null,
          attendance: 88,
          assignments: [
            { name: "Bài tập 1", score: 8.0, submitted: true },
            { name: "Bài tập 2", score: 7.5, submitted: true },
            { name: "Bài tập 3", score: null, submitted: false },
          ],
          status: "Đang học",
        },
        {
          id: 3,
          studentId: "19110003",
          name: "Lê Văn Cường",
          email: "19110003@student.hcmute.edu.vn",
          avatar: "/placeholder.svg?height=40&width=40",
          midtermGrade: 9.0,
          finalGrade: null,
          attendance: 100,
          assignments: [
            { name: "Bài tập 1", score: 9.5, submitted: true },
            { name: "Bài tập 2", score: 9.0, submitted: true },
            { name: "Bài tập 3", score: 8.5, submitted: true },
          ],
          status: "Đang học",
        },
      ],
    },
    {
      id: 2,
      courseCode: "CS201",
      courseName: "Cấu trúc dữ liệu và giải thuật",
      className: "CNTT-K18A",
      semester: "Học kỳ 1, 2023-2024",
      credits: 4,
      schedule: "Thứ 2, 4 - 13:00-16:00",
      room: "B201",
      enrolledStudents: 38,
      maxStudents: 40,
      students: [
        {
          id: 4,
          studentId: "18110001",
          name: "Võ Thị Giang",
          email: "18110001@student.hcmute.edu.vn",
          avatar: "/placeholder.svg?height=40&width=40",
          midtermGrade: 8.0,
          finalGrade: null,
          attendance: 92,
          assignments: [
            { name: "Bài tập 1", score: 8.5, submitted: true },
            { name: "Bài tập 2", score: 7.5, submitted: true },
          ],
          status: "Đang học",
        },
      ],
    },
  ];

  const stats = [
    {
      title: "Lớp chủ nhiệm",
      value: "1",
      description: "CNTT-K19A",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Lớp học phần",
      value: teachingClasses.length.toString(),
      description: "Đang giảng dạy",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Tổng sinh viên",
      value: (
        homeRoomClass.totalStudents +
        teachingClasses.reduce((sum, cls) => sum + cls.enrolledStudents, 0)
      ).toString(),
      description: "Tất cả lớp",
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      title: "GPA trung bình",
      value: "8.1",
      description: "Lớp chủ nhiệm",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Đang học":
        return <Badge className="bg-green-100 text-green-800">Đang học</Badge>;
      case "Cảnh báo học vụ":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Cảnh báo</Badge>
        );
      case "Bảo lưu":
        return <Badge className="bg-gray-100 text-gray-800">Bảo lưu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 8.5) return "text-green-600";
    if (grade >= 7.0) return "text-blue-600";
    if (grade >= 5.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full bg-white overflow-y-auto max-h-[700px] p-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Lớp học phụ trách</h1>
          <p className="text-muted-foreground">
            Quản lý lớp chủ nhiệm và lớp học phần
          </p>
        </div>

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

        <Tabs defaultValue="homeroom" className="space-y-4">
          <TabsList>
            <TabsTrigger value="homeroom">Lớp chủ nhiệm</TabsTrigger>
            <TabsTrigger value="teaching">Lớp học phần</TabsTrigger>
          </TabsList>

          {/* Lớp chủ nhiệm */}
          <TabsContent value="homeroom" className="space-y-4">
            {classes.length === 0 ? (
              <p>Không có lớp</p>
            ) : (
              classes.map((cls) => (
                <Card className="pb-0">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 mb-3">
                          <School className="h-5 w-5" />
                          Lớp {cls.name}
                        </CardTitle>
                        <CardDescription>
                          {cls.departmentName} • {cls.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            navigate(`/giang-vien/class-charge/${cls.id}`)
                          }
                          className="w-[250px] cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Lớp học phần */}
          {/* <TabsContent value="teaching" className="space-y-4">
            <div className="space-y-4">
              {teachingClasses.map((classItem) => (
                <Card key={classItem.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {classItem.courseName}
                        </CardTitle>
                        <CardDescription>
                          {classItem.courseCode} • {classItem.className} •{" "}
                          {classItem.credits} tín chỉ
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {classItem.schedule}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Phòng {classItem.room}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {classItem.enrolledStudents}/{classItem.maxStudents}{" "}
                            sinh viên
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{classItem.semester}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Danh sách sinh viên đăng ký
                        </h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Điểm danh
                          </Button>
                          <Button size="sm" variant="outline">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Nhập điểm
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {classItem.students.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={student.avatar || "/placeholder.svg"}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">
                                    {student.name}
                                  </h5>
                                  {getStatusBadge(student.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  MSSV: {student.studentId}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <div
                                  className={`text-sm font-bold ${getGradeColor(
                                    student.midtermGrade || 0
                                  )}`}
                                >
                                  {student.midtermGrade || "---"}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Giữa kỳ
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold">
                                  {student.finalGrade || "---"}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Cuối kỳ
                                </div>
                              </div>
                              <div className="text-center">
                                <div
                                  className={`text-sm font-bold ${
                                    student.attendance >= 80
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {student.attendance}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Điểm danh
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold">
                                  {
                                    student.assignments.filter(
                                      (a) => a.submitted
                                    ).length
                                  }
                                  /{student.assignments.length}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Bài tập
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>
                                    Thao tác
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Xem chi tiết
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Nhập điểm
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Gửi tin nhắn
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};
export default ClassCharge;

{
  /* <CardContent> */
}
{
  /* <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Tổng sinh viên</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {homeRoomClass.totalStudents}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Nam: {homeRoomClass.maleStudents} • Nữ:{" "}
                      {homeRoomClass.femaleStudents}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium">GPA trung bình</span>
                    </div>
                    <div className="text-2xl font-bold">8.1</div>
                    <div className="text-sm text-muted-foreground">
                      Học kỳ này
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Tín chỉ TB</span>
                    </div>
                    <div className="text-2xl font-bold">115</div>
                    <div className="text-sm text-muted-foreground">
                      Đã tích lũy
                    </div>
                  </div>
                </div> */
}

{
  /* Students List */
}
{
  /* <div className="space-y-4">
                  <h4 className="font-medium">Danh sách sinh viên</h4>
                  <div className="grid gap-4">
                    {homeRoomClass.students
                      .filter(
                        (student) =>
                          student.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          student.studentId.includes(searchTerm)
                      )
                      .map((student) => (
                        <Card key={student.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={student.avatar || "/placeholder.svg"}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">
                                    {student.name}
                                  </h4>
                                  {getStatusBadge(student.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  MSSV: {student.studentId}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {student.email}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {student.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div
                                    className={`text-lg font-bold ${getGradeColor(
                                      student.gpa
                                    )}`}
                                  >
                                    {student.gpa}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    GPA
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold">
                                    {student.credits}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Tín chỉ
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        setSelectedStudent(student)
                                      }
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      Chi tiết
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Thông tin sinh viên
                                      </DialogTitle>
                                      <DialogDescription>
                                        Chi tiết thông tin học tập và cá nhân
                                      </DialogDescription>
                                    </DialogHeader>
                                    {selectedStudent && (
                                      <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                          <Avatar className="h-16 w-16">
                                            <AvatarImage
                                              src={
                                                selectedStudent.avatar ||
                                                "/placeholder.svg"
                                              }
                                              alt={selectedStudent.name}
                                            />
                                            <AvatarFallback>
                                              {selectedStudent.name.charAt(0)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <h3 className="text-lg font-semibold">
                                              {selectedStudent.name}
                                            </h3>
                                            <p className="text-muted-foreground">
                                              MSSV: {selectedStudent.studentId}
                                            </p>
                                            {getStatusBadge(
                                              selectedStudent.status
                                            )}
                                          </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                          <div className="space-y-2">
                                            <h4 className="font-medium">
                                              Thông tin cá nhân
                                            </h4>
                                            <div className="space-y-1 text-sm">
                                              <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                {selectedStudent.email}
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                {selectedStudent.phone}
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {selectedStudent.address}
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Sinh:{" "}
                                                {selectedStudent.birthDate}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="space-y-2">
                                            <h4 className="font-medium">
                                              Thông tin học tập
                                            </h4>
                                            <div className="space-y-1 text-sm">
                                              <div>
                                                GPA:{" "}
                                                <span
                                                  className={`font-bold ${getGradeColor(
                                                    selectedStudent.gpa
                                                  )}`}
                                                >
                                                  {selectedStudent.gpa}
                                                </span>
                                              </div>
                                              <div>
                                                Tín chỉ tích lũy:{" "}
                                                <span className="font-bold">
                                                  {selectedStudent.credits}
                                                </span>
                                              </div>
                                              <div>
                                                Ngày nhập học:{" "}
                                                {selectedStudent.enrollmentDate}
                                              </div>
                                              <div>
                                                Trạng thái:{" "}
                                                {getStatusBadge(
                                                  selectedStudent.status
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Thao tác
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <MessageSquare className="mr-2 h-4 w-4" />
                                      Gửi tin nhắn
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <FileText className="mr-2 h-4 w-4" />
                                      Xem bảng điểm
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div> */
}
{
  /* </CardContent>; */
}
