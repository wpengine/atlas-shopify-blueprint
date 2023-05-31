import Link from 'next/link';
import styles from './CtaButton.module.scss';

/**
 * Render the CtaButton component.
 *
 * @param {Props} props The props object.
 * @param {string} props.ctaLink The url when using the Link component.
 * @param {string} props.ctaLabel The button label.
 * @param {string} props.disabled Whether the button is disabled or not.
 * @param {(newValue: string) => void} props.ctaClick The onClick handler. Function to attach when the button is clicked.
 *
 * @returns {React.ReactElement} The CtaButton component.
 */

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
