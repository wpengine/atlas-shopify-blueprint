import styles from './ProductSection.module.scss';
import { ProductCard } from '../ProductCard';
import { Container } from '../Container';
import ConnectionUnavailable from '../../utilities/ConnectionUnavailable';
import shopifyConfiguration from '../../utilities/shopifyConfiguration';

const ProductSection = ({ products, heading }) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1>{heading}</h1>
        <div className="section">
          {!shopifyConfiguration.available() ? (
            <ConnectionUnavailable />
          ) : (
            products?.map?.((product) => {
              return (
                <ProductCard
                  key={`${heading}-section-${product.id}`}
                  product={product}
                />
              );
            })
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductSection;
