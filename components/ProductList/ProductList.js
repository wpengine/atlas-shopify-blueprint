import React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_PRODUCTS } from "../../queries/Products";
import { Loader, ProductCard } from "..";
import { ShopFilter } from "./ShopFilter";
import { FILTERS } from "../../constants/filters";

export const ProductList = () => {
  const [sortValue, setSortValue] = useState("");
  const { data: productsData, loading } = useQuery(GET_PRODUCTS, {
    variables: FILTERS[sortValue],
  });
  const products = productsData?.products.nodes ?? [];

  return (
    <>
      <ShopFilter sortValue={sortValue} setSortValue={setSortValue} />
      {loading && <Loader />}
      <div className="shop-grid" role="list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
