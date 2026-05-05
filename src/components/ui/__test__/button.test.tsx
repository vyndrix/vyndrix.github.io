import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Button from "../button";

afterEach(cleanup);

const MockButton = () => <Button>Click me</Button>;

describe("Button", () => {
  test("renders a button element", () => {
    render(<MockButton />);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });

  test("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="#">Link</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Link" })).toBeDefined();
  });

  test("applies static button classes", () => {
    render(<MockButton />);
    const classes = screen.getByRole("button", { name: "Click me" }).getAttribute("class") ?? "";
    expect(classes).toContain("inline-flex");
    expect(classes).toContain("items-center");
    expect(classes).toContain("rounded-md");
    expect(classes).toContain("text-sm");
  });
});
