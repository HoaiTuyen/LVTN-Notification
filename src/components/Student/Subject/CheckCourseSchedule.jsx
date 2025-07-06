import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CheckCourseSchedule({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận trạng thái</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn <strong>tắt</strong> thông báo lịch học vào
            lúc 6h sáng không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={onConfirm}>Đồng ý</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
