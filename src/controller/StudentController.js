import {
  listStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  searchStudent,
  getListStudentExcel,
  createStudentExcel,
  studentDetail,
} from "../servicers/StudentServicer";
export const handleListStudent = async (page = 0, pageSize = 10) => {
  try {
    const response = await listStudent(page, pageSize);
    console.log(response);

    if (response?.data) {
      return {
        status: response.status,
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Đã xảy ra lỗi khi lấy danh sách sinh viên",
    };
  }
};
export const handleAddStudent = async (dataStudent) => {
  try {
    const response = await addStudent(dataStudent);

    return {
      status: response.status,
      message: response.message || "Thêm sinh viên thành công",
      data: response.data,
    };
  } catch (error) {
    console.error("Error adding student:", error);
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi thêm sinh viên",
    };
  }
};
export const handleUpdateStudent = async (dataStudent) => {
  try {
    const response = await updateStudent(dataStudent);

    return {
      status: response.status,
      message: response.message || "Thêm sinh viên thành công",
      data: response.data,
    };
  } catch (error) {
    console.error("Error adding student:", error);
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi thêm sinh viên",
    };
  }
};
export const handleDeleteStudent = async (id) => {
  try {
    const response = await deleteStudent(id);
    console.log(response);
    return {
      status: response.status,
      data: response.data,
      message: response.message,
    };
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
export const handleSearchStudent = async (
  status,
  keyword,
  page = 0,
  pageSize = 10
) => {
  try {
    const response = await searchStudent(status, keyword, page, pageSize);

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
export const handleGetListStudentExcel = async (file) => {
  try {
    const response = await getListStudentExcel(file);

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

export const handleCreateStudentExcel = async (data) => {
  try {
    const response = await createStudentExcel(data);

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

export const handleStudentDetail = async (id) => {
  try {
    const response = await studentDetail(id);

    if (response?.data) {
      return {
        status: response.status,
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "Đã xảy ra lỗi khi lấy danh sách sinh viên",
    };
  }
};
