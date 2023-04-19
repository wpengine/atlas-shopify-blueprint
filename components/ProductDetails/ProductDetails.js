import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import styles from './ProductDetails.module.scss';

const ProductDetails = ({ product }) => {
  const salePrice = product?.variants?.nodes[0]?.compareAtPrice?.amount;

  return (
    <div className={styles.component}>
      <div className={styles.detailsColumn}>
        {/* <ProductGallery images={productImages} /> */}
        <img src={product?.featuredImage?.url} alt={product?.title} />
      </div>
      <div className={styles.detailsColumn}>
        {salePrice && <span className={styles.onSale}>Sale!</span>}
        <h1>{product?.title}</h1>
        <ProductPrice
          salePrice={salePrice}
          price={product?.variants?.nodes[0]?.price?.amount}
        />
        <ProductDescription description={product?.description} />

        {/*

      <ProductMeta
        product={product}
        categories={productCategories}
        sortedFormFields={sortedFormFields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFieldChange={handleFieldChange}
        productVariant={productVariant}
        variantOrModFields={variantOrModFields}
        variantValueKeys={variantValueKeys}
        modifierLookup={modifierLookup}
      /> */}
      </div>
    </div>
  );
};

export default ProductDetails;
