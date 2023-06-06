import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { ApolloProvider } from '@apollo/client';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
import shopifyClient from '../utilities/shopifyClient';
import { GET_PRODUCTS } from '../queries/Products';
import shopifyConfiguration from '../utilities/shopifyConfiguration';

export default function Page(props) {
  return (
    <ApolloProvider client={shopifyClient}>
      <ShopifyCartProvider>
        <WordPressTemplate {...props} />
      </ShopifyCartProvider>
    </ApolloProvider>
  );
}

export async function getStaticProps(ctx) {
  const staticProps = await getWordPressProps({ ctx, revalidate: 5 });

  if (shopifyConfiguration.available()) {
    const { data } = await shopifyClient.query({ query: GET_PRODUCTS });
    const { products } = data;

    if (staticProps.props && products.nodes.length) {
      staticProps.props.products = products.nodes;
    }
  }

  return staticProps;
}
