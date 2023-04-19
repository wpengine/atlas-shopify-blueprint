import Link from 'next/link';
import { CtaButton } from '../CtaButton';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

const ProductCard = ({ product }) => {
  const productHref = `/product/${product?.handle}`;
  const thumbnail = product?.featuredImage?.url;

  return (
    <div className={cx([styles.column, styles.productWrapper])}>
      <div className={styles.productImageContainer}>
        <Link href={productHref}>
          <a>
            {product?.variants?.nodes[0]?.compareAtPrice ? (
              <span className={styles.onSale}>Sale!</span>
            ) : null}
            <img
              className={styles.productImage}
              src={thumbnail ?? '/ProductDefault.gif'}
              alt={product?.name}
              loading='lazy'
            />
          </a>
        </Link>
      </div>
      <div className={styles.productInfoContainer}>
        <p className={styles.productTitle}>
          <Link href={productHref}>
            <a>{product?.title}</a>
          </Link>
        </p>
        <div className={styles.productPrice}>
          <span>
            {product?.variants?.nodes[0]?.compareAtPrice ? (
              <>
                <del>
                  {'$' + product?.variants?.nodes[0]?.compareAtPrice?.amount}
                </del>{' '}
                {'$' + product?.variants?.nodes[0]?.price?.amount}
              </>
            ) : (
              '$' + product?.variants?.nodes[0]?.price?.amount
            )}
          </span>
        </div>
        <CtaButton ctaLink={productHref} ctaLabel='View product' />
      </div>
    </div>
  );
};

export default ProductCard;
