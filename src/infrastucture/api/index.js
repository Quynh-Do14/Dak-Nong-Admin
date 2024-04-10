import { Endpoint } from "../../core/common/appRouter";
import request from "./makeRequest";
import * as apiLinks from "../../core/common/apiLinks";
import { apiAxios } from "./api";

const api = {
  login: (data, setLoading) => request.login(`${apiLinks.API}${Endpoint.Auth.Login}`, data, setLoading),
  // upload: (data, setLoading) => request.postUploadFile(`${apiLinks.API}${Endpoint.Module.MultiUpload}`, data, setLoading),

  getHinhAnhByIdDiaDiem: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.Files}?idDiaDiem=${params}`,
      setLoading
    ),

  getDanhMucConCuaDanhMuc: (params, setLoading) =>
    request.get(
      `${apiLinks.API}${Endpoint.Module.Location}/getDanhMucConCuaDanhMuc?${params}`,
      setLoading
    ),

  /////
  getAllTour: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Tour}?${params}`, setLoading),
  getTourById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Tour}/${params.id}`, setLoading),
  createTour: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Tour}`, data, callBack, setLoading)
  },
  updateTour: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.Tour}/${data.id}`, data, callBack, setLoading)
  },
  deleteTour: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.Tour}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllUser: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.User}?${params}`, setLoading),
  getUserById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.User}/${params.id}`, setLoading),
  createUser: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.User}`, data, callBack, setLoading)
  },
  updateUser: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.User}/${data.id}`, data, callBack, setLoading)
  },
  deleteUser: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.User}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllCategory: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Category}?${params}`, setLoading),

  getAllCategoryByParentId: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.CategoryByParentId}?${params}`, setLoading),

  getCategoryById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Category}/${params.id}`, setLoading),
  createCategory: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Category}`, data, callBack, setLoading)
  },
  updateCategory: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.Category}/${data.id}`, data, callBack, setLoading)
  },
  deleteCategory: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.Category}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllLocation: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Location}?${params}`, setLoading),
  getLocationById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Location}/${params.id}`, setLoading),

  // async createLocation(data, callBack, setLoading, setIdCreate,) {
  //   setLoading(true)
  //   try {
  //     return await apiAxios
  //       .postForm(`${apiLinks.API}${Endpoint.Module.Location}`,
  //         {
  //           data
  //         }
  //       )
  //       .then(response => {
  //         setIdCreate(response?.result.idDiaDiem)
  //         return response;
  //       });
  //   }
  //   catch (error) {
  //     console.error(error)
  //   } finally {
  //     setLoading(false);
  //     callBack()
  //   };
  // },

  createLocation: (data, callBack, setLoading, isDestination = false, onUploadImg) => {
    request.postUploadFile(`${apiLinks.API}${Endpoint.Module.Location}`, data, callBack, setLoading)
      .then((response) => {
        // setIdCreate(response?.result.idDiaDiem)
        if (isDestination) {
          if (response) {
            onUploadImg(response?.result.idDiaDiem)
          }
          return response
        }
      })

  },


  async upload(data, setLoading) {
    setLoading(true)
    try {
      return await apiAxios.postForm(`${apiLinks.API}${Endpoint.Module.MultiUpload}`, {
        ...data
      }).then(response => {
        setLoading(false)
        return response;
      });
    }
    catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }

  },

  updateLocation: (id, data, callBack, setLoading, isDestination = false, onUploadImg) => {
    request.putUploadFile(`${apiLinks.API}${Endpoint.Module.Location}/${id}`, data, callBack, setLoading)
      .then((response) => {
        // setIdCreate(response?.result.idDiaDiem)
        if (isDestination) {
          if (response) {
            onUploadImg(id)
          }
          return response
        }
      })
  },
  deleteLocation: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.Location}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllDistrict: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.District}?${params}`, setLoading),
  getDistrictById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.District}/${params.id}`, setLoading),
  createDistrict: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.District}`, data, callBack, setLoading)
  },
  updateDistrict: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.District}/${data.id}`, data, callBack, setLoading)
  },
  deleteDistrict: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.District}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllEvaluate: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Evaluate}?${params}`, setLoading),
  getEvaluateById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Evaluate}/${params.id}`, setLoading),
  createEvaluate: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Evaluate}`, data, callBack, setLoading)
  },
  updateEvaluate: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.Evaluate}/${data.id}`, data, callBack, setLoading)
  },
  deleteEvaluate: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.Evaluate}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllNews: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.News}?${params}`, setLoading),
  getNewsById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.News}/${params.id}`, setLoading),
  createNews: (data, callBack, setLoading) => {
    request.postUploadFile(`${apiLinks.API}${Endpoint.Module.News}`, data, callBack, setLoading)
  },
  updateNews: (id, data, callBack, setLoading) => {
    request.putUploadFile(`${apiLinks.API}${Endpoint.Module.News}/${id}`, data, callBack, setLoading)
  },
  deleteNews: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.News}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
  getAllSchedule: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Schedule}/getAllLichTrinh?${params}`, setLoading),
  getScheduleById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Schedule}/getLichTrinhById/${params.id}`, setLoading),
  createSchedule: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Schedule}/themLichTrinh`, data, callBack, setLoading)
  },
  updateSchedule: (id, data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Schedule}/capNhatLichTrinh/${id}`, data, callBack, setLoading)
  },
  deleteSchedule: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Schedule}/xoaLichTrinh/${data.id}`, data, callBack, setLoading)
  },

  /////
};
export default api;
