import { toast } from "react-toastify";

export const useValidateStudentForm = () => {
  const today = new Date();
  const maxBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minBirthDate = new Date(today.getFullYear() - 100, 0, 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const isValidBirthDate = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();

    const age = now.getFullYear() - date.getFullYear();
    const m = now.getMonth() - date.getMonth();
    const d = now.getDate() - date.getDate();

    const isFuture = date > now;
    const isTooYoung =
      age < 18 || (age === 18 && (m < 0 || (m === 0 && d < 0)));
    const isTooOld = date < minBirthDate;

    return !isFuture && !isTooYoung && !isTooOld;
  };

  const validateForm = (form) => {
    if (!form.id || !form.firstName || !form.lastName || !form.email) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return false;
    }

    if (!isValidBirthDate(form.dateOfBirth)) {
      toast.error("Ngày sinh không hợp lệ. Vui lòng nhập lại.");
      return false;
    }

    return true;
  };

  return {
    validateForm,
    formatDate,
    minBirthDate,
    maxBirthDate,
  };
};

export const useValidateLecturerForm = () => {
  const today = new Date();
  const maxBirthDate = new Date(
    today.getFullYear() - 22,
    today.getMonth(),
    today.getDate()
  ); // ≥ 22 tuổi
  const minBirthDate = new Date(today.getFullYear() - 100, 0, 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const isValidBirthDate = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();

    const age = now.getFullYear() - date.getFullYear();
    const m = now.getMonth() - date.getMonth();
    const d = now.getDate() - date.getDate();

    const isFuture = date > now;
    const isTooYoung =
      age < 22 || (age === 22 && (m < 0 || (m === 0 && d < 0)));
    const isTooOld = date < minBirthDate;

    return !isFuture && !isTooYoung && !isTooOld;
  };

  const validateForm = (form) => {
    if (!form.id || !form.firstName || !form.lastName || !form.email) {
      toast.error("Vui lòng điền đầy đủ thông tin giảng viên");
      return false;
    }

    if (!isValidBirthDate(form.dateOfBirth)) {
      toast.error("Ngày sinh không hợp lệ. Vui lòng nhập lại.");
      return false;
    }

    return true;
  };

  return {
    validateForm,
    formatDate,
    minBirthDate,
    maxBirthDate,
  };
};
