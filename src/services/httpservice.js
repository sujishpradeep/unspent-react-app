import axios from "axios";

function setJwt(jwt, type) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["x-auth-type"] = type;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
