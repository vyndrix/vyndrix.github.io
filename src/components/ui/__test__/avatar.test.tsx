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
    render(<MockAvatar src="https://example.com/avatar.png" />);

    const root = screen.getByTestId("avatar");
    expect(root.dataset.slot).toBe("avatar");

    const img = screen.getByRole("img");
    expect(img.dataset.slot).toBe("avatar-image");

    const fallbackEl = screen.getByTestId("avatar-fallback");
    expect(fallbackEl.dataset.slot).toBe("avatar-fallback");
  });

  test("renders image when source is provided", () => {
    render(<MockAvatar src="https://example.com/avatar.png" />);
    screen.getByRole("img");
  });

  test("renders fallback when image cannot be loaded", () => {
    render(<MockAvatar />);
    screen.getByTestId("avatar-fallback");
  });

  test("applies static avatar classes", () => {
    render(<MockAvatar src="https://example.com/avatar.png" />);

    const rootClasses = screen.getByTestId("avatar").getAttribute("class") ?? "";
    expect(rootClasses).toContain("rounded-full");
    expect(rootClasses).toContain("overflow-hidden");
    expect(rootClasses).toContain("size-24");

    const imgClasses = screen.getByRole("img").getAttribute("class") ?? "";
    expect(imgClasses).toContain("h-full");
    expect(imgClasses).toContain("w-full");
    expect(imgClasses).toContain("object-cover");
  });
});
