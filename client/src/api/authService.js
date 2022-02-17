import { authorizedHost, host } from "."
import { TokenService } from "../storage/tokenService"

export class AuthService {
  static async registration(userData) {
    const response = await host.post(`/auth/registration`, userData)
    TokenService.set(response.data.token)
    return response
  }

  static async login(userData) {
    const response = await host.post(`/auth/login`, userData)
    TokenService.set(response.data.token)
    return response
  }

  static async check() {
    const response = await authorizedHost.get(`/auth`)
    TokenService.set(response.data.token)
    return response
  }
}