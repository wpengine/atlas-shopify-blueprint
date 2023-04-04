import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';

async function fetchCart(body) {
  const cartToken = cookieCutter.get('atlas-shopify-token-cart');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (cartToken) {
    headers['Authorization'] = 'Bearer ' + cartToken;
  }

  // const result = await fetch(
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/atlas-commerce-connector-bigcommerce/v1/cart`,
  //   {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify(body),
  //   }
  // );

  const data = {};

  if (data.token) {
    cookieCutter.set('atlas-shopify-token-cart', data.token, { path: '/' });
  }

  if (data.cart_data) {
    try {
      data.cart_data = JSON.parse(data.cart_data);
    } catch (e) {
      console.err(e);
      console.log('There was an issue retrieving the cart data');
    }
  }

  return data;
}

export const AtlasShopifyContext = React.createContext({});

export function AtlasShopifyProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkCart();

    function handleRouteChange(url, { shallow }) {
      checkCart();
    }

    function handleVisibilityChange(event) {
      if (document.visibilityState === 'visible') {
        checkCart();
      }
    }

    router.events.on('routeChangeStart', handleRouteChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router.events]);

  async function addToCart(lineItems) {
    const data = await fetchCart({ action: 'add', line_items: lineItems });

    if (data.cart_data) {
      setCartData(data.cart_data);
    }

    return data;
  }

  async function removeFromCart(itemId) {
    try {
      const data = await fetchCart({ action: 'remove', item_id: itemId });

      if (data.status === 200 && data.message) {
        await checkCart();
        return data;
      }
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async function checkCart() {
    const data = await fetchCart({ action: 'check' });

    if (data.status !== 200 && data.message.indexOf('deleted')) {
      cookieCutter.set('atlas-shopify-token-cart', '', {
        path: '/',
        expires: new Date(0),
      });
    }

    setCartData(data.cart_data ?? 'Empty');
  }

  const value = {
    cartData,
    addToCart,
    removeFromCart,
    checkCart,
  };

  return (
    <AtlasShopifyContext.Provider value={value}>
      {children}
    </AtlasShopifyContext.Provider>
  );
}

export default function useAtlasShopify() {
  const AtlasShopify = useContext(AtlasShopifyContext);
  return AtlasShopify;
}
