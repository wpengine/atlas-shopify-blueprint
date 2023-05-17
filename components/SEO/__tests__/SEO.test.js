import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SEO from '../SEO';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

describe('<SEO />', () => {
  it('Render SEO with all requirements', () => {
    const props = {
      seo: {
        title: 'Atlas Shopify',
        description: 'SUPER-powered Headless eCommerce',
        imageUrl: 'https://some-img-url.com',
        url: 'https://some-url.com',
      },
    };

    render(
      <SEO
        title={props.seo.title}
        description={props.seo.description}
        imageUrl={props.seo.imageUrl}
        url={props.seo.url}
      />
    );

    expect(document.title).toBe('Atlas Shopify');
    expect(document.querySelector('meta[name="description"]').content).toBe(
      'SUPER-powered Headless eCommerce'
    );
    expect(document.querySelector('meta[property="og:image"]').content).toBe(
      'https://some-img-url.com'
    );
    expect(document.querySelector('meta[property="og:url"]').content).toBe(
      'https://some-url.com'
    );
  });

  it('Render empty SEO', () => {
    render(<SEO />);

    expect(document.title).toHaveLength(0);
    expect(
      document.querySelector('meta[name="description"]')
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('meta[property="og:image"]')
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('meta[property="og:url"]')
    ).not.toBeInTheDocument();
  });
});
