import axios from "axios";
import { TokenService } from "../storage/tokenService"

const baseURL = 'http://localhost:5000/'

export const host = axios.create({
  baseURL
})

export const authorizedHost = axios.create({
  baseURL
})

authorizedHost.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${TokenService.get()}`
  return config
})