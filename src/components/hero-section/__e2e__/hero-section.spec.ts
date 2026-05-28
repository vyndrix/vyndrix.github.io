import { expect, test } from "@playwright/test";

test.describe("HeroSection", () => {
  test("clicking avatar opens dialog with picture", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Vyndrix's picture" }).click();
    await expect(page.locator("[data-slot='dialog-content']")).toBeVisible();
  });

  test("dialog closes on Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Vyndrix's picture" }).click();
    await expect(page.locator("[data-slot='dialog-content']")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-slot='dialog-content']")).not.toBeVisible();
  });

  test("reduced-motion: avatar click still opens dialog", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: "Vyndrix's picture" }).click();
    await expect(page.locator("[data-slot='dialog-content']")).toBeVisible();
  });

  test("aerostats appear sequentially with staggered animation", async ({
    page,
  }) => {
    // Seed Math.random so useStableRandom is deterministic across runs
    await page.addInitScript(() => {
      let seed = 42;
      Math.random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    });
    await page.clock.install({ time: 0 });
    await page.goto("/");
    // Clear gate + screen entry animations (~500ms total)
    await page.clock.runFor(1000);
    await page
      .getByRole("button", { name: "Vyndrix's picture" })
      .click();
    const dialog = page.locator("[data-slot='dialog-content']");
    await dialog.waitFor();

    // Stagger is 150ms between aerostats; 6 aerostats; ~1100ms full
    // maxDiffPixelRatio tolerates floating useAnimationFrame jitter on Aerostat.Dialog
    await page.clock.runFor(200); // first 1-2 aerostats appearing
    await expect(dialog).toHaveScreenshot("aerostats-stagger-early.png", {
      maxDiffPixelRatio: 0.05,
    });

    await page.clock.runFor(450); // mid stagger
    await expect(dialog).toHaveScreenshot("aerostats-stagger-mid.png", {
      maxDiffPixelRatio: 0.05,
    });

    await page.clock.runFor(700); // all settled
    await expect(dialog).toHaveScreenshot("aerostats-stagger-late.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
