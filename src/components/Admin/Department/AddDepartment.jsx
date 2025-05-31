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

const AddDepartment = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm khoa mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết về khoa mới
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="studentId">Mã khoa</Label>
                <Input id="departmentId" placeholder="VD: CNTT01" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nameDepartment">Tên khoa</Label>
                <Input id="nameDepartment" type="text" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onClose()}>
              Hủy
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Thêm khoa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddDepartment;
