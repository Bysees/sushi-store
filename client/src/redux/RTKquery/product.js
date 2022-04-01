import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenStorage } from '../../storage/tokenStorage'
import { baseUrl } from './http'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['product'],
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: ({ productType = '', label = 'all' }) => (
        `products?productType=${productType}&label=${label}`
      ),
      providesTags: () => ['product']
    }),

    createProduct: builder.mutation({
      query: ({ productType, formData }) => ({
        url: `products?productType=${productType}`,
        method: 'POST',
        body: formData,
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      invalidatesTags: ['product']
    }),

    updateProduct: builder.mutation({
      query: ({ productType, formData }) => ({
        url: `products?productType=${productType}`,
        method: 'PUT',
        body: formData,
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      invalidatesTags: ['product']
    }),

    deleteProduct: builder.mutation({
      query: ({ productType, id }) => ({
        url: `products/${id}?productType=${productType}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${TokenStorage.get()}`
        }
      }),
      invalidatesTags: ['product']
    }),
  })
})

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi
