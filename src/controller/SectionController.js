import {
  getListClassSectionExcel,
  createClassSectionExcel,
} from "../servicers/SectionServicer";

export const handleGetListClassSectionExcel = async (file) => {
  try {
    const response = await getListClassSectionExcel(file);

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

export const handleCreateClassSectionExcel = async (data) => {
  try {
    const response = await createClassSectionExcel(data);

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
