import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { PromoSection } from '..';

describe('<PromoSection />', () => {
  it('displays the CTA button', () => {
    render(<PromoSection showCta ctaLabel="Foo" ctaLink="/foo" />);

    expect(screen.getByText(/Foo/i)).toBeInTheDocument();
  });

  it('does not display the CTA button', () => {
    render(<PromoSection ctaLabel="Foo" ctaLink="/foo" />);

    expect(screen.queryByText('Foo')).toBeNull();
  });
});
