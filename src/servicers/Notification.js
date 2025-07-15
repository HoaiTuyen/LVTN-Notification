import api from "../axios/customAxios";

export const createNotification = (formData) => {
  return api.post("/notification/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createUserNotification = (formData) => {
  return api.post("/notification/create_notification_user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const listNotification = (sort, page, pageSize = 10, type) => {
  return api.get("/notification/list_notifications", {
    params: {
      sort: sort,
      page: page,
      pageSize: pageSize,
      notificationType: type,
    },
  });
};
export const deleteNotification = (id) => {
  return api.delete(`/notification/delete/${id}`);
};
export const detailNotification = (id) => {
  return api.get(`/notification/detail_notification/${id}`);
};
export const searchNotification = async (
  keyword,
  page = 0,
  pageSize = 10,
  type
) => {
  const req = await api.get("/notification/list_notifications", {
    params: {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
      notificationType: type,
    },
  });
  return req;
};
export const updateNotification = (formData) => {
  return api.put("/notification/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
