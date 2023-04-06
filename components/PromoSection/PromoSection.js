import React from 'react';
import { Container } from '../Container';
import classNames from 'classnames';
import styles from './PromoSection.module.scss';

const cx = classNames.bind(styles);

const PromoSection = () => {
  return (
    <div className={cx(['section', styles.component])}>
      <Container>
        <h1 className={cx(styles.title)}>Promo Banners</h1>
        <div className={cx(styles.description)}>You can use this component to promote articles or specific products.</div>
      </Container>
    </div>
  );
};

export default PromoSection;
