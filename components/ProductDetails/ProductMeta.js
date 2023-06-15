import { useState } from 'react';
import Link from 'next/link';
import { CtaButton } from '../CtaButton';
import ProductVariantOptions from './ProductVariantOptions';
import styles from './ProductMeta.module.scss';
import useShopifyCart from '../../hooks/useShopifyCart';

/**
 * Render the ProductMeta component.
 *
 * @param {Props} props The props object.
 * @param {string} props.variant The selected variant value. Used when selecting a product variant image/color.
 * @param {Array<string>} props.collections The list of collections that this product belong to.
 * @param {string} props.variantOptions The available variants/colors for this product.
 * @param {(variant: string) => void} props.handleOptionChange The product variant handler. Selecting product variant/color.
 * @param {(quantity: number | string, variantId: number | string) => void} props.handleSubmit The submit handler. Adding selected product to the cart.
 *
 * @returns {React.ReactElement} The ProductMeta component.
 */

const ProductMeta = ({
  variant,
  collections,
  variantOptions,
  handleOptionChange,
  handleSubmit,
}) => {
  const [quantity, setQuantity] = useState(1);

  const { cartItems, cartId } = useShopifyCart();

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

      <div aria-label="quantity-amount-section">
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
        cartId={cartId}
        ctaLabel="Add to cart"
        ctaClick={() => handleSubmit(parseInt(quantity), variant?.id)}
        disabled={itemInCart?.quantity === variant?.quantityAvailable}
      />
    </div>
  );
};

export default ProductMeta;
