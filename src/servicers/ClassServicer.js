import api from "../axios/customAxios";

export const listClass = (page, pageSize = 10) => {
  return api.get("/class/list_classes", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const addClass = (data) => {
  return api.post("/class/add", data);
};
export const deleteClass = (id) => {
  return api.delete(`/class/delete/${id}`);
};
export const updateClass = (data) => {
  return api.put("/class/update", data);
};
export const searchClass = (keyword, page, pageSize = 10) => {
  return api.get("/class/list_classes", {
    params: {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    },
  });
};
export const getListClassExcel = (formData) => {
  return api.post("/class/review_classes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createClassExcel = (data) => {
  return api.post("/class/class_excel", data);
};
