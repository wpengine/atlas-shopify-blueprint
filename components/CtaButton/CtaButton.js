import Link from 'next/link';
import styles from './CtaButton.module.scss';

/**
 * Render the CtaButton component.
 *
 * @param {Props} props The props object.
 * @param {string} props.ctaLink The button link value.
 * @param {string} props.ctaLabel The button label value.
 * @param {string} props.disabled The disabled parameter value.
 * @param {(newValue: string) => void} props.ctaClick The onClick handler. Used for: Adding an item to a card, displaying product information.
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
