import { gql, useQuery, ApolloProvider } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import shopifyClient from '../../utilities/shopifyClient';
import { ShopifyCartProvider } from '../../hooks/useShopifyCart';
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
  SEO,
} from '../../components';
import shopifyConfiguration from '../../utilities/shopifyConfiguration';

export default function Page(props) {

  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const product = props?.product ?? {};

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <ApolloProvider client={shopifyClient}>
        <ShopifyCartProvider>
          <Header
            title={siteTitle}
            description={siteDescription}
            menuItems={primaryMenu}
          />
          <Main>
            <Container>
              <ProductDetails
                product={product}
              />
            </Container>
          </Main>
        </ShopifyCartProvider>
      </ApolloProvider>
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
  if (shopifyConfiguration.available()) {
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

  return getNextStaticProps(ctx, {
    Page,
    props: { handle: ctx.params.handle },
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
