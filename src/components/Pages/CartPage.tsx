import React, { useEffect, useState } from 'react';
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
import DataService from '../../utils/DataService';
import { usePagination } from '../../hooks/usePagination';
import Modal from '../Modal/Modal';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';

const CartPage = (): JSX.Element => {
  const [basket, setBasket] = React.useState<Basket>(defaultBasket);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [limit, setLimit] = React.useState<string>('3');
  const [promoCode, setPromoCode] = React.useState<string>('');
  const [price, setPrice] = React.useState<number>(0);
  const storage = LocalStorage.getInstance();
  const dataService: DataService = DataService.getInstance();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const { firstIndex, lastIndex, nextPage, prevPage, page } = usePagination({
    contentPerPage: Number(limit),
    count: products.length,
  });

  const getPrice = (basket: Basket, products: Product[]): number => {
    const summaryPrice = products
      .filter((product) => basket.products.some((item) => item.id === product.id))
      .reduce((a, b) => {
        const itemsQuantity = basket?.products.find((item) => item.id === b.id)?.quantity || 0;
        return a + b.price * itemsQuantity;
      }, 0);
    return summaryPrice;
  };

  const handleChangePromoCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPromoCode(e.target.value);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLimit(e.target.value);
  };

  const handleSubmit = (): void => {
    const isPromoExist: boolean = promo.some((item) => {
      return item.code === promoCode.toUpperCase();
    });

    if (isPromoExist) {
      const isPromoUsed: boolean = basket.promo.some((item) => {
        return item.code === promoCode.toUpperCase();
      });

      if (!isPromoUsed) {
        const basketCopy: Basket = { ...basket };
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

  const handleRemovePromo = (promoCode: string): void => {
    const basketCopy: Basket = { ...basket };
    const newArrPromo = basketCopy.promo.filter((promo) => {
      return promo.code !== promoCode;
    });

    basketCopy.promo.splice(0, basketCopy.promo.length);
    newArrPromo.map((item) => {
      basketCopy.promo.push(item);
    });
    setBasket(basketCopy);
  };

  const handleAddProduct = (id: number, stock: number): void => {
    const basketCopy: Basket = { ...basket };
    const arr: BasketProduct[] = basketCopy.products;

    arr.forEach((item) => {
      if (id === item.id) {
        if (item.quantity < stock) item.quantity = item.quantity + 1;
      }
    });
    setBasket(basketCopy);
    setPrice(getPrice(basket, products));
    storage.setData(StorageKey.basket, basketCopy);
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveProduct = (id: number): void => {
    const basketCopy: Basket = { ...basket };
    const productsCopy: Product[] = [...products];
    const arr: BasketProduct[] = basketCopy.products;

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
    setPrice(getPrice(basket, productsCopy));
    storage.setData(StorageKey.basket, basketCopy);
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    const basket: Basket | null = storage.getData(StorageKey.basket);

    if (basket) {
      setBasket(basket);

      const productIds = basket.products.map((item) => Number(item.id));

      const products = productIds ? dataService.getProductsById(productIds) : [];

      if (products) {
        setProducts(products);
        const summaryPrice = getPrice(basket, products);
        setPrice(summaryPrice);
      }
    }
  }, []);

  const showCheckoutForm = (): void => {
    setShowModal(true);
  };

  const redirectToHome = () => {
    const url = window.location.origin;
    window.history.pushState({}, '', url);
    const navigationEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navigationEvent);
  };

  const clearBasket = () => {
    storage.removeData(StorageKey.basket);
    window.dispatchEvent(new Event('storage'));
  }

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  }

  const hideCheckoutFormAndConfirm = () => {
    hideCheckoutForm();
    clearBasket();
    setShowConfirmModal(true);
    setTimeout(() => {
      setShowConfirmModal(false);
      redirectToHome()
    }, 500);
  }

  const hideCheckoutForm = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <section className={styles.mainWrapper}>
        <div className={styles.mainDecoration} />
        <div className={styles.main}>
          <div className={styles.productsWrapper}>
            <div className={styles.productsHeader}>
              <span className={styles.productsHeaderTitle}>Products in cart</span>
              <div>
                <span>Limit:</span>
                <TextInput
                  className={styles.productsHeaderInput}
                  placeholder='Insert text'
                  onChange={handleChangeLimit}
                  value={limit}
                />
              </div>
              <div className={styles.productsHeaderSumButtons}>
                <span className={styles.productsHeaderSum}>Page:</span>
                <Button
                  className={styles.productsHeaderButton}
                  title='<'
                  color={ButtonColors.Secondary}
                  onClick={prevPage}
                />
                <span className={styles.productsHeaderSumNumber}>{page}</span>
                <Button
                  className={styles.productsHeaderButton}
                  title='>'
                  color={ButtonColors.Secondary}
                  onClick={nextPage}
                />
              </div>
            </div>
            <div className={styles.products}>
              {!products.length && (
                <div className={styles.emptyCart}>
                  <span>Cart is empty!</span>
                </div>
              )}
              {products.slice(firstIndex, lastIndex).map((product: Product, idx: number) => {
                return (
                  <div className={styles.cardContainer} key={idx}>
                    <span key={idx} className={styles.productNumber}>
                      {(page - 1) * Number(limit) + 1 + idx}
                    </span>
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
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.sum}>
            <div className={styles.sumInfo}>
              <span className={styles.sumTitle}>Summary</span>
              <span className={styles.sumProducts}>
                Products: {basket.products.reduce((a, b) => a + b.quantity, 0)}
              </span>
              {basket.promo ? (
                basket.promo.some((item) => item) ? (
                  <>
                    <span className={styles.totalSumWithPromo}>Total:{price}$</span>
                    <span className={styles.totalSum}>
                      Sum with discount:
                      {price - (basket.promo.reduce((a, b) => a + b.discount, 0) / 100) * price}$
                    </span>
                  </>
                ) : (
                  <span className={styles.totalSum}>Total:{price}$</span>
                )
              ) : (
                ''
              )}
            </div>
            <div className={styles.promo}>
              <span className={styles.totalSum}>
                Promo code:{' '}
                {basket.promo
                  ? basket.promo.map((item) => {
                      return (
                        <div key={item.discount} className={styles.promoCode}>
                          {`${item.code}: -${item.discount}`}$
                          <Button
                            key={item.code}
                            title='-'
                            color={ButtonColors.Primary}
                            className={styles.promoButton}
                            onClick={() => handleRemovePromo(item.code)}
                          />
                        </div>
                      );
                    })
                  : ''}{' '}
              </span>
              <TextInput
                className={styles.sumTextInput}
                placeholder='Insert promo code'
                onChange={handleChangePromoCode}
                value={promoCode}
              />
              <span className={styles.promocodes}>Promo: code5, code10, code15</span>
              <Button
                title='Submit promo code'
                className={styles.submitButton}
                color={ButtonColors.Primary}
                onClick={handleSubmit}
              />

              <Button
                title='Buy Now'
                className={styles.submitButton}
                color={ButtonColors.Primary}
                onClick={showCheckoutForm}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Modal onClose={hideCheckoutForm} show={showModal}>
        <CheckoutForm onConfirm={hideCheckoutFormAndConfirm} />
      </Modal>
      <Modal onClose={hideConfirmModal} show={showConfirmModal}>
        <div className={styles.confirmModalWrapper}>
          <div>
            <h2>Order is processed!</h2>
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default CartPage;
