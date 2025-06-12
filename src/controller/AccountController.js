import {
  listUser,
  addUser,
  lockUser,
  updateUser,
  searchUser,
  getDetailUser,
  uploadImage,
  createAccountExcel,
  getListAccountExcel,
} from "../servicers/AccountServicer";

export const handleListUser = async (page, pageSize) => {
  console.log(page, pageSize);

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
export const handleSearchUser = async (keyword) => {
  try {
    const response = await searchUser(keyword);

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
export const handleGetListAccountExcel = async (file) => {
  try {
    const response = await getListAccountExcel(file);

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

export const handleCreateAccountExcel = async (data) => {
  try {
    const response = await createAccountExcel(data);

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
