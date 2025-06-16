import api from "../axios/customAxios";

export const addStudent = (data) => {
  return api.post("/student/add", data);
};
export const listStudent = (page = 0, pageSize) => {
  return api.get("/student/list_students", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const updateStudent = (data) => {
  return api.put("/student/update", data);
};
export const deleteStudent = (id) => {
  return api.delete(`/student/delete/${id}`);
};
export const searchStudent = (status, keyword, page = 0, pageSize) => {
  return api.get("/student/list_students", {
    params: {
      status: status,
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    },
  });
};
// export const getListStudentExcel = (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return api.get("/student/review_students", formData);
// };

export const getListStudentExcel = (formData) => {
  return api.post("/student/preview_students", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createStudentExcel = (data) => {
  return api.post("/student/student_excel", data);
};
