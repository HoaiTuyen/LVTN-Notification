import React, { useEffect, useState } from "react";
import { BlockPicker } from "react-color";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  handleAddGroup,
  handleUpdateGroup,
} from "../../../controller/GroupController";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { AwardIcon } from "lucide-react";
const DEFAULT_COLOR = "#4CAF50";
import { hashColorFromString } from "../../../config/color";
const LecturerAddGroup = ({ open, onClose, onSuccess, group }) => {
  const checkEdit = !!group?.id;
  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;

  const [form, setForm] = useState({
    id: group?.id || "",
    name: group?.name || "",
    userId: userId,
    code: "",
    color: DEFAULT_COLOR,
  });

  const handleSubmit = async () => {
    const submitData = {
      ...form,
      color: form.color || DEFAULT_COLOR,
    };
    if (checkEdit) {
      const reqEdit = await handleUpdateGroup(submitData);
      console.log(reqEdit);

      if (reqEdit?.data || reqEdit?.status === 204) {
        onSuccess();
        toast.success(reqEdit.message || "Tạo nhóm thành công");

        onClose();
      } else {
        toast.error(reqEdit.message);
      }
    } else {
      const res = await handleAddGroup(submitData);
      if (res?.data && res?.status === 201) {
        onSuccess();
        toast.success(res.message || "Tạo nhóm thành công");
        //if (onCreateWithColor) {
        // onCreateWithColor(res.data.id, form.color || DEFAULT_COLOR);
        // const existingColors = JSON.parse(
        //   localStorage.getItem("groupColors") || "{}"
        // );
        // existingColors[res.data.id] = form.color || DEFAULT_COLOR;
        // localStorage.setItem("groupColors", JSON.stringify(existingColors));
        //}
        if (onCreateWithColor) {
          const generatedColor = hashColorFromString(res.data.id);
          onCreateWithColor(res.data.id, generatedColor); // chỉ callback, không lưu
        }
        onClose();
      } else {
        toast.error(res.message);
      }
    }
  };
  useEffect(() => {
    if (open && group?.id) {
      setForm({
        id: group?.id || "",
        name: group?.name || "",
        userId: userId,
        code: "",
        color: group?.color || DEFAULT_COLOR,
      });
    } else {
      setForm({
        id: "",
        name: "",
        userId: userId,
        code: "",
        color: DEFAULT_COLOR,
      });
    }
  }, [group, open]);

  useEffect(() => {}, []);
  return (
    <>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="sm:max-w-[550px]">
          {checkEdit ? (
            <>
              <DialogHeader>
                <DialogTitle>Cập nhật nhóm</DialogTitle>
                <DialogDescription>
                  Nhập thông tin cập nhật về nhóm
                </DialogDescription>
              </DialogHeader>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Thêm nhóm mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin chi tiết về nhóm mới
                </DialogDescription>
              </DialogHeader>
            </>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2 hidden">
                <Input
                  id="userId"
                  placeholder="VD: CNTT01"
                  value={form.userId}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="nameGroup">Tên nhóm</Label>
                <Input
                  id="nameGroup"
                  type="text"
                  placeholder="Nhập tên nhóm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Chọn màu nhóm</Label>
                <BlockPicker
                  color={form.color}
                  onChangeComplete={(color) =>
                    setForm({ ...form, color: color.hex })
                  }
                  colors={[
                    "#4CAF50",
                    "#2196F3",
                    "#FF9800",
                    "#E91E63",
                    "#9C27B0",
                    "#03A9F4",
                    "#FFC107",
                    "#00BCD4",
                    "#795548",
                    "#607D8B",
                  ]}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onClose()}>
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleSubmit()}
            >
              {checkEdit ? "Cập nhật" : "Thêm nhóm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default LecturerAddGroup;
