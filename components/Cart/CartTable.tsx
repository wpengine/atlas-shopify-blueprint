import React from "react"
import styles from './CartTable.module.scss'

const CartTable = () => {
    return (
      <div className={styles.cartTable}>
        <table>
          <thead>
            <tr>
              <th className={styles.hideOnMobile}></th>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th className={styles.hideOnMobile}>Quantity</th>
              <th className={styles.hideOnMobile}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {/* render items */}
          </tbody>
        </table>
      </div>
    );
  };


export default CartTable
