import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductSection from "../ProductSection";

describe("<ProductSection />", () => {
  it("Render ProductSection with product and heading", () => {
    const product = {
      title: "Radiowave Shirt",
      variants: {
        nodes: [
          {
            price: {
              amount: "18.0",
            },
          },
        ],
      },
    };
    const heading = "Latest Products";

    render(<ProductSection heading={heading} products={[product]} />);

    expect(screen.getByText("$18.0")).toBeVisible();
    expect(screen.getByText("Radiowave Shirt")).toBeVisible();
    expect(screen.getByTestId("img")).toBeVisible();
    expect(screen.getByText("Latest Products")).toBeVisible();
  });
});
