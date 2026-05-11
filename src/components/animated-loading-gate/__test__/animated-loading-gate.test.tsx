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
  test("renders children", () => {
    render(
      <AnimatedLoadingGate>
        <p>content</p>
      </AnimatedLoadingGate>,
    );
    expect(screen.getByText("content")).toBeDefined();
  });

  test("wraps children in motion div with data-slot", () => {
    const { container } = render(
      <AnimatedLoadingGate>
        <p>content</p>
      </AnimatedLoadingGate>,
    );
    const wrapper = container.querySelector("[data-slot='animated-loading-gate']");
    expect(wrapper).toBeDefined();
    expect((wrapper as HTMLElement).dataset.slot).toBe("animated-loading-gate");
  });

  test("renders nothing when not client (SSR)", () => {
    vi.mocked(useIsClient).mockReturnValue(false);
    const { container } = render(
      <AnimatedLoadingGate>
        <p>content</p>
      </AnimatedLoadingGate>,
    );
    expect(container.querySelector("[data-slot='animated-loading-gate']")).toBeNull();
    expect(screen.queryByText("content")).toBeNull();
  });
});
