import { CardViewTypes } from '../enums/CardViewType';

export type Product = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[]
}

export type ProductCardsProps = {
  queryParams?: URLSearchParams,
  products: Product[],
  cardViewType: CardViewTypes | null
}

export enum FilterListsOptions {
  category = 'category',
  brand = 'brand'
}