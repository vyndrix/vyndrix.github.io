import { render } from "@/tests/utils";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import Essay from "../essay";

afterEach(cleanup);

describe("Essay", () => {
  test("renders as article element", () => {
    render(<Essay><Essay.Content>Body</Essay.Content></Essay>);
    expect(screen.getByRole("article")).toBeDefined();
  });

  test("Essay.Header renders a header element", () => {
    render(
      <Essay>
        <Essay.Header>Heading area</Essay.Header>
      </Essay>,
    );
    expect(screen.getByText("Heading area").tagName).toBe("HEADER");
  });

  test("Essay.Title renders h3", () => {
    render(
      <Essay>
        <Essay.Title>My Essay</Essay.Title>
      </Essay>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toBeDefined();
  });

  test("Essay.Subtitle renders h5", () => {
    render(
      <Essay>
        <Essay.Subtitle>Subtitle text</Essay.Subtitle>
      </Essay>,
    );
    expect(screen.getByRole("heading", { level: 5 })).toBeDefined();
  });

  test("Essay.Content renders a p element", () => {
    render(
      <Essay>
        <Essay.Content>Body text</Essay.Content>
      </Essay>,
    );
    expect(screen.getByText("Body text").tagName).toBe("P");
  });
});
