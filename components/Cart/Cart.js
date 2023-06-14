import { useState } from 'react';
import useShopifyCart from '../../hooks/useShopifyCart';
import { Loader } from '../Loader';
import CartTable from './CartTable';
import CartTotals from './CartTotals';
import { ProductNotification } from '../ProductNotification';
import ConnectionUnavailable from '../../utilities/ConnectionUnavailable';
import shopifyConfiguration from '../../utilities/shopifyConfiguration';

/**
 * Render the Cart component.
 *
 * @param {Props} props The props object.
 * @param {(Object<string, string>) => void} props.setProductNotification The function that displays the
 * product notification component when the user performs cart operations.
 *
 * @returns {React.ReactElement} The Cart component.
 */

const Cart = () => {
  const [productNotification, setProductNotification] = useState();

  const {
    cartItems,
    isCartLoading,
    isCartEmpty,
    cartTotal,
    cartSubTotal,
    checkoutUrl,
    removeFromCart,
    updateCartQuantity,
    cartId,
    setCartData,
    retrieveCart,
  } = useShopifyCart();

  if (!shopifyConfiguration.available()) {
    return <ConnectionUnavailable />;
  }

  if (isCartLoading) {
    return <Loader />;
  }

  return (
    <div className="text-center spacing-top">
      <h1>Cart</h1>
      {productNotification && (
        <ProductNotification
          productNotification={productNotification}
          cartPage
        />
      )}
      {isCartEmpty ? (
        <p>You have no items in cart</p>
      ) : (
        <>
          <CartTable
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
            cartId={cartId}
            setCartData={setCartData}
            retrieveCart={retrieveCart}
            setProductNotification={setProductNotification}
          />
          <CartTotals
            cartSubTotal={cartSubTotal}
            cartTotal={cartTotal}
            checkoutUrl={checkoutUrl}
          />
        </>
      )}
    </div>
  );
};

export default Cart;
