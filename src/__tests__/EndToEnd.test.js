/**
 * @jest-environment node
 */



import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ 
      headless: false,
      slowMo: 250,
      timeout:0 
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
  }, 30000);

  afterAll(async () => {
    if (browser) await browser.close();
  });

  test('An event element is collapsed by default', async () => {
    await page.waitForSelector('.event');

    const hasOpenClass = await page.$eval('.event .details', (el) =>
      el.classList.contains('open')
    );

    expect(hasOpenClass).toBe(false);
  });

  test('User can expand an event to see its details', async () => {
  await page.waitForSelector('.event');
  await page.waitForSelector('.event .detail-btn', { visible: true });

  // Click the first event's button
  await page.click('.event .detail-btn');

  // Wait until the first event's details has the "open" class
  await page.waitForSelector('.event .details.open', { timeout: 60000 });

  const hasOpenClass = await page.$eval('.event .details', (el) =>
    el.classList.contains('open')
  );

  expect(hasOpenClass).toBe(true);
  }, 60000);


});

describe('Filter events by city (Feature 1) - E2E tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // headless:false, slowMo: 50 for debugging
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/'); // Adjust port if needed
  });

  afterAll(async () => {
    await browser.close();
  });

  test("When user hasn't searched for a city, show upcoming events from all cities", async () => {
    await page.waitForSelector('#event-list li', { timeout: 10000 });

  const eventCount = await page.$$eval(
    '#event-list li',
    items => items.length
  );

  expect(eventCount).toBeGreaterThan(0);
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    await page.waitForSelector('#city-search input[type="text"]');
    await page.click('#city-search input[type="text"]');
    
    await page.type('#city-search input[type="text"]', 'Berlin');

    // Wait for suggestions to show
    await page.waitForSelector('#city-search ul.suggestions');
    
    const suggestionCount = await page.$$eval('#city-search ul.suggestions li', items => items.length);

    // Your acceptance test expects 2 suggestions for "Berlin"
    expect(suggestionCount).toBe(2);
  });

  test("User can select a city from the suggested list and see filtered events", async () => {
    
    
    // Clear the input first (optional)
    await page.click('#city-search input[type="text"]', { clickCount: 3 });
    await page.keyboard.press('Backspace');

    // Type "Berlin" again
    await page.type('#city-search input[type="text"]', 'Berlin');
    await page.waitForSelector('#city-search ul.suggestions');

    // Click the first suggestion ("Berlin, Germany")
    await page.click('#city-search ul.suggestions li:first-child');

    // Check that input value updated
    const inputValue = await page.$eval('#city-search input[type="text"]', el => el.value);
    expect(inputValue).toBe('Berlin, Germany');

    await page.waitForFunction(
      () => {
        const items = Array.from(
          document.querySelectorAll('#event-list li')
        );

        return (
          items.length > 0 &&
          items.every(item => item.textContent.includes('Berlin'))
        );
      },
      { timeout: 10000 }
    );

    const eventTexts = await page.$$eval(
      '#event-list li',
      items => items.map(item => item.textContent)
    );

    expect(eventTexts.length).toBeGreaterThan(0);

    eventTexts.forEach(text => {
      expect(text).toContain('Berlin');
    });
  });
});
