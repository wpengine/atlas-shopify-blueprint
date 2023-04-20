import empty from "../data/stubs/cart/empty";
import single from "../data/stubs/cart/single";
import multiple from "../data/stubs/cart/multiple";

// This is temporary, replace with query
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
  const {cart} = useStub(global?.window?.localStorage.getItem(CART_STATE_KEY));
  return { cart };
};

export default useCart;
