import {
  listUser,
  addUser,
  lockUser,
  updateUser,
  searchUser,
} from "../servicers/AccountServicer";

export const handleListUser = async () => {
  try {
    const response = await listUser();

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
    console.log("Search response:", response);

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
