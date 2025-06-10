import api from "../axios/customAxios";

export const createNotification = (title, content) => {
  return api.post("/notification/add", {
    title: title,
    content: content,
  });
};
