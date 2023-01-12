import React, { useState, ChangeEvent } from 'react';
import styles from './FilterBox.module.scss';
import '../../styles/fonts.scss';
import { MultiRangeSliderData } from '../../interfaces/MultiRangeSliderData';
import FilterList from '../FilterList/FilterList';
import { FilterListsOptions } from '../../types/FilterList';
import {toggleFilterParam, redirectTo, resetQueryParams, toggleSingleParam} from '../../utils/Route';
import { ButtonColors } from '../../enums/ButtonColors';
import { Button } from '../Button/Button';
import { FilterRangeType } from '../../types/FilterRangeType';
import { FilterBoxProps } from '../../types/FilterBox';
import { MultiRangeType } from '../../enums/MultiRangeType';
import RangeBoxLayout from '../RangeBoxLayout/RangeBoxLayout';
import { priceRangeConfig } from '../../utils/config/priceRange';
import { stockRangeConfig } from '../../utils/config/stockRange';
import { MultiRangeSlider } from '../MultiRangeSlider/MultiRangeSlider';

const RESET_FILTERS_LABEL = 'Reset Filters';
const COPY_LINK_LABEL = 'Copy Link';
const LINK_COPIED_LABEL = 'Copied!';

const FilterBox = ({ queryParams, filterLists, onQueryUpdate, priceRange, stockRange }: FilterBoxProps) => {
  const filterCategoriesTitle = 'Category';
  const filterBrandsTitle = 'Brand';
  const filterCategoriesList = filterLists[FilterListsOptions.category];
  const filterBrandsList = filterLists[FilterListsOptions.brand];
  const [copyLinkButtonLabel, setCopyLinkButtonLabel] = useState<string>(COPY_LINK_LABEL);


  const handleChangePriceRange = ({ min, max }: MultiRangeSliderData) => {
    handleChangeRange(MultiRangeType.price, { min, max });
  }
  const handleChangeStockRange = ({ min, max }: MultiRangeSliderData) => {
    handleChangeRange(MultiRangeType.stock, { min, max });
  }

  const handleChangeRange = ( rangType: FilterRangeType, { min, max }: MultiRangeSliderData) => {
       const param = `${min}:${max}`;
       const query = queryParams? queryParams : new URLSearchParams(window.location.search);
       const newQueryParams = toggleSingleParam(query, rangType, param);
       const currentUrl = `${window.location.origin}${window.location.pathname}`;
       onQueryUpdate(newQueryParams);
       redirectTo(currentUrl,  newQueryParams);
  }

  const handleChangeFilters = (option: FilterListsOptions, event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.type === 'checkbox' && event.target.id) {
      const param = event.target.id;
      const query = queryParams? queryParams : new URLSearchParams(window.location.search);
      const newQueryParams = toggleFilterParam(query, option, param);
      const currentUrl = `${window.location.origin}${window.location.pathname}`;
      onQueryUpdate(newQueryParams);
      redirectTo(currentUrl,  newQueryParams)
    }
  }

  const handleResetFilters = () => {
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    const query = queryParams? queryParams : new URLSearchParams(window.location.search);
    const newQueryParams = resetQueryParams(query);
    onQueryUpdate(newQueryParams);
    redirectTo(currentUrl, newQueryParams);
  }

  const handleChangeCategory = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChangeFilters(FilterListsOptions.category, event); 
  }

  const handleChangeBrand = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChangeFilters(FilterListsOptions.brand, event); 
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyLinkButtonLabel(LINK_COPIED_LABEL);
    setTimeout(() => setCopyLinkButtonLabel(COPY_LINK_LABEL), 500);
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filtersHeader}>
        <Button color={ButtonColors.Primary} title={RESET_FILTERS_LABEL} onClick={handleResetFilters} />
        <Button color={ButtonColors.Primary} title={copyLinkButtonLabel} onClick={handleCopyLink} />
      </div>
      <FilterList title={filterCategoriesTitle} listItems={filterCategoriesList} handleFilterChange={handleChangeCategory} />
      <FilterList title={filterBrandsTitle} listItems={filterBrandsList} handleFilterChange={handleChangeBrand} />

       <RangeBoxLayout title={priceRangeConfig.title}>
        {priceRange? <MultiRangeSlider
        min={priceRangeConfig.min}
        max={priceRangeConfig.max}
        onChange={handleChangePriceRange}
        minValue = {priceRange.min}
        maxValue = {priceRange.max}
        /> : ''}
       </RangeBoxLayout>

       <RangeBoxLayout title={stockRangeConfig.title}>
         {stockRange? <MultiRangeSlider
          min={stockRangeConfig.min}
          max={stockRangeConfig.max}
          onChange={handleChangeStockRange}
          minValue = {stockRange.min}
          maxValue = {stockRange.max}
        /> : ''}
       </RangeBoxLayout>

    </div>
  );
}

export default FilterBox;

