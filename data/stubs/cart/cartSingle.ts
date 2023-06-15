export const cartSingle = {
  cart: {
    id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
    createdAt: '2023-06-11T13:08:53Z',
    updatedAt: '2023-06-12T08:52:23Z',
    checkoutUrl:
      'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca',
    totalQuantity: 1,
    lines: {
      nodes: [
        {
          id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
          quantity: 1,
          merchandise: {
            id: 'gid://shopify/ProductVariant/44876466749743',
            sku: 'TRI-1',
            title: 'Blue',
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-blue.jpg?v=1681383898',
              altText: null,
              __typename: 'Image',
            },
            product: {
              id: 'gid://shopify/Product/8235118264623',
              handle: 'triangulum-hoodie',
              title: 'Triangulum Hoodie',
              __typename: 'Product',
            },
            __typename: 'ProductVariant',
          },
          cost: {
            amountPerQuantity: {
              amount: '35.0',
              __typename: 'MoneyV2',
            },
            totalAmount: {
              amount: '35.0',
              __typename: 'MoneyV2',
            },
            __typename: 'CartLineCost',
          },
          attributes: [],
          __typename: 'CartLine',
        },
      ],
      __typename: 'CartLineConnection',
    },
    attributes: [],
    cost: {
      totalAmount: {
        amount: '35.0',
        currencyCode: 'USD',
        __typename: 'MoneyV2',
      },
      subtotalAmount: {
        amount: '35.0',
        currencyCode: 'USD',
        __typename: 'MoneyV2',
      },
      totalTaxAmount: null,
      totalDutyAmount: null,
      __typename: 'CartCost',
    },
    __typename: 'Cart',
  },
};

export const increasedCartSingle = {
  cart: {
    id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
    createdAt: '2023-06-11T13:08:53Z',
    updatedAt: '2023-06-13T12:24:23Z',
    checkoutUrl:
      'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca',
    totalQuantity: 2,
    lines: {
      nodes: [
        {
          id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
          quantity: 2,
          merchandise: {
            id: 'gid://shopify/ProductVariant/44876466749743',
            sku: 'TRI-1',
            title: 'Blue',
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-blue.jpg?v=1681383898',
              altText: null,
              __typename: 'Image',
            },
            product: {
              id: 'gid://shopify/Product/8235118264623',
              handle: 'triangulum-hoodie',
              title: 'Triangulum Hoodie',
              __typename: 'Product',
            },
            __typename: 'ProductVariant',
          },
          cost: {
            amountPerQuantity: {
              amount: '35.0',
              __typename: 'MoneyV2',
            },
            totalAmount: {
              amount: '105.0',
              __typename: 'MoneyV2',
            },
            __typename: 'CartLineCost',
          },
          attributes: [],
          __typename: 'CartLine',
        },
      ],
      __typename: 'CartLineConnection',
    },
    attributes: [],
    cost: {
      totalAmount: {
        amount: '105.0',
        currencyCode: 'USD',
        __typename: 'MoneyV2',
      },
      subtotalAmount: {
        amount: '105.0',
        currencyCode: 'USD',
        __typename: 'MoneyV2',
      },
      totalTaxAmount: null,
      totalDutyAmount: null,
      __typename: 'CartCost',
    },
    __typename: 'Cart',
  },
  userErrors: [],
  __typename: 'CartLinesUpdatePayload',
};

