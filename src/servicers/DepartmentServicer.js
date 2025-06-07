import api from "../axios/customAxios";

export const addDepartment = async (data) => {
  const response = await api.post("/department/add", data);
  return response;
};

export const listDepartment = async (page = 0, pageSize = 10) => {
  const response = await api.get("/department/list_departments", {
    params: {
      page,
      pageSize,
    },
  });
  return response;
};
export const updateDepartment = async (data) => {
  const response = await api.put("/department/update", data);
  return response;
};
export const deleteDepartment = async (id) => {
  const response = await api.delete(`/department/delete/${id}`);
  return response;
};
export const searchDepartment = async (keyword, page = 0, pageSize = 10) => {
  const response = await api.get("/department/list_departments", {
    params: {
      keyword: keyword,
      page,
      pageSize,
    },
  });
  return response;
};
