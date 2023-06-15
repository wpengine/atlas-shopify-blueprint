import React from 'react';
import {
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import styles from './CartTable.module.scss';
import Link from 'next/link';
import priceFormatter from '../../utilities/priceFormatter';

/**
 * Render the CartTable component.
 *
 * @typedef {Object} Query
 * @property {string} cartId - The cart token.
 *
 * @typedef {Object} Mutation
 * @property {string} cartId - The cart token.
 * @property {Array<string>} - The line items of the cart.
 *
 * @param {Props} props The props object.
 * @param {Array<string>} props.cartItems The cart items list. All items that are in the cart.
 * @param {(Object<string, string>) => void} props.setProductNotification The function that displays the product
 * notification component when the user performs cart operations.
 * @param {Mutation} props.removeFromCart The mutation to remove item from cart.
 * @param {Mutation} props.updateCartQuantity The mutation to update cart quantity.
 * @param {string} props.cartId The cart token.
 * @param {string} props.setCartData The state of cart data. Used to set cart data after adding, changing quantity, removing from cart.
 * @param {Query} props.retrieveCart The query to retrieve Cart.
 *
 * @returns {React.ReactElement} The CartTable component.
 */

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
        const quantityAfterUpdate =
          res.data.cartLinesUpdate.cart.lines.nodes.find(
            (line) => line.id === id
          )?.quantity;

        if (!quantityAfterUpdate) {
          setProductNotification({
            message: `${product} has been removed from your cart.`,
            className: 'success',
          });
          return;
        }

        if (quantityAfterUpdate < quantityToUpdate) {
          setProductNotification({
            message:
              'The maximum amount available for this product has been added to the cart.',
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
            <th className={styles.hideOnMobile}></th>
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
              <tr key={`cart-item-${item.id}`}>
                <td className={styles.hideOnMobile}>
                  <AiOutlineCloseCircle
                    data-testid={`remove-button-${item.id}`}
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
                <td aria-label="quantity-section">
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
                    <span
                      aria-label={`item-quantity-${item.quantity}-${item.id}`}
                    >
                      {item.quantity}
                    </span>
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
