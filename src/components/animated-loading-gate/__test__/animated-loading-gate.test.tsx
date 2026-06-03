import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useIsClient } from "usehooks-ts";
import { AnimatedLoadingGate } from "../animated-loading-gate";

vi.mock("usehooks-ts", async (importActual) => {
  const mod = await importActual<typeof import("usehooks-ts")>();
  return { ...mod, useIsClient: vi.fn().mockReturnValue(true) };
});

afterEach(cleanup);
beforeEach(() => {
  vi.mocked(useIsClient).mockReturnValue(true);
});

describe("AnimatedLoadingGate", () => {
  test("wraps children in motion div with data-slot", () => {
    render(
      <AnimatedLoadingGate>
        <span data-testid="gate-child" />
      </AnimatedLoadingGate>,
    );
    const wrapper = screen.getByTestId("animated-loading-gate");
    expect(wrapper.dataset.slot).toBe("animated-loading-gate");
    expect(wrapper.contains(screen.getByTestId("gate-child"))).toBe(true);
  });

  test("renders nothing when not client (SSR)", () => {
    vi.mocked(useIsClient).mockReturnValue(false);
    render(
      <AnimatedLoadingGate>
        <span data-testid="gate-child" />
      </AnimatedLoadingGate>,
    );
    expect(screen.queryByTestId("animated-loading-gate")).toBeNull();
    expect(screen.queryByTestId("gate-child")).toBeNull();
  });
});
