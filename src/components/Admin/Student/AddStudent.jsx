import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  handleAddStudent,
  handleUpdateStudent,
} from "../../../controller/StudentController";
import { toast } from "react-toastify";
const AddStudent = ({ open, onClose, onSuccess, student }) => {
  const checkEdit = !!student?.id;
  console.log(checkEdit, student);

  const [form, setForm] = useState({
    id: student?.id || "",
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    email: student?.email || "",
    status: student?.status || "DANG_HOC",
    classId: student?.classId || "",
    gender: student?.gender || "NAM",
    dateOfBirth: student?.dateOfBirth?.slice(0, 10) || "",
  });
  useEffect(() => {
    if (open && student?.id) {
      setForm({
        id: student?.id || "",
        firstName: student?.firstName || "",
        lastName: student?.lastName || "",
        email: student?.email || "",
        status: student?.status || "ĐANG_HỌC",
        classId: student?.classId || "",
        gender: student?.gender || "NAM",
        dateOfBirth: student?.dateOfBirth?.slice(0, 10) || "",
      });
    } else {
      setForm({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        status: "ĐANG_HỌC",
        classId: "",
        gender: "NAM",
        dateOfBirth: "",
      });
    }
  }, [student, open]);
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      if (checkEdit) {
        const reqEdit = await handleUpdateStudent(form);
        console.log(reqEdit);

        if (reqEdit?.status === 204) {
          toast.success("Cập nhật sinh viên thành công");
          onSuccess();
          onClose();
          return;
        } else {
          toast.error(reqEdit?.message || "Cập nhật sinh viên thất bại");
          return;
        }
      } else {
        const response = await handleAddStudent(form);
        if (response?.status === 201) {
          toast.success("Thêm sinh viên thành công");
          onSuccess();
          onClose();
        } else {
          toast.error(response?.message || "Thêm sinh viên thất bại");
        }
      }
    } catch (error) {
      toast.error(error?.message || "Thêm sinh viên thất bại");
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm sinh viên mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết về sinh viên mới
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="studentId">Mã sinh viên</Label>
                <Input
                  id="studentId"
                  placeholder="VD: SV001"
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) =>
                    setForm({ ...form, dateOfBirth: e.target.value })
                  }
                  required
                />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="enrollmentYear">Năm nhập học</Label>
                <Input id="enrollmentYear" type="number" />
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lastName">Họ</Label>
                <Input
                  id="lastName"
                  placeholder="Nhập họ sinh viên"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">Tên</Label>
                <Input
                  id="firstName"
                  placeholder="Nhập tên sinh viên"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.edu.vn"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={form.gender}
                  onValueChange={(value) => setForm({ ...form, gender: value })}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NAM">Nam</SelectItem>
                    <SelectItem value="NỮ">Nữ</SelectItem>
                    <SelectItem value="KHÁC">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={form.status}
                  onValueChange={(e) => setForm({ ...form, status: e })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ĐANG_HỌC">Đang học</SelectItem>
                    <SelectItem value="ĐÃ_TỐT_NGHIỆP">Đã tốt nghiệp</SelectItem>
                    <SelectItem value="BẢO_LƯU">Bảo lưu</SelectItem>
                    <SelectItem value="THÔI_HỌC">Thôi học</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* <div className="grid gap-2">
                <Label htmlFor="major">Ngành</Label>
                <Select>
                  <SelectTrigger id="major">
                    <SelectValue placeholder="Chọn ngành" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Khoa học máy tính">
                      Khoa học máy tính
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onClose()}>
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={(e) => handleSubmitAdd(e)}
            >
              {checkEdit ? "Cập nhật" : "Thêm sinh viên"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddStudent;
