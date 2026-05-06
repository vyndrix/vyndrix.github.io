import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { render } from "@/tests/utils";
import Screen from "../screen";

afterEach(cleanup);

describe("Screen", () => {
  test("renders main element", () => {
    render(
      <Screen>
        <p>content</p>
      </Screen>,
    );
    expect(screen.getByRole("main")).toBeDefined();
  });

  test("applies static main classes", () => {
    render(
      <Screen>
        <p>content</p>
      </Screen>,
    );
    const classes = screen.getByRole("main").getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("justify-center");
  });

  test("applies static motion div classes", () => {
    render(
      <Screen>
        <p>content</p>
      </Screen>,
    );
    const main = screen.getByRole("main");
    const classes = main.firstElementChild?.getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-col");
    expect(classes).toContain("gap-6");
    expect(classes).toContain("p-4");
  });
});
