/**
 * Render the ProductDescription component.
 *
 * @param {Props} props The props object.
 * @param {string} props.description The Product's description value.
 *
 * @returns {React.ReactElement} The ProductDescription component.
 */

const ProductDescription = ({ description }) => {
  return <p dangerouslySetInnerHTML={{ __html: description }} />;
};

export default ProductDescription;
