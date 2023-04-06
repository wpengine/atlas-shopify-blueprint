import React from 'react';
import TestimonialCard from './TestimonialCard';
import { Container } from '../Container';
import classNames from 'classnames';
import styles from './TestimonialsSection.module.scss';

const cx = classNames.bind(styles);

const TestimonialsSection = () => {
  return (
    <div className={cx(['section', styles.component])}>
      <Container>
        <h2>Customer Testimonials</h2>
        <div className={cx(styles.section)}>
          <TestimonialCard
            image='https://demo.studiopress.com/page-builder/spend/eso_spend_customer_testimonial_1.jpg'
            blurb='I can sync all my BigCommerce products into WordPress and catch all updates automatically. Now I can create content in WordPress with BigCommerce products!'
            author='Anne Alpine / Nature First'
            styles={styles}
          />
          <TestimonialCard
            image='https://demo.studiopress.com/page-builder/spend/eso_spend_customer_testimonial_2.jpg'
            blurb='Once my BigCommerce data is synced, I can use GraphQL to access my WordPress and Product data side by side in this Faust.js template with eCommerce components!'
            author='Riley Glacier / Snap Crackle'
            styles={styles}
          />
        </div>
      </Container>
    </div>
  );
};

export default TestimonialsSection;
