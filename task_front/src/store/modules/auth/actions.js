import AuthService from "../../../services/AuthService";
import { StorageService } from "../../../services/StorageService";
import ApiService from "../../../services/ApiService";

export default {
  login({ dispatch, commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      commit("loginRequest", { email, password });
      AuthService.login(email, password)
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
