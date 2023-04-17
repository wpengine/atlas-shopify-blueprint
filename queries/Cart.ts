import { gql } from "@apollo/client";

export const CartQuery = gql`
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      lines(first: 100) {
        nodes {
          cost {
            amountPerQuantity {
              amount
              currencyCode
            }
            totalAmount {
              currencyCode
              amount
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          id
          quantity
          merchandise {
            ... on ShopifyProductVariant {
              id
              title
              product {
                id
                featuredImage {
                  altText
                  url
                }
                title
              }
            }
          }
        }
      }
    }
  }
`;
