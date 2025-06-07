import Swal from "sweetalert2";

export const showSuccessAlert = (message = "Thành công") => {
  Swal.fire({
    icon: "success",
    title: "Thành công",
    text: message,
    timer: 1000,
    confirmButtonColor: "#3085d6",
    customClass: {
      container: "swal2-container-high-z",
    },
  });
};

export const showErrorAlert = (message = "Đã xảy ra lỗi") => {
  Swal.fire({
    icon: "error",
    title: "Lỗi",
    text: message,
    confirmButtonColor: "#d33",
    customClass: {
      container: "swal2-container-high-z",
    },
  });
};

export const showConfirmAlert = async ({
  title = "Bạn chắc chắn?",
  text = "Hành động này không thể hoàn tác",
  confirmButtonText = "Xác nhận",
  cancelButtonText = "Huỷ",
}) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
    customClass: {
      container: "swal2-container-high-z",
    },
  });
};
