import axiosInstance from "./axiosInstance";

export const apiAxios = {
  async get(url, params = {}) {
    let resp = await axiosInstance.get(url, {
      params,
    });
    return resp.data;
  },
  async post(url, obj) {
    let resp = await axiosInstance.post(url, { ...obj });
    return resp.data;
  },
  async postForm(url, formData) {
    let resp = await axiosInstance.postForm(url, formData);
    return resp.data;
  },
  async put(url, obj) {
    let resp = await axiosInstance.put(url, { ...obj });
    return resp.data;
  },
  async putForm(url, formData) {
    let resp = await axiosInstance.putForm(url, formData);
    return resp.data;
  },
  async patch(url, obj) {
    let resp = await axiosInstance.patch(url, { ...obj });
    return resp.data;
  },
  async patchForm(url, formData) {
    let resp = await axiosInstance.patchForm(url, formData);
    return resp.data;
  },
  async delete(url) {
    let resp = await axiosInstance.delete(url);
    return resp.data;
  },
};
