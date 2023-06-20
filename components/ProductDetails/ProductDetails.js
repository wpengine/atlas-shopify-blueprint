import { useState } from 'react';
import useShopifyCart from '../../hooks/useShopifyCart';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import ProductMeta from './ProductMeta';
import ProductGallery from './ProductGallery';
import styles from './ProductDetails.module.scss';
import shopifyConfiguration from '../../utilities/shopifyConfiguration';
import ConnectionUnavailable from '../../utilities/ConnectionUnavailable';
import { ProductNotification } from '../ProductNotification';

/**
 * Render the ProductDetails component.
 *
 * @param {Props} props The props object.
 * @param {Object} props.product The Product object containing the details to render.
 * @param {(Object<string, string>) => void} props.setProductNotification The function that displays the
 * product notification component when the user performs cart operations.
 * @returns {React.ReactElement} The ProductDetails component.
 */

const ProductDetails = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.nodes[0]
  );
  const [productNotification, setProductNotification] = useState();

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
          window.scrollTo(0, 0);
        })
      );
  };

  if (!shopifyConfiguration.available()) {
    return <ConnectionUnavailable />;
  }

  return (
    <div>
      {productNotification && (
        <ProductNotification productNotification={productNotification} />
      )}
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
            compareAtPrice={selectedVariant?.compareAtPrice?.amount}
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
    </div>
  );
};

export default ProductDetails;
