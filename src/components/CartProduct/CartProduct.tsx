import React from 'react';
import styles from '../CartProduct/CartProduct.module.scss';
import { Button } from '../Button/Button';
import { ButtonColors } from '../../enums/ButtonColors';
import { Product } from '../../types/Product';

interface CartProduct {
  product: Product;
  onAddProduct: (id: number, stock: number) => void;
  onRemoveProduct: (id: number) => void;
  quantity: number;
  index: number;
  stock: number;
}

export const CartProduct: React.FC<CartProduct> = ({
  product,
  onAddProduct,
  onRemoveProduct,
  quantity,
}: CartProduct): JSX.Element => {
  const handleAddProduct = (): void => {
    onAddProduct(product.id, product.stock);
  };

  const handleRemoveProduct = (): void => {
    onRemoveProduct(product.id);
  };

  return (
    <div className={styles.product}>
      <div className={styles.productInformation}>
        <img src={product.images[0]} className={styles.productImg} />
        <div className={styles.productInfo}>
          <span className={styles.productTitle}>{product.title}</span>
          <span>Description: {product.description}</span>
          <span>Rating: {product.rating}</span>
          <span>Discount: {product.discountPercentage}</span>
          <span>Stock: {product.stock}</span>
          <span>Price: {product.price}</span>
        </div>
      </div>

      <div className={styles.productSum}>
        <Button
          title='-'
          className={styles.productButton}
          color={ButtonColors.Primary}
          onClick={handleRemoveProduct}
        />
        <span className={styles.productAmount}>{quantity}</span>
        <Button
          title='+'
          className={styles.productButton}
          color={ButtonColors.Primary}
          onClick={handleAddProduct}
        />
      </div>
    </div>
  );
};