export interface PictureLink {
  id: number
  url: string
  product_id: number
}

export interface ProductDto {
  id: number
  name: string
  description: string
  catalogueId: number
  messageId: number
  pictureLinks: PictureLink[]
}
