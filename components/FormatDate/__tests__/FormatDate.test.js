import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import { PostInfo } from "../../PostInfo";
import FormatDate from "../FormatDate";

describe("<FormatDate />", () => {
  it("Display date in correct format", () => {
    let date = new Date();
    const timeformat = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    };

    render(<FormatDate date={date} />);

    expect(
      screen.getByText(`${date.toLocaleDateString("en-US", timeformat)}`)
    ).toBeVisible();
  });
});
