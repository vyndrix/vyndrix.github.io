import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Button from "../button";

afterEach(cleanup);

describe("Button", () => {
  test("renders a button element", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeDefined();
  });

  test("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="#">Link</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeDefined();
  });

  test("applies static button classes", () => {
    render(<Button>Click me</Button>);
    const classes = screen.getByRole("button", { name: "Click me" }).getAttribute("class") ?? "";
    expect(classes).toContain("inline-flex");
    expect(classes).toContain("items-center");
    expect(classes).toContain("rounded-md");
    expect(classes).toContain("text-sm");
  });
});
