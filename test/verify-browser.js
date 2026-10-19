const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('--- 1. DESKTOP VIEWPORT: 1440x900 ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005');
  await page.waitForTimeout(600);

  // 1. Check computed styles
  const styles = await page.evaluate(() => {
    const body = document.body;
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');
    const bookBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Book Appointment'));
    const csBody = window.getComputedStyle(body);
    const csH1 = window.getComputedStyle(h1);
    const csHeader = window.getComputedStyle(header);
    const csBookBtn = bookBtn ? window.getComputedStyle(bookBtn) : null;
    return {
      bodyFontFamily: csBody.fontFamily,
      bodyBgColor: csBody.backgroundColor,
      bodyTextColor: csBody.color,
      h1FontFamily: csH1.fontFamily,
      h1TextColor: csH1.color,
      h1FontWeight: csH1.fontWeight,
      headerBgColor: csHeader.backgroundColor,
      headerPosition: csHeader.position,
      bookBtnBg: csBookBtn ? csBookBtn.backgroundColor : null,
      bookBtnColor: csBookBtn ? csBookBtn.color : null
    };
  });
  console.log('=== COMPUTED STYLES VERIFICATION ===');
  console.log(JSON.stringify(styles, null, 2));

  // Screenshot 1: Desktop Homepage Hero & Header
  const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  await page.screenshot({ path: path.join(screenshotDir, 'verify-desktop-header-hero.png'), fullPage: false });
  console.log('Captured: verify-desktop-header-hero.png');

  // Screenshot 2: Open Hospitals Mega Menu (States Details Menu)
  const hospitalsBtn = page.getByRole('button', { name: 'Hospitals & Clinics' });
  await hospitalsBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(screenshotDir, 'verify-mega-menu-hospitals-states.png'), fullPage: false });
  console.log('Captured: verify-mega-menu-hospitals-states.png');

  // Verify States Menu content
  const statesDetails = await page.evaluate(() => {
    const stateCards = document.querySelectorAll('a[href*="/hospitals?state="]');
    return Array.from(stateCards).map(card => {
      const stateName = card.querySelector('.font-bold')?.textContent?.trim();
      const count = card.querySelector('span.text-xs')?.textContent?.trim();
      return `${stateName} (${count})`;
    });
  });
  console.log('States Menu Links in Mega Menu (8 States):', statesDetails);

  // Screenshot 3: Open Find a Doctor Mega Menu
  const doctorsBtn = page.getByRole('button', { name: 'Find a Doctor' });
  await doctorsBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(screenshotDir, 'verify-mega-menu-doctors.png'), fullPage: false });
  console.log('Captured: verify-mega-menu-doctors.png');

  // Close mega menu by pressing Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  // Screenshot 4: Quick Access Services & Specialties
  await page.evaluate(() => window.scrollBy(0, 650));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(screenshotDir, 'verify-quick-access-and-specialties.png'), fullPage: false });
  console.log('Captured: verify-quick-access-and-specialties.png');

  // Screenshot 5: How CarePoint Works & Practical Services
  await page.evaluate(() => window.scrollBy(0, 1100));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(screenshotDir, 'verify-how-carepoint-works.png'), fullPage: false });
  console.log('Captured: verify-how-carepoint-works.png');

  // Screenshot 6: Mobile Viewport & Mobile Menu with States Explorer
  console.log('--- 2. MOBILE VIEWPORT: 390x844 ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3005');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(screenshotDir, 'verify-mobile-home.png'), fullPage: false });
  console.log('Captured: verify-mobile-home.png');

  // Open Mobile Menu
  await page.getByLabel('Open mobile navigation menu').click();
  // Expand States in Mobile Menu
  const toggleStatesBtn = page.getByLabel('Toggle States Menu');
  await toggleStatesBtn.click();
  await page.waitForTimeout(300);

  const mobileStates = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="state="]')).map(a => a.textContent.trim());
  });
  console.log('Mobile expanded states in drawer:', mobileStates);

  await page.screenshot({ path: path.join(screenshotDir, 'verify-mobile-menu-states.png'), fullPage: false });
  console.log('Captured: verify-mobile-menu-states.png');

  await browser.close();
  console.log('=== ALL BROWSER VISUAL VERIFICATIONS COMPLETED SUCCESSFULLY ===');
})();
