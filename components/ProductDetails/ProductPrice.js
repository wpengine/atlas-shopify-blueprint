const ProductPrice = ({ salePrice, price }) => {
  return (
    <p className='price'>
      {salePrice !== null ? (
        <>
          <del>${price}</del> ${salePrice?.amount}
        </>
      ) : (
        <>${price}</>
      )}
    </p>
  );
};

export default ProductPrice;
