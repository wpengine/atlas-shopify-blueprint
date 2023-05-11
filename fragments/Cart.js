import { gql } from '@apollo/client';

const CartFragment = gql`
  fragment CartFragment on Cart {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
          }
        }
        attributes {
          key
          value
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          provinceCode
          countryCodeV2
          zip
        }
      }
    }
  }
`;

export default CartFragment;
