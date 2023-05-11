import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <ShopifyCartProvider>
        <Component {...pageProps} key={router.asPath} />
      </ShopifyCartProvider>
    </FaustProvider>
  );
}
