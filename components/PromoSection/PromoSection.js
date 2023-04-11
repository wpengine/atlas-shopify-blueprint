import { Container } from '../Container';
import { CtaButton } from '../CtaButton';
import styles from './PromoSection.module.scss';

const PromoSection = ({ showCta = false }) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1 className={styles.title}>Promo Banners</h1>
        <div className={styles.description}>You can use this component to promote articles or specific products. And optionally add a CTA below.</div>
        <CtaButton showCta={showCta} ctaLink='/about' ctaLabel='About' />
      </Container>
    </div>
  );
};

export default PromoSection;
