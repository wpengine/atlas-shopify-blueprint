import { gql } from '@apollo/client';
import { ProductFragment } from '../fragments/Product';

export const GetProducts = gql`
  ${ProductFragment}
  query GetProducts {
    products(first: 250) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;
