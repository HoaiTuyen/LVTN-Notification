import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
import {
  Search,
  Ellipsis,
  FileText,
  Pencil,
  Trash2,
  Plus,
  Users,
  Upload,
  Lock,
} from "lucide-react";
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
import {
  handleListUser,
  handleLockUser,
  handleSearchUser,
} from "../../../controller/AccountController";
import useDebounce from "../../../hooks/useDebounce";
import AddAccount from "./AddAccount";

import { toast } from "react-toastify";
const Account = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const openEditModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };
  const fetchListUser = async () => {
    try {
      let response;
      if (debouncedSearchTerm.trim() === "") {
        response = await handleListUser();
      } else {
        response = await handleSearchUser(debouncedSearchTerm);
      }
      if (response?.data?.users) {
        setUsers(response.data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const SubmitLockUser = async (userUd) => {
    try {
      const req = await handleLockUser(userUd);
      if (req.status === 200) {
        fetchListUser();
        toast.success(req.message || "Khoá tài khoản thành công");
      } else {
        toast.error(req.message || "Khoá tài khoản thất bại");
      }
    } catch (error) {
      console.error("Error locking user:", error);
    }
  };

  useEffect(() => {
    fetchListUser();
  }, [debouncedSearchTerm]);
  return (
    <div className="min-h-screen w-full bg-white p-0 ">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4 ">
          {/* <Button
            variant="outline"
            className="flex items-center cursor-pointer"
          >
            <Upload className="mr-2 h-4 w-4" /> Nhập danh sách lớp
          </Button> */}

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center  cursor-pointer"
            onClick={() => {
              setOpenModal(true);
              setSelectedUser(null);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Tạo tài khoản
          </Button>
          {openModal && (
            <AddAccount
              open={openModal}
              onClose={() => {
                setOpenModal(false);
                setSelectedUser(null);
              }}
              onSuccess={fetchListUser}
              users={selectedUser}
            />
          )}
        </div>

        {/* Card */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle>Danh sách tài khoản</CardTitle>
            <CardDescription>Tổng số: {users.length} tài khoản</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 ">
              <div className="relative flex-1 border border-gray-100 rounded-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm tài khoản..."
                  className="pl-8 border-none shadow-none focus:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select>
                <SelectTrigger className="w-[200px] border border-gray-100 rounded-md shadow-none focus:ring-0">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded border border-gray-200">
                  <SelectItem value="all">Tất cả </SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border border-gray-200">
                    <TableHead>Mã tài khoản</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="">Role</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        Không tìm thấy tài khoản phù hợp
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow
                        className="border border-gray-200"
                        key={user.id}
                      >
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell
                          className="max-w-[180px] truncate"
                          title={user.username}
                        >
                          <div className="flex items-center">
                            {user.username}
                          </div>
                        </TableCell>
                        <TableCell className="">{user.status}</TableCell>
                        <TableCell className="">{user.role}</TableCell>

                        <TableCell className="text-center align-middle">
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
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                              >
                                <Link to="">
                                  <FileText className="h-4 w-4" />
                                  Xem chi tiết
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => openEditModal(user)}
                              >
                                <Pencil className="h-4 w-4" /> Chỉnh sửa
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={() => SubmitLockUser(user.id)}
                              >
                                <Lock className="mr-2 h-4 w-4" /> Khoá tài khoản
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
