import {
  listUser,
  addUser,
  lockUser,
  updateUser,
  searchUser,
  getDetailUser,
  uploadImage,
  filterUser,
  createStudentAccountExcel,
  getListStudentAccountExcel,
  createLecturerAccountExcel,
  getListLecturerAccountExcel,
  listGroupByStudent,
} from "../servicers/AccountServicer";

export const handleListUser = async (page = 0, pageSize = 1000) => {
  try {
    const response = await listUser(page, pageSize);

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Lấy danh sách người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleAddUser = async (data) => {
  try {
    const response = await addUser(data);

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Thêm người dùng thất bại";
      console.log(errMsg);

      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
    return error;
  }
};
export const handleLockUser = async (userId) => {
  try {
    const response = await lockUser(userId);
    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Khóa người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleUpdateUser = async (data) => {
  try {
    const response = await updateUser(data);
    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Cập nhật người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleSearchUser = async (keyword, page = 0, pageSize = 50) => {
  try {
    const response = await searchUser(keyword, page, pageSize);

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Tìm kiếm người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleGetDetailUser = async (userId) => {
  try {
    const response = await getDetailUser(userId);
    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Lấy thông tin người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleUploadImage = async (id, formData) => {
  try {
    const response = await uploadImage(id, formData);
    console.log(response);

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Lấy thông tin người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleGetListStudentAccountExcel = async (file) => {
  try {
    const response = await getListStudentAccountExcel(file);
    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi xử lý file Excel",
      data: [],
    };
  }
};

export const handleCreateStudentAccountExcel = async (data) => {
  try {
    const response = await createStudentAccountExcel(data);

    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi xử lý file Excel",
      data: [],
    };
  }
};

export const handleGetListLecturerAccountExcel = async (file) => {
  try {
    const response = await getListLecturerAccountExcel(file);
    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi xử lý file Excel",
      data: [],
    };
  }
};

export const handleCreateLecturerAccountExcel = async (data) => {
  try {
    const response = await createLecturerAccountExcel(data);

    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi xử lý file Excel",
      data: [],
    };
  }
};
export const handleFilterUser = async (keyword, page, pageSize) => {
  try {
    const response = await filterUser(keyword, page, pageSize);

    return response;
  } catch (error) {
    if (error) {
      const errMsg =
        error.response?.data?.message || "Lấy danh sách người dùng thất bại";
      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};

export const handleListGroupByStudent = async (userId, page, pageSize) => {
  try {
    const response = await listGroupByStudent(userId, page, pageSize);

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
