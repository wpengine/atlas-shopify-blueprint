import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries/Products';
import { GET_COLLECTION } from '../../queries/Collections';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { ShopFilter } from './ShopFilter';
import { FILTERS } from '../../constants/filters';

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

  return (
    <>
      <ShopFilter
        sortValue={sortValue}
        setSortValue={setSortValue}
        collection={collection}
      />
      {loading && <Loader />}
      <div className='shop-grid' role='list'>
        {products?.map?.((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
