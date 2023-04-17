import category from './category';
import tag from './tag';
import frontPage from './front-page';
import page from './page';
import single from './single';
import { getWordPressProps } from '@faustwp/core';
import ShopifyApiClient from '../api/shopifyApiClient';
import { GetProducts } from '../api/queries/Product';

export default {
  category,
  tag,
  'front-page': frontPage,
  page,
  single,
};

export async function getStaticProps(ctx) {
  const staticProps = await getWordPressProps({ ctx, revalidate: 5 });
  const { data } = await new ShopifyApiClient().query({ query: GetProducts });
  const { products } = data;

  if (staticProps.props && products.nodes.length) {
    staticProps.props.products = products.nodes;
  }

  return staticProps;
}
