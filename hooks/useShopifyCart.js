import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useMutation, useLazyQuery } from '@apollo/client';
import CREATE_CART from '../mutations/CreateCart';
import RETRIEVE_CART from '../queries/Cart';
import ADD_TO_CART from '../mutations/AddToCart';
import REMOVE_FROM_CART from '../mutations/RemoveFromCart';
import UPDATE_CART_QUANTITY from '../mutations/QuantityCart';
import { CART_COOKIE } from '../constants/carts';

/**
 * Render the ShopifyCartProvider component.
 *
 * The useShopifyCart hook provides state to the child components via React context.
 * On each page render, useEffect runs to check if the cart token used to make requests to Shopify exists in the browser.
 * If it does, then it retrieves the cart using this token (cart id), otherwise it creates a cart and saves the cookie for next time.
 * The data fetched from the cart API is then saved in local state within the Provider to be used throughout the site.
 * The "add to cart", "remove from cart" and "update quantity" methods are defined inside this Provider as graphQL mutations and used
 * in various components throughout the site such as ProductDetails and Cart.
 *
 * @param {Props} props The props object.
 * @param {children: JSX.Element} props.children All components that use the data and methods from the Provider.
 *
 * @returns {React.ReactElement} The ShopifyCartProvider component.
 */

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
