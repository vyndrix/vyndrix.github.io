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

describe("HeroSection", () => {
  test("trigger is a button labelled by avatar alt text", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("button", { name: "Vyndrix's picture" }).tagName,
    ).toBe("BUTTON");
  });

  test("dialog is closed initially (content not in DOM)", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("[data-slot='dialog-content']")).toBeNull();
  });

  test("clicking trigger opens the dialog", () => {
    render(<HeroSection />);
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Vyndrix's picture" }),
      );
    });
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  test("opened dialog has accessible name from VisuallyHidden title", () => {
    render(<HeroSection />);
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Vyndrix's picture" }),
      );
    });
    expect(
      screen.getByRole("dialog", {
        name: "Vyndrix | Ramon Fernandes picture",
      }),
    ).toBeDefined();
  });

  test("dialog title is visually hidden but present in the a11y tree", () => {
    render(<HeroSection />);
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Vyndrix's picture" }),
      );
    });
    const title = screen.getByText("Vyndrix | Ramon Fernandes picture");
    expect(title.dataset.slot).toBe("dialog-title");
    // VisuallyHidden applies inline sr-only-equivalent styles
    expect(title.style.position).toBe("absolute");
    expect(title.style.width).toBe("1px");
    expect(title.style.height).toBe("1px");
  });

  test("dialog is described by the footer caption", () => {
    render(<HeroSection />);
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Vyndrix's picture" }),
      );
    });
    const dialog = screen.getByRole("dialog");
    const caption = screen.getByText(/Enjoying the day/i);
    // Verify the a11y wire: dialog's aria-describedby resolves to the caption
    expect(dialog.getAttribute("aria-describedby")).toBe(caption.id);
  });

  test("renders outer copy in en-US by default", () => {
    render(<Composed />);
    expect(
      screen.getByRole("button", { name: "Vyndrix's picture" }),
    ).toBeDefined();
    expect(screen.getByText("Hi, I'm Ramon")).toBeDefined();
    expect(
      screen.getByText(/A frontend and mobile developer focused/i).tagName,
    ).toBe("P");
  });

  test("renders inner copy in en-US when dialog opens", () => {
    render(<Composed />);
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Vyndrix's picture" }),
      );
    });
    expect(
      screen.getByText("Vyndrix | Ramon Fernandes picture"),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Enjoying the day with my girlfriend at the sports store",
      ),
    ).toBeDefined();
  });

  test("renders outer copy in pt-BR after toggling locale", () => {
    render(<Composed />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "EN" }));
    });
    expect(
      screen.getByRole("button", { name: "Foto de Vyndrix" }),
    ).toBeDefined();
    expect(screen.getByText("Olá, eu sou Ramon")).toBeDefined();
    expect(
      screen.getByText(/Desenvolvedor frontend e mobile/i).tagName,
    ).toBe("P");
  });

  test("renders inner copy in pt-BR when dialog opens after toggling locale", () => {
    render(<Composed />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "EN" }));
    });
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: "Foto de Vyndrix" }),
      );
    });
    expect(
      screen.getByText("Foto de Vyndrix | Ramon Fernandes"),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Aproveitando o dia com minha namorada na loja de esportes",
      ),
    ).toBeDefined();
  });
});
