import React, { useState, useEffect } from 'react';
import styles from '../ProductImages/ProductImages.module.scss';

interface ProductImagesProps {
  images: string[];
}

export const ProductImages = ({ images }: ProductImagesProps) => {
  const [source, setSource] = useState<string>('');
  const imagesFiltered = images.filter((image, index) => images.indexOf(image) === index);

  const handleImgClick = (img: string) => {
    setSource(img);
  };

  useEffect(() => {
    setSource(images[0]);
  }, [images]);

  return (
    <div>
        <img src={source} className={styles.cardMainImage} />
      <div className={styles.cardImagesPreview}>
        {imagesFiltered.map((image: string) => {
          return (
            <img
              src={image}
              className={styles.cardImage}
              key={image}
              onClick={() => {
                handleImgClick(image);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
