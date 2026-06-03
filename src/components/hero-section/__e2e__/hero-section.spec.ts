import { expect, test } from "@playwright/test";

test.describe("HeroSection", () => {
  test("clicking avatar opens dialog with picture", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Vyndrix's picture" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("dialog closes on Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Vyndrix's picture" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("reduced-motion: avatar click still opens dialog", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: "Vyndrix's picture" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
