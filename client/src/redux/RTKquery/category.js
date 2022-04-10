import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenStorage } from '../../storage/tokenStorage'
import { baseUrl } from './http'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['category'],
  endpoints: (builder) => ({

    getCategories: builder.query({
      query: () => 'category',
      providesTags: () => ['category']
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: 'category',
        method: 'POST',
        body: body,
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      invalidatesTags: ['category']
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `category/${data.category}`,
        method: 'PUT',
        body: { ...data.formData },
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      invalidatesTags: ['category']
    }),

    deleteCategory: builder.mutation({
      query: (category) => ({
        url: `category/${category}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      invalidatesTags: ['category']
    }),
  })
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
