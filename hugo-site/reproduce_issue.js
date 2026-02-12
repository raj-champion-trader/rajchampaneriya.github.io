
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const baseUrl = 'http://localhost:5555';

    // Create artifacts directory if it doesn't exist
    const artifactsDir = '/Users/champion.trader/.gemini/antigravity/brain/6f8dd2d9-a238-4c9e-8266-787e5adc0c5a';
    if (!fs.existsSync(artifactsDir)) {
        fs.mkdirSync(artifactsDir, { recursive: true });
    }

    const pages = [
        { name: 'blog', url: `${baseUrl}/blog/` },
        { name: 'projects', url: `${baseUrl}/projects/` },
        { name: 'about', url: `${baseUrl}/about/` }
    ];

    for (const p of pages) {
        try {
            console.log(`Navigating to ${p.url}...`);
            await page.goto(p.url, { waitUntil: 'networkidle' });

            // Take full page screenshot
            const screenshotPath = path.join(artifactsDir, `${p.name}_before.png`);
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved to ${screenshotPath}`);

        } catch (error) {
            console.error(`Error processing ${p.name}:`, error);
        }
    }

    await browser.close();
})();
