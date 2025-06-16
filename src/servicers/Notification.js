import api from "../axios/customAxios";

export const createNotification = (formData) => {
  return api.post("/notification/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const listNotification = (page, pageSize = 10) => {
  return api.get("/notification/list_notifications", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const deleteNotification = (id) => {
  return api.delete(`/notification/delete/${id}`);
};
