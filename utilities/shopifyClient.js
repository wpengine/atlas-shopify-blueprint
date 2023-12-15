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
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9kZXZlbG9wZXIuYmlnY29tbWVyY2UuY29tIl0sImVhdCI6MTcwMjc1MjM5OSwiaWF0IjoxNzAyNTc5NTk5LCJpc3MiOiJCQyIsInNpZCI6MTAwMjY3Mjk2Niwic3ViIjoiQkMiLCJzdWJfdHlwZSI6MCwidG9rZW5fdHlwZSI6MX0.hsBuf_IFzWcpkIYXJ7UIkq7KO4xInZRT2t9iZppKF8wJ7UkHzsJ3-Odw41siVLOCbbjzdUSEwTMS7vZ_GAWdHA",
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
