import React from "react";

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

const AddClass = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm lớp mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết về lớp mới
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="studentId">Mã lớp</Label>
                <Input id="departmentId" placeholder="VD: CNTT01" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nameDepartment">Tên lớp</Label>
                <Input id="nameDepartment" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="">Giáo viên phụ trách</Label>
                <Input id="" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="">Khoa</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Chọn khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNTT">Công nghệ thông tin</SelectItem>
                    <SelectItem value="QTKD">Quản trị kinh doanh</SelectItem>
                    <SelectItem value="CNTP">Công nghê thực phẩm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onClose()}>
              Hủy
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Thêm lớp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddClass;
