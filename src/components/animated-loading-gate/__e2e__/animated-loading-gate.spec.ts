import { expect, test } from "@playwright/test";

const GATE = "[data-slot='animated-loading-gate']";

test.describe("AnimatedLoadingGate", () => {
  test("animates from opacity 0 to 1", async ({ page }) => {
    await page.clock.install({ time: 0 });
    await page.goto("/");
    await expect(page.locator(GATE)).toHaveCSS("opacity", "0");
    await page.clock.runFor(500); // animation is 375ms
    await expect(page.locator(GATE)).toHaveCSS("opacity", "1");
  });

  test("sets data-ready on html after animation completes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-ready", "true", { timeout: 1000 });
    await expect(page.locator("body")).toHaveAttribute("data-ready", "true");
  });

  test("reduced-motion: reaches full opacity and sets data-ready instantly", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator(GATE).waitFor();
    await expect(page.locator(GATE)).toHaveCSS("opacity", "1", { timeout: 200 });
    await expect(page.locator("html")).toHaveAttribute("data-ready", "true", { timeout: 200 });
  });
});
