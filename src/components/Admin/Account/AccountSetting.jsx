"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  User,
  School,
} from "lucide-react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { handleGetDetailUser } from "../../../controller/AccountController";
const StudentProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin cá nhân đã được cập nhật.",
    });
  };
  const fetchUserDetail = async () => {
    const token = localStorage.getItem("access_token");
    const data = jwtDecode(token);
    const userId = data.userId;
    const req = await handleGetDetailUser(userId);
    if (req?.data) {
      const userData = req.data;
      if (userData.student) {
        setProfileData(userData.student);
      } else if (userData.teacher) {
        setProfileData(userData.teacher);
      } else {
        console.log("Lỗi");
      }
    }
  };

  //   const academicHistory = [
  //     { semester: "HK1 2022-2023", gpa: 3.5, credits: 18, status: "Đạt" },
  //     { semester: "HK2 2022-2023", gpa: 3.7, credits: 20, status: "Đạt" },
  //     { semester: "HK3 2022-2023", gpa: 3.6, credits: 16, status: "Đạt" },
  //     { semester: "HK1 2023-2024", gpa: 3.8, credits: 18, status: "Đang học" },
  //   ];

  //   const progressPercentage = Math.round((profileData.credits / 150) * 100);
  useEffect(() => {
    fetchUserDetail();
  }, []);
  return (
    <div className="min-h-screen w-full bg-white p-0 ">
      <div className="space-y-6 p-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Thông tin cá nhân
            </h2>
            <p className="text-muted-foreground">
              Quản lý thông tin cá nhân và học tập của bạn
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
              </>
            ) : (
              "Chỉnh sửa"
            )}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="academic">Thông tin học tập</TabsTrigger>
          </TabsList>

          <TabsContent
            value="personal"
            className="space-y-4 overflow-x-auto max-h-[600px]"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Ảnh đại diện</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={profileData.image || "/placeholder.svg"}
                      alt={profileData.firstName}
                    />
                    <AvatarFallback>{profileData.lastName}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Thay đổi ảnh
                    </Button>
                  )}
                  <div className="text-center">
                    <h3 className="font-semibold">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Mã SV: {profileData.id}
                    </p>
                    <Badge variant="success" className="mt-2">
                      {profileData.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Thông tin chi tiết</CardTitle>
                  <CardDescription>
                    Thông tin cá nhân và liên hệ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Mã sinh viên</Label>
                      <Input id="studentId" value={profileData.id} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên</Label>
                      <Input
                        id="firstName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              dateOfBirth: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Giới tính</Label>
                      <Select
                        value={profileData.gender}
                        onValueChange={(value) =>
                          setProfileData({ ...profileData, gender: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NAM">Nam</SelectItem>
                          <SelectItem value="NỮ">Nữ</SelectItem>
                          <SelectItem value="KHÁC">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Lớp</Label>
                      <div className="relative">
                        <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={
                            profileData?.className
                              ? profileData?.className
                              : "Trống"
                          }
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              className: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Tài khoản</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={profileData?.userName}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              userName: e.target.value,
                            })
                          }
                          disabled
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* <TabsContent value="academic" className="space-y-4 ]">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Thông tin học tập
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Khoa</Label>
                      <p className="text-sm">{profileData.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Ngành</Label>
                      <p className="text-sm">{profileData.major}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Năm nhập học
                      </Label>
                      <p className="text-sm">{profileData.enrollmentYear}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Trạng thái</Label>
                      <Badge variant="success">{profileData.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Kết quả học tập
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        GPA hiện tại
                      </Label>
                      <p className="text-2xl font-bold">{profileData.gpa}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Xếp loại</Label>
                      <p className="text-sm">
                        {profileData.gpa >= 3.6
                          ? "Xuất sắc"
                          : profileData.gpa >= 3.2
                          ? "Giỏi"
                          : "Khá"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ học tập</span>
                      <span>{profileData.credits}/150 tín chỉ</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Hoàn thành {progressPercentage}% chương trình
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-x-auto max-h-[300px]">
              <CardHeader>
                <CardTitle>Lịch sử học tập</CardTitle>
                <CardDescription>
                  Kết quả học tập qua các học kỳ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicHistory.map((semester, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{semester.semester}</p>
                        <p className="text-sm text-muted-foreground">
                          {semester.credits} tín chỉ
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">GPA: {semester.gpa}</p>
                        <Badge
                          variant={
                            semester.status === "Đạt" ? "success" : "outline"
                          }
                        >
                          {semester.status}
                        </Badge>
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
  );
};
export default StudentProfilePage;
