const singleCarts = {
    cart: {
        id: "gid://shopify/Cart/c1-5fa774effd4f9ef1462c65825236bbcd",
        createdAt: "2023-05-30T08:45:19Z",
        updatedAt: "2023-06-08T08:55:09Z",
        checkoutUrl: "https://blueprintbetatest.myshopify.com/cart/c/c1-5fa774effd4f9ef1462c65825236bbcd",
        totalQuantity: 1,
        lines: {
            nodes: [
                {
                    id: "gid://shopify/CartLine/b6a763eb-b159-4495-a472-105b3ef3d040?cart=c1-5fa774effd4f9ef1462c65825236bbcd",
                    quantity: 1,
                    merchandise: {
                        id: "gid://shopify/ProductVariant/44876466749743",
                        sku: "TRI-1",
                        title: "Blue",
                        image: {
                            url: "https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-blue.jpg?v=1681383898",
                            altText: null,
                            __typename: "Image"
                        },
                        product: {
                            "id": "gid://shopify/Product/8235118264623",
                            "handle": "triangulum-hoodie",
                            "title": "Triangulum Hoodie",
                            "__typename": "Product"
                        },
                        __typename: "ProductVariant"
                    },
                    cost: {
                        "amountPerQuantity": {
                            "amount": "35.0",
                            "__typename": "MoneyV2"
                        },
                        "totalAmount": {
                            "amount": "35.0",
                            "__typename": "MoneyV2"
                        },
                        "__typename": "CartLineCost"
                    },
                    "attributes": [],
                    "__typename": "CartLine"
                }
            ],
            __typename: "CartLineConnection"
        },
        attributes: [],
        cost: {
            "totalAmount": {
                "amount": "35.0",
                "currencyCode": "USD",
                "__typename": "MoneyV2"
            },
            subtotalAmount: {
                "amount": "35.0",
                "currencyCode": "USD",
                "__typename": "MoneyV2"
            },
            totalTaxAmount: null,
            "totalDutyAmount": null,
            "__typename": "CartCost"
        },
        __typename: "Cart"
    }
}

export default singleCarts;
