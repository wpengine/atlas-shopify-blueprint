import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const store = "blueprintbetatest"; // process.env.SHOPIFY_STORE_NAME
const token = "3accc15150c6fadc731a4763deb6a2ee"; // process.env.SHOPIFY_TOKEN
const url = `https://${store}.myshopify.com/api/2023-01/graphql.json`;

const shopifyApiClient = new ApolloClient({
  link: createHttpLink({
    uri: url,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default shopifyApiClient;
