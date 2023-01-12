import React, { useEffect, useState } from 'react';
import styles from '../Header/Header.module.scss';
import { IconBasket, IconStore } from '../../icons/icons';
import { HeaderProps } from '../../interfaces/HeaderProps';
import LocalStorage from '../../utils/LocalStorage';
import { StorageKey } from '../../interfaces/StorageKey';
import { Basket } from '../../interfaces/Basket';
import { defaultBasket } from '../../variables/defaultBasket';
import DataService from '../../utils/DataService';
import { Product } from '../../types/Product';
import Link from '../Link/Link';

export const Header: React.FC<HeaderProps> = ({ queryParams }: HeaderProps): JSX.Element => {
  const dataService: DataService = DataService.getInstance();
  const products: Product[] = dataService.getData(queryParams).products;
  const storage = LocalStorage.getInstance();
  const [basket, setBasket] = useState<Basket>(defaultBasket);
  const [price, setPrice] = useState<number>(0);


  const getPrice = (basket: Basket): number => {
    const summaryPrice = products
      .filter((product) => basket.products.some((item) => item.id === product.id))
      .reduce((a, b) => {
        const itemsQuantity = basket?.products.find((item) => item.id === b.id)?.quantity || 0;
        return a + b.price * itemsQuantity;
      }, 0);
    return summaryPrice;
  };

  const handleStorageEvent = (): void => {
    const basket = storage.getData<StorageKey, Basket>(StorageKey.basket);

    if (basket) {
      const sumaryPrice = getPrice(basket);
      setPrice(sumaryPrice);
      setBasket(basket);
    }
  };

  useEffect(() => {
    const basket: Basket | null = storage.getData(StorageKey.basket);

    if (basket) {
      const sumaryPrice = getPrice(basket);
      setPrice(sumaryPrice);
      setBasket(basket);
    }

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.headerLogo}>  
            <a href='/' className={styles.headerLogoTitle} >
            <IconStore href='/' className={styles.headerLogoIcon} />
              Online Store</a>
        </div>
        <span className={styles.headerText}>Total:{price} $</span>
        <div className={styles.basketWrapper}>
          <span className={styles.headerProductsSum}>
            {basket.products.reduce((a, b) => a + b.quantity, 0)}
          </span>
          <Link linkTo={`${window.location.origin}/cart`}>
          <IconBasket className={styles.headerBasket} />
          </Link>

        </div>
      </div>
    </header>
  );
};
