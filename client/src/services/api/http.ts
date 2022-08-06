import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'
import { TokenStorage } from '../storage/tokenStorage'

export interface ErrorResponse {
  data: {
    message?: string
  }
  status: number
}

export type BaseQueryType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  ErrorResponse,
  {}
>

export const baseUrl = '/api/'

export const setAuthHeader = () => {
  const token = TokenStorage.get()
  return token ? `Bearer ${token} ` : 'Bearer'
}
