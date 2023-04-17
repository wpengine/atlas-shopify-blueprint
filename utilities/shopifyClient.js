import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const shopifyClient = new ApolloClient({
  link: new createHttpLink({
    uri: process.env.SHOPIFY_URL,

    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default shopifyClient;
