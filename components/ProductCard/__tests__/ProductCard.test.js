import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('<ProductCard />', () => {
  it('Render single product with title and price', () => {
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

    render(<ProductCard product={product} />);

    expect(screen.getByText('$18.0')).toBeVisible();
    expect(screen.getByText('Radiowave Shirt')).toBeVisible();
    expect(screen.getByTestId('img')).toBeVisible();
  });
});
