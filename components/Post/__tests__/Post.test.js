import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Post } from '../../Post';

describe('<Post />', () => {
  it('Render Post with title and link', () => {
    const postTitle = 'Sale';
    const author = 'foo';
    const content = 'lorem';

    render(
      <Post
        uri="https://someurl.com"
        title={postTitle}
        author={author}
        content={content}
      />
    );

    expect(screen.getByText('Sale')).toBeVisible();
    expect(screen.getByText('by foo')).toBeVisible();
    expect(screen.getByText('lorem')).toBeVisible();
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
