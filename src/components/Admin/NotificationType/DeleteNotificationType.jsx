import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleDeleteNotification } from "../../../controller/NotificationTypeController";
import { toast } from "react-toastify";

const DeleteNotification = ({ onOpen, onClose, notification, onSuccess }) => {
  console.log(notification);

  const handleDelete = async () => {
    const response = await handleDeleteNotification(notification.id);
    if (response?.status === 204) {
      toast.success(response.message || "Xóa khoa thành công");
      onSuccess();
      onClose();
    } else {
      toast.error(response?.message || "Xóa khoa thất bại");
    }
  };

  return (
    <Dialog open={onOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa loại thông báo này?
          </DialogDescription>
        </DialogHeader>
        {notification && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Mã loại thông báo: {notification.id}
            </p>
            <p className="font-medium">
              Tên loại thông báo: {notification.name}
            </p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteNotification;
