import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

/**
 * The shopifyClient
 *
 * @param {Object} link The link object.
 * @property {string} uri The uri value.
 * @property {string} headers The headers values.
 * @param {ApolloCache} cache The cache option.
 * @param {Object} defaultOptions The default option object.
 * @property {Object} query The query object.
 * @property {string} fetchPolicy The fetchPolicy value.
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
