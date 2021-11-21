import { ProductDto } from '../product/productDtos'

export interface CatalogueDto {
  id: number
  name: string
  url: string
  products?: ProductDto[]
}
