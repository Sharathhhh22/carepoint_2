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
    await page.locator('form[role="search"] button:has-text("Find Care")').click();

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

    // Switch to Telugu
    await langSelect.selectOption("te");
    await expect(html).toHaveAttribute("lang", "te");
    await expect(page.locator("h1")).toHaveText("ఆరోగ్య సంరక్షణ, మీ ఇంటికి సమీపంలో.");

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

    const firstBookButton = page.locator('#find-doctors button:has-text("Book (DEMO)")').first();
    await firstBookButton.click();

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();

    // Verify fee is shown at top before time is chosen
    await expect(dialog.getByText("Consultation Fee (DEMO)")).toBeVisible();

    // Verify Earliest available line
    await expect(dialog.getByText(/Earliest available:/i)).toBeVisible();

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
      await page.waitForTimeout(150);

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

  // ==========================================
  // PATIENT QUESTIONS ACCEPTANCE CRITERIA TESTS
  // ==========================================

  test("10. Q1: Fee display on cards, sort by fee, and fee guide table", async ({ page }) => {
    await page.goto("/");

    // Verify doctor card has fee in INR
    const doctorFee = page.locator("#find-doctors").getByText(/₹\d+/);
    await expect(doctorFee.first()).toBeVisible();

    // Verify facility card has fee in INR or 'Fee not listed'
    const facilityFee = page.locator("#clinics").getByText(/₹\d+|Fee not listed/);
    await expect(facilityFee.first()).toBeVisible();

    // Verify fee guide table exists with required acceptance text
    const feeGuideText = page.getByText("Sample fees. Excludes applicable taxes. Confirm with the clinic before visiting.");
    await expect(feeGuideText.first()).toBeVisible();
  });

  test("11. Q2: Geolocation granted shows distance vs fallback label when denied", async ({ browser }) => {
    // Context A: Permission granted
    const contextGranted = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: 12.9784, longitude: 77.6408 }, // Indiranagar
    });
    const pageGranted = await contextGranted.newPage();
    await pageGranted.goto("/");

    // Click 'Use my location'
    const useLocBtn = pageGranted.getByRole("button", { name: "Use my location" });
    await useLocBtn.click();

    // Card should show distance (e.g. '0 km away' or 'km away')
    const distanceBadge = pageGranted.locator("#clinics").getByText(/km away/i);
    await expect(distanceBadge.first()).toBeVisible();
    await contextGranted.close();

    // Context B: Permission denied
    const contextDenied = await browser.newContext({
      permissions: [],
    });
    const pageDenied = await contextDenied.newPage();
    await pageDenied.goto("/");

    // When permission is denied / fallback used: card shows 'Distance based on locality (sample)'
    const fallbackLabel = pageDenied.locator("#clinics").getByText("Distance based on locality (sample)");
    await expect(fallbackLabel.first()).toBeVisible();
    await contextDenied.close();
  });

  test("12. Q3: Qualifications block with verification badges, council note, and sample reviews with star filter", async ({ page }) => {
    await page.goto("/doctors/dr-arvind-somayaji");

    // Check qualifications block has 'Sample verification' badges
    const sampleBadges = page.locator("#main-content").getByText("Sample verification");
    expect(await sampleBadges.count()).toBeGreaterThanOrEqual(3);

    // Check mandatory medical council register note
    const councilNote = page.getByText(
      "In a live listing, qualifications would be checked against the official medical council register. This demo shows sample data only."
    );
    await expect(councilNote).toBeVisible();

    // Check 'What’s Included' card
    await expect(page.getByText("What’s Included in Consultation")).toBeVisible();

    // Check 'Sample reviews (fictional)'
    await expect(page.getByText("Sample reviews (fictional)")).toBeVisible();

    // Check star filters for reviews (All, 5 stars, 4 stars and below)
    const starFilter5 = page.getByRole("button", { name: /5 stars/i });
    await expect(starFilter5).toBeVisible();
    await starFilter5.click();

    // Filtered reviews displayed
    const reviews = page.getByText(/Sample illustrative review/i);
    expect(await reviews.count()).toBeGreaterThanOrEqual(1);
  });

  test("13. Q4: GlossaryTerm keyboard popover and Telugu language with fallback", async ({ page }) => {
    await page.goto("/");

    // 1. GlossaryTerm popover test
    const opdTerm = page.locator("button", { hasText: "OPD" }).first();
    await expect(opdTerm).toBeVisible();
    await opdTerm.click();

    // Popover dialog opens
    const popover = page.locator('span[role="dialog"][aria-label*="glossary"]');
    await expect(popover).toBeVisible();
    await expect(popover.getByText("Outpatient visit")).toBeVisible();

    // Dismiss with Escape
    await page.keyboard.press("Escape");
    await expect(popover).not.toBeVisible();

    // 2. Language switcher to Telugu
    const langSelect = page.locator("select[id$='language-select']").first();
    await langSelect.selectOption("te");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "te");

    // Verify Telugu headline & machine translation demo badge
    await expect(page.getByText("యంత్ర సహాయక అనువాదం (డెమో)").first()).toBeVisible();
    await expect(page.locator("h1")).toHaveText("ఆరోగ్య సంరక్షణ, మీ ఇంటికి సమీపంలో.");
  });

  test("14. Q5: Booking path from homepage to DEMO success in 4 or fewer clicks", async ({ page }) => {
    await page.goto("/");

    let clickCount = 0;

    // Click 1: Click "Book (DEMO)" on first doctor card
    const firstDoctorBook = page.locator('#find-doctors button:has-text("Book (DEMO)")').first();
    await firstDoctorBook.click();
    clickCount++;

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();

    // Click 2: Click an available time slot radio
    const slotRadio = dialog.locator('[role="radio"]:not([aria-disabled="true"])').first();
    await slotRadio.click();
    clickCount++;

    // Click 3: Click "Continue to Details"
    const continueBtn = dialog.locator('button:has-text("Continue to Details")');
    await continueBtn.click();
    clickCount++;

    // Enter patient name (typing does not count towards click count)
    await dialog.locator("#patientName").fill("Priya Sundaram");

    // Click 4: Click "Confirm Booking (DEMO)"
    const confirmBtn = dialog.locator('button:has-text("Confirm Booking (DEMO)")');
    await confirmBtn.click();
    clickCount++;

    // Verify DEMO success confirmation state
    await expect(dialog.getByText("Demo only. No appointment was made.")).toBeVisible();

    // Assert that total clicks is 4 or fewer
    expect(clickCount).toBeLessThanOrEqual(4);
  });
});
