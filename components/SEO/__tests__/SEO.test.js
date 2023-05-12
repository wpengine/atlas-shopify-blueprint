import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SEO from "../SEO";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

describe("<SEO />", () => {
  it("Render SEO with all requirements", () => {
    const props = {
      seo: {
        title: "Atlas Shopify",
        description: "SUPER-powered Headless eCommerce",
      },
    };

    render(<SEO title={props.seo.title} description={props.seo.description} />);

    expect(document.title).toBe("Atlas Shopify");
    expect(document.querySelector('meta[name="description"]').content).toBe(
      "SUPER-powered Headless eCommerce"
    );
  });
});
