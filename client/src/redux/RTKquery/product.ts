import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct, Label } from '../../models/product'
import { baseUrl, setAuthHeader } from './http'

type GetProductsRequest = {
  category: string
  label?: Label
}

type CreateProductRequest = {
  category: string
  body: IProduct
}

type UpdateProductRequest = CreateProductRequest

type DeleteProductRequest = {
  category: string
  id: string
}

type MutationResult = {
  message: string
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['product'],
  endpoints: (builder) => ({

    getAllProducts: builder.query<IProduct[], void>({
      query: () => `products`
    }),

    getProducts: builder.query<IProduct, GetProductsRequest>({
      query: ({ category, label = 'all' }) => (
        `products?category=${category}&label=${label}`
      ),
      providesTags: () => ['product'],
      keepUnusedDataFor: 60 * 5
    }),

    createProduct: builder.mutation<MutationResult, CreateProductRequest>({
      query: ({ category, body }) => ({
        url: `products?category=${category}`,
        method: 'POST',
        body,
        headers: {
          authorization: setAuthHeader()
        }
      }),
      invalidatesTags: ['product']
    }),

    updateProduct: builder.mutation<MutationResult, UpdateProductRequest>({
      query: ({ category, body }) => ({
        url: `products?category=${category}`,
        method: 'PUT',
        body,
        headers: {
          authorization: setAuthHeader()
        }
      }),
      invalidatesTags: ['product']
    }),

    deleteProduct: builder.mutation<MutationResult, DeleteProductRequest>({
      query: ({ category, id }) => ({
        url: `products/${id}?category=${category}`,
        method: 'DELETE',
        headers: {
          authorization: setAuthHeader()
        }
      }),
      invalidatesTags: ['product']
    }),
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi
