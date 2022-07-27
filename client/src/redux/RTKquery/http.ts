import { TokenStorage } from "../../storage/tokenStorage"

export const baseUrl = '/api/'

export const setAuthHeader = () => {
  const token = TokenStorage.get()
  return token ? `Bearer ${token} ` : 'Bearer'
}
