import { useState } from 'react';
import Link from 'next/link';
import { CtaButton } from '../CtaButton';
import ProductVariantOptions from './ProductVariantOptions';
import styles from './ProductMeta.module.scss';
import useShopifyCart from '../../hooks/useShopifyCart';

const ProductMeta = ({
  variant,
  collections,
  variantOptions,
  handleOptionChange,
  handleSubmit,
}) => {
  const [quantity, setQuantity] = useState(1);

  const { cartItems } = useShopifyCart();

  const itemInCart = cartItems?.find(
    (line) => line.merchandise.sku === variant?.sku
  );

  return (
    <div className={styles.productMeta}>
      <p>SKU: {variant?.sku}</p>

      {collections.length >= 1 && (
        <p>
          Collections:{' '}
          {collections.map((collection, index) => (
            <span key={`product-collection-${index}`}>
              {index === 0 ? '' : ', '}
              <Link
                href={`/product-collection/${collection.handle}`}
                key={`product-collection-link-${index}`}
              >
                <a>{collection.title}</a>
              </Link>
            </span>
          ))}
        </p>
      )}
      {variantOptions?.label !== 'Title' && (
        <>
          <h2>{variantOptions?.label}</h2>
          <ProductVariantOptions
            selected={variant?.selectedOptions?.[0]?.value}
            options={variantOptions?.options}
            handleOptionChange={handleOptionChange}
          />
        </>
      )}

      <div>
        <p>
          <b>
            <span style={{ color: 'red' }}>{variant?.quantityAvailable}</span>{' '}
            left at this price
          </b>
        </p>
        <label style={{ display: 'block' }}>Quantity:</label>
        <input
          type="number"
          min="1"
          max={variant?.quantityAvailable}
          step="1"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={styles.quantity}
        />
      </div>
      <CtaButton
        ctaLabel="Add to cart"
        ctaClick={() => handleSubmit(parseInt(quantity), variant?.id)}
        disabled={itemInCart?.quantity === variant?.quantityAvailable}
      />
    </div>
  );
};

export default ProductMeta;
