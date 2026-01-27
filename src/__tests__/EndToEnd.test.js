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
    await page.waitForSelector('.event .detail-btn');

    await page.click('.event .detail-btn');

    await page.waitForFunction(() => {
      const el = document.querySelector('.event .details');
      return el && el.classList.contains('open');
    });

    const hasOpenClass = await page.$eval('.event .details', (el) =>
      el.classList.contains('open')
    );

    expect(hasOpenClass).toBe(true);
  });

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
    await page.waitForSelector('#event-list');
    
    // Get number of events currently rendered in list
    const eventCount = await page.$$eval('#event-list li', items => items.length);

    // Expect all events (based on your mock-data, e.g., 32)
    expect(eventCount).toBe(32); 
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

    // Wait for event list to update and check filtered events count
    await page.waitForSelector('#event-list');
    
    // Get number of events currently rendered in list
    const filteredEventCount = await page.$$eval('#event-list li', items => items.length);

    // Since this depends on your mock-data, hardcoded number is fragile
    // Ideally, use API or mock data here to get expected count dynamically, or just expect less than total
    expect(filteredEventCount).toBeLessThan(32);
    expect(filteredEventCount).toBeGreaterThan(0);
  });

});


/*
  describe('show/hide an event details', () => {
    test('An event element is collapsed by default', async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto('http://localhost:5173/');
      await page.waitForSelector('.event');

      const eventDetails = await page.$('.event .details');
      const isVisible = await eventDetails.isVisible();

      expect(isVisible).toBe(false);

      await browser.close();
    });
    test('User can expand an event to see its details', async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://localhost:5173/');

      await page.waitForSelector('.event');
      await page.click('.event .details-btn');

      const eventDetails = await page.$('.event .details');
      expect(eventDetails).toBeDefined();
      await browser.close();
    });
  }); 
*/