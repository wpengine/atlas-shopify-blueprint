import Link from 'next/link';
import { CtaButton } from '../CtaButton';
import ProductVariantOptions from './ProductVariantOptions';
import styles from './ProductMeta.module.scss';

const ProductMeta = ({
  variant,
  collections,
  variantOptions,
  handleChange,
  handleOptionChange,
  handleSubmit,
}) => {
  return (
    <div className={styles.productMeta}>
      <p>SKU: {variant?.sku}</p>

      {collections.length >= 1 && (
        <p>
          Categories:{' '}
          {collections.map((collection, index) => (
            <span key={`product-collection-${index}`}>
              {index === 0 ? '' : ', '}
              <Link
                href={`/product-category/${collection.handle}`}
                key={`product-collection-link-${index}`}
              >
                <a>{collection.title}</a>
              </Link>
            </span>
          ))}
        </p>
      )}
      <h2>{variantOptions?.label}</h2>
      <form onSubmit={handleSubmit}>
        <ProductVariantOptions
          options={variantOptions?.options}
          onChange={handleOptionChange}
        />

        <div>
          <label style={{ display: 'block' }}>Quantity:</label>
          <input
            type='number'
            min='1'
            max={10}
            step='1'
            name='quantity'
            onChange={handleChange}
            className={styles.quantity}
          />
        </div>
        <CtaButton ctaLink='#' ctaLabel='Add to cart' />
      </form>
    </div>
  );
};

export default ProductMeta;
