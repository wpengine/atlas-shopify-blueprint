import { gql } from '@apollo/client';
import CartFragment from '../fragments/Cart';

const ADD_TO_CART = gql`
  ${CartFragment}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
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

export default ADD_TO_CART;
