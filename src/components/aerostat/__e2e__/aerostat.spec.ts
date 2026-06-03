import { expect, test, type Page } from "@playwright/test";

const openHeroDialog = async (page: Page) => {
  await page.getByRole("button", { name: "Vyndrix's picture" }).click();
  await page.getByRole("dialog").waitFor();
};

test.describe("Aerostat", () => {
  test("first aerostat animates from opacity 0 to 1", async ({ page }) => {
    await page.clock.install({ time: 0 });
    await page.goto("/");
    await page.clock.runFor(1000); // clear gate + screen entry
    await openHeroDialog(page);
    const aerostat = page.getByTestId("aerostat-dialog").first();
    await expect(aerostat).toHaveCSS("opacity", "0");
    await page.clock.runFor(1000); // duration 300ms + headroom for rAF ticks under clock virtualization
    await expect(aerostat).toHaveCSS("opacity", "1");
  });

  test("reduced-motion: aerostat reaches full opacity instantly", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await openHeroDialog(page);
    const aerostat = page.getByTestId("aerostat-dialog").first();
    await aerostat.waitFor();
    await expect(aerostat).toHaveCSS("opacity", "1", { timeout: 200 });
  });

  test("aerostats stagger in", async ({ page }) => {
    await page.addInitScript(() => {
      let seed = 42;
      Math.random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
    });
    await page.clock.install({ time: 0 });
    await page.goto("/");
    await page.clock.runFor(1000);
    await openHeroDialog(page);
    const dialog = page.getByRole("dialog");

    await page.clock.runFor(200);
    await expect(dialog).toHaveScreenshot("aerostat-stagger-early.png", {
      maxDiffPixelRatio: 0.05,
    });

    await page.clock.runFor(450);
    await expect(dialog).toHaveScreenshot("aerostat-stagger-mid.png", {
      maxDiffPixelRatio: 0.05,
    });

    await page.clock.runFor(700);
    await expect(dialog).toHaveScreenshot("aerostat-stagger-late.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
