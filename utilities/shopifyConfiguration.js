const shopifyConfiguration = {
  available: function () {
    try {
      new URL(process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL);
      return process.env.NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

export default shopifyConfiguration;
