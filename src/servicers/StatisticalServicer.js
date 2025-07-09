import api from "@/axios/customAxios";

export const statisticalShare = async () => {
  return await api.get("/report/overview");
};
export const statisticalDepartmentStudent = async () => {
  return await api.get("/report/department_student");
};
