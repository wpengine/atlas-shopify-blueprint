const shopifyConfiguration = {
    available: function() {
        if (!process.env.NEXT_PUBLIC_SHOPIFY_URL || !process.env.NEXT_PUBLIC_SHOPIFY_TOKEN) {
            return false;
        } else {
            return true;
        }
    }
};

export default shopifyConfiguration;