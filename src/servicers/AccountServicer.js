import api from "@/axios/customAxios";
export const listUser = () => {
  return api.get("/user/list_users");
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
export const searchUser = (keyword) => {
  return api.get("/user/list_users", {
    params: {
      keyword,
    },
  });
};
