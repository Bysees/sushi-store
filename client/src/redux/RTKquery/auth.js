import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenStorage } from '../../storage/tokenStorage'
import jwtDecode from 'jwt-decode'
import { baseUrl } from './http'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({

    registration: builder.mutation({
      query: (body) => ({
        url: 'auth/registration',
        method: 'POST',
        body: body
      }),
      transformResponse: (response) => {
        TokenStorage.set(response.token)
        const user = jwtDecode(response.token)
        return user
      }
    }),

    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body: body
      }),
      transformResponse: (response) => {
        TokenStorage.set(response.token)
        const user = jwtDecode(response.token)
        return user
      }
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: 'auth/changePassword',
        method: 'PUT',
        body: body,
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      transformResponse: (response) => {
        TokenStorage.set(response.token)
      }
    }),

    checkAuth: builder.query({
      query: () => ({
        url: 'auth/',
        method: 'GET',
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      transformResponse: (response) => {
        TokenStorage.set(response.token)
        const user = jwtDecode(response.token)
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
