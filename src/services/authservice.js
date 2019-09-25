import http from "./httpservice";
import { apiUrl } from "../config.json";
const jwtDecode = require("jwt-decode");

http.setJwt(getJwt(), getGoogleToken());

const apiUsers = apiUrl + "/api/users";

export function getUser(id) {
  return http.get(apiUsers + "/" + id);
}

export async function login(user) {
  const { data: jwt } = await http.post(apiUsers + "/auth/", user);
  localStorage.setItem("token", jwt);
}

export async function logingoogle(user) {
  const response = await http.post(apiUsers + "/authgoogle/", user);

  console.log("jwt", response);
  localStorage.setItem("token", response.headers["x-auth-token"]);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("gtoken");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function signUp(user) {
  console.log("sign up auth");

  const response = await http.post(apiUsers, user);
  localStorage.setItem("token", response.headers["x-auth-token"]);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getGoogleToken() {
  return localStorage.getItem("gtoken");
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt
};
