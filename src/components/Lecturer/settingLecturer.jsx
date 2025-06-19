import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  BriefcaseBusiness,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Spin } from "antd";
import {
  handleUploadImage,
  handleGetDetailUser,
} from "../../controller/AccountController";
import { handleUpdateTeacher } from "../../controller/TeacherController";

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [userId, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [initialProfileData, setInitialProfileData] = useState(null); // Lưu dữ liệu ban đầu
  const [initialUserImage, setInitialUserImage] = useState(null);
  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(selectedFile); // Preview the image
    }
  };

  // Handles the image upload
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsLoading(true);
      const res = await handleUploadImage(userId, formData);

      if (res?.data) {
        setUserImage(res.data.image); // Update image preview
        toast.success("Ảnh đại diện đã được cập nhật.");
      }
    } catch (error) {
      toast.error(error.message || "Lỗi khi tải ảnh lên.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    await handleImageUpload();
    try {
      await handleUpdateTeacher(profileData);
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      toast.error(error || "Lỗi khi cập nhật thông tin");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };
  const handleCancel = () => {
    // Khi nhấn hủy, phục hồi lại dữ liệu ban đầu
    setProfileData(initialProfileData);
    setUserImage(initialUserImage);
    setIsEditing(false);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    const data = jwtDecode(token);

    const req = await handleGetDetailUser(data.userId);
    if (req?.data) {
      const userData = req.data;
      setUserId(req.data.id);
      setUserImage(req.data.image);
      setInitialUserImage(req.data.image); // Lưu ảnh ban đầu
      setProfileData(userData.teacher || userData.student);
      setInitialProfileData(userData.teacher || userData.student);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white p-0">
      <div className="space-y-6 p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
            <p className="text-muted-foreground">
              Quản lý thông tin cá nhân và hồ sơ giảng viên
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Hủy
                </Button>
                <Button onClick={handleSave}>Lưu thay đổi</Button>
              </>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar
                    className="h-20 w-20 cursor-pointer"
                    onClick={() => inputRef.current.click()}
                  >
                    <AvatarImage src={userImage} />
                    <AvatarFallback>NVA</AvatarFallback>
                  </Avatar>
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={!isEditing}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Khoa: {profileData.departmentName || "Trống"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ</Label>
                    <Input
                      id="fullName"
                      value={profileData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Tên</Label>
                    <Input
                      id="fullName"
                      value={profileData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1 max-w-[200px]">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        disabled
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1 max-w-[200px]">
                    <Label htmlFor="phone">Trạng thái</Label>
                    <div className="relative">
                      <BriefcaseBusiness className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value="Đang công tác"
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        disabled
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="gender">Giới tính</Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                      disabled
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
                </div>
                {isLoading && (
                  <div className="flex justify-center mt-4">
                    <Spin />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherProfile;

/* <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Thông tin học thuật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Khoa/Bộ môn</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Chức danh</Label>
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) =>
                        handleInputChange("position", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Chuyên môn</Label>
                    <Input
                      id="specialization"
                      value={profileData.specialization}
                      onChange={(e) =>
                        handleInputChange("specialization", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm</Label>
                    <Input
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Giới thiệu</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teaching" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Môn học đang giảng dạy</CardTitle>
                <CardDescription>
                  Danh sách các môn học bạn đang phụ trách trong học kỳ này
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teachingSubjects.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Mã môn: {subject.code}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {subject.students} sinh viên
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Thành tích và Giải thưởng
                </CardTitle>
                <CardDescription>
                  Các thành tích, giải thưởng và công trình nghiên cứu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Năm {achievement.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {achievement.type === "award" && "Giải thưởng"}
                        {achievement.type === "research" && "Nghiên cứu"}
                        {achievement.type === "publication" && "Công bố"}
                        {achievement.type === "guidance" && "Hướng dẫn"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */
