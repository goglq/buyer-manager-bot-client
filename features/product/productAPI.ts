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
