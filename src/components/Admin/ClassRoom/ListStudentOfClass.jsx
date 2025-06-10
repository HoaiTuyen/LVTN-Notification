// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Plus, Search, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const ListStudentOfClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backUrl = location.state?.from || "/admin/class";
  const newStudents = [
    {
      id: 101,
      studentId: "SV101",
      name: "Nguyễn Văn Nhập",
      email: "nguyenvannhap@example.edu.vn",
      department: "Công nghệ thông tin",
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "Đã đăng ký",
    },
    {
      id: 102,
      studentId: "SV102",
      name: "Trần Thị Khẩu",
      email: "tranthikhau@example.edu.vn",
      department: "Công nghệ thông tin",
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "Đã đăng ký",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            onClick={() => navigate(backUrl)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
          <h2 className="text-2xl font-bold">Danh sách đăng ký môn học</h2>
        </div>
        <div>
          <span className="font-medium mr-2">Lập trình web</span>
          <Badge>hCS089879</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Danh sách sinh viên đăng ký</CardTitle>
              <CardDescription>Tổng số: sinh viên</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" /> Nhập danh sách
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" /> Xuất danh sách
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Thêm sinh viên
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1 mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm sinh viên..."
              className="pl-8"
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã SV</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Khoa</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newStudents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center h-24 text-muted-foreground"
                    >
                      Không có sinh viên nào đăng ký môn học này
                    </TableCell>
                  </TableRow>
                ) : (
                  newStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.studentId}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "Đã đăng ký"
                              ? "success"
                              : student.status === "Đang chờ duyệt"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <span className="sr-only">Xóa</span>
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog thêm sinh viên vào danh sách đăng ký */}
      {/* <Dialog open={} onOpenChange={}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm sinh viên vào danh sách đăng ký</DialogTitle>
            <DialogDescription>
              Chọn sinh viên từ danh sách để thêm vào môn học {course?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sinh viên..."
                className="pl-8"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="rounded-md border max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Mã SV</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Khoa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableStudents.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center h-24 text-muted-foreground"
                      >
                        Không có sinh viên nào khả dụng
                      </TableCell>
                    </TableRow>
                  ) : (
                    availableStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className="cursor-pointer"
                        onClick={() => toggleSelectStudent(student)}
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedStudents.some(
                              (s) => s.id === student.id
                            )}
                            onChange={() => toggleSelectStudent(student)}
                            className="h-4 w-4"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {student.studentId}
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.department}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Đã chọn {selectedStudents.length} sinh viên
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">
              Hủy
            </Button>
            <Button
             
              className="bg-blue-600 hover:bg-blue-700"
            >
              Thêm sinh viên
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Dialog nhập danh sách đăng ký */}
      {/* <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nhập danh sách đăng ký</DialogTitle>
            <DialogDescription>
              Nhập danh sách sinh viên đăng ký môn học từ file CSV hoặc Excel
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="file">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">Tải file lên</TabsTrigger>
                <TabsTrigger value="paste">Dán dữ liệu</TabsTrigger>
              </TabsList>
              <TabsContent value="file" className="py-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium mb-1">
                    Kéo và thả file vào đây hoặc
                  </p>
                  <Button variant="outline" size="sm">
                    Chọn file
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Hỗ trợ định dạng: CSV, Excel (.xlsx)
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="paste" className="py-4">
                <div className="space-y-2">
                  <Label htmlFor="import-data">
                    Dán dữ liệu từ Excel hoặc CSV
                  </Label>
                  <Textarea
                    id="import-data"
                    placeholder="Dán dữ liệu ở định dạng: Mã SV, Họ và tên, Email, Khoa"
                    rows={10}
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Định dạng: Mỗi sinh viên một dòng, các trường cách nhau bởi
                    dấu phẩy hoặc tab
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsImportDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleImportData}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Nhập danh sách
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};
export default ListStudentOfClass;
