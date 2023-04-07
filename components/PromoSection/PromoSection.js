import { Container } from '../Container';
import styles from './PromoSection.module.scss';
import Link from 'next/link';

const Cta = ({ ctaLink = null, ctaLabel = null }) => {
  return (ctaLink && ctaLabel) ? (
    <div className='buttonContainer'>
      <Link href={ctaLink}>
        <a className='button'>{`${ctaLabel}`}</a>
      </Link>
    </div>
  ) : null;
};

const PromoSection = ({ showCta = false }) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1 className={styles.title}>Promo Banners</h1>
        <div className={styles.description}>You can use this component to promote articles or specific products. And optionally add a CTA below.</div>
        { showCta && <Cta ctaLink='/about' ctaLabel='About' /> }
      </Container>
    </div>
  );
};

export default PromoSection;
