import { expect, test } from "@playwright/test";

test.describe("Screen", () => {
  test("animates from opacity 0 to 1", async ({ page }) => {
    await page.clock.install({ time: 0 });
    await page.goto("/");
    await expect(page.locator("main > div")).toHaveCSS("opacity", "0");
    await page.clock.runFor(500);
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
  });

  test("matches visual snapshot after animation completes", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1", {
      timeout: 1000,
    });
    await expect(page.locator("main")).toHaveScreenshot("screen-animated.png");
  });

  test("reduced-motion: reaches full opacity instantly", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("main > div").waitFor();
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1", {
      timeout: 200,
    });
  });
});
