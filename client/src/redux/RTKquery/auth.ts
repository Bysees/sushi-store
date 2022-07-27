import { IAuth } from './../../models/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenStorage } from '../../storage/tokenStorage'
import jwtDecode from 'jwt-decode'
import { baseUrl, setAuthHeader } from './http'
import { IUser } from '../../models/user'

type RegistrationRequest = IAuth
type LoginRequest = Omit<IAuth, 'role'>
type ChangePasswordRequest = IAuth

type AuthResponse = {
  token: string
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({

    registration: builder.mutation<IUser, RegistrationRequest>({
      query: (body) => ({
        url: 'auth/registration',
        method: 'POST',
        body: body
      }),
      transformResponse: (response: AuthResponse) => {
        TokenStorage.set(response.token)
        const user = jwtDecode<IUser>(response.token)
        return user
      }
    }),

    login: builder.mutation<IUser, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body: body
      }),
      transformResponse: (response: AuthResponse) => {
        TokenStorage.set(response.token)
        const user = jwtDecode<IUser>(response.token)
        return user
      }
    }),

    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: 'auth/changePassword',
        method: 'PUT',
        body: body,
        headers: {
          authorization: setAuthHeader()
        }
      }),
      transformResponse: (response: AuthResponse) => {
        TokenStorage.set(response.token)
      }
    }),

    checkAuth: builder.query<IUser, void>({
      query: () => ({
        url: 'auth/',
        method: 'GET',
        headers: {
          authorization: setAuthHeader()
        }
      }),
      transformResponse: (response: AuthResponse) => {
        TokenStorage.set(response.token)
        const user = jwtDecode<IUser>(response.token)
        return user
      }
    })
  })

})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useCheckAuthQuery
} = authApi
