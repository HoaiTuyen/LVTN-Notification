import api from "../axios/customAxios";

export const createNotification = (formData) => {
  return api.post("/notification/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const listNotification = (sort, page, pageSize = 10) => {
  return api.get("/notification/list_notifications", {
    params: {
      sort: sort,
      page: page,
      pageSize: pageSize,
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
  notificationType,
  page,
  pageSize = 10
) => {
  const req = await api.get("/notification/list_notifications", {
    params: {
      keyword: keyword,
      notificationType: notificationType,
      page: page,
      pageSize: pageSize,
    },
  });
  console.log(req);
  return req;
};
export const updateNotification = (formData) => {
  return api.put("/notification/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
