import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['product'],
  endpoints: (builder) => ({

    getAllProducts: builder.query({
      query: () => `products`,
      providesTags: () => ['product']
    }),

    getProductsByType: builder.query({
      query: (type) => `products?productType=${type}`,
      providesTags: () => ['product']
    }),

    createProduct: builder.mutation({
      query: ({ productType, formData }) => ({
        url: `products?productType=${productType}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['product']
    }),

    updateProduct: builder.mutation({
      query: ({ productType, formData }) => ({
        url: `products?productType=${productType}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: ['product']
    }),

    deleteProduct: builder.mutation({
      query: ({ productType, id }) => ({
        url: `products/${id}?productType=${productType}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product']
    }),
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductsByTypeQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi
