import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from '../../models/product'
import { baseUrl, setAuthHeader } from './http'

type CreateRequest = ICategory

type UpdateRequest = {
  category: string,
  body: ICategory
}

type DeleteRequest = {
  category: string
}

type MutationResult = {
  message: string
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['category'],
  endpoints: (builder) => ({

    getCategories: builder.query<ICategory[], void>({
      query: () => 'category',
      providesTags: () => ['category']
    }),

    createCategory: builder.mutation<MutationResult, CreateRequest>({
      query: (body) => ({
        url: 'category',
        method: 'POST',
        body,
        headers: {
          authorization: setAuthHeader()
        }
      }),
      invalidatesTags: ['category']
    }),

    updateCategory: builder.mutation<MutationResult, UpdateRequest>({
      query: ({ category, body }) => ({
        url: `category/${category}`,
        method: 'PUT',
        body,
        headers: {
          authorization: setAuthHeader()
        }
      }),
      invalidatesTags: ['category']
    }),

    deleteCategory: builder.mutation<MutationResult, DeleteRequest>({
      query: (category) => ({
        url: `category/${category}`,
        method: 'DELETE',
        headers: {
          authorization: setAuthHeader()
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
