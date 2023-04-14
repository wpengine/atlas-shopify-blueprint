import { gql } from '@apollo/client';
import * as React from 'react';

import { ContentWrapper, Footer, Header, Main, NavigationMenu, ProductSection, PromoSection, SEO, TestimonialsSection } from '../components';
import { ProductsContextProvider, useProductsContext, ProductsApiResponse } from '../components/ProductsContext/ProductsContext';
import * as MENUS from '../constants/menus';
import productsStub from '../data/stubs/products';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { GetProducts } from '../api/queries/Product';

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings ?? {};
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { content } = props?.data?.page ?? { title: '' };

  const { shopifyApiClient } = useProductsContext();
  const { products, setProducts } = React.useState<ProductsApiResponse>(null);
  
  React.useEffect(() => {
    if (!products) {
      shopifyApiClient.client.query({ query: GetProducts }).then( response => {
        console.log(response);
        setProducts(response);
      });
    }
  }, [ products, shopifyApiClient, setProducts ]);

  const latestProducts = productsStub?.data?.products?.nodes?.slice(0, 4);
  const saleProducts = productsStub?.data?.products?.nodes?.filter(
    (product) => {
      return product.variants.nodes[0].compareAtPrice !== null;
    }
  );

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <ContentWrapper content={content} />
        <ProductsContextProvider>
          <ProductSection heading='Latest Products' products={latestProducts} />
          <TestimonialsSection />
          <ProductSection heading='On Sale' products={saleProducts} />
        </ProductsContextProvider>
        <PromoSection
          showCta
          ctaLink='/about'
          ctaLabel='About'
          title='Promo Banners'
          description='You can use this component to promote articles or specific products. And optionally add a CTA below.' />
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
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
