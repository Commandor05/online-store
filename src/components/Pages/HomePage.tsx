import React, { useState } from 'react';
import { PageProps } from '../../types/Page';
import DataService from '../../utils/DataService';
import { Product } from '../../types/Product';
import { SortOptions } from '../../types/SortOptions';
import { FilterLists } from '../../types/FilterList';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import CommonLayout from '../CommonLayout/CommonLayout';
import ShowcaseLayout from '../ShowcaseLayout/ShowcaseLayout';
import FilterBox from '../FilterBox/FilterBox';
import ProductsUtilityPanel from '../ProductsUtilityPanel/ProductsUtilityPanel';
import ProductCards from '../ProductCards/ProductCards';
import { CardViewTypes } from '../../enums/CardViewType';
import LocalStorage from '../../utils/LocalStorage';
import { StorageKey } from '../../interfaces/StorageKey';
import {MultiRange} from '../../types/FilterBox';

const HomePage = ({ queryParams }: PageProps): JSX.Element=> {
  const dataService: DataService = DataService.getInstance();
  const localStorage = LocalStorage.getInstance();

  const {
    products: initProducts,
    total: initTotal,
    sort: initSort,
    filterLists: initFilterLists,
    search: initSearch,
    cardViewType: initCardViewType,
    priceRange: initPriceRange,
    stockRange: initStockRange
  } = dataService.getData(queryParams);

  const [products, setProducts] = useState<Product[]>(initProducts);
  const [total, setTotal] = useState<number>(initTotal);
  const [sort, setSort] = useState<SortOptions>(initSort);
  const [filterLists, setFilterLists] = useState<FilterLists>(initFilterLists);
  const [search, setSearch] = useState<string>(initSearch);
  const [cardViewType, setCardViewType] = useState<CardViewTypes | null>(initCardViewType);
  const [priceRange, setPriseRange] = useState<MultiRange>(initPriceRange);
  const [stockRange, setStockRange] = useState<MultiRange>(initStockRange);

  const handleQueryUpdate = (queryParams: URLSearchParams) => {
    const { products, total, sort, filterLists, search, cardViewType, priceRange, stockRange } = dataService.getData(queryParams);
    setProducts(products);
    setTotal(total);
    setSort(sort);
    setFilterLists(filterLists);
    setSearch(search);
    setCardViewType(cardViewType);
    setPriseRange(priceRange);
    setStockRange(stockRange);
  }

  const handleSmallViewSwitch = () => {
    setCardViewType(CardViewTypes.small)
    localStorage.setData(StorageKey.cardViewType, CardViewTypes.small)
  }

  const handleBigViewSwitch = () => {
    setCardViewType(CardViewTypes.big)
    localStorage.setData(StorageKey.cardViewType, CardViewTypes.big)
  }
  return (
    <CommonLayout>
      <Header queryParams={queryParams} />
      <ShowcaseLayout queryParams={queryParams}>
        <FilterBox
          queryParams={queryParams}
          filterLists={filterLists}
          priceRange={priceRange}
          stockRange={stockRange}
          onQueryUpdate={handleQueryUpdate}
        />
        <ProductsUtilityPanel
          queryParams={queryParams}
          total={total}
          sort={sort}
          search={search}
          onQueryUpdate={handleQueryUpdate}
          onBigViewSwitch={handleBigViewSwitch}
          onSmallViewSwitch={handleSmallViewSwitch}
          cardViewType={cardViewType}
        />
        <ProductCards queryParams={queryParams} products={products} cardViewType={cardViewType} />
      </ShowcaseLayout>
      <Footer />
    </CommonLayout>
  );
};

export default HomePage;
