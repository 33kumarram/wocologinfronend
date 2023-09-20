import {
  axiosInstances,
  axiosMultipartInstances,
} from "../Helpers/axiosWrapper";

const baseURL = process.env.REACT_APP_API_URL;
//sample request
//need call service : {url:'/', method:'post', data:'params'}
function userSignUp(params) {
  return axiosInstances({
    url: `${baseURL}/users/signup`,
    method: "post",
    data: params,
  });
}

function userLogIn(params) {
  return axiosInstances({
    url: `${baseURL}/users/login`,
    method: "post",
    data: params,
  });
}

function updateUserDetails(id,params) {
  return axiosInstances({
    url: `${baseURL}/users/updateuserdetails/${id}`,
    method: "put",
    data: params,
  });
}


export const API_URLS = {
  userSignUp,
  userLogIn,
  updateUserDetails
};
