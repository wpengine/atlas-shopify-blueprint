const shopifyConfiguration = {
  available: function () {
    try {
      new URL(process.env.NEXT_PUBLIC_SHOPIFY_URL);
    } catch (err) {
      return false;
    }

    return process.env.NEXT_PUBLIC_SHOPIFY_TOKEN && true;
  },
};

export default shopifyConfiguration;
