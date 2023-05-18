import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useMutation, useLazyQuery } from '@apollo/client';
import CREATE_CART from '../mutations/CreateCart';
import RETRIEVE_CART from '../queries/Cart';
import ADD_TO_CART from '../mutations/AddToCart';
import REMOVE_FROM_CART from '../mutations/RemoveFromCart';
import UPDATE_CART_QUANTITY from '../mutations/QuantityCart';
import { CART_COOKIE } from '../constants/carts';

const ShopifyCartContext = React.createContext({});

export function ShopifyCartProvider({ children }) {
  const [cartData, setCartData] = useState('');

  const cookies = new Cookies();
  const cartToken = cookies.get(CART_COOKIE) ?? null;

  const [createCart] = useMutation(CREATE_CART);
  const [retrieveCart] = useLazyQuery(RETRIEVE_CART, {
    variables: { id: cartToken },
  });

  useEffect(() => {
    if (cartToken) {
      retrieveCart()
        .then((response) => {
          setCartData(response.data.cart);
        })
        .catch((err) => console.error(err));
    } else {
      createCart({
        variables: { input: {} },
      })
        .then((response) => {
          cookies.set(CART_COOKIE, response.data.cartCreate.cart.id);
          setCartData(response.data.cartCreate.cart);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const [addToCart] = useMutation(ADD_TO_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY);

  const cartItems = cartData?.lines?.nodes ?? [];
  const cartCount = cartData?.totalQuantity;
  const isCartEmpty = cartCount === 0;
  const cartTotal = cartData?.cost?.totalAmount.amount ?? 0;
  const cartSubTotal = cartData?.cost?.subtotalAmount.amount ?? 0;
  const checkoutUrl = cartData?.checkoutUrl;
  const cartId = cartData?.id;

  const value = {
    cartItems,
    cartCount,
    isCartEmpty,
    cartTotal,
    cartSubTotal,
    checkoutUrl,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    retrieveCart,
    setCartData,
    cartId,
  };

  return (
    <ShopifyCartContext.Provider value={value}>
      {children}
    </ShopifyCartContext.Provider>
  );
}

export default function useShopifyCart() {
  const AtlasShopify = useContext(ShopifyCartContext);
  return AtlasShopify;
}