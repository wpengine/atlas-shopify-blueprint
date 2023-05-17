import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductSection from '../ProductSection';

describe('<ProductSection />', () => {
  it('Render ProductSection with product and heading', () => {
    const product = {
      title: 'Radiowave Shirt',
      variants: {
        nodes: [
          {
            price: {
              amount: '18.0',
            },
          },
        ],
      },
    };
    const heading = 'Latest Products';

    render(<ProductSection heading={heading} products={[product]} />);

    expect(screen.getByText('$18.00')).toBeVisible();
    expect(screen.getByText('Radiowave Shirt')).toBeVisible();
    expect(screen.getByTestId('product-img')).toBeVisible();
    expect(screen.getByText('Latest Products')).toBeVisible();
  });

  it('Render 4 products and check if 4 appear', () => {
    const products = [
      {
        id: 1,
        title: 'Radiowave Shirt',
        variants: {
          nodes: [
            {
              price: {
                amount: '18.0',
              },
            },
          ],
        },
      },
      {
        id: 2,
        title: 'Quark Shirt',
        variants: {
          nodes: [
            {
              price: {
                amount: '20.0',
              },
            },
          ],
        },
      },
      {
        id: 3,
        title: 'Topography Shirt',
        variants: {
          nodes: [
            {
              price: {
                amount: '20.0',
              },
            },
          ],
        },
      },
      {
        id: 4,
        title: 'Triangulum Hoodie',
        variants: {
          nodes: [
            {
              price: {
                amount: '35.0',
              },
            },
          ],
        },
      },
    ];
    const heading = 'Latest Product test';

    render(
      <ProductSection
        key={[products.id]}
        heading={heading}
        products={products}
      />
    );

    const renderedProducts = screen.getAllByRole('listitem');

    expect(renderedProducts).toHaveLength(4);
  });

  it('Render empty ProductSection', () => {
    const product = [];

    render(<ProductSection products={product} />);

    const renderedProducts = screen.queryAllByRole('listitem');

    expect(renderedProducts).toHaveLength(0);
  });
});
