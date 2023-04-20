import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
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

  it('changes the image and the colour at the same time', () => {
    const variantsProduct = productsStub.data.products.nodes[3];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/TRI-1/i)).toBeInTheDocument();
    expect(screen.queryByText(/TRI-2/i)).not.toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-blue').getAttribute('checked')
    ).toBe('');

    const selectedImage = screen.getByTestId('slide-image-1');
    fireEvent.click(selectedImage);

    expect(screen.queryByText(/TRI-1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/TRI-2/i)).toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-purple').getAttribute('checked')
    ).toBe('');
  });

  it('changes the colour and the image at the same time', () => {
    const variantsProduct = productsStub.data.products.nodes[3];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/TRI-1/i)).toBeInTheDocument();
    expect(screen.queryByText(/TRI-2/i)).not.toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-blue').getAttribute('checked')
    ).toBe('');

    const selectedColour = screen.getByTestId('variant-option-purple');
    fireEvent.click(selectedColour);

    expect(screen.queryByText(/TRI-1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/TRI-2/i)).toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-purple').getAttribute('checked')
    ).toBe('');
  });
});
