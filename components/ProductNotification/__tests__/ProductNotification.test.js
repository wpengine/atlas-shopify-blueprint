import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductNotification from '../ProductNotification';

describe('<ProductNotification />', () => {
  test('Shows a message and View Cart', async () => {
    render(
      <ProductNotification productNotification={{ message: 'Success' }} />
    );

    expect(screen.getByText(/Success/i)).toBeVisible();
    expect(screen.getByText(/View Cart/i)).toBeVisible();
  });

  test('Shows a message but not View Cart', async () => {
    render(
      <ProductNotification
        productNotification={{ message: 'Removed' }}
        cartPage
      />
    );

    expect(screen.getByText(/Removed/i)).toBeVisible();
    expect(screen.queryByText(/View Cart/i)).toBeNull();
  });
});
