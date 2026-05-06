import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
await p.goto('https://impeccable.style/', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(3000);

const tree = await p.evaluate(() => {
  const hero = document.querySelector('#hero');
  if (!hero) return null;
  const walk = (el, depth = 0) => {
    if (depth > 6) return null;
    const r = el.getBoundingClientRect();
    if (r.height < 8) return null;
    const cs = getComputedStyle(el);
    const node = {
      tag: el.tagName,
      cls: (el.className+'').slice(0, 80),
      id: el.id || '',
      h: Math.round(r.height),
      top: Math.round(r.top),
      mTop: cs.marginTop, mBot: cs.marginBottom,
      pTop: cs.paddingTop, pBot: cs.paddingBottom,
      minH: cs.minHeight !== 'auto' && cs.minHeight !== '0px' ? cs.minHeight : null,
      kids: []
    };
    for (const kid of el.children) {
      const k = walk(kid, depth + 1);
      if (k) node.kids.push(k);
    }
    return node;
  };
  return walk(hero);
});

const print = (n, depth = 0) => {
  if (!n) return;
  const tag = `${n.tag}${n.id ? '#' + n.id : ''}${n.cls ? '.' + n.cls.split(' ').join('.') : ''}`;
  const padInfo = (n.pTop && n.pTop !== '0px') || (n.pBot && n.pBot !== '0px') ? ` p:${n.pTop}/${n.pBot}` : '';
  const margInfo = (n.mTop && n.mTop !== '0px') || (n.mBot && n.mBot !== '0px') ? ` m:${n.mTop}/${n.mBot}` : '';
  const minH = n.minH ? ` minH:${n.minH}` : '';
  console.log(`${'  '.repeat(depth)}h=${n.h}px ${tag.slice(0, 80)}${padInfo}${margInfo}${minH}`);
  for (const k of n.kids) print(k, depth + 1);
};
print(tree);

await browser.close();
