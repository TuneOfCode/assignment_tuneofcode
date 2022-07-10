import axiosClient from './axios.client';

const slug = '/groups';
const groupApi = {
  getAll: (params) => axiosClient.get(slug, { params }),
  getGroupDetail: (id) => axiosClient.get(`${slug}/group/detail/${id}`),
  getCountGroupsAndCountStudentsStudying: () =>
    axiosClient.get(`${slug}/count-groups-and-count-students-studying`),
  create: (payload) => axiosClient.post(`${slug}/create`, payload),
  update: (payload, id) => axiosClient.patch(`${slug}/edit/${id}`, payload),
  destroy: (id) => axiosClient.delete(`${slug}/destroy/${id}`),
};

export default groupApi;
