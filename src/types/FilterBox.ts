import { FilterLists } from './FilterList';
import {MultiRangeType} from '../enums/MultiRangeType';

export type FilterBoxProps = {
  queryParams?: URLSearchParams,
  filterLists: FilterLists,
  onQueryUpdate: (queryParams: URLSearchParams) => void
  onSliderUpdate?: (type: MultiRangeType, values: MultiRange) => void;
  priceRange: MultiRange,
  stockRange: MultiRange
}

export type MultiRange = {
  min: number,
  max: number
} | null