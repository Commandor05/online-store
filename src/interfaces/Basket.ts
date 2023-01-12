import { BasketProduct } from "./BasketProduct";
import { Promo } from "./Promo";

export interface Basket {
  promo: Promo[];
  products: BasketProduct[];
}