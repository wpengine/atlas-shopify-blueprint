import React from "react";
import useCart from "../../hooks/useCart";

import { Loader } from "../Loader";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

const Cart = () => {
  const {
    cartItems,
    isCartEmpty,
    isCartLoading,
    cartSubTotal,
    cartTotal,
    checkoutUrl,
  } = useCart();

  if (isCartLoading) {
    return <Loader />;
  }

  if (isCartEmpty) {
    return <p>You have no items in cart</p>;
  }

  return (
    <>
      <CartTable cartItems={cartItems} />
      <CartTotals
        cartSubTotal={cartSubTotal}
        cartTotal={cartTotal}
        checkoutUrl={checkoutUrl}
      />
    </>
  );
};

export default Cart;
