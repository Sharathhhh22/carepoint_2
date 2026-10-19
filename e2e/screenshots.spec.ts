import { test } from "@playwright/test";
import fs from "fs";

test.describe("Screenshot capture suite", () => {
  test.beforeAll(() => {
    if (!fs.existsSync("public/screenshots")) {
      fs.mkdirSync("public/screenshots", { recursive: true });
    }
  });

  test("Capture desktop screenshots (1440px)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Desktop homepage
    await page.screenshot({
      path: "public/screenshots/desktop-home.png",
      fullPage: false,
    });

    // Open appointment dialog
    await page.locator('button:has-text("Book (DEMO)")').first().click();
    await page.waitForTimeout(500);

    // Desktop appointment dialog
    await page.screenshot({
      path: "public/screenshots/desktop-appointment.png",
    });
  });

  test("Capture mobile screenshots (390px)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Mobile homepage
    await page.screenshot({
      path: "public/screenshots/mobile-home.png",
      fullPage: false,
    });

    // Open appointment dialog
    await page.locator('button:has-text("Book (DEMO)")').first().click();
    await page.waitForTimeout(500);

    // Mobile appointment dialog
    await page.screenshot({
      path: "public/screenshots/mobile-appointment.png",
    });
  });
});
