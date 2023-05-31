import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

/**
 * The shopifyClient
 *
 * @param {Object} link The link object.
 * @property {string} uri The environment variable where the url to the page on Shopify
 * @property {string} headers The headers values. The token used to make shopify requests that the customer puts in Atlas env vars
 *
 * @returns {ApolloClient} The Apollo Client.
 */

const shopifyClient = new ApolloClient({
  link: new createHttpLink({
    uri: process.env.NEXT_PUBLIC_SHOPIFY_URL,

    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.NEXT_PUBLIC_SHOPIFY_TOKEN,
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
