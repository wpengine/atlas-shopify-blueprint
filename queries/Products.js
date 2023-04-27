import { gql } from '@apollo/client';
import { ProductFragment } from '../fragments/Product';

export const GET_PRODUCTS = gql`
  ${ProductFragment}
  query GetProducts {
    products(first: 250) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  ${ProductFragment}
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const SEARCH_PRODUCT = gql`
  ${ProductFragment}
  query SearchProduct($query: String!) {
    products(first: 250, query: $query) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;
