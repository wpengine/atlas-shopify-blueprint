import { gql } from '@apollo/client';

const CartFragment = gql`
  fragment CartFragment on Cart {
    id
    createdAt
    updatedAt
    checkoutUrl
    totalQuantity
    lines(first: 10) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            sku
            title
            image {
              url
              altText
            }
            product {
              id
              handle
              title
            }
          }
        }
        cost {
          amountPerQuantity {
            amount
          }
          totalAmount {
            amount
          }
        }
        attributes {
          key
          value
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
`;

export default CartFragment;
