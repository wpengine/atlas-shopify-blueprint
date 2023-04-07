import { Container } from '../Container';
import classNames from 'classnames';
import styles from './PromoSection.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

const Cta = ({ ctaLink = null, ctaLabel = null }) => {
  return (ctaLink && ctaLabel) ? (
    <div className={'buttonContainer'}>
      <Link href={ctaLink}>
        <a className={'button'}>{`${ctaLabel}`}</a>
      </Link>
    </div>
  ) : null;
};

const PromoSection = ({ ctaLink = null, ctaLabel = null }) => {
  return (
    <div className={`section ${styles.component}`}>
      <Container>
        <h1 className={cx(styles.title)}>Promo Banners</h1>
        <div className={cx(styles.description)}>You can use this component to promote articles or specific products. And optionally add a CTA below.</div>
        <Cta ctaLink={ctaLink} ctaLabel={ctaLabel} />
      </Container>
    </div>
  );
};

export default PromoSection;
