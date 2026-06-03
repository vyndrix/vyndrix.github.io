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
    expect(screen.getByTestId("badge").textContent).toContain("JavaScript");
  });

  test("renders icon", () => {
    render(<MockBadge />);
    screen.getByRole("img", { name: "react" });
  });

  test("applies static badge classes", () => {
    render(<MockBadge />);
    const classes = screen.getByTestId("badge").getAttribute("class") ?? "";
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
    screen.getByTestId("badge-group");
    expect(screen.getAllByTestId("badge").length).toBe(2);
  });
});
