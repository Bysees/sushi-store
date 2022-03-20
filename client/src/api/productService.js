import { authorizedHost, host } from ".";

export class ProductService {

  static async getProducts(query) {
    try {
      const response = await host.get(`/products?productType=${query}`)
      return response.data.products
    } catch (e) {
      console.log(e.response.data)
    }
  }

  static async getProduct(id) {
    try {
      const response = await host.get(`/products/${id}`)
      console.log(response.data)
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

  static async editProduct(body, query) {
    try {
      const response = await authorizedHost.put(`/products?productType=${query}`, body)
      console.log(response.data)
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

  static async createProduct(body, query) {
    try {
      const response = await authorizedHost.post(`/products?productType=${query}`, body)
      console.log(response.data)
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

  static async removeProduct(id, query) {
    try {
      const response = await authorizedHost.delete(`/products/${id}?productType=${query}`)
      console.log(response.data)
    } catch (e) {
      console.log(e.response.data.message)
    }
  }
}