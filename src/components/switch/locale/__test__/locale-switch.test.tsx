import { render } from "@/tests/utils";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Switch } from "../..";

describe("Locale Switch", () => {
  test("toggles locale between EN and PT", () => {
    render(<Switch.Locale />);

    screen.getByTestId("locale-en");
    expect(screen.queryByTestId("locale-pt")).toBeNull();

    fireEvent.click(screen.getByRole("button"));

    screen.getByTestId("locale-pt");
  });
});
