import { gql } from '@apollo/client';

export const UnifiedProductFragment = gql`
  fragment UnifiedProductFragment on Product {
    title
    description
    video
    technicalDetails
    image {
      mediaItemUrl
    }
    shopifySite {
      product {
        handle
        title
        collections(first: 100) {
          nodes {
            title
          }
        }
        variants(first: 100) {
          nodes {
            sku
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
    }
  }
`;
