export enum SortOptions {
  none = 'none',
  priceASC = 'price-ASC',
  priceDESC = 'price-DESC',
  discountASC = 'discountPercentage-ASC',
  discountDESC = 'discountPercentage-DESC',
  ratingASC = 'rating-ASC',
  ratingDESC = 'rating-DESC',
}

export type SelectSortOption = {
  value: SortOptions, label: string, disabled?: boolean
};

export const selectSortOptions: SelectSortOption[] = [
  { value: SortOptions.none, label: 'Sort options:' , disabled: true},
  { value: SortOptions.priceASC, label: 'Sort by price ASC' },
  { value: SortOptions.priceDESC, label: 'Sort by price DESC' },
  { value: SortOptions.discountASC, label: 'Sort by discount ASC' },
  { value: SortOptions.discountDESC, label: 'Sort by discount DESC' },
  { value: SortOptions.ratingASC, label: 'Sort by rating ASC' },
  { value: SortOptions.ratingDESC, label: 'Sort by rating DESC' },
];