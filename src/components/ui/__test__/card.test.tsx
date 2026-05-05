import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Card from "../card";

afterEach(cleanup);

const MockCard = () => (
  <Card>
    <Card.Header>Nav</Card.Header>
    <Card.Title size="lg">Project</Card.Title>
    <Card.Content>Description</Card.Content>
    <Card.Footer>Links</Card.Footer>
  </Card>
);

describe("Card", () => {
  test("renders as article element", () => {
    render(<MockCard />);
    expect(screen.getByRole("article")).toBeDefined();
  });

  test("renders animated variant as article element", () => {
    render(
      <Card animated>
        <Card.Content>Description</Card.Content>
      </Card>,
    );
    expect(screen.getByRole("article")).toBeDefined();
  });

  test("Card.Header renders a header element", () => {
    render(<MockCard />);
    expect(screen.getByText("Nav").tagName).toBe("HEADER");
  });

  test("Card.Content renders a p element", () => {
    render(<MockCard />);
    expect(screen.getByText("Description").tagName).toBe("P");
  });

  test("Card.Footer renders a footer element", () => {
    render(<MockCard />);
    expect(screen.getByText("Links").tagName).toBe("FOOTER");
  });

  test("Card.Title size lg renders h3", () => {
    render(<MockCard />);
    expect(screen.getByRole("heading", { level: 3 })).toBeDefined();
  });

  test("Card.Title size md renders h4", () => {
    render(
      <Card>
        <Card.Title size="md">Project</Card.Title>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 4 })).toBeDefined();
  });

  test("applies static card classes", () => {
    render(<MockCard />);
    const classes = screen.getByRole("article").getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("flex-col");
    expect(classes).toContain("p-4");
    expect(classes).toContain("bg-background");
    expect(classes).toContain("border");
  });

  test("applies static content classes", () => {
    render(<MockCard />);
    const classes = screen.getByText("Description").getAttribute("class") ?? "";
    expect(classes).toContain("text-sm");
    expect(classes).toContain("text-muted-foreground");
  });
});
