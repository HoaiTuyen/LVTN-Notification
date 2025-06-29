import api from "@/axios/customAxios";
export const listUser = (page = 0, pageSize = 1000) => {
  return api.get("/user/list_users", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const addUser = (data) => {
  return api.post("/user/add", data);
};
export const lockUser = (userId) => {
  return api.post(`/user/lock/${userId}`);
};
export const updateUser = (data) => {
  return api.put("/user/update", data);
};
export const searchUser = (keyword, role, page = 0, pageSize = 50) => {
  return api.get("/user/list_users", {
    params: {
      keyword: keyword,
      role: role,
      page: page,
      pageSize: pageSize,
    },
  });
};
export const getDetailUser = (userId) => {
  return api.post(`/account/user-detail?id=${userId}`);
};
export const uploadImage = (id, formData) => {
  return api.put(`/account/profile_img?id=${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getListStudentAccountExcel = (formData) => {
  return api.post("/user/preview_account_students", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createStudentAccountExcel = (data) => {
  return api.post("/user/account_student", data);
};

export const getListLecturerAccountExcel = (formData) => {
  return api.post("/user/preview_account_teachers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createLecturerAccountExcel = (data) => {
  return api.post("/user/account_teacher", data);
};

export const filterUser = (keyword, page = 0, pageSize = 10) => {
  return api.get("/user/list_users", {
    params: {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    },
  });
};
// /user/list_study_group_by_user?userId=
export const listGroupByStudent = async (id, page = 0, pageSize = 10) => {
  return api.get(`/account/list_study_group_by_user?userId=${id}`, {
    params: {
      page,
      pageSize,
    },
  });
};
