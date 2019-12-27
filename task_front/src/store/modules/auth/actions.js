import AuthService from "../../../services/AuthService";
import { StorageService } from "../../../services/StorageService";
import ApiService from "../../../services/ApiService";

export default {
  login({ dispatch, commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      commit("loginRequest", { username });
      AuthService.login()
        .then(user => {
          commit("loginSuccess", user);
          resolve(user);
        })
        .catch(error => {
          commit("loginFailure", error);
          // dispatch('alert/error', error, { root: true });
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      StorageService.clearStorage();
      ApiService.removeHeader();
      resolve();
    });
  }
};
