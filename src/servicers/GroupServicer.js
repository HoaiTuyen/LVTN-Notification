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

export const listGroupByIdUser = async (userId, page, pageSize = 10) => {
  return await api.get(
    `/studygroup/list_study_group_by_user?userId=${userId}`,
    {
      params: {
        page: page,
        pageSize: pageSize,
      },
    }
  );
};
export const joinStudentInClass = async (data) => {
  return await api.post("/studygroup/add_student_studygroup", data);
};
export const detailGroup = async (id) => {
  return await api.get(`/studygroup/list_study_group_detail?id=${id}`);
};
