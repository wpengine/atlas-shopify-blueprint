import React from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import styles from "./CartTable.module.scss";
import Link from "next/link";

const CartTable = ({ cartItems }) => {
  const handleClickDelete = () => {};
  const handleClickIncreaseQuantity = () => {};
  const handleClickDecreaseQuantity = () => {};

  return (
    <div className={styles.cartTable}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className={styles.hideOnMobile}></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className={styles.hideOnMobile}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={`cart-item-${item.merchandise.product.handle}`}>
              <td>
                <AiOutlineCloseCircle
                  size={24}
                  className={styles.clickableIcon}
                  onClick={handleClickDelete}
                />
              </td>
              <td className={styles.hideOnMobile}>
                <img
                  src={item.merchandise.product.featuredImage.url}
                  alt={item.merchandise.product.featuredImage.altText}
                  className={styles.cartImage}
                  loading="lazy"
                />
              </td>
              <td>
                <Link href={`/product/${item.merchandise.product.handle}`}>
                  {item.merchandise.product.title}
                </Link>
              </td>
              <td>
                <span>$</span>
                {item.cost.amountPerQuantity.amount}
              </td>
              <td>
                <div className={styles.quantity}>
                  <AiOutlineMinusCircle
                    size={24}
                    className={styles.clickableIcon}
                    onClick={handleClickDecreaseQuantity}
                  />
                  {item.quantity}
                  <AiOutlinePlusCircle
                    size={24}
                    className={styles.clickableIcon}
                    onClick={handleClickIncreaseQuantity}
                  />
                </div>
              </td>
              <td className={styles.hideOnMobile}>
                <span>$</span>
                {item.cost.totalAmount.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
