/*! METAL HUB - "All topics" menu (menu.js). Adds a small button to the top bar that opens a clean list of every category.
 *  Self-contained, no dependencies. Works for Hebrew (RTL) and English (LTR) pages (detected from <html lang>).
 *  Safe by design: if anything is unexpected (no top bar, already added) it does nothing. */
(function () {
  'use strict';
  if (window.__mhMenu) { return; }
  window.__mhMenu = true;
  function run() { try { init(); } catch (e) { if (window.console && console.warn) { console.warn('[menu]', e); } } }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', run); } else { run(); }

  function init() {
    var doc = document, html = doc.documentElement, tb = doc.getElementById('topbar');
    if (!tb || doc.getElementById('mh-menu-btn')) { return; }
    var cfg = window.MH_MENU || {};
    var HE = (html.getAttribute('lang') || 'he').toLowerCase().indexOf('he') === 0;
    var origin = cfg.origin || '';
    var base = origin + (HE ? '/' : '/en/');
    var cur = cfg.current || (function () { var m = location.pathname.match(/([^\/]+)\.html$/); return m ? m[1] : 'index'; })();
    var T = HE ? { btn: '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd', title: '\u05db\u05dc \u05d4\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd', home: '\u05e2\u05de\u05d5\u05d3 \u05d4\u05d1\u05d9\u05ea', smart: '\u05d7\u05d9\u05e4\u05d5\u05e9 \u05d7\u05db\u05dd', close: '\u05e1\u05d2\u05d9\u05e8\u05d4', newtab: ' (\u05e0\u05e4\u05ea\u05d7 \u05d1\u05dc\u05e9\u05d5\u05e0\u05d9\u05ea \u05d7\u05d3\u05e9\u05d4)' } : { btn: 'Topics', title: 'All topics', home: 'Home', smart: 'Smart Search', close: 'Close', newtab: ' (opens in a new tab)' };
    var G = [
      { he: '\u05e1\u05e8\u05d8\u05d5\u05e0\u05d9 \u05d4\u05d3\u05e8\u05db\u05d4', en: 'Video Courses', v: 1, i: [
        ['gdt-video', '\ud83c\udfac', '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05ea \u05d2\u05d9\u05d0\u05d5\u05de\u05d8\u05e8\u05d9\u05ea (GD&T)', 'Geometric Tolerancing (GD&T)', '/gdt-video/', '/en/gdt-video-en/'],
        ['manufacturing-course', '\ud83c\udfac', '\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d5\u05ea \u05d9\u05d9\u05e6\u05d5\u05e8 \u05d5\u05e2\u05d9\u05d1\u05d5\u05d3', 'Manufacturing Processes', '/manufacturing-course.html', '/en/manufacturing-course-en.html'],
        ['coatings-course', '\ud83c\udfac', '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd, \u05d2\u05d9\u05de\u05d5\u05e8\u05d9\u05dd \u05d5\u05e6\u05d1\u05e2', 'Coatings, Finishes & Paint', '/coatings-course.html', '/en/coatings-course.html'],
        ['metallurgy-course', '\ud83c\udfac', '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05d5\u05de\u05d8\u05dc\u05d5\u05e8\u05d2\u05d9\u05d4', 'Materials & Metallurgy', '/metallurgy-course.html', '/en/metallurgy-course.html'],
        ['drawing-course', '\ud83c\udfac', '\u05e7\u05e8\u05d9\u05d0\u05ea \u05e9\u05e8\u05d8\u05d5\u05d8', 'Drawing Reading', '/drawing-course.html', '/en/drawing-course.html']] },
      { he: '\u05d9\u05d9\u05e6\u05d5\u05e8 \u05d5\u05e2\u05d9\u05d1\u05d5\u05d3', en: 'Manufacturing', i: [
        ['mfgtech', '\ud83c\udfed', '\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d5\u05ea \u05d9\u05d9\u05e6\u05d5\u05e8', 'Manufacturing Technologies'], ['machining', '\ud83d\udd27', '\u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05db\u05e0\u05d9', 'Machining'],
        ['threads', '\ud83d\udd29', '\u05d4\u05d1\u05e8\u05d2\u05d5\u05ea', 'Threads'], ['welding', '\u26a1', '\u05e8\u05d9\u05ea\u05d5\u05da', 'Welding'], ['heat', '\ud83d\udd25', '\u05d8\u05d9\u05e4\u05d5\u05dc\u05d9 \u05d7\u05d5\u05dd', 'Heat Treatment'],
        ['coatings', '\ud83c\udfa8', '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd', 'Coatings'], ['dfm', '\ud83c\udfd7\ufe0f', '\u05ea\u05db\u05df \u05dc\u05d9\u05d9\u05e6\u05d5\u05e8', 'Design for Manufacturing']] },
      { he: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd', en: 'Materials', i: [
        ['materials', '\ud83e\uddf1', '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd', 'Materials Database'], ['metallurgy', '\ud83d\udd2c', '\u05de\u05d8\u05dc\u05d5\u05e8\u05d2\u05d9\u05d4', 'Metallurgy'],
        ['corrosion', '\u26a1', '\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4', 'Corrosion'], ['chem', '\ud83e\uddea', '\u05db\u05d9\u05de\u05d9\u05d4 \u05d4\u05e0\u05d3\u05e1\u05d9\u05ea', 'Engineering Chemistry']] },
      { he: '\u05e8\u05db\u05d9\u05d1\u05d9\u05dd \u05d5\u05ea\u05db\u05df', en: 'Components & Design', i: [
        ['bearings', '\u2699\ufe0f', '\u05de\u05e1\u05d1\u05d9\u05dd', 'Bearings'], ['gears', '\u2699\ufe0f', '\u05d2\u05dc\u05d2\u05dc\u05d9 \u05e9\u05d9\u05e0\u05d9\u05d9\u05dd', 'Gears'], ['powertrans', '\u26d3\ufe0f', '\u05d4\u05e2\u05d1\u05e8\u05ea \u05db\u05d5\u05d7', 'Power Transmission'],
        ['springs', '\ud83c\udf00', '\u05e7\u05e4\u05d9\u05e6\u05d9\u05dd', 'Springs'], ['seals', '\ud83d\udd35', '\u05d0\u05d8\u05de\u05d9\u05dd', 'Seals & Gaskets'], ['fasteners', '\ud83d\udd17', '\u05d7\u05d9\u05d1\u05d5\u05e8\u05d9\u05dd', 'Fasteners'],
        ['inserts', '\ud83d\udd29', '\u05e7\u05e9\u05d9\u05d7\u05d9\u05dd', 'Threaded Inserts'], ['hydraulics', '\ud83d\udca7', '\u05d4\u05d9\u05d3\u05e8\u05d0\u05d5\u05dc\u05d9\u05e7\u05d4', 'Hydraulics'], ['stress', '\ud83d\udcca', '\u05e0\u05d9\u05ea\u05d5\u05d7 \u05e2\u05d5\u05de\u05e1\u05d9\u05dd', 'Stress Analysis']] },
      { he: '\u05d0\u05d9\u05db\u05d5\u05ea, \u05de\u05d3\u05d9\u05d3\u05d4 \u05d5\u05ea\u05e7\u05e0\u05d9\u05dd', en: 'Quality & Standards', i: [
        ['gdt', '\u2295', 'GD&T', 'GD&T'], ['tol', '\ud83d\udccf', '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05d9\u05d5\u05ea', 'Tolerances & Fits'], ['surface', '\u2726', '\u05d8\u05d9\u05d1 \u05e9\u05d8\u05d7', 'Surface Finish'],
        ['inspection', '\ud83d\udd0d', '\u05d1\u05d3\u05d9\u05e7\u05d4 \u05d5\u05d0\u05d9\u05db\u05d5\u05ea', 'Inspection & Quality'], ['pressure', '\ud83d\udd2c', '\u05d1\u05d3\u05d9\u05e7\u05d5\u05ea \u05dc\u05d7\u05e5', 'Pressure Testing'], ['fmea', '\u26a0\ufe0f', 'FMEA', 'FMEA'],
        ['changes', '\ud83d\udcc4', '\u05e0\u05d9\u05d4\u05d5\u05dc \u05e9\u05d9\u05e0\u05d5\u05d9\u05d9\u05dd', 'Change Management'], ['standards', '\ud83d\udccb', '\u05ea\u05e7\u05e0\u05d9\u05dd', 'Standards']] },
      { he: '\u05db\u05dc\u05d9\u05dd \u05d5\u05de\u05d9\u05d3\u05e2', en: 'Tools & Reference', i: [
        ['calc', '\ud83e\uddee', '\u05de\u05d7\u05e9\u05d1\u05d5\u05e0\u05d9\u05dd', 'Calculators'], ['pricing', '\ud83d\udcb0', '\u05ea\u05de\u05d7\u05d9\u05e8', 'Pricing & Cost'], ['glossary', '\ud83d\udcd6', '\u05de\u05d9\u05dc\u05d5\u05df \u05de\u05d5\u05e0\u05d7\u05d9\u05dd', 'Glossary']] }
    ];

    var css = [
      '#mh-menu-btn{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;background:var(--card,#1c2128);border:1px solid var(--border,#30363d);border-radius:8px;color:var(--text,#e6edf3);cursor:pointer;font:600 13px/1 var(--font,system-ui,sans-serif);padding:7px 11px}',
      '#mh-menu-btn:hover,#mh-menu-btn[aria-expanded="true"]{border-color:var(--blue,#58a6ff)}',
      '#mh-menu-btn .mhm-bars{font-size:16px;line-height:1}',
      '#mh-menu-btn:focus-visible,#mh-menu-panel a:focus-visible{outline:2px solid var(--blue,#58a6ff);outline-offset:2px}',
      '#mh-menu-panel{position:fixed;top:58px;inset-inline-start:12px;z-index:101;width:min(880px,calc(100vw - 24px));max-height:calc(100vh - 72px);overflow-y:auto;padding:12px 16px 14px;background:var(--surface,#161b22);color:var(--text,#e6edf3);border:1px solid var(--border,#30363d);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.5);font-family:var(--font,system-ui,sans-serif)}',
      '#mh-menu-panel[hidden]{display:none!important}',
      '#mh-menu-panel ul{list-style:none;margin:0;padding:0}',
      '#mh-menu-panel .mhm-cols{column-width:200px;column-gap:20px;margin-top:8px}',
      '#mh-menu-panel .mhm-grp{break-inside:avoid;margin:0 0 14px}',
      '#mh-menu-panel .mhm-h{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted,#8b949e);margin:0 0 4px;padding:0 8px}',
      '#mh-menu-panel a{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:8px;color:var(--text,#e6edf3);text-decoration:none;font-size:14px;line-height:1.25;border-inline-start:3px solid transparent}',
      '#mh-menu-panel a:hover{background:var(--card,#1c2128)}',
      '#mh-menu-panel a.mhm-cur{background:var(--card,#1c2128);border-inline-start-color:var(--blue,#58a6ff);font-weight:700}',
      '#mh-menu-panel .mhm-vid .mhm-h{color:var(--blue,#58a6ff)}',
      '#mh-menu-panel .mhm-ext{margin-inline-start:auto;color:var(--muted,#8b949e);font-size:12px}',
      '#mh-menu-panel .mhm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
      '#mh-menu-panel .mhm-ic{width:22px;flex:0 0 22px;text-align:center;font-size:16px}',
      '#mh-menu-panel .mhm-top{display:flex;align-items:center;justify-content:space-between;gap:10px}',
      '#mh-menu-panel .mhm-home{display:flex;flex-wrap:wrap;gap:6px;flex:1 1 auto}',
      '#mh-menu-panel .mhm-home li{flex:0 1 auto}',
      '#mh-menu-panel .mhm-home a{white-space:nowrap}',
      '#mh-menu-panel .mhm-x{flex:0 0 auto;width:34px;height:34px;border-radius:8px;border:1px solid var(--border,#30363d);background:var(--card,#1c2128);color:var(--text,#e6edf3);font-size:15px;line-height:1;cursor:pointer}',
      '#mh-menu-panel .mhm-x:hover{border-color:var(--blue,#58a6ff)}',
      '#mh-menu-panel .mhm-x:focus-visible{outline:2px solid var(--blue,#58a6ff);outline-offset:2px}',
      '@media(max-width:700px){#mh-menu-btn .mhm-tx{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}#mh-menu-btn{padding:7px 10px}#mh-menu-panel{inset-inline-start:8px;inset-inline-end:8px;width:auto;top:56px;padding:10px 10px 12px;max-height:calc(100vh - 124px)}#mh-menu-panel .mhm-cols{column-width:150px;column-gap:10px}#mh-menu-panel a{font-size:13px;padding:7px 6px;gap:7px}#mh-menu-panel .mhm-grp{margin-bottom:10px}}',
      '@media print{#mh-menu-btn,#mh-menu-panel{display:none!important}}'
    ].join('\n');
    var st = doc.createElement('style'); st.id = 'mh-menu-css'; st.appendChild(doc.createTextNode(css)); (doc.head || html).appendChild(st);

    function el(tag, attrs, text) { var e = doc.createElement(tag), k; if (attrs) { for (k in attrs) { if (Object.prototype.hasOwnProperty.call(attrs, k)) { e.setAttribute(k, attrs[k]); } } } if (text != null) { e.textContent = text; } return e; }
    function link(href, icon, label, key, ext) {
      var a = el('a', { href: href });
      a.appendChild(el('span', { 'class': 'mhm-ic', 'aria-hidden': 'true' }, icon));
      a.appendChild(el('span', null, label));
      if (ext) {   /* video courses open full screen in a new tab, like the existing "open in full window" buttons */
        a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
        a.appendChild(el('span', { 'class': 'mhm-ext', 'aria-hidden': 'true' }, '\u2197'));
        a.appendChild(el('span', { 'class': 'mhm-sr' }, T.newtab));
      }
      if (key === cur) { a.className = 'mhm-cur'; a.setAttribute('aria-current', 'page'); }
      return a;
    }

    var btn = el('button', { id: 'mh-menu-btn', type: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-controls': 'mh-menu-panel', title: T.title });
    btn.appendChild(el('span', { 'class': 'mhm-bars', 'aria-hidden': 'true' }, '\u2630'));
    btn.appendChild(el('span', { 'class': 'mhm-tx' }, T.btn));

    var panel = el('nav', { id: 'mh-menu-panel', 'aria-label': T.title });
    panel.hidden = true;
    var topRow = el('div', { 'class': 'mhm-top' }), homeUl = el('ul', { 'class': 'mhm-home' }), homeLi = el('li');
    homeLi.appendChild(link(base, '\ud83c\udfe0', T.home, 'index')); homeUl.appendChild(homeLi);
    var smartLi = el('li'); smartLi.appendChild(link(base + 'explore.html', '\ud83e\udded', T.smart, 'explore')); homeUl.appendChild(smartLi); topRow.appendChild(homeUl);
    var xBtn = el('button', { type: 'button', 'class': 'mhm-x', 'aria-label': T.close }, '\u2715'); topRow.appendChild(xBtn); panel.appendChild(topRow);
    var cols = el('div', { 'class': 'mhm-cols' });
    G.forEach(function (g, gi) {
      var grp = el('div', { 'class': g.v ? 'mhm-grp mhm-vid' : 'mhm-grp' }), id = 'mhm-h' + gi;
      grp.appendChild(el('div', { 'class': 'mhm-h', id: id }, HE ? g.he : g.en));
      var ul = el('ul', { 'aria-labelledby': id });
      g.i.forEach(function (it) { var li = el('li'); li.appendChild(link(it[4] ? origin + (HE ? it[4] : it[5]) : base + it[0] + '.html', it[1], HE ? it[2] : it[3], it[0], !!it[4])); ul.appendChild(li); });
      grp.appendChild(ul); cols.appendChild(grp);
    });
    panel.appendChild(cols);

    var logo = tb.querySelector('.logo');
    if (logo && logo.nextSibling) { tb.insertBefore(btn, logo.nextSibling); } else { tb.appendChild(btn); }
    doc.body.appendChild(panel);

    function openMenu() {
      panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
      var c = panel.querySelector('.mhm-cur') || panel.querySelector('a');
      if (c) { try { c.scrollIntoView({ block: 'nearest' }); c.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    }
    function closeMenu(refocus) { if (panel.hidden) { return; } panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (refocus) { btn.focus(); } }
    xBtn.addEventListener('click', function () { closeMenu(true); });
    btn.addEventListener('click', function () { if (panel.hidden) { openMenu(); } else { closeMenu(true); } });
    doc.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) { closeMenu(false); } });
    doc.addEventListener('keydown', function (e) { if ((e.key === 'Escape' || e.key === 'Esc') && !panel.hidden) { closeMenu(true); } });
  }
})();
