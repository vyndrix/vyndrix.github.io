import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Section from "../section";

afterEach(cleanup);

const MockSection = () => (
  <Section>
    <Section.Title>Title</Section.Title>
    <Section.Content>
      <p>Content</p>
    </Section.Content>
  </Section>
);

describe("Section", () => {
  test("Section.Title renders h2", () => {
    render(<MockSection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeDefined();
  });

  test("applies static section classes", () => {
    render(<MockSection />);
    const classes =
      screen.getByRole("heading", { level: 2 }).closest("section")?.getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-col");
    expect(classes).toContain("justify-center");
  });

  test("applies static content classes", () => {
    render(<MockSection />);
    const classes = screen.getByText("Content").parentElement?.getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-col");
    expect(classes).toContain("px-2");
    expect(classes).toContain("gap-6");
  });

  test("applies static title classes", () => {
    render(<MockSection />);
    const classes = screen.getByRole("heading", { level: 2 }).getAttribute("class") ?? "";
    expect(classes).toContain("text-2xl");
    expect(classes).toContain("font-medium");
  });
});
