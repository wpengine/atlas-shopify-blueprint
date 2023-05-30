import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries/Products';
import { GET_COLLECTION } from '../../queries/Collections';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { ShopFilter } from './ShopFilter';
import { FILTERS } from '../../constants/filters';

/**
 * Render the ProductList component.
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @typedef {Object} Products
 * @property {string} id The id value.
 * @property {number} quantity The quantity value.
 * @property {Object} cost The cost object.
 * @property {Object} amountPerQuantity The amountPerQuantity object.
 * @property {string} amount The amount value.
 * @property {Object} totalAmount The totalAmount Object.
 * @property {string} amount The amount value.
 * @property {Object} merchandise The merchandise object.
 * @property {string} id The id value.
 * @property {string} title The title value.
 * @property {Image} image The image object.
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 * @property {Object} product The product object.
 * @property {string} id The id value.
 * @property {string} handle The handle value.
 * @property {string} title The title value.
 *
 * @typedef {Object} Query
 * @property {string} handle The handle value.
 * @property {boolean} reverse The reverse value.
 * @property {string | number} ProductCollectionSortKeys The productColection sort keys.
 * @property {Object} collection The collection object.
 * @returns {(first: string | number, reverse: boolean, sortKey: string | number) => Products} products The products value.
 *
 * @param {Props} props The props object.
 * @param {Query} props.collection The query to get collection.
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
