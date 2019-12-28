import ApiService from "./ApiService";
import { TokenService, StorageService } from "./StorageService";

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const AuthService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/

  async login() {
    let options = [
      {
        id: 1,
        data:
          '{\\"name\\":\\"Autorizaciones activas\\",\\"component\\":\\"activeAuthorizations/activeAuthorizations\\",\\"path\\":\\"/active-authorizations\\",\\"icon\\":null}',
        parentId: null
      }
    ];
    TokenService.saveToken("XXX");
    StorageService.saveOptions(options);
    return "XXX";
  },

  /* async login (username, password) {
    try {
      const response = await ApiService.post('/auth', { username, password })
      TokenService.saveToken(response.data.token)
      StorageService.saveUserData(response.data.user)
      StorageService.saveOptions(response.data.options)
      ApiService.setHeader()

      return response.data.token
    } catch (error) {
      throw error
    }
  }, */

  logOut() {
    StorageService.clearStorage();
  }
};

export default AuthService;

export { AuthService as UserService, AuthenticationError };
