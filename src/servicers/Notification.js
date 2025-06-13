import api from "../axios/customAxios";

export const createNotification = (title, content) => {
  return api.post("/notification/add", {
    title: title,
    content: content,
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
