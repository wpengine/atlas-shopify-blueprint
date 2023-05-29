import classNames from 'classnames';
import styles from './ProductNotification.module.scss';

/**
 * Render the ProductNotification component.
 *
 * @param {Props} props The props object.
 * @param {Object.<string, string>} props.productNotification The state of products displayed to the user.
 * @param {string} props.cartPage The cartPage value.
 *
 * @returns {React.ReactElement} The ProductNotification component.
 */

const cx = classNames.bind(styles);

const ProductNotification = ({ productNotification, cartPage }) => {
  console.log(cartPage);
  return productNotification.close ? null : (
    <div
      className={cx(styles.notification, styles[productNotification.className])}
    >
      <div className={styles.message}>{productNotification.message}</div>
      {!cartPage && <a href="/cart">View cart</a>}
    </div>
  );
};

export default ProductNotification;
