import { FilterLists, FilterListsOptions } from './FilterList';
import { Product } from './Product';
import { SortOptions } from './SortOptions';
import {CardViewTypes} from '../enums/CardViewType';
import { MultiRange } from './FilterBox';

export type Data = {
  products: Product[], 
  filterLists: FilterLists,
  sort: SortOptions,
  total: number,
  search: string,
  cardViewType: CardViewTypes | null;
  priceRange: MultiRange
  stockRange: MultiRange
}

export type EnabledFilters = {
  [FilterListsOptions.category]: string[],
  [FilterListsOptions.brand]: string[]
};

export type SortField = keyof Product;

export enum SortOrders {
  ASC = 'ASC',
  DESC = 'DESC'
}