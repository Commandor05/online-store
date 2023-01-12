import { CardViewTypes } from '../enums/CardViewType';

// export interface CardProp {
export interface ProductCardProp {
  brand: string;
  category: string;
  description?: string;
  title: string;
  thumbnail?: string;
  id: number;
  discountPercentage?: number;
  price: number;
  rating?: number;
  stock?: number;
  images: string[];
  cardViewType?: CardViewTypes | null;
}
