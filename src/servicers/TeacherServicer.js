import api from "../axios/customAxios";

export const addTeacher = (data) => {
  return api.post("/teacher/add", data);
};
export const listTeacher = (page = 0, pageSize) => {
  return api.get("/teacher/list_teachers", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const updateTeacher = (data) => {
  return api.put("/teacher/update", data);
};
export const deleteTeacher = (id) => {
  return api.delete(`/teacher/delete/${id}`);
};
export const searchTeacher = (status, keyword, page = 0, pageSize) => {
  return api.get("/teacher/list_teachers", {
    params: {
      status: status,
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    },
  });
};
export const getListTeacherExcel = (formData) => {
  return api.post("/teacher/preview_teachers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createTeacherExcel = (data) => {
  return api.post("/teacher/teacher_excel", data);
};

export const filterTeacher = (keyword = "TEACHER", page = 0, pageSize = 10) => {
  return api.get("/teacher/list_teachers", {
    params: {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    },
  });
};

export const teacherDetail = (id) => {
  return api.post(`/teacher/teacher-detail?id=${id}`);
};
