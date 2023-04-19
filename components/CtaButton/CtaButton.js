import Link from 'next/link';
import styles from './CtaButton.module.scss';

const CtaButton = ({ ctaLink = null, ctaLabel = null }) => {
  return (
    <div className={styles.buttonContainer}>
      <Link href={ctaLink}>
        <a className={styles.button}>{ctaLabel}</a>
      </Link>
    </div>
  );
};

export default CtaButton;
