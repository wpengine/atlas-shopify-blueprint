import Link from 'next/link';
import { CtaButton } from '../CtaButton';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import priceFormatter from '../../utilities/priceFormatter';

/**
 * Render the ProductCard component.
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @typedef {Object} Products
 * @property {string} id The id value.
 * @property {number} quantity The quantity value.
 * @property {Object} cost The cost object.
 *  @property {Object} amountPerQuantity The amountPerQuantity object.
 *    @property {string} amount The amount value.
 *  @property {Object} totalAmount The totalAmount Object.
 *    @property {string} amount The amount value.
 * @property {Object} merchandise The merchandise object.
 *  @property {string} id The id value.
 *  @property {string} title The title value.
 *  @property {Image} image The image object.
 *    @property {string} altText The altText value.
 *    @property {string} url The url value.
 *  @property {Object} product The product object.
 *    @property {string} id The id value.
 *    @property {string} handle The handle value.
 *    @property {string} title The title value.
 *
 * @param {Props} props The props object.
 * @param {Products} props.product The product input value.
 *
 * @returns {React.ReactElement} The ProductCard component.
 */

const cx = classNames.bind(styles);

const ProductCard = ({ product }) => {
  const productHref = `/product/${product?.handle}`;
  const thumbnail = product?.featuredImage?.url;

  return (
    <div className={cx([styles.column, styles.productWrapper])} role="listitem">
      <div className={styles.productImageContainer}>
        <Link href={productHref}>
          <a>
            {product?.variants?.nodes[0]?.compareAtPrice ? (
              <span className={styles.onSale}>Sale</span>
            ) : null}
            <img
              className={styles.productImage}
              src={thumbnail ?? '/ProductDefault.gif'}
              alt={product?.name}
              loading="lazy"
              data-testid="product-img"
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
                <del data-testid="sale-price">
                  {priceFormatter(
                    product?.variants?.nodes[0]?.compareAtPrice?.amount,
                    product?.variants?.nodes[0]?.compareAtPrice?.currencyCode
                  )}
                </del>{' '}
                {priceFormatter(
                  product?.variants?.nodes[0]?.price?.amount,
                  product?.variants?.nodes[0]?.price?.currencyCode
                )}
              </>
            ) : (
              priceFormatter(
                product?.variants?.nodes[0]?.price?.amount,
                product?.variants?.nodes[0]?.price?.currencyCode
              )
            )}
          </span>
        </div>
        <CtaButton ctaLink={productHref} ctaLabel="View product" />
      </div>
    </div>
  );
};

export default ProductCard;
