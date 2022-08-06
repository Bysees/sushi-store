import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseQueryType, baseUrl, setAuthHeader } from './http'
import { IProduct, ICategory, LabelExtented } from '../../models/product'

type GetProductsRequest = {
  category: string
  label?: LabelExtented
}

type CreateProductRequest = {
  category: string
  body: FormData
}

type UpdateProductRequest = CreateProductRequest

type DeleteProductRequest = {
  category: string
  id: string
}

type GetProductsResult = {
  items: IProduct[]
  category: ICategory
}

type MutationResult = {
  message: string
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, api) => {
      if (api.type === 'mutation') {
        headers.set('Authorization', setAuthHeader())
      }
      return headers
    }
  }) as BaseQueryType,
  tagTypes: ['product', 'nothing'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<GetProductsResult[], void>({
      query: () => 'products'
    }),

    getProducts: builder.query<IProduct[], GetProductsRequest>({
      query: ({ category, label = 'all' }) =>
        `products?category=${category}&label=${label}`,
      providesTags: () => ['product'],
      keepUnusedDataFor: 60 * 5,
      transformResponse: (response: GetProductsResult) => {
        return response.items
      }
    }),

    createProduct: builder.mutation<MutationResult, CreateProductRequest>({
      query: ({ category, body }) => ({
        url: `products?category=${category}`,
        method: 'POST',
        body
      }),
      invalidatesTags: (result) => (result ? ['product'] : ['nothing'])
    }),

    updateProduct: builder.mutation<MutationResult, UpdateProductRequest>({
      query: ({ category, body }) => ({
        url: `products?category=${category}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result) => (result ? ['product'] : ['nothing'])
    }),

    deleteProduct: builder.mutation<MutationResult, DeleteProductRequest>({
      query: ({ category, id }) => ({
        url: `products/${id}?category=${category}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? ['product'] : ['nothing'])
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi
