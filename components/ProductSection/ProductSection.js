import styles from './ProductSection.module.scss';
import { ProductCard } from '../ProductCard';
import { Container } from '../Container';

const ProductSection = ({ products, heading }) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1>{heading}</h1>
        <div className="section">
          {products?.map?.((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default ProductSection;
