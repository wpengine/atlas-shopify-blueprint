import Link from 'next/link';
import styles from './CtaButton.module.scss';

const CtaButton = ({ ctaLink = null, ctaLabel = null, ctaClick }) => {
  return (
    <div className={styles.buttonContainer} onClick={ctaClick}>
      {ctaLink ? (
        <Link href={ctaLink}>
          <a className={styles.button}>{ctaLabel}</a>
        </Link>
      ) : (
        <p className={styles.button}>{ctaLabel}</p>
      )}
    </div>
  );
};

export default CtaButton;
