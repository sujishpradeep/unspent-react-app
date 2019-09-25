import http from "./httpservice";
import { apiUrl } from "../config.json";

const apiAccounts = apiUrl + "/api/accounts/";

export function getAccount(id) {
  return http.get(apiAccounts + id);
}

export function addReward(id, reward) {
  return http.put(apiAccounts + "rewards/" + id, reward);
}

export function addRedeem(id, redeem) {
  return http.put(apiAccounts + "redeems/" + id, redeem);
}

export function updateBoxes(id, boxes) {
  return http.put(apiAccounts + "boxes/" + id, boxes);
}

export function getBoxes(id) {
  return http.get(apiAccounts + "boxes/" + id);
}

export function refreshAccount(id) {
  return http.post(apiAccounts + "refresh/" + id);
}
