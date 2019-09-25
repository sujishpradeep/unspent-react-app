import axios from "axios";

function setJwt(jwt, gtoken) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["x-auth-gtoken"] = gtoken;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
