import axios from "axios";
import { TokenService } from "../storage/tokenService"

export const host = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const authorizedHost = axios.create({
  baseURL: 'http://localhost:5000/'
})

authorizedHost.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${TokenService.get()}`
  return config
})