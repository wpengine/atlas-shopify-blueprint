const ProductDescription = ({ description }) => {
  return <p dangerouslySetInnerHTML={{ __html: description }} />;
};

export default ProductDescription;
