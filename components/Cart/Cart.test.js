import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Cart from "./Cart";
import single from "../../data/stubs/cart/single";

const emptyCartMock = {
  cartSubTotal: 0,
  cartCount: 0,
  cartItems: [],
  isCartEmpty: true,
  checkoutUrl: "",
};

const cartWithItemsMock = {
  ...emptyCartMock,
  cartSubTotal: 12,
  cartCount: 1,
  isCartEmpty: false,
  cartItems: single.cart.lines.nodes,
};

describe("<Cart />", () => {
  it("displays the empty cart state", () => {
    render(<Cart cart={emptyCartMock} />);

    expect(screen.getByText(/You have no items in cart/i)).toBeVisible();
  });

  it("displays the items in cart", () => {
    render(<Cart cart={cartWithItemsMock} />);

    expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
  });
});
