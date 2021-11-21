import http from '../../app/http'
import { ProductDto } from './productDtos'

export async function fetchProducts(): Promise<ProductDto[]> {
  try {
    const response = await http.get('/product')
    return response.data
  } catch (error) {
    throw new Error('Error during fetching products')
  }
}

export async function fetchProduct(id: string): Promise<ProductDto> {
  try {
    const response = await http.get('/product/' + id)
    return response.data
  } catch (error) {
    throw new Error('Error during fetching products')
  }
}

export async function addProduct(product: {
  name: string
  description: string
  catalogueId: string
  photoUrls: string[]
}): Promise<ProductDto> {
  try {
    const response = await http.post('/product', product)
    return response.data
  } catch (error) {
    throw new Error('Error during fetching products')
  }
}

export async function deleteProduct(id: number): Promise<ProductDto> {
  try {
    const response = await http.delete('/product/' + id)
    return response.data
  } catch (error) {
    throw new Error('Error during fetching products')
  }
}
