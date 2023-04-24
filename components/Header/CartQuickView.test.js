import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { CartQuickView } from "./CartQuickView";
import single from "../../data/stubs/cart/single";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ pathname: "/product/test-product" }),
}));

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

describe("<CartQuickView />", () => {
  it("displays the empty cart state on hover", () => {
    render(<CartQuickView cart={emptyCartMock} styles={{}} />);

    fireEvent.mouseOver(screen.getByTitle(/View your shopping cart/i));

    expect(screen.getByText(/You have no items in cart/i)).toBeVisible();
  });

  it("displays the items in cart", () => {
    render(<CartQuickView cart={cartWithItemsMock} styles={{}} />);

    fireEvent.mouseOver(screen.getByTitle(/View your shopping cart/i));

    expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
  });
});
