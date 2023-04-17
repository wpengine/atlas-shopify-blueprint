import empty from "../data/stubs/cart/empty";
import single from "../data/stubs/cart/single";

// This is temporary, replace with query
const CART_STATE_KEY = "cart-state";
const useStub = (state: string | null) => {
  if (state === "single") {
    return single;
  }

  if (state === "multiple") {
    return single;
  }

  return empty;
};

const useCart = () => {
  const cart = useStub(window.localStorage.getItem(CART_STATE_KEY));
  // const cartId = getCartIdFromCookie();
  // const {data: cart, loading, error} = useQuery(CartQuery, {id: cartId});

  return { cart, loading: false, error: null };
};

export default useCart;
