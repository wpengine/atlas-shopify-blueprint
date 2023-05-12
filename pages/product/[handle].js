import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import shopifyClient from '../../utilities/shopifyClient';
import { GET_PRODUCT } from '../../queries/Products';
import * as MENUS from '../../constants/menus';
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  ProductDetails,
  ProductNotification,
  SEO,
} from '../../components';
import useShopifyCart from '../../hooks/useShopifyCart';

export default function Page(props) {
  const [productNotification, setProductNotification] = useState();

  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { addToCart, cartId, retrieveCart, setCartData } = useShopifyCart();

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const product = props?.product ?? {};

  const handleSubmit = (quantity, variantId) => {
    addToCart({
      variables: {
        cartId,
        lines: [{ quantity, merchandiseId: variantId }],
      },
    })
      .then(() => {
        setProductNotification({
          message: `"${product?.title}" has been added to your cart.`,
          className: 'success',
        });
      })
      .catch((err) => {
        console.error(err);
        setProductNotification({
          message: 'There was an issue adding this item to the cart',
          className: 'error',
        });
      })
      .finally(() =>
        retrieveCart().then((response) => {
          setCartData(response.data.cart);
        })
      );
  };

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          {productNotification && (
            <ProductNotification productNotification={productNotification} />
          )}
          <ProductDetails product={product} handleSubmit={handleSubmit} />
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetMenuItems(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export async function getStaticProps(ctx) {
  const { data } = await shopifyClient.query({
    query: GET_PRODUCT,
    variables: { handle: ctx.params.handle },
  });

  const { product } = data;

  return getNextStaticProps(ctx, {
    Page,
    props: { handle: ctx.params.handle, product },
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
