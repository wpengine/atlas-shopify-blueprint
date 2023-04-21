import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { CartQuickView } from "./CartQuickView";

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
  cartItems: [
    {
      quantity: 1,
      cost: {
        amountPerQuantity: {
          amount: "35.0",
        },
        totalAmount: {
          amount: "35.0",
        },
      },
      merchandise: {
        id: "gid://shopify/ProductVariant/44876466749743",
        title: "Blue",
        product: {
          id: "gid://shopify/Product/8235118264623",
          handle: "triangulum-hoodie",
          featuredImage: {
            altText: null,
            url: "https://cdn.shopify.com/s/files/1/0695/2478/3407/products/hoodie-purple.jpg?v=1681383898",
          },
          title: "Triangulum Hoodie",
        },
      },
    },
  ],
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
