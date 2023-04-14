import * as React from "react";

type Price = {
  amount: string;
  currencyCode: string;
}

type VariantNode = {
  sku: string;
  price: Price;
  compareAtPrice: string | null;
};

type CollectionNode = {
  title: string;
};

type ImageNode = {
  url: string;
};

type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ImageNode;
  images: {
    nodes: ImageNode[];
  };
  collections: {
    nodes: CollectionNode[];
  };
  variants: {
    nodes: VariantNode[];
  };
};

type ProductsApiResponse = {
  data: {
    products: {
      nodes: ProductNode[];
    };
  };
};

type ProductsContext = {
  products: ProductsApiResponse;
};

const defaultProductsContext: ProductsContext = {
  products: { data: { products: { nodes: [] } } },
};

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
      "useProductsContext must be used within a ProductsContextProvider"
    );
  }
  return context;
};
export { ProductsContextProvider, useProductsContext };
