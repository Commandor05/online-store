import React, { useEffect, useState } from 'react';
import './styles/fonts.scss';
import Route from './utils/Route';
import HomePage from './components/Pages/HomePage';
import CheckoutPage from './components/Pages/CheckoutPage';
import ProductPage from './components/Pages/ProductPage';
import { Sandbox } from './components/Sandbox/Sandbox';
import DataService from './utils/DataService';
import productsData from './utils/config/data';

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
        // backup plan: load data from local file
        dataService.initialiseData(productsData);
        setIsDataLoaded(true);
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!isDataLoaded ? (
        'Loading...'
      ) : (
        <div>
          <Route path='/'>
            <HomePage />
          </Route>
          <Route path='/checkout'>
            <CheckoutPage />
          </Route>
          <Route path='/product'>
            <ProductPage />
          </Route>
          <Route path='/sandbox'>
            <Sandbox />
          </Route>
        </div>
      )}
    </div>
  );
};

export default App;
