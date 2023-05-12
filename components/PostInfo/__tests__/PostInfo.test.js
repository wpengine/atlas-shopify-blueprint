import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PostInfo from "../PostInfo";

describe("<PostInfo />", () => {
  it("Render PostInfo with all requirements", () => {
    const postInfoAuthor = "foo";
    const postInfoSubTitle = "-30%";
    let date = new Date();
    const timeformat = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    };

    render(
      <PostInfo
        date={date}
        author={postInfoAuthor}
        subTitle={postInfoSubTitle}
      />
    );

    expect(
      screen.getByText(`${date.toLocaleDateString("en-US", timeformat)}`)
    ).toBeVisible();
    expect(screen.getByText("by foo")).toBeVisible();
    expect(screen.getByText("-30%")).toBeVisible();
  });
});
