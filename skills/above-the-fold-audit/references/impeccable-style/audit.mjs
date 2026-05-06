import { chromium } from 'playwright';
const T = '/Users/trevoranderson/Antigravity Projects';
const URL = 'https://impeccable.style/';
const browser = await chromium.launch();

const breakpoints = [
  { name: 'iphone-se',  w: 375, h: 667 },
  { name: 'iphone-14',  w: 390, h: 844 },
  { name: 'galaxy-s8',  w: 360, h: 740 },
];

for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(3500);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  // Above-the-fold viewport
  await p.screenshot({ path: `${T}/impeccable-${bp.name}-fold.png`, fullPage: false });
  // Hero full
  const hero = await p.$('#hero');
  if (hero) await hero.screenshot({ path: `${T}/impeccable-${bp.name}-hero.png` });

  // Diagnose: find hero element + first CTA, measure positions
  const data = await p.evaluate((vh) => {
    const hero = document.querySelector('#hero');
    if (!hero) return { error: 'no hero' };
    const heroRect = hero.getBoundingClientRect();
    const heroStyle = getComputedStyle(hero);
    const buttons = Array.from(hero.querySelectorAll('a, button'));
    const ctas = buttons.map(b => {
      const r = b.getBoundingClientRect();
      const cs = getComputedStyle(b);
      return {
        text: (b.textContent || '').trim().slice(0, 50),
        topInVP: Math.round(r.top),
        bottomInVP: Math.round(r.bottom),
        h: Math.round(r.height),
        aboveFold: r.top < vh,
        bg: cs.backgroundColor,
      };
    }).filter(c => c.text && c.h > 20);
    // Top-level children inside hero
    const direct = Array.from(hero.children).map(el => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: (el.className+'').slice(0,50),
        top: Math.round(r.top),
        h: Math.round(r.height),
        marginTop: cs.marginTop, marginBottom: cs.marginBottom,
        paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom,
      };
    });
    // also pull computed styles of hero itself
    return {
      vh,
      heroTop: Math.round(heroRect.top),
      heroBottom: Math.round(heroRect.bottom),
      heroHeight: Math.round(heroRect.height),
      heroPadTop: heroStyle.paddingTop,
      heroPadBottom: heroStyle.paddingBottom,
      heroMinHeight: heroStyle.minHeight,
      ctas,
      direct
    };
  }, bp.h);
  console.log(`\n=== ${bp.name} (${bp.w}x${bp.h}) ===`);
  console.log(JSON.stringify(data, null, 2));
  await ctx.close();
}
await browser.close();
