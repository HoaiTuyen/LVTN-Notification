import {
  createNotificationGroup,
  listNotificationGroup,
  detailNotificationGroup,
} from "../servicers/NotificationGroup";
export const handleCreateNotificationGroup = async (formData) => {
  try {
    const response = await createNotificationGroup(formData);

    if (response?.data) {
      return {
        status: response.status,
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi lấy danh sách khoa",
      data: [],
    };
  }
};
export const handleListNotificationGroup = async (id) => {
  try {
    const response = await listNotificationGroup(id);

    if (response?.data) {
      return {
        status: response.status,
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi lấy danh sách khoa",
      data: [],
    };
  }
};

export const handleDetailNotificationGroup = async (id) => {
  try {
    const response = await detailNotificationGroup(id);
    return response;
  } catch (error) {
    if (error) {
      const errMsg = error.response?.data?.message || "Lỗi hệ thống";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
