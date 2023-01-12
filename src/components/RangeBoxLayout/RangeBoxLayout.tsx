import React, { Children } from 'react';
import { RangeBoxLayoutProps } from '../../types/RangeBoxLayoutProps';
import styles from './RangeBoxLayout.module.scss';

const RangeBoxLayout = ({ children, title }: RangeBoxLayoutProps) => {
  const [rangeComponent] = Children.toArray(children);
  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.rangeTitle}>{title}</div>
      <div className={styles.rangeValues}>
        <span>↔</span>
      </div>
     {rangeComponent}
    </div>
  );
}

export default RangeBoxLayout;