import { useState, useEffect } from 'react';
import { PageProps } from '../../types/Page';
import styles from './ProductPage.module.scss';
import { IconArrow } from '../../icons/icons';
import { Button } from '../Button/Button';
import { ButtonColors } from '../../enums/ButtonColors';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ProductImages } from '../ProductImages/ProductImages';
import LocalStorage from '../../utils/LocalStorage';
import { StorageKey } from '../../interfaces/StorageKey';
import { Basket } from '../../interfaces/Basket';
import { BasketProduct } from '../../interfaces/BasketProduct';
import { SearchQueryKeys } from '../../types/SearchQueryKeys';
import { defaultBasket } from '../../variables/defaultBasket';
import DataService from '../../utils/DataService';
import Link from '../Link/Link';
import { ProductCardProp } from '../../interfaces/ProductCardProp';




const ProductPage = ({ queryParams }: PageProps): JSX.Element => {
  const dataService: DataService = DataService.getInstance();
  const productId = Number(queryParams?.get(SearchQueryKeys.productId));
  const product = productId ? dataService.getProductById(Number(productId)) : undefined;
  const [card, setCard] = useState<ProductCardProp | null>(null);
  const [basket, setBasket] = useState<Basket>(defaultBasket);
  const storage = LocalStorage.getInstance();

  const redirectToCart = (): void => {
    const cartUrl = getCartUrl();
    redirectTo(cartUrl);
  };

  const redirectTo = (linkTo: string) => {
    window.history.pushState({}, '', linkTo);
    const navigationEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navigationEvent);
  };

  const getCartUrl = () => {
    return `${window.location.origin}/cart`;
  };

  const handleAddClick = (): void => {
    const basketCopy = { ...basket };

    if (productId) {
      basketCopy.products.push({
        id: Number(productId),
        quantity: 1,
      });

      setBasket(basketCopy);
      storage.setData(StorageKey.basket, basket);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleRemoveClick = (): void => {
    const basketCopy: Basket = { ...basket };
    const arr: BasketProduct[] = basketCopy.products;

    arr.forEach((item, i) => {
      if (productId === item.id) {
        arr.splice(i, 1);
      }
    });

    setBasket(basketCopy);
    storage.setData(StorageKey.basket, basket);
    window.dispatchEvent(new Event('storage'));
  };

  const handleBuyNowClick = (): void => {
    if (!basket.products.some((product) => product.id === productId)) {
      handleAddClick();
      window.dispatchEvent(new Event('storage'));
    }
    setTimeout(redirectToCart, 100);
  };

  useEffect(() => {
    const localBasket = storage.getData<StorageKey, Basket>(StorageKey.basket);

    if (localBasket) {
      setBasket(localBasket);
    }
    if(product) {
      setCard(product);
    }
  }, []);

  const getHomeUrl = () => {

    return `${window.location.origin}`;
  }

  if (!card) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <section className={styles.mainWrapper}>
        <div className={styles.mainDecoration} />
        <div className={styles.main}>
          <div className={styles.breadCrumbs}>
            <Link linkTo={getHomeUrl()} className={styles.breadCrumbsItem}>
              Home Page
            </Link>
            <IconArrow className={styles.breadCrumbsIcon} />
            <a href='#' className={styles.breadCrumbsItem}>
              {card.category}
            </a>
            <IconArrow className={styles.breadCrumbsIcon} />
            <a href='#' className={styles.breadCrumbsItem}>
              {card.brand}
            </a>
            <IconArrow className={styles.breadCrumbsIcon} />
            <a href='#' className={styles.breadCrumbsItem}>
              {card.title}
            </a>
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.cardHeader}>{card.title}</div>
            <div className={styles.card}>
              <ProductImages images={card.images} />
              <div className={styles.cardContent}>
                <div className={styles.cardButtonsWrapper}>
                  <div>Price:{card.price}$</div>
                  {basket.products.some((product) => product.id === productId) ? (
                    <Button
                      title='Remove from cart'
                      color={ButtonColors.Primary}
                      onClick={handleRemoveClick}
                      className={styles.cardButton}
                    />
                  ) : (
                    <Button
                      title='Add to cart'
                      color={ButtonColors.Primary}
                      onClick={handleAddClick}
                      className={styles.cardButton}
                    />
                  )}
                  <Button
                    title='Buy now'
                    color={ButtonColors.Primary}
                    onClick={handleBuyNowClick}
                    className={styles.cardButton}
                  />
                </div>
                <div className={styles.cardListWrapper}>
                  <div className={styles.cardList}>
                    <div className={styles.cardItem}>
                      <h4 className={styles.cardItemTitle}>Description:</h4>
                      <div className={styles.cardItemInfo}>{card.description}</div>
                    </div>
                    <div className={styles.cardItem}>
                      <h4 className={styles.cardItemTitle}>Discount Percentage:</h4>
                      <div className={styles.cardItemInfo}>{card.discountPercentage}</div>
                    </div>
                    <div className={styles.cardItem}>
                      <h4 className={styles.cardItemTitle}>Rating:</h4>
                      <div className={styles.cardItemInfo}>{card.rating}</div>
                    </div>
                    <div className={styles.cardItem}>
                      <h4 className={styles.cardItemTitle}>Stock:</h4>
                      <div className={styles.cardItemInfo}>{card.stock}</div>
                    </div>
                    <div className={styles.cardItem}>
                      <h4 className={styles.cardItemTitle}>Brand:</h4>
                      <div className={styles.cardItemInfo}>{card.brand}</div>
                    </div>
                    <div className={styles.cardItem}>
                      <h4 className={styles.cardItemTitle}>Category:</h4>
                      <div className={styles.cardItemInfo}>{card.category}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
