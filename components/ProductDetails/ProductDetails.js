import { useState } from 'react';
import useShopifyCart from '../../hooks/useShopifyCart';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import ProductMeta from './ProductMeta';
import ProductGallery from './ProductGallery';
import styles from './ProductDetails.module.scss';

/**
 * Render the ProductDetails component.
 * @typedef {Object} Products The products object getting from graphQL query.
 *
 * @param {Props} props The props object.
 * @param {Products} props.product The product input value. Products list getting from graphQL query.
 * @param {(Object<string, string>) => void} props.setProductNotification The function that sets the display of the product
 * notification component which tells the user if they successfully or unsuccessfully completed the remove from cart / decrease / increase quantity.
 * @returns {React.ReactElement} The ProductDetails component.
 */

const ProductDetails = ({ product, setProductNotification }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.nodes[0]
  );

  const { addToCart, cartId, retrieveCart, setCartData } = useShopifyCart();

  const collections = product?.collections?.nodes ?? [];

  const variantsLabel = product?.variants?.nodes[0]?.selectedOptions?.[0]?.name;
  const variantsOptions = product?.variants?.nodes?.map?.((variant) =>
    variant.selectedOptions?.[0]?.value.toLowerCase()
  );
  const variantImages = product?.variants?.nodes?.map?.(
    (variantImage) => variantImage?.image?.url
  );

  const handleVariantChange = (property) => {
    const variant = product.variants.nodes.find(
      (variant) =>
        variant.selectedOptions[0].value.toLowerCase() === property ||
        variant.image.url === property
    );

    setSelectedVariant(variant);
  };

  const handleSubmit = (quantity, variantId) => {
    addToCart({
      variables: {
        cartId,
        lines: [{ quantity, merchandiseId: variantId }],
      },
    })
      .then(() => {
        setProductNotification({
          message: `${product?.title} has been added to your cart.`,
          className: 'success',
        });
      })
      .catch((err) => {
        console.error(err);
        setProductNotification({
          message: 'There was an issue adding this item to the cart',
          className: 'error',
        });
      })
      .finally(() =>
        retrieveCart().then((response) => {
          setCartData(response.data.cart);
        })
      );
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
          handleSubmit={handleSubmit}
          handleOptionChange={handleVariantChange}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
