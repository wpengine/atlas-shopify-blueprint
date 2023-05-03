import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../queries/Products';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { ShopFilter } from './ShopFilter';
import { FILTERS } from '../../constants/filters';

const ProductList = () => {
  const [sortValue, setSortValue] = useState('');
  const { data: productsData, loading } = useQuery(GET_PRODUCTS, {
    variables: FILTERS[sortValue],
  });
  const products = productsData?.products.nodes ?? [];

  return (
    <>
      <ShopFilter sortValue={sortValue} setSortValue={setSortValue} />
      {loading && <Loader />}
      <div className='shop-grid' role='list'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
