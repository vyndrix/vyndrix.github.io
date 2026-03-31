import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import Title from "../title";

describe("Title", () => {
  test("assert lg size", () => {
    const { getByRole, container } = render(<Title size="lg">Test</Title>);
    expect(getByRole("heading", { level: 1 })).toBeDefined();
    expect(
      container.getElementsByClassName("text-3xl font-medium"),
    ).toBeDefined();
  });

  test("assert md size", () => {
    const { getByRole, container } = render(<Title size="md">Test</Title>);
    expect(getByRole("heading", { level: 2 })).toBeDefined();
    expect(
      container.getElementsByClassName("text-2xl font-medium"),
    ).toBeDefined();
  });

  test("assert sm size", () => {
    const { getByRole, container } = render(<Title size="sm">Test</Title>);
    expect(getByRole("heading", { level: 3 })).toBeDefined();
    expect(container.getElementsByClassName("text-lg")).toBeDefined();
  });

  test("assert default size", () => {
    const { getByRole } = render(<Title>Test</Title>);
    expect(getByRole("heading", { level: 4 })).toBeDefined();
  });
});
