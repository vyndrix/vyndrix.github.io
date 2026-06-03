import * as React from "react";
import LocaleSwitch from "@/components/switch/locale";
import { i18n, render } from "@/tests/utils";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { HeroSection } from "../hero-section";

beforeEach(() => {
  window.localStorage.clear();
  act(() => {
    i18n.activate("en-US");
  });
});

afterEach(cleanup);

const Composed = () => (
  <>
    <HeroSection />
    <LocaleSwitch />
  </>
);

vi.mock("@/data/aerostats", () => ({ aerostats: [] }));

vi.mock("@/public/avatar.jpg", () => ({
  default: { src: "/avatar.jpg", width: 100, height: 100 },
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element -- test mock; LCP irrelevant in jsdom
    <img src={src as string} alt={alt} {...props} />
  ),
}));

vi.mock("@radix-ui/react-avatar", async (importActual) => {
  const mod = await importActual<typeof import("@radix-ui/react-avatar")>();
  return {
    ...mod,
    Image: ({
      src,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) =>
      src ? (
        // eslint-disable-next-line @next/next/no-img-element -- Radix Image renders a plain <img>; mock mirrors source
        <img src={src} alt={alt} {...props} />
      ) : null,
  };
});

vi.mock("../../aerostat", () => ({
  Aerostat: {
    Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Group: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Dialog: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  },
}));

vi.mock("../../aerostat/use-aerostat-postition-observer", () => ({
  useFloatPositionObserver: () => undefined,
}));

const openDialog = (name: string) => {
  act(() => {
    fireEvent.click(screen.getByRole("button", { name }));
  });
};

describe("HeroSection", () => {
  test("trigger is a button labelled by avatar alt text", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("button", { name: "Vyndrix's picture" }).tagName,
    ).toBe("BUTTON");
  });

  test("dialog is closed initially (content not in DOM)", () => {
    render(<HeroSection />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("clicking trigger opens the dialog", () => {
    render(<HeroSection />);
    openDialog("Vyndrix's picture");
    screen.getByRole("dialog");
  });

  test("opened dialog has accessible name from VisuallyHidden title", () => {
    render(<HeroSection />);
    openDialog("Vyndrix's picture");
    screen.getByRole("dialog", { name: "Vyndrix | Ramon Fernandes picture" });
  });

  test("dialog title is visually hidden but present in the a11y tree", () => {
    render(<HeroSection />);
    openDialog("Vyndrix's picture");
    const title = screen.getByRole("heading");
    expect(title.dataset.slot).toBe("dialog-title");
    expect(title.style.position).toBe("absolute");
    expect(title.style.width).toBe("1px");
    expect(title.style.height).toBe("1px");
  });

  test("dialog is described by the footer caption", () => {
    render(<HeroSection />);
    openDialog("Vyndrix's picture");
    const dialog = screen.getByRole("dialog");
    const caption = screen.getByTestId("hero-dialog-caption");
    expect(dialog.getAttribute("aria-describedby")).toBe(caption.id);
  });

  test("en-US: outer copy", () => {
    render(<Composed />);
    expect(
      screen.getByRole("button", { name: "Vyndrix's picture" }),
    ).toBeDefined();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Hi, I'm Ramon",
    );
    const bio = screen.getByTestId("hero-section-bio");
    expect(bio.tagName).toBe("P");
    expect(bio.textContent).toContain(
      "A frontend and mobile developer focused",
    );
  });

  test("en-US: inner copy when dialog opens", () => {
    render(<Composed />);
    openDialog("Vyndrix's picture");
    expect(screen.getByRole("heading").textContent).toBe(
      "Vyndrix | Ramon Fernandes picture",
    );
    expect(screen.getByTestId("hero-dialog-caption").textContent).toBe(
      "Enjoying the day with my girlfriend at the sports store",
    );
  });

  test("pt-BR: outer copy after locale toggle", () => {
    render(<Composed />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "EN" }));
    });
    expect(
      screen.getByRole("button", { name: "Foto de Vyndrix" }),
    ).toBeDefined();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Olá, eu sou Ramon",
    );
    const bio = screen.getByTestId("hero-section-bio");
    expect(bio.tagName).toBe("P");
    expect(bio.textContent).toContain("Desenvolvedor frontend e mobile");
  });

  test("pt-BR: inner copy when dialog opens after locale toggle", () => {
    render(<Composed />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "EN" }));
    });
    openDialog("Foto de Vyndrix");
    expect(screen.getByRole("heading").textContent).toBe(
      "Foto de Vyndrix | Ramon Fernandes",
    );
    expect(screen.getByTestId("hero-dialog-caption").textContent).toBe(
      "Aproveitando o dia com minha namorada na loja de esportes",
    );
  });
});
