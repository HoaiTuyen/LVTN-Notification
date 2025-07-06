import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { handleDeleteClassSection } from "../../../controller/SectionController";
const DeleteSection = ({ onOpen, onClose, section, onSuccess }) => {
  const handleDelete = async () => {
    const response = await handleDeleteClassSection(section.id);
    if (response?.status === 204) {
      toast.success(response.message || "Xóa lớp thành công");
      onSuccess();
      onClose();
    } else {
      toast.error(response?.message || "Xóa lớp thất bại");
    }
  };

  return (
    <Dialog open={onOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa lớp này?
          </DialogDescription>
        </DialogHeader>
        {section && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Mã lớp học phần: {section.id}
            </p>
            <p className="font-medium">Tên lớp học phần: {section.name}</p>
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
export default DeleteSection;
