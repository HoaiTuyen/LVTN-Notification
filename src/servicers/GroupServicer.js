import api from "../axios/customAxios";

export const listGroup = (page, pageSize = 10) => {
  return api.get("/studygroup/list_study_group", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};
export const addGroup = (data) => {
  return api.post("/studygroup/add", data);
};
export const updateGroup = (data) => {
  return api.put("/studygroup/update", data);
};
export const deleteGroup = (id) => {
  return api.delete(`/studygroup/delete/${id}`);
};

export const searchGroup = (keyword, page, pageSize = 10) => {
  return api.get("/studygroup/list_study_group", {
    params: {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    },
  });
};
