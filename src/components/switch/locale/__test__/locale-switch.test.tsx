import { render } from "@/tests/utils";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Switch } from "../..";

describe("Locale Switch", () => {
  test("should toggle locale", () => {
    render(<Switch.Locale />);

    const button = screen.getByRole("button");
    expect(button).toBeDefined();

    const span = screen.getByText("EN");
    expect(span).toBeDefined();
    expect(
      span.classList.contains("absolute") &&
        span.classList.contains("h-[1.2rem]") &&
        span.classList.contains("w-[1.2rem]"),
    ).toBeTruthy();

    fireEvent.click(button);

    const spanPT = screen.getByText("PT");
    expect(spanPT).toBeDefined();
    expect(
      spanPT.classList.contains("absolute") &&
        spanPT.classList.contains("h-[1.2rem]") &&
        spanPT.classList.contains("w-[1.2rem]"),
    ).toBeTruthy();
  });
});
