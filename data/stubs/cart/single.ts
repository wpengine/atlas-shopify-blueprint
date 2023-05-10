const single = {
  cart: {
    id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
    checkoutUrl:
      'https://blueprintbetatest.myshopify.com/cart/c/c1-c63c275d6f27eb309d4efac08dee2e7d',
    totalQuantity: 1,
    cost: {
      totalAmount: {
        amount: '35.0',
        currencyCode: 'USD',
      },
      subtotalAmount: {
        amount: '35.0',
        currencyCode: 'USD',
      },
    },
    lines: {
      nodes: [
        {
          quantity: 1,
          cost: {
            amountPerQuantity: {
              amount: '35.0',
            },
            totalAmount: {
              amount: '35.0',
            },
          },
          merchandise: {
            id: 'gid://shopify/ProductVariant/44876466749743',
            title: 'Blue',
            product: {
              id: 'gid://shopify/Product/8235118264623',
              handle: 'triangulum-hoodie',
              featuredImage: {
                altText: null,
                url: 'https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-purple.jpg?v=1681383898',
              },
              title: 'Triangulum Hoodie',
            },
          },
        },
      ],
    },
  },
};

export default single;
