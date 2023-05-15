import { gql } from '@apollo/client';

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    featuredImage {
      url
    }
    images(first: 100) {
      nodes {
        url
      }
    }
    collections(first: 100) {
      nodes {
        handle
        title
      }
    }
    variants(first: 100) {
      nodes {
        id
        sku
        quantityAvailable
        image {
          url
        }
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;
