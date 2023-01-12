import { ProductCardProp } from './ProductCardProp'

export interface CardProps extends ProductCardProp {
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  isExistInBasket: boolean;
}