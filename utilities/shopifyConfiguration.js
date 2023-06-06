const shopifyConfiguration = {
    available: function () {
      try {
        new URL(process.env.NEXT_PUBLIC_SHOPIFY_URL);
        return process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  };
  
  export default shopifyConfiguration;
