import { gql } from '@apollo/client';

export const GetProducts = gql`
    query {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            images(first: 5) {
              nodes {
                src
              }
            }
            variants(first: 50) {
              nodes {
                sku
                title
                image {
                  src
                }
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  `;
