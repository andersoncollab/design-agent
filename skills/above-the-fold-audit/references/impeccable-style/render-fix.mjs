import { chromium } from 'playwright';
const T = '/Users/trevoranderson/Antigravity Projects';
const URL = 'https://impeccable.style/';

// Surgical CSS using REAL class names from the live DOM
const PROPOSED_CSS = `
@media (max-width: 768px) {
  /* 1) Stop forcing hero to viewport height — let content flow */
  #hero.hero-combined {
    min-height: 0 !important;
    padding-top: 16px !important;
    padding-bottom: 32px !important;
  }

  /* 2) Reorder: text + CTA column FIRST, mockup second */
  .hero-combined-container {
    display: flex !important;
    flex-direction: column !important;
    gap: 24px !important;
  }
  .hero-combined-left  { order: 1 !important; padding-bottom: 0 !important; }
  .hero-combined-right { order: 2 !important; padding-top: 0 !important; }

  /* 3) Tighten the version-link nudge below the CTA — it adds 58px for a single line */
  .hero-version-link { margin-top: 12px !important; }

  /* 4) Cap the mockup so it shrinks to fit screen and doesn't dominate the page */
  #lens-comparison.split-comparison {
    max-height: 60vh !important;
    margin: 0 !important;
    padding: 16px !important;
  }
  #lens-comparison .split-container { max-height: 50vh !important; }

  /* 5) Tighten "what's included" box and CTA-group margins */
  .hero-included-box { margin: 4px 0 0 !important; padding: 8px !important; }
  .hero-cta-group    { margin-top: 12px !important; }
  .hero-cta-combined { padding: 14px 16px !important; }
}
`;

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
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(3500);

  // BEFORE
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${T}/impeccable-${bp.name}-BEFORE.png`, fullPage: false });
  const before = await p.evaluate(() => {
    const cta = document.querySelector('.hero-cta-combined');
    if (!cta) return null;
    const r = cta.getBoundingClientRect();
    const heroH = document.querySelector('#hero')?.getBoundingClientRect().height;
    return { ctaTop: Math.round(r.top), ctaH: Math.round(r.height), heroH: Math.round(heroH) };
  });

  // AFTER
  await p.addStyleTag({ content: PROPOSED_CSS });
  await p.waitForTimeout(800);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${T}/impeccable-${bp.name}-AFTER.png`, fullPage: false });
  const after = await p.evaluate(() => {
    const cta = document.querySelector('.hero-cta-combined');
    if (!cta) return null;
    const r = cta.getBoundingClientRect();
    const heroH = document.querySelector('#hero')?.getBoundingClientRect().height;
    return { ctaTop: Math.round(r.top), ctaH: Math.round(r.height), heroH: Math.round(heroH) };
  });

  console.log(`\n${bp.name} (${bp.w}x${bp.h})`);
  console.log(`  BEFORE: hero=${before.heroH}px  cta@${before.ctaTop}px  aboveFold=${before.ctaTop + before.ctaH < bp.h}`);
  console.log(`  AFTER:  hero=${after.heroH}px  cta@${after.ctaTop}px  aboveFold=${after.ctaTop + after.ctaH < bp.h}`);
  console.log(`  saved: ${before.heroH - after.heroH}px hero,  ${before.ctaTop - after.ctaTop}px CTA position`);
  await ctx.close();
}
await browser.close();
