import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TokenStorage } from "../../storage/tokenStorage";
import jwtDecode from "jwt-decode";
import { baseUrl, setAuthHeader } from "./http";
import { IUser } from "../../models/user";

type UpdateInfoResult = Pick<IUser, 'name' | 'description'>
type UpdateInfoRequest = UpdateInfoResult

type UpdateImgResult = Pick<IUser, 'avatar'>
type UpdateImgRequest = {
  body: FormData
}

type UpdateResponse = {
  token: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({

    updateInfo: builder.mutation<UpdateInfoResult, UpdateInfoRequest>({
      query: (body) => ({
        url: 'user/info',
        method: 'PUT',
        body,
        headers: {
          authorization: setAuthHeader()
        }
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

    updateImg: builder.mutation<UpdateImgResult, UpdateImgRequest>({
      query: (body) => ({
        url: 'user/avatar',
        method: 'PUT',
        body,
        headers: {
          authorization: setAuthHeader()
        }
      }),
      transformResponse: (response: UpdateResponse) => {
        TokenStorage.set(response.token)
        const user = jwtDecode<UpdateImgResult>(response.token)
        return { avatar: user.avatar }
      }
    }),

  })
})

export const {
  useUpdateInfoMutation,
  useUpdateImgMutation
} = userApi


