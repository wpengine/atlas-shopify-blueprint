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
