import * as React from "react";
import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Dialog from "../dialog";

afterEach(cleanup);

const MockDialog = ({
  showCloseButton,
  footerCloseButton,
}: {
  showCloseButton?: boolean;
  footerCloseButton?: boolean;
}) => (
  <Dialog defaultOpen>
    <Dialog.Trigger>Open</Dialog.Trigger>
    <Dialog.Content showCloseButton={showCloseButton} aria-describedby={undefined}>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Footer showCloseButton={footerCloseButton}>Footer</Dialog.Footer>
    </Dialog.Content>
  </Dialog>
);

describe("Dialog", () => {
  test("renders all parts with correct data-slot", () => {
    render(<MockDialog />);

    // Trigger is aria-hidden when dialog is open — query by test id
    const trigger = screen.getByTestId("dialog-trigger");
    expect(trigger.dataset.slot).toBe("dialog-trigger");

    // Content portals to document.body — Radix gives it role="dialog"
    const content = screen.getByRole("dialog");
    expect(content.dataset.slot).toBe("dialog-content");

    const title = screen.getByRole("heading");
    expect(title.dataset.slot).toBe("dialog-title");

    const close = screen.getByRole("button", { name: "Close" });
    expect(close.dataset.slot).toBe("dialog-close");

    const footer = screen.getByTestId("dialog-footer");
    expect(footer.dataset.slot).toBe("dialog-footer");
  });

  test("renders close button inside Content by default", () => {
    render(<MockDialog />);
    screen.getByRole("button", { name: "Close" });
  });

  test("hides close button inside Content when showCloseButton is false", () => {
    render(<MockDialog showCloseButton={false} />);
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });

  test("renders close button inside Footer when showCloseButton is true", () => {
    render(<MockDialog showCloseButton={false} footerCloseButton={true} />);
    screen.getByRole("button", { name: "Close" });
  });
});
