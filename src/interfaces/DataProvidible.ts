import { Data, EnabledFilters } from '../types/Data';
import { FilterLists } from '../types/FilterList';
import { Product } from '../types/Product';

export interface DataProvidible {
  initialiseData(fetchedProducts: Product[]): void;
  getData(queryParams?: URLSearchParams): Data;
  updateFilterLists(products: Product[], enabledFilters: EnabledFilters): FilterLists;
  getProductById(id: number): Product | undefined;
  getProductsById(ids: number[]): Product[] | undefined;
}