export const increaseFromCartSingle = {
  cartLinesUpdate: {
    cart: {
      id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
      createdAt: '2023-06-11T13:08:53Z',
      updatedAt: '2023-06-13T12:24:23Z',
      checkoutUrl:
        'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca',
      totalQuantity: 2,
      lines: {
        nodes: [
          {
            id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
            quantity: 2,
            merchandise: {
              id: 'gid://shopify/ProductVariant/44876466749743',
              sku: 'TRI-1',
              title: 'Blue',
              image: {
                url: 'https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-blue.jpg?v=1681383898',
                altText: null,
                __typename: 'Image',
              },
              product: {
                id: 'gid://shopify/Product/8235118264623',
                handle: 'triangulum-hoodie',
                title: 'Triangulum Hoodie',
                __typename: 'Product',
              },
              __typename: 'ProductVariant',
            },
            cost: {
              amountPerQuantity: {
                amount: '35.0',
                __typename: 'MoneyV2',
              },
              totalAmount: {
                amount: '105.0',
                __typename: 'MoneyV2',
              },
              __typename: 'CartLineCost',
            },
            attributes: [],
            __typename: 'CartLine',
          },
        ],
        __typename: 'CartLineConnection',
      },
      attributes: [],
      cost: {
        totalAmount: {
          amount: '105.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        subtotalAmount: {
          amount: '105.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        totalTaxAmount: null,
        totalDutyAmount: null,
        __typename: 'CartCost',
      },
      __typename: 'Cart',
    },
    userErrors: [],
    __typename: 'CartLinesUpdatePayload',
  },
};

export const decreaseCartSingle = {
  cartLinesUpdate: {
    cart: {
      id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
      createdAt: '2023-06-11T13:08:53Z',
      updatedAt: '2023-06-14T08:59:45Z',
      checkoutUrl:
        'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca',
      totalQuantity: 1,
      lines: {
        nodes: [
          {
            id: 'gid://shopify/CartLine/17c56882-b197-4599-b9c3-870991a3be9b?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
            quantity: 1,
            merchandise: {
              id: 'gid://shopify/ProductVariant/44876466749743',
              sku: 'TRI-1',
              title: 'Blue',
              image: {
                url: 'https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-blue.jpg?v=1681383898',
                altText: null,
                __typename: 'Image',
              },
              product: {
                id: 'gid://shopify/Product/8235118264623',
                handle: 'triangulum-hoodie',
                title: 'Triangulum Hoodie',
                __typename: 'Product',
              },
              __typename: 'ProductVariant',
            },
            cost: {
              amountPerQuantity: {
                amount: '35.0',
                __typename: 'MoneyV2',
              },
              totalAmount: {
                amount: '35.0',
                __typename: 'MoneyV2',
              },
              __typename: 'CartLineCost',
            },
            attributes: [],
            __typename: 'CartLine',
          },
        ],
        __typename: 'CartLineConnection',
      },
      attributes: [],
      cost: {
        totalAmount: {
          amount: '35.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        subtotalAmount: {
          amount: '35.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        totalTaxAmount: null,
        totalDutyAmount: null,
        __typename: 'CartCost',
      },
      __typename: 'Cart',
    },
    userErrors: [],
    __typename: 'CartLinesUpdatePayload',
  },
};

export const decreaseFromCartSingle = {
  cartLinesUpdate: {
    cart: {
      id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
      createdAt: '2023-06-11T13:08:53Z',
      updatedAt: '2023-06-13T12:24:23Z',
      checkoutUrl:
        'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca',
      totalQuantity: 2,
      lines: {
        nodes: [
          {
            id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
            quantity: 1,
            merchandise: {
              id: 'gid://shopify/ProductVariant/44876466749743',
              sku: 'TRI-1',
              title: 'Blue',
              image: {
                url: 'https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-blue.jpg?v=1681383898',
                altText: null,
                __typename: 'Image',
              },
              product: {
                id: 'gid://shopify/Product/8235118264623',
                handle: 'triangulum-hoodie',
                title: 'Triangulum Hoodie',
                __typename: 'Product',
              },
              __typename: 'ProductVariant',
            },
            cost: {
              amountPerQuantity: {
                amount: '35.0',
                __typename: 'MoneyV2',
              },
              totalAmount: {
                amount: '105.0',
                __typename: 'MoneyV2',
              },
              __typename: 'CartLineCost',
            },
            attributes: [],
            __typename: 'CartLine',
          },
        ],
        __typename: 'CartLineConnection',
      },
      attributes: [],
      cost: {
        totalAmount: {
          amount: '105.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        subtotalAmount: {
          amount: '105.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        totalTaxAmount: null,
        totalDutyAmount: null,
        __typename: 'CartCost',
      },
      __typename: 'Cart',
    },
    userErrors: [],
    __typename: 'CartLinesUpdatePayload',
  },
};

export const removeAfterDecreaseCartSingle = {
  cartLinesUpdate: {
    cart: {
      id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
      createdAt: '2023-06-11T13:08:53Z',
      updatedAt: '2023-06-14T09:22:02Z',
      checkoutUrl:
        'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca',
      totalQuantity: 0,
      lines: {
        nodes: [],
        __typename: 'CartLineConnection',
      },
      attributes: [],
      cost: {
        totalAmount: {
          amount: '0.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        subtotalAmount: {
          amount: '0.0',
          currencyCode: 'USD',
          __typename: 'MoneyV2',
        },
        totalTaxAmount: null,
        totalDutyAmount: null,
        __typename: 'CartCost',
      },
      __typename: 'Cart',
    },
    userErrors: [],
    __typename: 'CartLinesUpdatePayload',
  },
};
