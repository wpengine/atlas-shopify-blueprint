import Link from 'next/link';
import styles from './CtaButton.module.scss';

/**
 * Render the CtaButton component.
 *
 * @param {Props} props The props object.
 * @param {string} props.ctaLink (Optional) If provided, the browser will be directed to this URL when the button is clicked.
 * @param {string} props.ctaLabel (Optional) The button's label.
 * @param {string} props.disabled Whether the button is disable or not.
 * @param {(newValue: string) => void} props.ctaClick The onClick handler. Function to attach when the button is clicked.
 *
 * @returns {React.ReactElement} The CtaButton component.
 */

const CtaButton = ({
  ctaLink = null,
  ctaLabel = null,
  disabled,
  ctaClick,
  cartId = null,
}) => {
  return ctaLink ? (
    <div className={styles.buttonContainer} onClick={ctaClick}>
      <Link href={ctaLink}>
        <a className={styles.button}>{ctaLabel}</a>
      </Link>
    </div>
  ) : (
    <div className={styles.buttonContainer}>
      <button
        disabled={disabled}
        className={styles.button}
        onClick={ctaClick}
        data-cart-id={cartId}
      >
        {ctaLabel}
      </button>
    </div>
  );
};

export default CtaButton;
