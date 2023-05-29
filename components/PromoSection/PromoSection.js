import { Container } from '../Container';
import { CtaButton } from '../CtaButton';
import styles from './PromoSection.module.scss';

/**
 * Render the PromoSection component.
 *
 * @param {Props} props The props object.
 * @param {boolean} props.showCta The showCta value.
 * @param {string} props.ctaLink The ctaLink value.
 * @param {string} props.ctaLabel The ctaLabel value.
 * @param {string} props.title The title value.
 * @param {string} props.description The description value.
 *
 * @returns {React.ReactElement} The PromoSection component.
 */

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
