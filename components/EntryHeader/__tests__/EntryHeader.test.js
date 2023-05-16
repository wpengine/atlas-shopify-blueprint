import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EntryHeader from '../EntryHeader';

describe('<EntryHeader />', () => {
  it('Display title and subtitle with no image', () => {
    render(
      <EntryHeader
        title="Shopping"
        subTitle="Shop your Shopify products with WordPress and WPGraphQL"
      />
    );

    expect(screen.getByText(/Shopping/i)).toBeVisible();
    expect(
      screen.getByText(
        /Shop your Shopify products with WordPress and WPGraphQL/i
      )
    ).toBeVisible();
    expect(screen.queryByTestId('featureImage-header')).not.toBeInTheDocument();
  });

  it('Display title and subtitle with the image', async () => {
    render(
      <EntryHeader
        title="Shopping"
        subTitle="Shop your Shopify products with WordPress and WPGraphQL"
        image={{
          sourceUrl: 'https://some-url',
          altText: 'my-test-image',
          mediaDetails: { width: 200, height: 200 },
        }}
      />
    );

    const image = await screen.getByAltText('my-test-image');

    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fsome-url&w=3840&q=75'
    );
    expect(screen.getByText(/Shopping/i)).toBeVisible();
    expect(
      screen.getByText(
        /Shop your Shopify products with WordPress and WPGraphQL/i
      )
    ).toBeVisible();
  });
});
