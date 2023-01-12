import React, { useEffect, useState } from 'react';
import './styles/fonts.scss';
import Route from './utils/Route';
import { Routes } from './utils/config/routes';
import HomePage from './components/Pages/HomePage';
import ProductPage from './components/Pages/ProductPage';
import CartPage from './components/Pages/CartPage';
import { Sandbox } from './components/Sandbox/Sandbox';
import DataService from './utils/DataService';
import productsData from './utils/config/data';
import Spinner from './components/Spinner/Spinner';

const App = () => {
  const dataService: DataService = DataService.getInstance();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const fetchData = () => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((response) => response.json())
      .then((data) => {
        dataService.initialiseData(data.products);
        setIsDataLoaded(true);
      }).catch((e) => {
        dataService.initialiseData(productsData);
        setIsDataLoaded(true);
        console.log(e);
      }).finally(() => setIsDataLoaded(true));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!isDataLoaded ? (
        <Spinner />
      ) : (
        <div>
          <Route path={Routes.home}>
            <HomePage />
          </Route>
          <Route path={Routes.product}>
            <ProductPage />
          </Route>
          <Route path={Routes.sandbox}>
            <Sandbox />
          </Route>
          <Route path={Routes.cart}>
            <CartPage />
          </Route>
        </div>
      )}
    </div>
  );
};

export default App;