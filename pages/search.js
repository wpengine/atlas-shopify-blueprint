import { ApolloProvider, gql, useQuery } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { getNextStaticProps } from '@faustwp/core';
import { GET_COLLECTIONS } from '../queries/Collections';
import shopifyClient from '../utilities/shopifyClient';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
import {
  Header,
  Footer,
  Main,
  NavigationMenu,
  SEO,
  SearchSection,
  Container,
} from '../components';
import shopifyConfiguration from '../utilities/shopifyConfiguration';

export default function Page(props) {
  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

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
              <SearchSection collections={props.collections} />
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
      query: GET_COLLECTIONS,
    });

    const { collections } = data;

    return getNextStaticProps(ctx, {
      Page,
      props: { collections: collections.nodes },
    });
  }

  return getNextStaticProps(ctx, {
    Page,
  });
}
