import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto('http://localhost:4300');
await p.screenshot({ path: 'qa/desktop-first-screen.png' });
await p.screenshot({ path: 'qa/home-desktop.png', fullPage: true });
await p.setViewportSize({ width: 390, height: 900 });
await p.screenshot({ path: 'qa/mobile-first-screen.png' });
await b.close();
