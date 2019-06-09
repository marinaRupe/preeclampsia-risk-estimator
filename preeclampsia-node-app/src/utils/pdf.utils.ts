import * as puppeteer from 'puppeteer';

export const createPDFFromHTML = async (html: string): Promise<Buffer> => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setContent(html);
	const buffer = await page.pdf({
		format: 'A4',
		printBackground: true,
		margin: {
			left: '30px',
			top: '30px',
			right: '30px',
			bottom: '30px'
		}
	});
	await browser.close();
	return buffer;
};

export default {
	createPDFFromHTML,
};
