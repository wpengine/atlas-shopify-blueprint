import React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_PRODUCTS } from "../../queries/Products";
import { Loader, ShopFilter, ProductCard } from "../";
import { filters } from "../../components/ShopFilter/const";
import shopifyClient from "../../utilities/shopifyClient";

export const ProductsList = () => {
  const [sortValue, setSortValue] = useState("best-selling");
  const { data: productsData, loading } = useQuery(GET_PRODUCTS, {
    variables: filters[sortValue],
    client: shopifyClient,
  });
  const products = productsData?.products.nodes ?? [];
  return (
    <>
      <ShopFilter sortValue={sortValue} setSortValue={setSortValue} />
      {loading && <Loader />}
      <div className="shop-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
