import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { getNextServerSideProps } from '@faustwp/core';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import * as MENUS from '../constants/menus';
import shopifyClient from '../utilities/shopifyClient';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
  EntryHeader,
  ProductList,
} from '../components';

export default function Page() {
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
              <div className="text-center">
                <EntryHeader
                  title="Shop"
                  subTitle="Shop your Shopify products with WordPress and WPGraphQL"
                />

                <ProductList />
              </div>
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

export async function getServerSideProps(ctx) {
  return getNextServerSideProps(ctx, {
    Page,
  });
}
