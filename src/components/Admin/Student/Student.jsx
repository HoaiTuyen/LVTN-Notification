import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Ellipsis, FileText, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AddStudent from "./AddStudent";
const students = [
  {
    id: "SV001",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@example.edu.vn",
    faculty: "Công nghệ thông tin",
    major: "Công nghệ phần mềm",
    status: "Đang học",
  },
  {
    id: "SV002",
    name: "Trần Thị Bình",
    email: "tranthib@example.edu.vn",
    faculty: "Công nghệ thông tin",
    major: "Hệ thống thông tin",
    status: "Đang học",
  },
  {
    id: "SV003",
    name: "Lê Văn Cường",
    email: "levanc@example.edu.vn",
    faculty: "Công nghệ thông tin",
    major: "Khoa học máy tính",
    status: "Đang học",
  },
  {
    id: "SV004",
    name: "Phạm Thị Dung",
    email: "phamthid@example.edu.vn",
    faculty: "Toán - Tin học",
    major: "Toán ứng dụng",
    status: "Đang học",
  },
  {
    id: "SV005",
    name: "Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em Hoàng Văn Em",
    email: "hoangvane@example.edu.vn",
    faculty: "Toán - Tin học",
    major: "Toán ứng dụng",
    status: "Bảo lưu",
  },
];

const Student = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen w-full bg-white p-0">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4">
          <Button variant="outline" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" /> Nhập danh sách
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
            onClick={() => setShowModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm sinh viên
          </Button>
          <AddStudent open={showModal} onClose={() => setShowModal(false)} />
        </div>

        {/* Card */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle>Danh sách sinh viên</CardTitle>
            <CardDescription>
              Tổng số: {students.length} sinh viên
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 ">
              <div className="relative flex-1 border border-gray-100 rounded-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm sinh viên..."
                  className="pl-8 border-none shadow-none focus:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select>
                <SelectTrigger className="w-[200px] border border-gray-100 rounded-md shadow-none focus:ring-0">
                  <SelectValue placeholder="Tất cả các khoa" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded border border-gray-200">
                  <SelectItem value="all">Tất cả các khoa</SelectItem>
                  <SelectItem value="CNTT">Công nghệ thông tin</SelectItem>
                  <SelectItem value="Toán-Tin">Toán - Tin học</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[200px] border border-gray-100 rounded-md shadow-none focus:ring-0">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded border border-gray-200">
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Đang học">Đang học</SelectItem>
                  <SelectItem value="Đã tốt nghiệp">Đã tốt nghiệp</SelectItem>
                  <SelectItem value="Bảo lưu">Bảo lưu</SelectItem>
                  <SelectItem value="Thôi học">Thôi học</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border border-gray-200">
                    <TableHead>MSSV</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Khoa</TableHead>
                    <TableHead>Ngành</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      className="border border-gray-200"
                      key={student.id}
                    >
                      <TableCell className="font-medium">
                        {student.id}
                      </TableCell>
                      <TableCell
                        className="max-w-[100px] truncate"
                        title={student.name}
                      >
                        <div className="flex items-center gap-2">
                          {/* <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg" />
                                  <AvatarFallback>
                                  {student.name
                                      .split(" ")
                                      .map((w) => w[0])
                                      .join("")
                                      .toUpperCase()
                                      .slice(0, 2)}
                                  </AvatarFallback>
                              </Avatar> */}
                          {student.name}
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.faculty}</TableCell>
                      <TableCell>{student.major}</TableCell>
                      <TableCell>
                        {student.status === "Thôi học" ? (
                          <Badge className="bg-red-100 text-white-800">
                            {student.status}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">
                            {student.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu asChild>
                          <DropdownMenuTrigger>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 cursor-pointer"
                            >
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to="">
                                <FileText className="mr-2 h-4 w-4" /> Xem chi
                                tiết
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Student;
