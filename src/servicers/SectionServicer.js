import api from "../axios/customAxios";

export const getListClassSectionExcel = (formData) => {
  return api.post("/classsection/preview_class_section", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createClassSectionExcel = (data) => {
  return api.post("/classsection/add_class_section", data);
};

export const getListRegisterStudentExcel = (formData) => {
  return api.post("/classsection/preview_student_class_section", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createRegisterStudentExcel = (data) => {
  return api.post("/classsection/add_student_class_section", data);
};
