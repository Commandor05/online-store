import React, { useState, useEffect } from 'react';
import styles from './ProductCards.module.scss';
import '../../styles/fonts.scss';
import { Card } from '../Card/Card';
import LocalStorage from '../../utils/LocalStorage';
import { ProductCardsProps } from '../../types/Product';
import { StorageKey } from '../../interfaces/StorageKey';
import { Basket } from '../../interfaces/Basket';
import { defaultBasket } from '../../variables/defaultBasket';

const NO_DATA = 'No data found';

const ProductCards = ({ products, cardViewType  }: ProductCardsProps) => {
  const [basket, setBasket] = useState<Basket>(defaultBasket);
  const storage = LocalStorage.getInstance();

  useEffect(() => {
    const localBasket = storage.getData<StorageKey, Basket>(StorageKey.basket);

    if (localBasket) {
      setBasket(localBasket);
    }
  }, []);

  const handleAddToCart = (id: number) => {
    const basketCopy = { ...basket };   

    if (id) {
      basketCopy.products.push({
        id: id,
        quantity: 1,
      });

      setBasket(basketCopy);
      storage.setData(StorageKey.basket, basket);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleRemoveFromCart = (id: number): void => {
    const basketCopy = { ...basket };
    const arr = basketCopy.products;

    arr.forEach((item, i) => {
      if (id === item.id) {
        arr.splice(i, 1);
      }
    });

    setBasket(basketCopy);
    storage.setData(StorageKey.basket, basket);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className={styles.cardsContainer}>
      {products.length > 0? products.map((card) => {
        return (
          <Card
            key={card.id}
            brand={card.brand}
            price={card.price}
            category={card.category}
            title={card.title}
            images={card.images}
            id={card.id}
            isExistInBasket={basket.products.some((item) => item.id === card.id)}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            cardViewType={cardViewType}
          />
        );
      }) : <h2>{NO_DATA}</h2>}
    </div>
  );
};

export default ProductCards;