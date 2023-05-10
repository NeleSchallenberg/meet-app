import puppeteer from 'puppeteer-core';

describe('show/hide an event details', () => {
	let browser;
	let page;
	jest.setTimeout(100000);

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 250,
			ignoreDefaultArgs: ['--disable-extensions'],
		});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});
	afterAll(() => {
		browser.close();
	});

	test('An event element is collapsed by default', async () => {
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeNull();
	});

	test('User can expand an event to see its details', async () => {
		await page.click('.event .details-btn');
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeDefined();
	});

	test('User can collapse an event to hide its details', async () => {
		await page.click('.event .details-btn');
		const eventDetails = await page.$('.event .event-details');
		expect(eventDetails).toBeNull();
	});
});

describe('filter events by city', () => {
	let browser;
	let page;

	jest.setTimeout(100000);

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 250,
			ignoreDefaultArgs: ['--disable-extensions'],
		});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.city-search');
	});

	afterAll(() => {
		browser.close();
	});

	test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {});

	test('User should see a list of suggestions when they search for a city', async () => {
		await page.type('.city', 'London', { delay: 100 });
		const suggestions = await page.$('.suggestions');
		expect(suggestions).toBeDefined();
	});

	test('User can select a city from the suggested list', async () => {
		await page.click('.suggestions li');
		const selectedCity = await page.$eval(
			'.city-search .city',
			(ele) => ele.value
		);
		console.log('Selected city ' + selectedCity);
	});
});
