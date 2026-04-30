import * as React from "react";
import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import Avatar from "../avatar";

afterEach(cleanup);

// Radix Avatar.Image renders null in jsdom (images never fire onLoad).
// Mock the primitive so we can control rendered/not-rendered scenarios.
vi.mock("@radix-ui/react-avatar", async (importActual) => {
  const mod = await importActual<typeof import("@radix-ui/react-avatar")>();
  return {
    ...mod,
    Image: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) =>
      src ? <img src={src} alt={alt} {...props} /> : null,
  };
});

const MockAvatar = ({ src }: { src?: string }) => (
  <Avatar>
    <Avatar.Image src={src} alt="User avatar" />
    <Avatar.Fallback>VX</Avatar.Fallback>
  </Avatar>
);

describe("Avatar", () => {
  test("renders all parts with correct data-slot", () => {
    const { container } = render(
      <MockAvatar src="https://example.com/avatar.png" />,
    );

    const root = container.querySelector("[data-slot='avatar']");
    expect(root).toBeDefined();
    expect((root as HTMLElement).dataset.slot).toBe("avatar");

    const img = screen.getByRole("img");
    expect(img.dataset.slot).toBe("avatar-image");

    const fallbackEl = container.querySelector("[data-slot='avatar-fallback']");
    expect(fallbackEl).toBeDefined();
    expect((fallbackEl as HTMLElement).dataset.slot).toBe("avatar-fallback");
  });

  test("renders image when source is provided", () => {
    render(<MockAvatar src="https://example.com/avatar.png" />);

    const img = screen.getByRole("img");
    expect(img).toBeDefined();
  });

  test("renders fallback when image cannot be loaded", () => {
    render(<MockAvatar />);

    const fallback = screen.getByText("VX");
    expect(fallback).toBeDefined();
  });
});
