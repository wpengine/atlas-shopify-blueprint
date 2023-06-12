const multipleCart = {
    cart: {
        id: "gid://shopify/Cart/c1-5fa774effd4f9ef1462c65825236bbcd",
        createdAt: "2023-05-30T08:45:19Z",
        updatedAt: "2023-06-08T09:30:53Z",
        checkoutUrl: "https://blueprintbetatest.myshopify.com/cart/c/c1-5fa774effd4f9ef1462c65825236bbcd",
        totalQuantity: 3,
        lines: {
            nodes: [
                {
                    id: "gid://shopify/CartLine/ce99dcd6-ea4d-46b8-b50a-38fb06391896?cart=c1-5fa774effd4f9ef1462c65825236bbcd",
                    quantity: 1,
                    merchandise: {
                        id: "gid://shopify/ProductVariant/44876466782511",
                        sku: "TRI-2",
                        title: "Purple",
                        image: {
                            url: "https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-purple.jpg?v=1681383898",
                            altText: null,
                            __typename: "Image"
                        },
                        product: {
                            id: "gid://shopify/Product/8235118264623",
                            handle: "triangulum-hoodie",
                            title: "Triangulum Hoodie",
                            __typename: "Product"
                        },
                        __typename: "ProductVariant"
                    },
                    cost: {
                        amountPerQuantity: {
                            amount: "30.0",
                            __typename: "MoneyV2"
                        },
                        totalAmount: {
                            amount: "30.0",
                            __typename: "MoneyV2"
                        },
                        __typename: "CartLineCost"
                    },
                    attributes: [],
                    __typename: "CartLine"
                },
                {
                    id: "gid://shopify/CartLine/54a654b2-5b15-4860-880d-a06f0d0677a5?cart=c1-5fa774effd4f9ef1462c65825236bbcd",
                    quantity: 1,
                    merchandise: {
                        id: "gid://shopify/ProductVariant/44876574720303",
                        sku: "TCC-1",
                        title: "Default Title",
                        image: {
                            url: "https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hat-2.jpg?v=1681385139",
                            altText: null,
                            __typename: "Image"
                        },
                        product: {
                            id: "gid://shopify/Product/8235141300527",
                            handle: "toasty-cap-cotton",
                            title: "Toasty Cap Cotton",
                            __typename: "Product"
                        },
                        __typename: "ProductVariant"
                    },
                    cost: {
                        amountPerQuantity: {
                            amount: "20.0",
                            __typename: "MoneyV2"
                        },
                        totalAmount: {
                            amount: "20.0",
                            __typename: "MoneyV2"
                        },
                        __typename: "CartLineCost"
                    },
                    attributes: [],
                    __typename: "CartLine"
                },
                {
                    id: "gid://shopify/CartLine/3024462b-9d0e-4c5a-a20b-740086114be7?cart=c1-5fa774effd4f9ef1462c65825236bbcd",
                    quantity: 1,
                    merchandise: {
                        id: "gid://shopify/ProductVariant/44876558500143",
                        sku: "ADR-2",
                        title: "Red",
                        image: {
                            url: "https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-red_2d71bcca-cb82-4450-838b-73717467f29f.jpg?v=1681384795",
                            altText: null,
                            __typename: "Image"
                        },
                        product: {
                            id: "gid://shopify/Product/8235135271215",
                            handle: "andromeda-hoodie",
                            title: "Andromeda Hoodie",
                            __typename: "Product"
                        },
                        __typename: "ProductVariant"
                    },
                    cost: {
                        amountPerQuantity: {
                            amount: "35.0",
                            __typename: "MoneyV2"
                        },
                        totalAmount: {
                            amount: "35.0",
                            __typename: "MoneyV2"
                        },
                        __typename: "CartLineCost"
                    },
                    attributes: [],
                    __typename: "CartLine"
                }
            ],
            __typename: "CartLineConnection"
        },
        attributes: [],
        cost: {
            totalAmount: {
                amount: "85.0",
                currencyCode: "USD",
                __typename: "MoneyV2"
            },
            subtotalAmount: {
                amount: "85.0",
                currencyCode: "USD",
                __typename: "MoneyV2"
            },
            totalTaxAmount: null,
            totalDutyAmount: null,
            __typename: "CartCost"
        },
        __typename: "Cart"
    }
}

export default multipleCart;
