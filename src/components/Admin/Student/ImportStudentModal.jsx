// ImportStudentModal.jsx
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Spin } from "antd";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  handleGetListStudentExcel,
  handleCreateStudentExcel,
} from "../../../controller/StudentController";
import { toast } from "react-toastify";
import PreviewModal from "./PreviewStudent";
const ImportStudentModal = ({ open, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const inputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    e.target.value = null;
  };
  const handleReview = async () => {
    if (!file) {
      toast.warn("Vui lòng chọn file trước khi xem trước.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await handleGetListStudentExcel(formData);
      console.log(res);

      const students = res.data.students || [];
      const errs = res.data.errors || [];
      setPreviewData(students || []);
      setErrors(errs || []);

      if (!students.length && !errs.length) {
        toast.error(res.message || "File không chứa dữ liệu hợp lệ.");
      } else {
        if (errs.length > 0) {
          errs.forEach((err) => {
            toast.error(`Dòng ${err.rowIndex}: ${err.message}`);
          });
        }
        setShowPreviewModal(true);
      }
    } catch (error) {
      toast.error(error || "Không thể xử lý file. Vui lòng kiểm tra lại.");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateStudent = async (data) => {
    console.log(data);

    try {
      const res = await handleCreateStudentExcel(data);
      if (res?.data && res?.status === 200) {
        onSuccess();
        toast.success("Lưu thành công!");
        onClose();
      } else {
        toast.error(res.message);
        setPreviewData([]);
      }
    } catch (error) {
      console.log(error);

      toast.error("Lỗi khi lưu vào hệ thống!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <Spin spinning={loading} className="fixed inset-0 z-50 bg-black/50">
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nhập danh sách sinh viên</DialogTitle>
            <DialogDescription>
              Nhập danh sách sinh viên từ file CSV hoặc Excel
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">
                Kéo và thả file vào đây hoặc
              </p>
              <Button
                onClick={() => inputRef.current?.click()}
                disabled={loading}
              >
                Chọn file
              </Button>
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Chỉ hỗ trợ định dạng: CSV, Excel (.xlsx)
              </p>
              {file && (
                <div className="mt-2 text-sm text-center text-muted-foreground">
                  Đã chọn: <strong>{file.name}</strong>
                </div>
              )}
              <div className="mt-4">
                <Button onClick={handleReview} disabled={!file || loading}>
                  {loading ? "Đang xử lý..." : "Xem trước dữ liệu"}
                </Button>
              </div>
              {errors.length > 0 && (
                <div className="text-red-500 mt-4 text-sm">
                  <p>Phát hiện lỗi trong file:</p>
                  <ul className="list-disc pl-5 mt-2">
                    {errors.map((err, idx) => (
                      <li key={idx}>
                        Dòng {err.rowIndex - 1}: {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Lưu ý: File nhập vào cần có các cột: Mã SV, Họ và tên, Email ,
                Ngày sinh, Giới tính, Trạng thái
              </p>
            </div>

            {showPreviewModal && (
              <PreviewModal
                open={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                data={previewData}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onClose()}>
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={errors.length > 0 || previewData.length === 0}
              onClick={() => handleCreateStudent(previewData)}
            >
              Nhập danh sách
            </Button>
          </DialogFooter>
        </DialogContent>
      </Spin>
    </Dialog>
  );
};

export default ImportStudentModal;

// <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
// <DialogContent className="max-w-3xl">
//   <DialogHeader>
//     <DialogTitle>Nhập danh sách sinh viên</DialogTitle>
//   </DialogHeader>

//   <Input
//     type="file"
//     accept=".xlsx,.xls"
//     onChange={(e) => setFile(e.target.files[0])}
//   />
//   <Button onClick={handleReview} disabled={!file}>
//     Xem trước
//   </Button>

//   {loading && <p>Đang xử lý file...</p>}

//   {errors.length > 0 && (
//     <div className="text-red-500">
//       <p>Đã phát hiện lỗi trong file:</p>
//       <ul>
//         {errors.map((err, idx) => (
//           <li
//             key={idx}
//           >{`Dòng ${err.row} - Cột ${err.column}: ${err.message}`}</li>
//         ))}
//       </ul>
//     </div>
//   )}

//   {previewData.length > 0 && (
//     <Table>
//       <TableBody>
//         {previewData.map((student, idx) => (
//           <TableRow key={idx}>
//             <TableCell>{student.id}</TableCell>
//             <TableCell>
//               {student.lastName} {student.firstName}
//             </TableCell>
//             <TableCell>{student.email}</TableCell>
//             <TableCell>{student.gender}</TableCell>
//             <TableCell>{student.dateOfBirth}</TableCell>
//             <TableCell>{student.status}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )}

//   <DialogFooter>
//     <Button variant="outline" onClick={onClose}>
//       Hủy
//     </Button>
//     <Button onClick={handleSave} disabled={errors.length > 0}>
//       Lưu vào hệ thống
//     </Button>
//   </DialogFooter>
// </DialogContent>
// </Dialog>

{
  /* {previewData.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Dữ liệu xem trước:</p>
              <Table>
                <TableBody>
                  {previewData.map((student, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        {student.lastName} {student.firstName}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )} */
}
