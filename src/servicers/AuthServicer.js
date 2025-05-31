import api from "@/axios/customAxios";
export const systemLogin = (username, password) => {
  return api.post("/auth/login", {
    username,
    password,
  });
};
