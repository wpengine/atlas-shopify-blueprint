import { gql } from '@apollo/client';
import CartFragment from '../fragments/Cart';

const UPDATE_CART_QUANTITY = gql`
  ${CartFragment}
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default UPDATE_CART_QUANTITY;
