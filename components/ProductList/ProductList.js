import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries/Products';
import { GET_COLLECTION } from '../../queries/Collections';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { ShopFilter } from './ShopFilter';
import { FILTERS } from '../../constants/filters';
import shopifyConfiguration from '../../utilities/shopifyConfiguration';
import ConnectionUnavailable from '../../utilities/ConnectionUnavailable';

/**
 * Render the ProductList component.
 *
 * @param {Props} props The props object.
 * @param {string} props.collection (Optional) If provided, queries products by collection, otherwise queries all products.
 *
 * @returns {React.ReactElement} The ProductList component.
 */

const ProductList = ({ collection = null }) => {
  const [sortValue, setSortValue] = useState(
    collection ? 'collection-latest' : 'latest'
  );

  const QUERY = collection ? GET_COLLECTION : GET_PRODUCTS;

  const { data: productsData, loading } = useQuery(QUERY, {
    variables: {
      sortKey: FILTERS[sortValue]?.sortKey,
      reverse: FILTERS[sortValue]?.reverse,
      handle: collection,
    },
  });

  const products =
    productsData?.products?.nodes || productsData?.collection?.products?.nodes;

  if (!shopifyConfiguration.available()) {
    return <ConnectionUnavailable />;
  }

  return (
    <>
      <ShopFilter
        sortValue={sortValue}
        setSortValue={setSortValue}
        collection={collection}
      />
      {loading && <Loader />}
      <div className="shop-grid" role="list">
        {products?.map?.((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
