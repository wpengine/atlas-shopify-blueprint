import { gql } from '@apollo/client';

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
