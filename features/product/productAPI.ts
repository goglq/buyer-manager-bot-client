import http from '../../app/http'
import { ProductDto } from './productDtos'

export async function fetchProducts(
  catalogueId?: string
): Promise<ProductDto[]> {
  try {
    const response = await http.get(
      catalogueId ? `/product?catalogueId=${catalogueId}` : '/product'
    )
    return response.data
  } catch (error) {
    throw new Error('Error during fetching products')
  }
}

export async function fetchProduct(
  id: string,
  includePictures: boolean
): Promise<ProductDto> {
  try {
    let response
    if (includePictures === undefined) {
      response = await http.get(`/product/${id}`)
    } else {
      response = await http.get(
        `/product/${id}?includePictures=${includePictures ? 1 : 0}`
      )
    }
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

export async function editProduct(
  id: number,
  edited_product: {
    name: string
    description: string
    catalogueId: number
    photoUrls: string[]
  }
): Promise<ProductDto> {
  try {
    const response = await http.put('/product/' + id, edited_product)
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
    throw error
  }
}
