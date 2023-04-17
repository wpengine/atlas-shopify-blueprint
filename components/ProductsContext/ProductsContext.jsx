import * as React from "react";
import ShopifyApiClient from "../../api/shopifyApiClient";

const emptyApiResponse = { data: { products: { nodes: [] } } };

const defaultProductsContext = {
  products: emptyApiResponse,
  shopifyApiClient: new ShopifyApiClient(),
};

const ProductsContextParent = React.createContext(defaultProductsContext);

const createContextValues = (
  initialState
) => {
  return {
    ...initialState,
  };
};

const ProductsContextProvider = ({
  value,
  children,
}) => {
  return (
    <ProductsContextParent.Provider value={createContextValues(value)}>
      {children}
    </ProductsContextParent.Provider>
  );
};

const useProductsContext = () => {
  const context = React.useContext(ProductsContextParent);
  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsContextProvider"
    );
  }
  return context;
};

export { ProductsContextProvider, useProductsContext };
