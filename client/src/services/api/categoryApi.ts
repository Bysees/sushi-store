import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseQueryType, baseUrl, setAuthHeader } from './http'
import { IProduct, ICategory } from '../../models/product'

type UpdateRequest = {
  category: string
  body: ICategory
}

type DeleteCategoryResponse = {
  category: ICategory
  items: IProduct[]
}

type MutationResult = {
  message: string
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, api) => {
      if (api.type === 'mutation') {
        headers.set('Authorization', setAuthHeader())
      }
      return headers
    }
  }) as BaseQueryType,
  tagTypes: ['category', 'nothing'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => 'category',
      providesTags: () => ['category']
    }),

    createCategory: builder.mutation<MutationResult, ICategory>({
      query: (body) => ({
        url: 'category',
        method: 'POST',
        body
      }),
      invalidatesTags: (result) => (result ? ['category'] : ['nothing'])
    }),

    updateCategory: builder.mutation<MutationResult, UpdateRequest>({
      query: ({ category, body }) => ({
        url: `category/${category}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result) => (result ? ['category'] : ['nothing'])
    }),

    deleteCategory: builder.mutation<IProduct[], string>({
      query: (category) => ({
        url: `category/${category}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? ['category'] : ['nothing']),
      transformResponse: (response: DeleteCategoryResponse) => response.items
    })
  })
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi
