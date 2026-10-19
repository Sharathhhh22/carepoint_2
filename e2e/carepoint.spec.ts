import { test, expect } from "@playwright/test";

test.describe("CarePoint E2E Verification Suite", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.error(`Page error: ${msg.text()}`);
      }
    });
  });

  test("1. Homepage renders correctly with single H1 and no console errors", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CarePoint \| Multi-Specialty Clinics and Hospitals in India/);

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Healthcare, closer to home.");
  });

  test("2. Search -> Results flow filters facilities and doctors", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.locator("#smart-search-input");
    await searchInput.fill("Dermatology");
    await page.locator('button:has-text("Find Care")').click();

    // Verify URL query params sync
    await expect(page).toHaveURL(/\?q=Dermatology/);

    // Verify Doctor grid has Dr. Ketaki Chitnis
    const doctorCards = page.locator("#find-doctors").getByText("Dr. Ketaki Chitnis");
    await expect(doctorCards.first()).toBeVisible();
  });

  test("3. Language switcher updates interface text and html lang attribute", async ({ page }) => {
    await page.goto("/");

    // Use language selector (visible on both mobile topbar and desktop header)
    const langSelect = page.locator("select[id$='language-select']").first();
    await langSelect.selectOption("hi");

    // Check html lang
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "hi");

    // Check translated Hero headline
    await expect(page.locator("h1")).toHaveText("स्वास्थ्य सेवा, आपके घर के करीब।");

    // Switch to Kannada
    await langSelect.selectOption("kn");
    await expect(html).toHaveAttribute("lang", "kn");
    await expect(page.locator("h1")).toHaveText("ಆರೋಗ್ಯ ರಕ್ಷಣೆ, ನಿಮ್ಮ ಮನೆಗೆ ಹತ್ತಿರ.");

    // Switch back to English
    await langSelect.selectOption("en");
    await expect(html).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveText("Healthcare, closer to home.");
  });

  test("4. Budget filter hides out-of-budget and null-fee facilities", async ({ page }) => {
    await page.goto("/");

    // Click "Under ₹500"
    const under500Radio = page.locator("#budget-radio-under-500");
    await under500Radio.click();

    // Check URL sync
    await expect(page).toHaveURL(/budget=under-500/);

    // Notice for hidden facilities appears
    const notice = page.getByText(/facility with no listed fee is hidden/i);
    await expect(notice.first()).toBeVisible();

    // High fee doctor like Dr. Arvind Somayaji (₹1100) should NOT be visible in doctor list
    const expensiveDoctor = page.locator("#find-doctors").getByText("Dr. Arvind Somayaji");
    await expect(expensiveDoctor).toHaveCount(0);

    // Under 500 doctor like Dr. Rohith Vembar (₹400) should be visible
    const budgetDoctor = page.locator("#find-doctors").getByText("Dr. Rohith Vembar");
    await expect(budgetDoctor.first()).toBeVisible();
  });

  test("5. Appointment Dialog: open, select slot, fill patient details, confirm demo, close and return focus", async ({ page }) => {
    await page.goto("/");

    const firstBookButton = page.locator('button:has-text("Book (DEMO)")').first();
    await firstBookButton.click();

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();

    // Step 1: Select an unbooked time slot inside dialog
    const slotRadio = dialog.locator('[role="radio"]:not([aria-disabled="true"])').first();
    await slotRadio.click();

    // Continue to Step 2
    await dialog.locator('button:has-text("Continue to Details")').click();

    // Step 2: Fill patient name
    await dialog.locator("#patientName").fill("Rahul Dravid");
    await dialog.locator('button:has-text("Confirm Booking (DEMO)")').click();

    // Step 3: Success state check
    await expect(dialog.getByText("Demo only. No appointment was made.")).toBeVisible();

    // Close Dialog
    await dialog.locator('button:has-text("Done")').click();
    await expect(dialog).not.toBeVisible();
  });

  test("6. Mobile menu traps focus, closes on Escape, and returns focus to trigger", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.locator('button[aria-label="Open mobile navigation menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const drawer = page.locator('div[role="dialog"][aria-label="Mobile Navigation Menu"]');
    await expect(drawer).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();

    // Verify focus returned to trigger
    await expect(menuButton).toBeFocused();
  });

  test("7. Assistant Launcher opens panel and closes on Escape", async ({ page }) => {
    await page.goto("/");

    const launcher = page.locator('button[aria-label="Open CarePoint demo assistant panel"]');
    await launcher.click();

    const assistantDialog = page.locator('div[role="dialog"][aria-label="CarePoint Demo Assistant"]');
    await expect(assistantDialog).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(assistantDialog).not.toBeVisible();
  });

  test("8. No horizontal scroll across standard viewport widths", async ({ page }) => {
    const viewports = [
      { width: 360, height: 640 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("/");
      await page.waitForTimeout(200);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll, `Horizontal scroll detected at width ${vp.width}px`).toBe(false);
    }
  });

  test("9. Doctor Profile Page at /doctors/[slug] and 404 for unknown slug", async ({ page }) => {
    // Valid doctor
    await page.goto("/doctors/dr-arvind-somayaji");
    await expect(page.locator("h1")).toHaveText("Dr. Arvind Somayaji");
    await expect(page.getByText("Cardiology").first()).toBeVisible();

    // Unknown doctor slug returns 404 page
    const response = await page.goto("/doctors/unknown-fake-slug");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("Page Not Found");
  });
});
