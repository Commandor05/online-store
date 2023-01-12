import { ChangeEvent } from 'react';

export enum FilterListsOptions {
  category = 'category',
  brand = 'brand'
}

export type FilterListItemProps = {
  label: string,
  available: number,
  selected: number,
  isChecked: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FilterListItem = Omit<FilterListItemProps, 'handleChange'>;

export type FilterListProps = {
  title: string,
  listItems: FilterListItem[],
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type FilterLists = {
  [key in FilterListsOptions]: FilterListItem[]
}