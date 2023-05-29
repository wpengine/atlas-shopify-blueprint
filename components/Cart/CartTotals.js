import React from 'react';
import styles from './CartTotals.module.scss';
import classNames from 'classnames';
import priceFormatter from '../../utilities/priceFormatter';

/**
 * Render the CartTotals component.
 *
 * @param {Props} props The props object.
 * @param {string} props.cartSubTotal The cart subtotal value.
 * @param {string} props.cartTotal The cart total value.
 * @param {string} props.checkoutUrl The checkout url link.
 *
 * @returns {React.ReactElement} The CartTotals component.
 */

const cx = classNames.bind(styles);

const CartTotals = ({ cartSubTotal, cartTotal, checkoutUrl }) => {
  return (
    <div className={styles.cartTotals}>
      <h3>Summary</h3>

      <table>
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>{priceFormatter(cartSubTotal)}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{priceFormatter(cartTotal)}</td>
          </tr>
        </tbody>
      </table>
      <a
        href={checkoutUrl}
        className={cx(styles.button, styles.checkoutButton)}
        data-testid="checkout-btn"
      >
        Checkout
      </a>
    </div>
  );
};

export default CartTotals;
