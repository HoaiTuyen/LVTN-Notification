import {
  createNotification,
  listNotification,
  detailNotification,
  deleteNotification,
  searchNotification,
} from "../servicers/Notification";

export const handleCreateNotification = async (formData) => {
  try {
    const response = await createNotification(formData);

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
export const handleListNotification = async (sort, page, pageSize) => {
  try {
    const response = await listNotification(sort, page, pageSize);

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

export const handleDetailNotification = async (id) => {
  try {
    const response = await detailNotification(id);

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
        error.response?.data?.message ||
        "Đã xảy ra lỗi khi lấy thông tin thông báo",
      data: [],
    };
  }
};
export const handleDeleteNotification = async (id) => {
  try {
    const response = await deleteNotification(id);
    return response;
  } catch (error) {
    if (error) {
      const errMsg = error.response?.data?.message || "Xoá khoa thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleSearchNotification = async (
  keyword,
  notificationType,
  page,
  pageSize = 10
) => {
  try {
    const response = await searchNotification(
      keyword,
      notificationType,
      page,
      pageSize
    );

    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi tìm kiếm khoa",
      data: [],
    };
  }
};
