import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Form schema
const courseSchema = z
  .object({
    name: z.string().min(2, "Tên môn học phải có ít nhất 2 ký tự"),
    code: z.string().min(3, "Mã môn học phải có ít nhất 3 ký tự"),
    instructor: z.string().min(2, "Tên giảng viên phải có ít nhất 2 ký tự"),
    room: z.string().min(1, "Phòng học không được để trống"),
    time: z
      .string()
      .regex(/^\d{2}:\d{2} - \d{2}:\d{2}$/, "Định dạng giờ học: HH:MM - HH:MM"),
    day: z.string().min(1, "Vui lòng chọn ngày học"),
    credits: z.number().min(1, "Số tín chỉ phải lớn hơn 0"),
    description: z.string().optional(),
    startWeek: z.number().min(1, "Tuần bắt đầu không hợp lệ"),
    endWeek: z.number().min(1, "Tuần kết thúc không hợp lệ"),
    semester: z.number().min(1, "Học kỳ không hợp lệ"),
  })
  .refine((data) => data.endWeek >= data.startWeek, {
    message: "Tuần kết thúc phải lớn hơn hoặc bằng tuần bắt đầu",
    path: ["endWeek"],
  });

const initialCourses = [
  {
    id: "1",
    name: "Lập trình Web",
    code: "IT3080",
    instructor: "TS. Nguyễn Văn A",
    room: "TC-205",
    time: "07:00 - 09:30",
    day: "Thứ 2",
    credits: 3,
    description: "Học về HTML, CSS, JavaScript và React",
    startWeek: 1,
    endWeek: 15,
    semester: 1,
  },
  {
    id: "2",
    name: "Cơ sở dữ liệu",
    code: "IT3090",
    instructor: "PGS. Trần Thị B",
    room: "TC-301",
    time: "13:00 - 15:30",
    day: "Thứ 3",
    credits: 3,
    description: "Thiết kế và quản lý cơ sở dữ liệu",
    startWeek: 1,
    endWeek: 12,
    semester: 1,
  },
  {
    id: "3",
    name: "Mạng máy tính",
    code: "IT3070",
    instructor: "TS. Lê Văn C",
    room: "TC-401",
    time: "09:30 - 12:00",
    day: "Thứ 4",
    credits: 3,
    description: "Kiến thức về mạng và giao thức",
    startWeek: 3,
    endWeek: 15,
    semester: 2,
  },
  {
    id: "4",
    name: "Trí tuệ nhân tạo",
    code: "IT4490",
    instructor: "PGS. Phạm Thị D",
    room: "TC-502",
    time: "15:30 - 18:00",
    day: "Thứ 5",
    credits: 4,
    description: "Machine Learning và Deep Learning",
    startWeek: 5,
    endWeek: 15,
    semester: 2,
  },
];

const availableCourses = [
  {
    id: "av1",
    name: "Toán cao cấp",
    code: "MI1110",
    instructor: "TS. Hoàng Văn E",
    credits: 4,
    description: "Giải tích và đại số tuyến tính",
  },
  {
    id: "av2",
    name: "Vật lý đại cương",
    code: "PH1110",
    instructor: "PGS. Nguyễn Thị F",
    credits: 3,
    description: "Cơ học và nhiệt học",
  },
  {
    id: "av3",
    name: "Hóa đại cương",
    code: "CH1110",
    instructor: "TS. Trần Văn G",
    credits: 3,
    description: "Hóa học cơ bản",
  },
  {
    id: "av4",
    name: "Tiếng Anh",
    code: "FL1110",
    instructor: "ThS. Lê Thị H",
    credits: 2,
    description: "Tiếng Anh giao tiếp",
  },
  {
    id: "av5",
    name: "Lập trình C++",
    code: "IT1180",
    instructor: "TS. Phạm Văn I",
    credits: 3,
    description: "Lập trình hướng đối tượng",
  },
  {
    id: "av6",
    name: "Cấu trúc dữ liệu",
    code: "IT3190",
    instructor: "PGS. Vũ Thị J",
    credits: 3,
    description: "Thuật toán và cấu trúc dữ liệu",
  },
];

