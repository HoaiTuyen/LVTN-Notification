import {
  statisticalShare,
  statisticalDepartmentStudent,
} from "../servicers/StatisticalServicer";

export const handleStatisticalShare = async () => {
  try {
    const response = await statisticalShare();

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Đã xảy ra lỗi khi thống kê";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleStatisticalDepartmentStudent = async () => {
  try {
    const response = await statisticalDepartmentStudent();

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Đã xảy ra lỗi khi thống kê";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
