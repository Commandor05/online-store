import React from 'react';
import styles from '../Card/Card.module.scss';
import { Button } from '../Button/Button';
import { ButtonColors } from '../../enums/ButtonColors';
import Link from '../Link/Link';
import classNames from 'classnames';
import { CardViewTypes } from '../../enums/CardViewType';
import { CardProps } from '../../interfaces/CardProps';

export const Card: React.FC<CardProps> = ({
  title,
  images,
  brand,
  category,
  price,
  id,
  isExistInBasket,
  onAddToCart,
  onRemoveFromCart,
  cardViewType,
}: CardProps) => {
  
  const handleClickAddToCart = (): void => {
    onAddToCart(id);
  };

  const handleClickRemoveFromCart = (): void => {
    onRemoveFromCart(id);
  };

  const cardClass = classNames(
    styles.card,
    {
      [styles.cardBig]: cardViewType === CardViewTypes.big,
    },
    {
      [styles.cardSmall]: cardViewType === CardViewTypes.small,
    },
  );

  const getUrl = (id: number | undefined) => {
    const query = new URLSearchParams();
    if (id) {
      query.set('productId', id.toString());
    }

    return `${window.location.origin}/product?${query.toString()}`;
  };

  return (
    <div className={cardClass}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardImgWrapper}>
        <img src={images[0]} className={styles.cardImg} alt={title} />
      </div>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardInfo}>
          {cardViewType === CardViewTypes.big ? <span>Category: {category}</span> : ''}
          {cardViewType === CardViewTypes.big ? <span>Brand: {brand}</span> : ''}
          <span>Price: {price}</span>
        </div>
      </div>
      <div className={styles.cardButtons}>
        {isExistInBasket ? (
          <Button
            title='Remove from cart'
            color={ButtonColors.Primary}
            className={styles.cardButton}
            onClick={handleClickRemoveFromCart}
          />
        ) : (
          <Button
            title='Add to cart'
            color={ButtonColors.Primary}
            className={styles.cardButton}
            onClick={handleClickAddToCart}
          />
        )}
        <Link linkTo={getUrl(id)} className={styles.cardButton}>
          Details
        </Link>
      </div>
    </div>
  );
};