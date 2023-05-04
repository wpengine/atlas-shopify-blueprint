import { gql } from '@apollo/client';
import { ProductFragment } from '../fragments/Product';

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 250) {
      nodes {
        title
        handle
      }
    }
  }
`;

export const GET_COLLECTION = gql`
  ${ProductFragment}
  query GetCollection(
    $handle: String!
    $reverse: Boolean
    $sortKey: ProductCollectionSortKeys
  ) {
    collection(handle: $handle) {
      products(first: 250, reverse: $reverse, sortKey: $sortKey) {
        nodes {
          ...ProductFragment
        }
      }
    }
  }
`;
