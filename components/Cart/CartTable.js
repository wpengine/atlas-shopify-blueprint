import React from 'react';
import {
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import styles from './CartTable.module.scss';
import Link from 'next/link';
import priceFormatter from '../../utilities/priceFormatter';

const CartTable = ({
  cartItems,
  setProductNotification,
  removeFromCart,
  updateCartQuantity,
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

  const handleUpdateQuantity = (product, id, quantityToUpdate) => {
    updateCartQuantity({
      variables: {
        cartId,
        lines: { id, quantity: quantityToUpdate },
      },
    })
      .then((res) => {
        const quantityAfterUpdate = res.data.cartLinesUpdate.cart.totalQuantity;

        if (quantityAfterUpdate === 0) {
          setProductNotification({
            message: `${product} has been removed from your cart.`,
            className: 'success',
          });
          return;
        }

        if (quantityAfterUpdate < quantityToUpdate) {
          setProductNotification({
            message:
              'The maximum amount available for this product has been added to the cart',
            className: 'error',
          });
        } else if (quantityAfterUpdate === quantityToUpdate) {
          setProductNotification({
            close,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setProductNotification({
          message: `There was an issue changing this item's quantity.`,
          className: 'error',
        });
      })
      .finally(() =>
        retrieveCart().then((response) => {
          setCartData(response.data.cart);
        })
      );
  };

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
                <td>{priceFormatter(item.cost.amountPerQuantity.amount)}</td>
                <td>
                  <div className={styles.quantity}>
                    <AiOutlineMinusCircle
                      size={24}
                      data-testid="decrease-button"
                      className={styles.clickableIcon}
                      onClick={() =>
                        handleUpdateQuantity(
                          product.title,
                          item.id,
                          item.quantity - 1
                        )
                      }
                    />
                    {item.quantity}
                    <AiOutlinePlusCircle
                      size={24}
                      data-testid="increase-button"
                      className={styles.clickableIcon}
                      onClick={() =>
                        handleUpdateQuantity(
                          product.title,
                          item.id,
                          item.quantity + 1
                        )
                      }
                    />
                  </div>
                </td>
                <td className={styles.hideOnMobile}>
                  {priceFormatter(item.cost.totalAmount.amount)}
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
