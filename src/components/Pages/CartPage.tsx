import React, { useEffect } from 'react';
import { PageProps } from '../../types/Page';
import styles from './CartPage.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { TextInput } from '../Input/TextInput';
import { Button } from '../Button/Button';
import { ButtonColors } from '../../enums/ButtonColors';
import { StorageKey } from '../../interfaces/StorageKey';
import LocalStorage from '../../utils/LocalStorage';
import { BasketProduct } from '../../interfaces/BasketProduct';
import { CartProduct } from '../CartProduct/CartProduct';
import { Basket } from '../../interfaces/Basket';
import { Product } from '../../types/Product';
import { defaultBasket } from '../../variables/defaultBasket';
import { promo } from '../../variables/promo';

const CartPage = ({ queryParams }: PageProps) => {
  const [basket, setBasket] = React.useState<Basket>(defaultBasket);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [limit, setLimit] = React.useState<string>('3');
  const [promoCode, setPromoCode] = React.useState<string>('');
  const storage = LocalStorage.getInstance();

  const handleChangePromoCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPromoCode(e.target.value);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLimit(e.target.value);
  };

  const handleSubmit = (): void => {
    const isPromoExist = promo.some((item) => {
      return item.code === promoCode.toUpperCase();
    });

    if (isPromoExist) {
      const isPromoUsed = basket.promo.some((item) => {
        return item.code === promoCode.toUpperCase();
      });

      if (!isPromoUsed) {
        const basketCopy = { ...basket };
        const promoObj = promo.find((elem) => {
          return elem.code === promoCode.toUpperCase();
        });

        if (promoObj) {
          basketCopy.promo.push(promoObj);
        }
        setBasket(basketCopy);
        setPromoCode('');
        storage.setData(StorageKey.basket, basketCopy);
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  const handleClick = (): void => {
    console.log('click');
  };

  const handleAddProduct = (id: number, stock: number): void => {
    const basketCopy = { ...basket };
    const arr = basketCopy.products;

    arr.forEach((item) => {
      if (id === item.id) {
        if (item.quantity < stock) item.quantity = item.quantity + 1;
      }
    });

    setBasket(basketCopy);
    storage.setData(StorageKey.basket, basketCopy);
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveProduct = (id: number): void => {
    const basketCopy = { ...basket };
    const productsCopy = [...products];
    const arr = basketCopy.products;

    arr.forEach((item, idx) => {
      if (id === item.id) {
        if (item.quantity > 1) {
          item.quantity = item.quantity - 1;
        } else {
          arr.splice(idx, 1);
          const productIndex = productsCopy.findIndex((product) => {
            return product.id === id;
          });
          productsCopy.splice(productIndex, 1);
        }
      }
    });

    setBasket(basketCopy);
    setProducts(productsCopy);
    storage.setData(StorageKey.basket, basketCopy);
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    const basket: Basket | null = storage.getData(StorageKey.basket);

    if (basket) {
      setBasket(basket);

      const urls = basket.products.map((item) => `https://dummyjson.com/products/${item.id}`);
      const promises = urls.map((url) => fetch(url));

      Promise.all(promises)
        .then((response) => Promise.all(response.map((r) => r.json())))
        .then((results: Product[]) => {
          setProducts(results);
        });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <section className={styles.mainWrapper}>
        <div className={styles.mainDecoration} />
        <div className={styles.main}>
          <div className={styles.productsWrapper}>
            <div className={styles.productsHeader}>
              <span className={styles.productsHeaderTitle}>Products in cart</span>
              <span>Limit:</span>
              <TextInput
                className={styles.productsHeaderInput}
                placeholder='Insert text'
                onChange={handleChangeLimit}
                value={limit}
              />
              <div className={styles.productsHeaderSumButtons}>
                <span className={styles.productsHeaderSum}>Page:</span>
                <Button
                  className={styles.productsHeaderButton}
                  title='<'
                  color={ButtonColors.Secondary}
                  onClick={handleClick}
                />
                <span className={styles.productsHeaderSumNumber}>1</span>
                <Button
                  className={styles.productsHeaderButton}
                  title='>'
                  color={ButtonColors.Secondary}
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className={styles.products}>
              {!products.length && (
                <div className={styles.emptyCart}>
                  <span>Cart is empty!</span>
                </div>
              )}
              {products.map((product: Product, idx: number) => {
                return (
                  <CartProduct
                    onAddProduct={handleAddProduct}
                    onRemoveProduct={handleRemoveProduct}
                    product={product}
                    key={product.id}
                    index={idx}
                    stock={product.stock}
                    quantity={
                      basket.products[
                        basket.products.findIndex((element) => {
                          return product.id === element.id;
                        })
                      ]?.quantity
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.sum}>
            <span className={styles.sumTitle}>Summary</span>
            <span className={styles.sumProducts}>
              Products: {basket.products.reduce((a, b) => a + b.quantity, 0)}
            </span>
            <span className={styles.totalSum}>
              Total:{' '}
              {products
                .filter((product) => basket.products.some((item) => item.id === product.id))
                .reduce((a, b) => {
                  const itemsQuantity =
                    basket?.products.find((item) => item.id === b.id)?.quantity || 0;
                  return a + b.price * itemsQuantity;
                }, 0)}
              $
            </span>
            <span className={styles.totalSum}>Promo code: {basket.promo.map((item) => { return `${item.code}  `})} </span>
            <TextInput
              className={styles.sumTextInput}
              placeholder='Insert promo code'
              onChange={handleChangePromoCode}
              value={promoCode}
            />
            <Button
              title='Submit promo code'
              className={styles.submitButton}
              color={ButtonColors.Primary}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
