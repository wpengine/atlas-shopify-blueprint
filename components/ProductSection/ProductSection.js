import styles from './ProductSection.module.scss';
import { ProductCard } from '../ProductCard';
import { Container } from '../Container';

/**
 * Render the ProductSection component.
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @typedef {Object} Products
 * @property {string} id The id value.
 * @property {number} quantity The quantity value.
 * @property {Object} cost The cost object.
 *  @property {Object} amountPerQuantity The amountPerQuantity object.
 *    @property {string} amount The amount value.
 *  @property {Object} totalAmount The totalAmount Object.
 *    @property {string} amount The amount value.
 * @property {Object} merchandise The merchandise object.
 *  @property {string} id The id value.
 *  @property {string} title The title value.
 *  @property {Image} image The image object.
 *    @property {string} altText The altText value.
 *    @property {string} url The url value.
 *  @property {Object} product The product object.
 *    @property {string} id The id value.
 *    @property {string} handle The handle value.
 *    @property {string} title The title value.
 *
 * @param {Props} props The props object.
 * @param {Products} props.product The product input value.
 * @param {string} props.heading The heading value.
 *
 * @returns {React.ReactElement} The ProductSection component.
 */

const ProductSection = ({ products, heading }) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1>{heading}</h1>
        <div className="section">
          {products?.map?.((product) => {
            return (
              <ProductCard
                key={`${heading}-section-${product.id}`}
                product={product}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ProductSection;
