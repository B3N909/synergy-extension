// launch puppeteer and print remote debugging URL

(async () => {
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.connect({
        browserURL: "http://127.0.0.1:9222"
    });
    const page = await browser.newPage();
    await page.goto("https://reddit.com");
    console.log(`Remote debugging URL: http://127.0.0.1:9222`);
})();