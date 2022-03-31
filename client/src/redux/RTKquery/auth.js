import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenStorage } from '../../storage/tokenStorage'
import jwtDecode from 'jwt-decode'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
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
} = authAPI
