import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Post } from '../../Post';

describe('<Post />', () => {
  it('Render Post with title, link and formated date', () => {
    const postTitle = 'Sale';
    let date = new Date();
    const timeformat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
    };

    render(<Post uri="https://someurl.com" title={postTitle} date={date} />);

    expect(
      screen.getByText(`${date.toLocaleDateString('en-US', timeformat)}`)
    ).toBeVisible();
    expect(screen.getByText('Sale')).toBeVisible();
  });

  it('Render Post with image', async () => {
    render(
      <Post
        uri="https://someurl.com"
        featuredImage={{
          sourceUrl: 'https://some-url',
          altText: 'my-test-image',
          mediaDetails: { width: 200, height: 200 },
        }}
      />
    );

    const image = await screen.getByAltText('my-test-image');

    expect(image).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    );
  });
});
