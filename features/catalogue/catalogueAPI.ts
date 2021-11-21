import { CatalogueDto } from './catalogueDtos'
import http from '../../app/http'
import { ProductDto } from '../product/productDtos'

export async function fetchCatalogues(): Promise<CatalogueDto[]> {
  try {
    const response = await http.get('/catalogue')
    console.log('base url: ', http.defaults.baseURL)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error during fetching catalogues')
  }
}

export async function fetchCataloguesWithProducts(): Promise<CatalogueDto[]> {
  try {
    const response = await http.get('/catalogue?includeProducts=true')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error during fetching catalogues')
  }
}

export async function fetchCatalogue(id: string): Promise<CatalogueDto> {
  try {
    const response = await http.get('/catalogue/' + id)
    console.log(response.data, id)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error during fetching catalogue')
  }
}

export async function fetchProductsInCatalogue(
  id: string
): Promise<ProductDto[]> {
  try {
    const response = await http.get('/product?catalogueId=' + id)
    console.log(response.data, id)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error during fetching catalogue')
  }
}

export async function addCatalogue(
  name: string,
  url: string
): Promise<CatalogueDto> {
  try {
    const response = await http.post('/catalogue', { name, url })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error during fetching catalogue')
  }
}
