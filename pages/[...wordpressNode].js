import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { ApolloProvider } from '@apollo/client';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
import shopifyClient from '../utilities/shopifyClient';

export default function Page(props) {
  return (
    <ApolloProvider client={shopifyClient}>
      <ShopifyCartProvider>
        <WordPressTemplate {...props} />
      </ShopifyCartProvider>
    </ApolloProvider>
  );
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
