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
    expect(screen.getByRole("article").tagName).toBe("ARTICLE");
  });

  test("Essay.Header wraps the title in a header element", () => {
    render(<MockEssay />);
    expect(
      screen.getByRole("heading", { level: 3 }).closest("header"),
    ).not.toBeNull();
  });

  test("Essay.Title renders h3", () => {
    render(<MockEssay />);
    expect(screen.getByRole("heading", { level: 3 }).tagName).toBe("H3");
  });

  test("Essay.Subtitle renders h5", () => {
    render(<MockEssay />);
    expect(screen.getByRole("heading", { level: 5 }).tagName).toBe("H5");
  });

  test("Essay.Content renders a p element", () => {
    render(<MockEssay />);
    expect(screen.getByTestId("essay-content").tagName).toBe("P");
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
    const classes = screen.getByTestId("essay-content").getAttribute("class") ?? "";
    expect(classes).toContain("text-muted-foreground");
  });
});
