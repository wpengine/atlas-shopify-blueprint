import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { NavigationMenu } from "..";

describe("<NavigationMeny />", () => {
  it("Rendering Navigation Menu items", () => {
    const navData = [
      {
        id: "cG9zdDo0NzUx",
        path: "/",
        label: "Home",
        __typename: "MenuItem",
        menu: {
          node: {
            name: "main-menu",
          },
        },
      },
      {
        id: "cG9zdDo0NzU54",
        path: "/about",
        label: "About",
        __typename: "MenuItem",
      },
      {
        id: "cG9zdDo0NzU12",
        path: "/shop",
        label: "Shop",
        __typename: "MenuItem",
      },
    ];

    render(<NavigationMenu menuItems={navData} />);

    const menu = screen.getByLabelText("main-menu menu");
    const menuElements = within(menu).getAllByTestId("nav-element");

    expect(menuElements).toHaveLength(3);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
