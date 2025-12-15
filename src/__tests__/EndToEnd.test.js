import puppeteer from 'puppeteer';



describe('show/hide an event details', () => {
    test('An event element is collapsed by default', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto('http://localhost:5174/'); // If your Vercel app is running in a different port please update it here

        // If your event element has a different selector, use it instead of .event
        await page.waitForSelector('.event');

        // If your event's details have a different selector, use it instead of .event .details
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
        await browser.close();
    });
});

/* 
chatgbt version, also fails:


import fs from 'fs';
import path from 'path';

describe('show/hide an event details', () => {
  let browser;
  let page;
  let userDataDir;

  beforeAll(async () => {
    userDataDir = path.join(
      process.cwd(),
      'puppeteer-profile-' + Date.now()
    );

    browser = await puppeteer.launch({
      headless: true,
      userDataDir
    });

    page = await browser.newPage();
    await page.goto('http://localhost:5174/');
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
      // wait a moment to ensure browser releases files
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
*/