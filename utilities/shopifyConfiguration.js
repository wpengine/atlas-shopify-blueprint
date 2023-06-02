const shopifyConfiguration = {
    available: function() {
        return process.env.NEXT_PUBLIC_SHOPIFY_URL && process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;
    }
};

export default shopifyConfiguration;
