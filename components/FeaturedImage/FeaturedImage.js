import { gql } from '@apollo/client';
import Image from 'next/image';

/**
 * Render the FeaturedImage component.
 *
 * @typedef {Object} Image
 * @property {string} altText
 * @property {string} url
 *
 * @param {Props} props The props object.
 * @param {Image} props.image The Image object.
 * @param {string | number} props.width The width value.
 * @param {string | number} props.height The height value.
 * @param {string} props.className The className value.
 * @param {boolean} props.priority The priority value.
 * @param {string} props.layout The layout value.
 * @param {...string} props.props The image parameters value.
 *
 * @returns {React.ReactElement} The FeatureImage components.
 */

export default function FeaturedImage({
  image,
  width,
  height,
  className,
  priority,
  layout,
  ...props
}) {
  const src = image?.sourceUrl;
  const { altText } = image || '';

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;
  layout = layout ?? 'fill';

  return src && width && height ? (
    <figure className={className}>
      <Image
        src={src}
        alt={altText}
        layout={layout}
        width={width}
        height={height}
        priority={priority}
        data-testid="featureImage-header"
        {...props}
      />
    </figure>
  ) : null;
}

FeaturedImage.fragments = {
  entry: gql`
    fragment FeaturedImageFragment on NodeWithFeaturedImage {
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  `,
};
