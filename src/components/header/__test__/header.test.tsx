import { fireEvent, screen, within } from "@testing-library/react";
import { type ComponentProps } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { Header } from "../header";

import { render } from "@/test/utils";

vi.mock("../../ui", () => ({
  Button: (props: ComponentProps<"button">) => <button {...props} />,
  Icon: ({ icon }: { icon: string }) => <span data-testid={`icon-${icon}`} />,
}));

vi.mock("../locale-switch", () => ({
  LocaleSwitch: () => <button type="button">Locale Switch</button>,
}));

vi.mock("../theme-switch", () => ({
  default: () => <button type="button">Theme Switch</button>,
}));

describe("Header", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should", () => {
    render(<Header />);

    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    expect(
      within(
        screen.getByRole("group", { name: "social-links-group" }),
      ).getAllByRole("button"),
    ).toHaveLength(3);
    expect(
      within(
        screen.getByRole("group", { name: "preferences-group" }),
      ).getAllByRole("button"),
    ).toHaveLength(2);

    const githubButton = screen.getByRole("button", { name: "Github Profile" });
    const linkedinButton = screen.getByRole("button", {
      name: "Linkedin Profile",
    });
    const emailButton = screen.getByRole("button", { name: "Email Me" });

    expect(githubButton).toBeDefined();
    expect(linkedinButton).toBeDefined();
    expect(emailButton).toBeDefined();

    fireEvent.click(githubButton);
    fireEvent.click(linkedinButton);
    fireEvent.click(emailButton);

    expect(openSpy).toHaveBeenNthCalledWith(
      1,
      "https://github.com/vyndrix",
      "_blank",
    );
    expect(openSpy).toHaveBeenNthCalledWith(
      2,
      "https://www.linkedin.com/in/ramonfersouza/",
      "_blank",
    );
    expect(openSpy).toHaveBeenNthCalledWith(
      3,
      "mailto:ramonfersouza@gmail.com",
      "_self",
    );
  });
});
