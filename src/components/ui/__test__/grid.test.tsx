import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Grid from "../grid";

afterEach(cleanup);

const MockGrid = () => (
  <Grid>
    <p data-testid="grid-item-a" />
    <p data-testid="grid-item-b" />
  </Grid>
);

describe("Grid", () => {
  test("renders children", () => {
    render(<MockGrid />);
    const grid = screen.getByTestId("grid");
    expect(grid.contains(screen.getByTestId("grid-item-a"))).toBe(true);
    expect(grid.contains(screen.getByTestId("grid-item-b"))).toBe(true);
  });

  test("applies static grid classes", () => {
    render(<MockGrid />);
    const classes = screen.getByTestId("grid").getAttribute("class") ?? "";
    expect(classes).toContain("grid");
    expect(classes).toContain("sm:grid-cols-2");
    expect(classes).toContain("gap-4");
  });
});
