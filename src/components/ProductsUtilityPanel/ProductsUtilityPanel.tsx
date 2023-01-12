import React, { useEffect, useState } from 'react';
import { ProductsUtilityPanelProps } from '../../types/ProductsUtility';
import { SortOptions, selectSortOptions } from '../../types/SortOptions';
import { redirectTo, toggleSingleParam } from '../../utils/Route';
import { TextInput } from '../Input/TextInput';
import { Select } from '../Select/Select';
import styles from './ProductsUtilityPanel.module.scss';
import classNames from 'classnames';
import {CardViewTypes} from '../../enums/CardViewType';

const FOUND_TITLE = 'Found';
const SEARCH_PRODUCT = 'Search product';

const ProductsUtilityPanel = ({ total,
                                sort,
                                search,
                                queryParams,
                                onQueryUpdate,
                                onBigViewSwitch,
                                onSmallViewSwitch,
                                cardViewType
                              }: ProductsUtilityPanelProps) => {
  const [select, setSelect] = useState<SortOptions>(sort);
  const [inputText, setInputText] = React.useState<string>(search.trim());

  useEffect(() => {
    setInputText(search);
    setSelect(sort);
  })

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
    const param = e.target.value as SortOptions;
    setSelect(param);
    const key = 'search';
    const query = queryParams? queryParams : new URLSearchParams(window.location.search);
    const newQueryParams = toggleSingleParam(query, key, param);
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    onQueryUpdate(newQueryParams);
    redirectTo(currentUrl,  newQueryParams)
  };

  const handleCangeSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const param = e.target.value as SortOptions;
    setSelect(param);
    const key = 'sort';
    const query = queryParams? queryParams : new URLSearchParams(window.location.search);
    const newQueryParams = toggleSingleParam(query, key, param);
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    onQueryUpdate(newQueryParams);
    redirectTo(currentUrl,  newQueryParams)
  };

  const cardsViwSwitchButtonSmallClass = classNames(
    styles.cardsViwSwitchButtonSmall,
    {
      [styles.cardsViwSwitchButtonSmall_active]: cardViewType === CardViewTypes.small
    }
  );

  const cardsViwSwitchButtonBigClass = classNames(
    styles.cardsViwSwitchButtonBig,
    {
      [styles.cardsViwSwitchButtonBig_active]: cardViewType === CardViewTypes.big
    }
  );

  return (
    <div className={styles.cardsHeader}>
      <Select value={select} options={selectSortOptions} onChange={handleCangeSorting} />
      <span>{FOUND_TITLE}: {total}</span>
      <TextInput value={inputText} onChange={handleChangeInputText} placeholder={SEARCH_PRODUCT} />
      <div className={styles.cardsViwSwitch}>
        <div className={styles.cardsViwSwitchButton} onClick={onSmallViewSwitch}>
          <div className={cardsViwSwitchButtonSmallClass}> </div>
        </div>
        <div className={styles.cardsViwSwitchButton} onClick={onBigViewSwitch}>
          <div className={cardsViwSwitchButtonBigClass}> </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsUtilityPanel;