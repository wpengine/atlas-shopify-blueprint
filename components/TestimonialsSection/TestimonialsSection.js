import TestimonialCard from './TestimonialCard';
import { Container } from '../Container';
import styles from './TestimonialsSection.module.scss';

const TestimonialsSection = () => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1>Customer Testimonials</h1>
        <div className="section">
          <TestimonialCard
            image="https://demo.studiopress.com/page-builder/spend/eso_spend_customer_testimonial_1.jpg"
            blurb="I can query all my Shopify products from Faust and create content with WordPress!"
            author="Anne Alpine / Nature First"
            styles={styles}
          />
          <TestimonialCard
            image="https://demo.studiopress.com/page-builder/spend/eso_spend_customer_testimonial_2.jpg"
            blurb="I can use GraphQL to access my WordPress and Product data side by side in this Faust.js template with eCommerce components!"
            author="Riley Glacier / Snap Crackle"
            styles={styles}
          />
        </div>
      </Container>
    </div>
  );
};

export default TestimonialsSection;
