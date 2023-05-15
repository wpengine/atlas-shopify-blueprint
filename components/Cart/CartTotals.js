import React from 'react';
import styles from './CartTotals.module.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

const CartTotals = ({ cartSubTotal, cartTotal, checkoutUrl }) => {
  return (
    <div className={styles.cartTotals}>
      <h3>Summary</h3>

      <table>
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>
              <span>$</span>
              {cartSubTotal}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <span>$</span>
              {cartTotal}
            </td>
          </tr>
        </tbody>
      </table>
      <a
        href={checkoutUrl}
        className={cx(styles.button, styles.checkoutButton)}
      >
        Checkout
      </a>
    </div>
  );
};

export default CartTotals;
