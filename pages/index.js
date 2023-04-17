import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import shopifyClient from '../utilities/shopifyClient';
import { GetProducts } from '../queries/Products';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export async function getStaticProps(ctx) {
  const staticProps = await getWordPressProps({ ctx, revalidate: 5 });
  const { data } = await shopifyClient.query({ query: GetProducts });
  const { products } = data;

  if (staticProps.props && products.nodes.length) {
    staticProps.props.products = products.nodes;
  }

  return staticProps;
}
