import Link from 'next/link';
import styles from './CtaButton.module.scss';

const CtaButton = ({ ctaLink = null, ctaLabel = null, disabled, ctaClick }) => {
  return ctaLink ? (
    <div className={styles.buttonContainer} onClick={ctaClick}>
      <Link href={ctaLink}>
        <a className={styles.button}>{ctaLabel}</a>
      </Link>
    </div>
  ) : (
    <div className={styles.buttonContainer}>
      <button disabled={disabled} className={styles.button} onClick={ctaClick}>
        {ctaLabel}
      </button>
    </div>
  );
};

export default CtaButton;
