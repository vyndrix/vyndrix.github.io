import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Essay from "../essay";

afterEach(cleanup);

const MockEssay = () => (
  <Essay>
    <Essay.Header>
      <Essay.Title>My Essay</Essay.Title>
      <Essay.Subtitle>Subtitle text</Essay.Subtitle>
    </Essay.Header>
    <Essay.Content>Body text</Essay.Content>
  </Essay>
);

describe("Essay", () => {
  test("renders as article element", () => {
    render(<MockEssay />);
    expect(screen.getByRole("article")).toBeDefined();
  });

  test("Essay.Header renders a header element", () => {
    render(<MockEssay />);
    expect(screen.getByRole("heading", { level: 3 }).closest("header")).toBeDefined();
  });

  test("Essay.Title renders h3", () => {
    render(<MockEssay />);
    expect(screen.getByRole("heading", { level: 3 })).toBeDefined();
  });

  test("Essay.Subtitle renders h5", () => {
    render(<MockEssay />);
    expect(screen.getByRole("heading", { level: 5 })).toBeDefined();
  });

  test("Essay.Content renders a p element", () => {
    render(<MockEssay />);
    expect(screen.getByText("Body text").tagName).toBe("P");
  });

  test("applies static article classes", () => {
    render(<MockEssay />);
    const classes = screen.getByRole("article").getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-col");
    expect(classes).toContain("gap-2");
  });

  test("applies static content classes", () => {
    render(<MockEssay />);
    const classes = screen.getByText("Body text").getAttribute("class") ?? "";
    expect(classes).toContain("text-muted-foreground");
  });
});
