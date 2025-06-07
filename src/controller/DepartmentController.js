import {
  listDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  searchDepartment,
} from "../servicers/DepartmentServicer";

export const handleListDepartment = async (page = 0, pageSize = 0) => {
  try {
    const response = await listDepartment(page, pageSize);

    if (response?.data?.departments) {
      return {
        status: response.status,
        data: response.data,
        message: response.message,
      };
    }

    return {
      status: response?.status || 500,
      message: response?.message || "Đã xảy ra lỗi khi lấy danh sách khoa",
      data: [],
    };
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

export const handleAddDepartment = async (data) => {
  try {
    const response = await addDepartment(data);
    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    if (error) {
      const errMsg = error.response?.data?.message || "Thêm khoa thất bại";

      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleUpdateDepartment = async (data) => {
  try {
    const response = await updateDepartment(data);
    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    if (error) {
      const errMsg = error.response?.data?.message || "Thêm khoa thất bại";

      const status = error.response?.status || 500;
      return {
        status,
        message: errMsg,
      };
    }
  }
};
export const handleDeleteDepartment = async (id) => {
  try {
    const response = await deleteDepartment(id);
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
export const handleSearchDepartment = async (
  keyword,
  page = 0,
  pageSize = 10
) => {
  try {
    const response = await searchDepartment(keyword, page, pageSize);
    console.log(response);

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
