import { MockedProvider } from "@apollo/react-testing";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductList } from ".";
import "@testing-library/jest-dom";
import { GET_PRODUCTS } from "../../queries/Products";
import productsStub from "../../data/stubs/products";

describe("<ProductList />", () => {
  test("Rendering list of products", async () => {
    const productsMock = {
      request: {
        query: GET_PRODUCTS,
      },
      result: productsStub,
    };
    render(
      <MockedProvider mocks={[productsMock]} addTypename={true}>
        <ProductList />
      </MockedProvider>
    );
    expect(screen.getByTestId("loading")).toBeVisible();
    await waitFor(() => {
      expect(screen.getAllByRole("listitem").length).toEqual(
        productsStub.data.products.nodes.length
      );
    });
  });
});
