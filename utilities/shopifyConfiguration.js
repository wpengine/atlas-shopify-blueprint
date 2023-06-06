const shopifyConfiguration = {
  available: function () {
    let urlIsValid = true;
    const tokenExists = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN !== '';

    try {
      new URL(process.env.NEXT_PUBLIC_SHOPIFY_URL);
    } catch (err) {
      return false;
    }

    return urlIsValid && tokenExists;
  },
};

export default shopifyConfiguration;
