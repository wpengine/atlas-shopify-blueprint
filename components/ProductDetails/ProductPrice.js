import priceFormatter from '../../utilities/priceFormatter';

/**
 * Render the ProductPrice component.
 *
 * @param {Props} props The props object.
 * @param {string | number} props.salePrice The sale price for this product if it is available.
 * @param {string | number} props.price The price fot this product.
 * @param {string | number} props.currencyCode The currency code for this products price.
 *
 * @returns {React.ReactElement} The ProductPrice component.
 */

const ProductPrice = ({ salePrice, price, currencyCode }) => {
  return (
    <p className="price">
      {salePrice !== null ? (
        <>
          <del>{priceFormatter(price, currencyCode)}</del>{' '}
          {priceFormatter(salePrice?.amount, salePrice?.currencyCode)}
        </>
      ) : (
        <>{priceFormatter(price, currencyCode)}</>
      )}
    </p>
  );
};

export default ProductPrice;
