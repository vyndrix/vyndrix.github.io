import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import Badge from "../badge";

afterEach(cleanup);

// SVG file imports don't transform in jsdom — mock AppIcon to a plain svg.
// role="img" + aria-label mirrors what the real Icon component now renders.
vi.mock("../icon", () => ({
  default: ({ icon }: { icon: string }) => <svg role="img" aria-label={icon} />,
}));

const MockBadge = () => (
  <Badge>
    <Badge.Icon icon="react" />
    <Badge.Text>JavaScript</Badge.Text>
  </Badge>
);

describe("Badge", () => {
  test("renders text content", () => {
    render(<MockBadge />);
    expect(screen.getByText("JavaScript")).toBeDefined();
  });

  test("renders icon", () => {
    render(<MockBadge />);
    expect(screen.getByRole("img", { name: "react" })).toBeDefined();
  });

  test("applies static badge classes", () => {
    render(<MockBadge />);
    const classes = screen.getByText("JavaScript").parentElement?.getAttribute("class") ?? "";
    expect(classes).toContain("flex");
    expect(classes).toContain("bg-secondary");
    expect(classes).toContain("text-xs");
  });

  test("groups multiple badges", () => {
    render(
      <Badge.Group>
        <Badge>
          <Badge.Text>React</Badge.Text>
        </Badge>
        <Badge>
          <Badge.Text>TypeScript</Badge.Text>
        </Badge>
      </Badge.Group>,
    );
    expect(screen.getByText("React")).toBeDefined();
    expect(screen.getByText("TypeScript")).toBeDefined();
  });
});
