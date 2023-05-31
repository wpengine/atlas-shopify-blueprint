import priceFormatter from '../../utilities/priceFormatter';

/**
 * Render the ProductPrice component.
 *
 * @param {Props} props The props object.
 * @param {string | number} props.salePrice The salePrice value if is available.
 * @param {string | number} props.price The price value.
 * @param {string | number} props.currencyCode The currencyCode value.
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
