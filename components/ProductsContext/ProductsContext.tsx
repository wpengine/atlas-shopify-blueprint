import * as React from 'react';

type ProductsContext = {
  products: any;
};

const defaultProductsContext = {
  products: {},
}

const ProductsContextParent = React.createContext(defaultProductsContext);

const createContextValues = (
  initialState: ProductsContext
): ProductsContext => {
  return {
    ...initialState,
  };
};

const ProductsContextProvider = ({
  value,
  children,
}: {
  children: React.ReactElement;
  value: ProductsContext;
}): React.ReactElement => {
  return (
    <ProductsContextParent.Provider value={createContextValues(value)}>
      {children}
    </ProductsContextParent.Provider>
  );
};

const useProductsContext = (): ProductsContext => {
  const context = React.useContext(ProductsContextParent);
  if (context === undefined) {
    throw new Error(
      'useProductsContext must be used within a ProductsContextProvider'
    );
  }
  return context;
};
export { ProductsContextProvider, useProductsContext };
