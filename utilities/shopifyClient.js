import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

/**
 * The Apollo Client used to make requests to Shopify Storefront API.
 *
 * @param {ApolloLink} link The http configuration for the request.
 * @property {string} uri The base URL to Shopify Storefront API configured via Atlas Environment Variables.
 * @property {string} headers The headers configuration for the request including the API token configured via Atlas Environment Variables.
 *
 * @returns {ApolloClient} The Configured Apollo Client used to perform mutations and queries to Shopify Storefront API throughout the site.
 */

const shopifyClient = new ApolloClient({
  link: new createHttpLink({
    uri: process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL,

    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN,
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
