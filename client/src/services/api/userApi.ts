import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import jwtDecode from 'jwt-decode'
import { BaseQueryType, baseUrl, setAuthHeader } from './http'
import { TokenStorage } from '../storage/tokenStorage'
import { IUser } from '../../models/user'

type UpdateInfoResult = Pick<IUser, 'name' | 'description'>
type UpdateInfoRequest = UpdateInfoResult

type UpdateImgResult = Pick<IUser, 'avatar'>

type UpdateResponse = {
  token: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', setAuthHeader())
      return headers
    }
  }) as BaseQueryType,
  endpoints: (builder) => ({
    updateInfo: builder.mutation<UpdateInfoResult, UpdateInfoRequest>({
      query: (body) => ({
        url: 'user/info',
        method: 'PUT',
        body
      }),
      transformResponse: (response: UpdateResponse) => {
        TokenStorage.set(response.token)
        const user = jwtDecode<UpdateInfoResult>(response.token)
        return {
          name: user.name,
          description: user.description
        }
      }
    }),

    updateImg: builder.mutation<UpdateImgResult, FormData>({
      query: (body) => ({
        url: 'user/avatar',
        method: 'PUT',
        body
      }),
      transformResponse: (response: UpdateResponse) => {
        TokenStorage.set(response.token)
        const user = jwtDecode<UpdateImgResult>(response.token)
        return { avatar: user.avatar }
      }
    })
  })
})

export const { useUpdateInfoMutation, useUpdateImgMutation } = userApi
