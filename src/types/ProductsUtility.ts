import { SortOptions } from './SortOptions';
import {CardViewTypes} from '../enums/CardViewType';

export type ProductsUtilityPanelProps = {
  queryParams?: URLSearchParams,
  total?: number,
  sort: SortOptions,
  onQueryUpdate: (queryParams: URLSearchParams) => void
  onBigViewSwitch: () => void
  onSmallViewSwitch: () => void
  search: string
  cardViewType: CardViewTypes | null;
}