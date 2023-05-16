import React from 'react';
import {
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import styles from './CartTable.module.scss';
import Link from 'next/link';

const CartTable = ({
  cartItems,
  setProductNotification,
  removeFromCart,
  cartId,
  setCartData,
  retrieveCart,
}) => {
  const handleDelete = (cartId, lineId, product) => {
    removeFromCart({
      variables: {
        cartId,
        lineIds: [lineId],
      },
    })
      .then(() =>
        setProductNotification({
          message: `${product} has been removed from your cart.`,
          className: 'success',
        })
      )
      .catch((err) => {
        console.error(err);
        setProductNotification({
          message: `There was an issue removing this item from the cart.`,
          className: 'error',
        });
      })
      .finally(() =>
        retrieveCart().then((response) => {
          setCartData(response.data.cart);
        })
      );
  };

  // TODO: implement these in https://wpengine.atlassian.net/browse/TITAN-298
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
          {cartItems?.map?.((item) => {
            const product = item.merchandise.product;
            const image = item.merchandise.image;

            return (
              <tr key={`cart-item-${product.handle}`}>
                <td>
                  <AiOutlineCloseCircle
                    data-testid="remove-button"
                    size={24}
                    className={styles.clickableIcon}
                    onClick={() => handleDelete(cartId, item.id, product.title)}
                  />
                </td>
                <td className={styles.hideOnMobile}>
                  <img
                    src={image.url}
                    alt={image.altText}
                    className={styles.cartImage}
                    loading="lazy"
                  />
                </td>
                <td>
                  <Link href={`/product/${product.handle}`}>
                    {product.title}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
