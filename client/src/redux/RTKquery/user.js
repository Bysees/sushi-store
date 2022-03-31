import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TokenStorage } from "../../storage/tokenStorage";
import jwtDecode from "jwt-decode";
import { baseUrl } from "./http";

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({

    updateInfo: builder.mutation({
      query: (body) => ({
        url: 'user/info',
        method: 'PUT',
        body: body,
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      transformResponse: (response) => {
        TokenStorage.set(response.token)
        const user = jwtDecode(response.token)
        return {
          name: user.name,
          description: user.description
        }
      }
    }),

    updateImg: builder.mutation({
      query: (body) => ({
        url: 'user/avatar',
        method: 'PUT',
        body: body,
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      transformResponse: (response) => {
        TokenStorage.set(response.token)
        const user = jwtDecode(response.token)
        return { avatar: user.avatar }
      }
    }),
  })
})

export const {
  useUpdateInfoMutation,
  useUpdateImgMutation
} = userAPI


