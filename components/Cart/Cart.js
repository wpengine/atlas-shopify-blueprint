import React from 'react';

import { Loader } from '../Loader';
import CartTable from './CartTable';
import CartTotals from './CartTotals';

const Cart = ({ cart, setProductNotification }) => {
  const {
    cartItems,
    isCartEmpty,
    isCartLoading,
    cartSubTotal,
    cartTotal,
    checkoutUrl,
    removeFromCart,
    cartId,
    setCartData,
    retrieveCart,
  } = cart;

  if (isCartLoading) {
    return <Loader />;
  }

  if (isCartEmpty) {
    return <p>You have no items in cart</p>;
  }

  return (
    <>
      <CartTable
        cartItems={cartItems}
        removeFromCart={removeFromCart}
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
  );
};

export default Cart;
