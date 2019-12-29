import ApiService from './ApiService'
import { TokenService, StorageService } from './StorageService'

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const AuthService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  async login (email, password) {
    try {
      const response = await ApiService.post('/auth/request-token', { email, password })
      TokenService.saveToken(response.data.accessToken)
      StorageService.saveUserData(response.data.user)
      ApiService.setHeader()
      return response.data.token
    } catch (error) {
      throw error
    }
  },

  logOut () {
    StorageService.clearStorage()
  }
}

export default AuthService

export { AuthService as UserService, AuthenticationError }
