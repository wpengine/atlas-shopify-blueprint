import React from 'react';
import classNames from 'classnames';
import styles from './ProductSection.module.scss';
import { ProductCard } from '../ProductCard';

const cx = classNames.bind(styles);

const ProductSection = ({ products, heading }) => {
  return (
    <div className={cx([styles.component])}>
      <h2>{heading}</h2>
      <div className={cx(styles.section)}>
        {products?.map?.((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductSection;
