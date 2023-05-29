/**
 * Render the TestimonialCard component.
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @param {Props} props The props object.
 * @param {Image} props.image The image object.
 * @param {string} props.blurb The blurb value.
 * @param {string} props.author The author value.
 * @param {string} props.styles The styles value.
 *
 * @returns {React.ReactElement} The TestimonialCard component.
 */

const TestimonialCard = ({ image, blurb, author, styles }) => {
  return (
    <div className={styles.testimonialCard}>
      <figure>
        <img src={image} alt="Customer Testimonial" />
      </figure>
      <p style={{ fontStyle: 'italic' }}>{blurb}</p>
      <p style={{ fontWeight: 'bold' }}>{author}</p>
    </div>
  );
};

export default TestimonialCard;
