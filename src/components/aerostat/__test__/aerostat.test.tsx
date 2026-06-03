import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Aerostat } from "../index";

afterEach(cleanup);

describe("Aerostat", () => {
  test("Aerostat.Provider passes children through (no DOM wrapper)", () => {
    // Provider is a Context.Provider with no DOM — only way to assert children
    // is to query the fixture child by its testid.
    render(
      <Aerostat.Provider>
        <span data-testid="provider-child" />
      </Aerostat.Provider>,
    );
    screen.getByTestId("provider-child");
  });

  test("Aerostat.Group wraps children with absolute fill classes", () => {
    render(
      <Aerostat.Group>
        <span data-testid="group-child" />
      </Aerostat.Group>,
    );
    const group = screen.getByTestId("aerostat-group");
    expect(group.dataset.slot).toBe("aerostat-group");
    expect(group.contains(screen.getByTestId("group-child"))).toBe(true);
    const classes = group.getAttribute("class") ?? "";
    expect(classes).toContain("absolute");
    expect(classes).toContain("top-0");
    expect(classes).toContain("left-0");
    expect(classes).toContain("w-full");
    expect(classes).toContain("h-full");
    expect(classes).toContain("pointer-events-none");
  });

  test("Aerostat.Dialog wraps children in a span with forwarded props and static box classes", () => {
    render(
      <Aerostat.Dialog position={{ x: 0, y: 0 }} aria-label="hint">
        <em data-testid="dialog-child" />
      </Aerostat.Dialog>,
    );
    const wrapper = screen.getByTestId("aerostat-dialog");
    expect(wrapper.dataset.slot).toBe("aerostat-dialog");

    const inner = wrapper.firstElementChild as HTMLElement;
    expect(inner.tagName).toBe("SPAN");
    expect(inner.getAttribute("aria-label")).toBe("hint");
    expect(inner.contains(screen.getByTestId("dialog-child"))).toBe(true);

    const classes = wrapper.getAttribute("class") ?? "";
    expect(classes).toContain("absolute");
    expect(classes).toContain("border");
    expect(classes).toContain("border-primary");
    expect(classes).toContain("bg-secondary");
    expect(classes).toContain("p-2");
    expect(classes).toContain("px-3");
    expect(classes).toContain("font-bold");
  });

  test("Aerostat.Dialog does not render arrow by default", () => {
    render(<Aerostat.Dialog position={{ x: 0, y: 0 }} />);
    expect(screen.queryByTestId("aerostat-arrow")).toBeNull();
  });

  test("Aerostat.Dialog renders arrow when withArrow is true", () => {
    render(<Aerostat.Dialog position={{ x: 0, y: 0 }} withArrow />);
    const arrow = screen.getByTestId("aerostat-arrow");
    expect(arrow.dataset.slot).toBe("aerostat-arrow");
  });
});
