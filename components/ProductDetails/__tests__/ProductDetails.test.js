import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import productsStub from '../../../data/stubs/products';
import { ProductDetails } from '..';

describe('<ProductDetails />', () => {
  it('displays a product with no variants', () => {
    const noVariantsProduct = productsStub.data.products.nodes[0];
    render(<ProductDetails product={noVariantsProduct} />);

    expect(screen.getByText(/Radiowave Shirt/i)).toBeInTheDocument();
  });

  it('displays a product with variants', () => {
    const variantsProduct = productsStub.data.products.nodes[3];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/Triangulum Hoodie/i)).toBeInTheDocument();
  });
});
