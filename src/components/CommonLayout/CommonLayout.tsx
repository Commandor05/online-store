import React, { Children } from 'react';
import styles from './CommonLayout.module.scss';
import {PageProps} from '../../types/Page';

const CommonLayout = ({ children }: PageProps) => {
  const [header, main, footer] = Children.toArray(children);

  return (
    <div className={styles.wrapper}>
      {header}
      {main}
      {footer}
    </div>
  );
}

export default CommonLayout;