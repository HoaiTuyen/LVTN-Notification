import api from "@/axios/customAxios";
export const listUser = (page = 0, pageSize) => {
  return api.get("/user/list_users", {
    params: {
      page,
      pageSize,
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
export const searchUser = (keyword, page = 0, pageSize = 10) => {
  return api.get("/user/list_users", {
    params: {
      keyword: keyword,
      page,
      pageSize,
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

export const getListAccountExcel = (formData) => {
  return api.post("/user/preview_account_students", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createAccountExcel = (data) => {
  return api.post("/user/account_student", data);
};
