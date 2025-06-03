import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  handleAddUser,
  handleUpdateUser,
} from "../../../controller/AccountController"; // Import your controller if needed
const AddAccount = ({ open, onClose, onSuccess, users }) => {
  console.log(users);

  const checkEdit = !!users?.id;
  const [form, setForm] = useState({
    id: users?.id || "",
    username: users?.username || "",
    password: "",
    status: users?.status || "ACTIVE",
    role: users?.role || "ADMIN",
    image: users?.image || "",
  });
  useEffect(() => {
    if (users?.id) {
      setForm({
        id: users.id || "",
        username: users.username || "",
        password: "",
        status: users.status || "ACTIVE",
        role: users.role || "ADMIN",
        image: users.image || "",
      });
    } else {
      setForm({
        id: "",
        username: "",
        password: "",
        status: "ACTIVE",
        role: "ADMIN",
        image: "",
      });
    }
  }, [users]);
  const handleSubmit = async () => {
    try {
      if (checkEdit) {
        const reqEdit = await handleUpdateUser(form);
        console.log(reqEdit);

        if (reqEdit.status === 204) {
          onClose();
          onSuccess();
          toast.success(reqEdit.message || "Cập nhật tài khoản thành công");
        } else {
          toast.error(reqEdit.message || "Cập nhật tài khoản thất bại 1111");
        }
      } else {
        const response = await handleAddUser(form);

        if (response.status === 201) {
          onClose();
          onSuccess();
          toast.success(response.message || "Thêm tài khoản thành công");
        } else {
          toast.error(response.message || "Thêm tài khoản thất bại 1111");
        }
      }
    } catch (error) {
      if (error) {
        toast.error(error.message || "Thêm tài khoản thất bại");
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            {checkEdit ? (
              <>
                <DialogTitle>Cập nhật tài khoản</DialogTitle>
                <DialogDescription>
                  Cập nhật thông tin của tài khoản
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle>Tạo tài khoản mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin chi tiết về tài khoản mới
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              {checkEdit && (
                <div className="grid gap-2">
                  <Label htmlFor="id">ID</Label>
                  <Input
                    id="id"
                    placeholder=""
                    disabled={checkEdit}
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder=""
                  value={form.username}
                  disabled={checkEdit}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>

              {checkEdit ? (
                <div className="grid gap-2"></div>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="password">password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    disabled={checkEdit}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="">Trạng thái</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value) =>
                      setForm({ ...form, status: value })
                    }
                  >
                    <SelectTrigger id="">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="">Role</Label>
                  <Select
                    value={form.role}
                    onValueChange={(value) => setForm({ ...form, role: value })}
                  >
                    <SelectTrigger id="">
                      <SelectValue placeholder="Chọn role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="TEACHER">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                setForm({
                  id: "",
                  username: "",
                  password: "",
                  status: "ACTIVE",
                  role: "ADMIN",
                  image: "",
                });
              }}
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {checkEdit ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddAccount;
