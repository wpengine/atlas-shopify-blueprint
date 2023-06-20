import priceFormatter from '../../utilities/priceFormatter';

/**
 * Render the ProductPrice component.
 *
 * @param {Props} props The props object.
 * @param {string | number} props.compareAtPrice The original price for this product, if on sale.
 * @param {string | number} props.price The current price for this product.
 * @param {string | number} props.currencyCode The currency code for this product's price.
 *
 * @returns {React.ReactElement} The ProductPrice component.
 */

const ProductPrice = ({ compareAtPrice, price, currencyCode }) => {
  return (
    <p className="price">
      {compareAtPrice && (
        <span data-testid="compare-price">
          <del>{priceFormatter(compareAtPrice, currencyCode)}</del>{' '}
        </span>
      )}
      {priceFormatter(price, currencyCode)}
    </p>
  );
};

export default ProductPrice;
