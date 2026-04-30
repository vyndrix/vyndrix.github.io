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

describe("Badge", () => {
  test("renders text content", () => {
    render(
      <Badge>
        <Badge.Text>JavaScript</Badge.Text>
      </Badge>,
    );

    const text = screen.getByText("JavaScript");
    expect(text).toBeDefined();
  });

  test("renders icon", () => {
    render(
      <Badge>
        <Badge.Icon icon="react" />
      </Badge>,
    );

    const icon = screen.getByRole("img", { name: "react" });
    expect(icon).toBeDefined();
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
