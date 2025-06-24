import api from "../axios/customAxios";

export const createNotificationGroup = (formData) => {
  return api.post("/study_group_notification/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const listNotificationGroup = (id) => {
  return api.get(`/study_group_notification/list_notifications?groupId=${id}`);
};
export const detailNotificationGroup = (id) => {
  return api.get(`/study_group_notification/detail_notification/${id}`);
};
