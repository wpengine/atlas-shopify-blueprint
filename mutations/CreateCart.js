import { gql } from '@apollo/client';

const CREATE_CART = gql`
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

export default CREATE_CART;
