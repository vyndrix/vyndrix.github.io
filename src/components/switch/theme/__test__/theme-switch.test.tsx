import { render, renderHook } from "@/test/utils";
import { fireEvent, screen } from "@testing-library/react";
import { useTheme } from "next-themes";
import { describe, expect, test } from "vitest";
import { Switch } from "../..";

describe("Theme Switch", () => {
  test("should toggle theme", () => {
    render(<Switch.Theme />);

    const button = screen.getByRole("button");

    expect(button).toBeDefined();

    const { result: initialResult } = renderHook(() => useTheme());
    expect(initialResult.current.theme).toBe("system");

    fireEvent.click(button);

    const { result: firstClickResult } = renderHook(() => useTheme());
    expect(firstClickResult.current.theme).toBe("light");

    fireEvent.click(button);

    const { result: secondClickResult } = renderHook(() => useTheme());
    expect(secondClickResult.current.theme).toBe("dark");
  });
});
