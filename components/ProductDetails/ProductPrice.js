import priceFormatter from '../../utilities/priceFormatter';

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
