import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import Icon from "../icon";

afterEach(cleanup);

// SVG file imports don't transform in jsdom — forward props so role/aria-label/className are preserved
vi.mock("@/public/icons/expo.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));
vi.mock("@/public/icons/github.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));
vi.mock("@/public/icons/javascript.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));
vi.mock("@/public/icons/linkedin.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));
vi.mock("@/public/icons/react.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));
vi.mock("@/public/icons/reactnative.svg", () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe("Icon", () => {
  test("renders with role img and aria-label", () => {
    render(<Icon icon="react" />);
    expect(screen.getByRole("img", { name: "react" })).toBeDefined();
  });

  test("applies static classes", () => {
    render(<Icon icon="react" />);
    const classes =
      screen.getByRole("img", { name: "react" }).getAttribute("class") ?? "";
    expect(classes).toContain("w-6");
    expect(classes).toContain("h-6");
  });
});
