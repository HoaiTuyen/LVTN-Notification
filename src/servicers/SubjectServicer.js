import api from "../axios/customAxios";

export const addSubject = (data) => {
  return api.post("/subject/add", data);
};
export const listSubject = (page, pageSize = 10) => {
  return api.get("/subject/list_subjects", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const updateSubject = (data) => {
  return api.put("/subject/update", data);
};
export const deleteSubject = (id) => {
  return api.delete(`/subject/delete/${id}`);
};
