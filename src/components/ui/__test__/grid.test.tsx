import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Grid from "../grid";

afterEach(cleanup);

const MockGrid = () => (
  <Grid>
    <p>Item A</p>
    <p>Item B</p>
  </Grid>
);

describe("Grid", () => {
  test("renders children", () => {
    render(<MockGrid />);
    expect(screen.getByText("Item A")).toBeDefined();
    expect(screen.getByText("Item B")).toBeDefined();
  });

  test("applies static grid classes", () => {
    render(<MockGrid />);
    const classes = screen.getByText("Item A").parentElement?.getAttribute("class") ?? "";
    expect(classes).toContain("grid");
    expect(classes).toContain("sm:grid-cols-2");
    expect(classes).toContain("gap-4");
  });
});
