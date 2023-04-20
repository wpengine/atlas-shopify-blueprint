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
      <form onSubmit={handleSubmit}>
        {variantOptions?.label !== 'Title' && (
          <>
            <h2>{variantOptions?.label}</h2>
            <ProductVariantOptions
              selected={variant?.selectedOptions[0]?.value}
              options={variantOptions?.options}
              handleOptionChange={handleOptionChange}
            />
          </>
        )}

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
        <CtaButton ctaLabel='Add to cart' ctaClick={handleSubmit} />
      </form>
    </div>
  );
};

export default ProductMeta;
