import empty from "../data/stubs/cart/empty";
import single from "../data/stubs/cart/single";
import multiple from "../data/stubs/cart/multiple";

// This is temporary, replace with query
// Usage: in your DevTools type `localStorage.setItem('cart-state', 'single')`
const CART_STATE_KEY = "cart-state";
const useStub = (state) => {
  if (state === "single") {
    return single;
  }

  if (state === "multiple") {
    return multiple;
  }

  return empty;
};

const useCart = () => {
  const { cart } = useStub(global.window?.localStorage.getItem(CART_STATE_KEY));

  const cartItems = cart.lines.nodes ?? [];
  const cartCount = cartItems.length;
  const isCartEmpty = cartCount === 0;
  const cartTotal = cart.cost?.totalAmount.amount ?? 0;
  const cartSubTotal = cart.cost?.subtotalAmount.amount ?? 0;
  const checkoutUrl = cart.checkoutUrl;

  return {
    cartItems,
    cartCount,
    isCartEmpty,
    cartTotal,
    cartSubTotal,
    checkoutUrl,
  };
};

export default useCart;
