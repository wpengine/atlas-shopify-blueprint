import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('<ProductCard />', () => {
  it('Render single product with title and price', () => {
    const product = {
      title: 'Quark Shirt',
      variants: {
        nodes: [
          {
            price: {
              amount: '20.0',
              currencyCode: 'USD',
              __typename: 'MoneyV2',
            },
          },
        ],
      },
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText('$20.00')).toBeVisible();
    expect(screen.getByText('Quark Shirt')).toBeVisible();
    expect(screen.getByTestId('product-img')).toBeVisible();
  });

  it('Render product on Sale', () => {
    const product = {
      title: 'Radiowave Shirt',
      variants: {
        nodes: [
          {
            price: {
              amount: '18.0',
              currencyCode: 'USD',
              __typename: 'MoneyV2',
            },
            compareAtPrice: {
              amount: '20.0',
              currencyCode: 'USD',
              __typename: 'MoneyV2',
            },
          },
        ],
      },
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText('$18.00')).toBeVisible();
    expect(screen.getByText('Radiowave Shirt')).toBeVisible();
    expect(screen.getByText('$20.00')).toBeVisible();
    expect(screen.getByTestId('product-img')).toBeVisible();
    expect(screen.getByText('Sale')).toBeVisible();
    expect(screen.getByTestId('compare-price')).toBeVisible();
  });
});
