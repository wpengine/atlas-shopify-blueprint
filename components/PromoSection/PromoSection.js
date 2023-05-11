import { Container } from '../Container';
import { CtaButton } from '../CtaButton';
import styles from './PromoSection.module.scss';

const PromoSection = ({
  showCta = false,
  ctaLink = null,
  ctaLabel = null,
  title = null,
  description = null,
}) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.description}>{description}</div>
        {showCta && <CtaButton ctaLink={ctaLink} ctaLabel={ctaLabel} />}
      </Container>
    </div>
  );
};

export default PromoSection;
