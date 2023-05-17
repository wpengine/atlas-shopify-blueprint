import { gql } from '@apollo/client';
import CartFragment from '../fragments/Cart';

export const RETRIEVE_CART = gql`
  ${CartFragment}
  query RetrieveCart($id: ID!) {
    cart(id: $id) {
      ...CartFragment
    }
  }
`;

export default RETRIEVE_CART;
