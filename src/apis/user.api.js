import axiosClient from "./axios.client";

const slug = "/users";
const userApi = {
  getAll: (params) => axiosClient.get(slug, { params }),
  getListStudent: (params) => axiosClient.get(`${slug}/students`, { params }),
  getListLeaders: (params) => axiosClient.get(`${slug}/leaders`, { params }),
  getStudentDetail: (id) => axiosClient.get(`${slug}/student/detail/${id}`),
  getStudentRegistered: () => axiosClient.get(`${slug}/students/registered`),
  create: (payload) => axiosClient.post(`${slug}/create`, payload),
  joinGroup: (payload) => axiosClient.post(`${slug}/join-group`, payload),
  update: (payload, id) => axiosClient.patch(`${slug}/edit/${id}`, payload),
  destroy: (id) => axiosClient.delete(`${slug}/destroy/${id}`),
};

export default userApi;