const weeks = Array.from({ length: 15 }, (_, i) => i + 1);
const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export default function RegistrationClass() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedAvailableCourse, setSelectedAvailableCourse] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      code: "",
      instructor: "",
      room: "",
      time: "",
      day: "",
      credits: 3,
      description: "",
      startWeek: 1,
      endWeek: 15,
      semester: 1,
    },
  });

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        selectedSemester &&
        selectedWeek &&
        course.semester === selectedSemester &&
        selectedWeek >= course.startWeek &&
        selectedWeek <= course.endWeek &&
        (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [courses, selectedSemester, selectedWeek, searchTerm]);

  const handleAddCourse = () => {
    if (!selectedSemester || !selectedWeek) {
      toast.error("Vui lòng chọn học kỳ và tuần học trước!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    setEditingCourse(null);
    setSelectedAvailableCourse("");
    form.reset({
      startWeek: selectedWeek,
      endWeek: selectedWeek,
      semester: selectedSemester,
      credits: 3,
    });
    setIsDialogOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    form.reset(course);
    setIsDialogOpen(true);
  };

  const handleDeleteCourse = (courseId) => {
    setDeleteCourseId(courseId);
  };

  const confirmDelete = () => {
    if (deleteCourseId) {
      setCourses(courses.filter((course) => course.id !== deleteCourseId));
      toast.success("Đã xóa môn học thành công!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setDeleteCourseId(null);
    }
  };

  const handleSaveCourse = (data) => {
    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id
            ? { ...data, id: editingCourse.id }
            : course
        )
      );
      toast.success("Cập nhật môn học thành công!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } else {
      setCourses([...courses, { ...data, id: Date.now().toString() }]);
      toast.success("Thêm môn học thành công!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
    setIsDialogOpen(false);
    setSelectedAvailableCourse("");
    form.reset();
  };

  const handleSelectAvailableCourse = (value) => {
    setSelectedAvailableCourse(value);
    const course = availableCourses.find((c) => c.id === value);
    if (course) {
      form.reset({
        name: course.name,
        code: course.code,
        instructor: course.instructor,
        credits: course.credits,
        description: course.description,
        room: "",
        time: "",
        day: "",
        startWeek: selectedWeek || 1,
        endWeek: selectedWeek || 1,
        semester: selectedSemester || 1,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Đăng ký lớp học phần
        </h1>
        <p className="text-muted-foreground mt-2">
          Quản lý và đăng ký môn học theo học kỳ và tuần
        </p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-xl dark:bg-gray-800 transition-all duration-300 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="h-5 w-5 text-blue-500" />
              Bộ lọc
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="semester">Học kỳ</Label>
                <Select
                  value={selectedSemester?.toString() || ""}
                  onValueChange={(value) => {
                    setSelectedSemester(Number.parseInt(value));
                    setSelectedWeek(null);
                  }}
                >
                  <SelectTrigger className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn học kỳ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Học kỳ 1</SelectItem>
                    <SelectItem value="2">Học kỳ 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedSemester && (
                <div>
                  <Label htmlFor="week">Tuần học</Label>
                  <Select
                    value={selectedWeek?.toString() || ""}
                    onValueChange={(value) =>
                      setSelectedWeek(Number.parseInt(value))
                    }
                  >
                    <SelectTrigger className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn tuần" />
                    </SelectTrigger>
                    <SelectContent>
                      {weeks.map((week) => (
                        <SelectItem key={week} value={week.toString()}>
                          Tuần {week}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {selectedSemester && selectedWeek && (
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium">
                  Học kỳ {selectedSemester} - Tuần {selectedWeek}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {filteredCourses.length} môn học đã đăng ký
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {!selectedSemester || !selectedWeek ? (
          <Card className="shadow-xl dark:bg-gray-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Vui lòng chọn học kỳ và tuần học
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Chọn để xem danh sách môn học
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Học kỳ {selectedSemester} - Tuần {selectedWeek}
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10 w-full sm:w-64 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Tìm kiếm môn học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAddCourse}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm môn học
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {filteredCourses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-xl dark:bg-gray-800">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium text-muted-foreground">
                        Chưa có môn học nào
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Thêm môn học từ danh sách có sẵn
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="grid gap-4">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-2xl dark:bg-gray-800 transition-all duration-200">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {course.name}
                                <Badge variant="secondary">{course.code}</Badge>
                                <Badge variant="outline">
                                  Học kỳ {course.semester}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="mt-2">
                                {course.description}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                                className="dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteCourse(course.id)}
                                className="text-destructive hover:text-destructive dark:border-gray-600 hover:bg-red-50 dark:hover:bg-gray-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{course.room}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {course.day}, {course.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                Tuần {course.startWeek}-{course.endWeek}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Badge variant="outline">
                              {course.credits} tín chỉ
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>

      {/* Dialog thêm/sửa môn học */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedAvailableCourse("");
            form.reset();
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Sửa môn học" : "Thêm môn học"}
            </DialogTitle>
            <DialogDescription>
              {editingCourse
                ? "Chỉnh sửa thông tin môn học"
                : `Thêm môn học vào Học kỳ ${selectedSemester} - Tuần ${selectedWeek}`}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSaveCourse)}
            className="grid gap-4 py-4"
          >
            {!editingCourse && (
              <div>
                <Label htmlFor="availableCourse">Chọn môn học</Label>
                <Select
                  value={selectedAvailableCourse}
                  onValueChange={handleSelectAvailableCourse}
                >
                  <SelectTrigger className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn môn học từ danh sách" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {course.code} - {course.credits} tín chỉ
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(selectedAvailableCourse || editingCourse) && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên môn học</Label>
                    <Input
                      id="name"
                      disabled={!editingCourse}
                      className={
                        !editingCourse
                          ? "bg-muted"
                          : "dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                      }
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="code">Mã môn học</Label>
                    <Input
                      id="code"
                      disabled={!editingCourse}
                      className={
                        !editingCourse
                          ? "bg-muted"
                          : "dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                      }
                      {...form.register("code")}
                    />
                    {form.formState.errors.code && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.code.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instructor">Giảng viên</Label>
                    <Input
                      id="instructor"
                      disabled={!editingCourse}
                      className={
                        !editingCourse
                          ? "bg-muted"
                          : "dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                      }
                      {...form.register("instructor")}
                    />
                    {form.formState.errors.instructor && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.instructor.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="credits">Số tín chỉ</Label>
                    <Input
                      id="credits"
                      type="number"
                      disabled={!editingCourse}
                      className={
                        !editingCourse
                          ? "bg-muted"
                          : "dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                      }
                      {...form.register("credits", { valueAsNumber: true })}
                    />
                    {form.formState.errors.credits && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.credits.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room">Phòng học</Label>
                    <Input
                      id="room"
                      {...form.register("room")}
                      placeholder="Ví dụ: TC-205"
                      className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                    {form.formState.errors.room && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.room.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="day">Thứ</Label>
                    <Select
                      value={form.watch("day") || ""}
                      onValueChange={(value) => form.setValue("day", value)}
                    >
                      <SelectTrigger className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Chọn thứ" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.day && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.day.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="time">Giờ học</Label>
                    <Input
                      id="time"
                      placeholder="07:00 - 09:30"
                      {...form.register("time")}
                      className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                    {form.formState.errors.time && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.time.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="startWeek">Tuần bắt đầu</Label>
                    <Select
                      value={form.watch("startWeek")?.toString() || ""}
                      onValueChange={(value) =>
                        form.setValue("startWeek", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {weeks.map((week) => (
                          <SelectItem key={week} value={week.toString()}>
                            Tuần {week}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.startWeek && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.startWeek.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="endWeek">Tuần kết thúc</Label>
                    <Select
                      value={form.watch("endWeek")?.toString() || ""}
                      onValueChange={(value) =>
                        form.setValue("endWeek", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {weeks.map((week) => (
                          <SelectItem key={week} value={week.toString()}>
                            Tuần {week}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.endWeek && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.endWeek.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Input
                    id="description"
                    {...form.register("description")}
                    className="dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setSelectedAvailableCourse("");
                  form.reset();
                }}
                className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={
                  (!editingCourse && !selectedAvailableCourse) ||
                  form.formState.isSubmitting
                }
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {editingCourse ? "Cập nhật" : "Thêm vào lịch"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm delete dialog */}
      <AlertDialog
        open={!!deleteCourseId}
        onOpenChange={() => setDeleteCourseId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa môn học</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa môn học này? Hành động này không thể hoàn
              tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
