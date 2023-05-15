import { useState } from 'react';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import ProductMeta from './ProductMeta';
import ProductGallery from './ProductGallery';
import styles from './ProductDetails.module.scss';

const ProductDetails = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.nodes[0]
  );
  const [quantity, setQuantity] = useState(0);

  const collections = product?.collections?.nodes ?? [];

  const variantsLabel = product?.variants?.nodes[0]?.selectedOptions?.[0]?.name;
  const variantsOptions = product?.variants?.nodes?.map?.((variant) =>
    variant.selectedOptions?.[0]?.value.toLowerCase()
  );
  const variantImages = product?.variants?.nodes?.map?.(
    (variantImage) => variantImage?.image?.url
  );

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleVariantChange = (property) => {
    const variant = product.variants.nodes.find(
      (variant) =>
        variant.selectedOptions[0].value.toLowerCase() === property ||
        variant.image.url === property
    );

    setSelectedVariant(variant);
  };

  const handleSubmit = () => {
    console.log('Add to cart will happen here');
    return quantity;
  };

  return (
    <div className={styles.component}>
      <div className={styles.detailsColumn}>
        <ProductGallery
          images={variantImages}
          selected={selectedVariant?.image?.url}
          variant={selectedVariant?.selectedOptions?.[0]?.value}
          handleImageChange={handleVariantChange}
        />
      </div>
      <div className={styles.detailsColumn}>
        {selectedVariant?.compareAtPrice && (
          <span className={styles.onSale}>Sale</span>
        )}
        <h1>{product?.title}</h1>
        <ProductPrice
          salePrice={selectedVariant?.compareAtPrice}
          price={selectedVariant?.price?.amount}
          currencyCode={selectedVariant?.price?.currencyCode}
        />
        <ProductDescription description={product?.description} />
        <ProductMeta
          variant={selectedVariant}
          collections={collections}
          variantOptions={{ label: variantsLabel, options: variantsOptions }}
          handleChange={handleQuantityChange}
          handleSubmit={handleSubmit}
          handleOptionChange={handleVariantChange}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
