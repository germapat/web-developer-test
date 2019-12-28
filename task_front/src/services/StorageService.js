const TOKEN_KEY = "token";
const USER_KEY = "user";

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const StorageService = {
  saveUserData(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  saveOptions(options) {
    localStorage.setItem("options", JSON.stringify(options));
  },

  clearStorage() {
    localStorage.clear();
  },

  getUserData() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
};

export { TokenService, StorageService };
