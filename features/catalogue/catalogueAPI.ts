import { CatalogueDto } from './catalogueDtos'
import http from '../../app/http'

export async function fetchCatalogues(): Promise<CatalogueDto[]> {
  try {
    const response = await http.get('/catalogue')
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
