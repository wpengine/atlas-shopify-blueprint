const ProductPrice = ({ salePrice, price }) => {
  return (
    <p className='price'>
      {salePrice !== null ? (
        '$' + price
      ) : (
        <>
          <del>${price}</del> ${salePrice}
        </>
      )}
    </p>
  );
};

export default ProductPrice;
