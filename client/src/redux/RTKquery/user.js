import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TokenService } from "../../storage/tokenService";
import jwtDecode from "jwt-decode";

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({

    updateInfo: builder.mutation({
      query: (body) => ({
        url: 'user/info',
        method: 'PUT',
        body: body,
        headers: {
          authorization: `Bearer ${TokenService.get()}`
        }
      }),
      transformResponse: (response) => {
        TokenService.set(response.token)
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
          authorization: `Bearer ${TokenService.get()}`
        }
      }),
      transformResponse: (response) => {
        TokenService.set(response.token)
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


