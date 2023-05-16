import { gql } from '@apollo/client';
import CartFragment from '../fragments/Cart';

const REMOVE_FROM_CART = gql`
  ${CartFragment}
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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

export default REMOVE_FROM_CART;
