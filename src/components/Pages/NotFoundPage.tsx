import React from 'react';
import { PageProps } from '../../types/Page';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import CommonLayout from '../CommonLayout/CommonLayout';
import styles from './NotFoundPage.module.scss';
import Link from '../Link/Link';

const NOT_FOUND = 'Page not found';
const GO_HOME = 'Go to Home Page';

const NotFoundPage = ({ queryParams }: PageProps): JSX.Element=> {
  return (
    <CommonLayout>
      <Header queryParams={queryParams} />

      <section className={styles.mainWrapper}>
        <div className={styles.mainDecoration} />
        <div className={styles.message}>{NOT_FOUND}</div>
        <Link linkTo={`${window.location.origin}`} className={styles.backLink}>
          {GO_HOME}
        </Link>
      </section>
      <Footer />
    </CommonLayout>
  );
};

export default NotFoundPage;
