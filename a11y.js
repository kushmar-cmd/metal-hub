/*! METAL HUB - Accessibility toolbar (a11y.js) v1.0 - metal.kushmar.com
 *  Self-contained (no dependencies). Every mode is opt-in: until a visitor turns
 *  something on, the page looks and behaves exactly as before. The only default
 *  additions are the floating button, a statement link in the footer, and
 *  automatic "stop animations" for visitors whose OS asks for reduced motion.
 *  Works for Hebrew (RTL) and English (LTR) pages (detected from <html lang>).
 */
(function () {
  'use strict';
  if (window.__mhA11y) { return; }
  window.__mhA11y = true;

  function run() {
    try { init(); } catch (e) { if (window.console && console.warn) { console.warn('[a11y]', e); } }
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', run); } else { run(); }

  function init() {
    var doc = document, html = doc.documentElement, body = doc.body;
    if (!body || doc.getElementById('mh-a11y-root')) { return; }

    var KEY = 'mh-a11y';
    var HE = (html.getAttribute('lang') || 'he').toLowerCase().indexOf('he') === 0;
    var STATEMENT_URL = HE ? '/accessibility.html' : '/en/accessibility.html';
    var ZOOMS = [1, 1.15, 1.3, 1.5];
    var TOGGLES = ['contrast', 'invert', 'gray', 'links', 'font', 'noanim', 'cursor', 'guide'];

    var T = HE ? {
      title: '\u05db\u05dc\u05d9 \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea', open: '\u05e4\u05ea\u05d9\u05d7\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea', close: '\u05e1\u05d2\u05d9\u05e8\u05d4',
      zminus: '\u05d4\u05e7\u05d8\u05e0\u05ea \u05d8\u05e7\u05e1\u05d8', zplus: '\u05d4\u05d2\u05d3\u05dc\u05ea \u05d8\u05e7\u05e1\u05d8', zlabel: '\u05d2\u05d5\u05d3\u05dc \u05d8\u05e7\u05e1\u05d8',
      contrast: '\u05e0\u05d9\u05d2\u05d5\u05d3\u05d9\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4', invert: '\u05d4\u05d9\u05e4\u05d5\u05da \u05e6\u05d1\u05e2\u05d9\u05dd', gray: '\u05d2\u05d5\u05d5\u05e0\u05d9 \u05d0\u05e4\u05d5\u05e8',
      links: '\u05d4\u05d3\u05d2\u05e9\u05ea \u05e7\u05d9\u05e9\u05d5\u05e8\u05d9\u05dd', font: '\u05d2\u05d5\u05e4\u05df \u05e7\u05e8\u05d9\u05d0', noanim: '\u05e2\u05e6\u05d9\u05e8\u05ea \u05d0\u05e0\u05d9\u05de\u05e6\u05d9\u05d5\u05ea',
      cursor: '\u05e1\u05de\u05df \u05d2\u05d3\u05d5\u05dc', guide: '\u05de\u05d3\u05e8\u05d9\u05da \u05e7\u05e8\u05d9\u05d0\u05d4', reset: '\u05d0\u05d9\u05e4\u05d5\u05e1 \u05d4\u05d2\u05d3\u05e8\u05d5\u05ea', statement: '\u05d4\u05e6\u05d4\u05e8\u05ea \u05e0\u05d2\u05d9\u05e9\u05d5\u05ea'
    } : {
      title: 'Accessibility tools', open: 'Open accessibility menu', close: 'Close',
      zminus: 'Decrease text size', zplus: 'Increase text size', zlabel: 'Text size',
      contrast: 'High contrast', invert: 'Invert colors', gray: 'Grayscale',
      links: 'Highlight links', font: 'Readable font', noanim: 'Stop animations',
      cursor: 'Large cursor', guide: 'Reading guide', reset: 'Reset settings', statement: 'Accessibility statement'
    };

    /* ---------- state ---------- */
    var state = load();
    function load() {
      var s = { z: 0 }, i;
      for (i = 0; i < TOGGLES.length; i++) { s[TOGGLES[i]] = false; }
      try {
        var raw = window.localStorage.getItem(KEY);
        if (raw) {
          var o = JSON.parse(raw);
          if (o && typeof o === 'object') {
            if (typeof o.z === 'number' && o.z >= 0 && o.z < ZOOMS.length) { s.z = Math.floor(o.z); }
            for (i = 0; i < TOGGLES.length; i++) { s[TOGGLES[i]] = (o[TOGGLES[i]] === true); }
            return s;
          }
        }
      } catch (e) { /* storage unavailable or bad JSON: fall through to defaults */ }
      try {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { s.noanim = true; }
      } catch (e2) { /* ignore */ }
      return s;
    }
    function save() { try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }

    /* ---------- styles ---------- */
    var arrowSvg = "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><path d='M4 2 L4 26 L10 20 L15 30 L19 28 L14 18 L22 18 Z' fill='black' stroke='white' stroke-width='2' stroke-linejoin='round'/></svg>";
    var arrowYSvg = arrowSvg.replace("fill='black'", "fill='gold'");
    var curArrow = 'url("data:image/svg+xml,' + encodeURIComponent(arrowSvg) + '") 4 2, auto';
    var curClick = 'url("data:image/svg+xml,' + encodeURIComponent(arrowYSvg) + '") 4 2, pointer';

    var css = [
      '#mh-a11y-root{position:fixed;left:14px;bottom:14px;z-index:2147483000;font:14px/1.4 Arial,Helvetica,sans-serif;color:#e6edf3}',
      '#mh-a11y-root *{box-sizing:border-box}',
      '#mh-a11y-btn{display:flex;align-items:center;justify-content:center;width:48px;height:48px;padding:0;border-radius:50%;border:2px solid #fff;background:#1f6feb;color:#fff;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.5)}',
      '#mh-a11y-btn:hover{background:#388bfd}',
      '#mh-a11y-root button:focus-visible,#mh-a11y-root a:focus-visible,#mh-a11y-panel:focus-visible{outline:3px solid #ffd400;outline-offset:2px}',
      '#mh-a11y-panel{position:absolute;left:0;bottom:58px;width:292px;max-width:calc(100vw - 28px);max-height:calc(100vh - 100px);overflow:auto;padding:12px;border-radius:12px;background:var(--surface,#161b22);color:var(--text,#e6edf3);border:1px solid var(--border,#30363d);box-shadow:0 8px 28px rgba(0,0,0,.55)}',
      '#mh-a11y-panel[hidden]{display:none!important}',
      /* desktop/tablet: English pages put the button on the right; phones keep the original left position */
      '@media(min-width:701px){#mh-a11y-root.mh-r{left:auto;right:14px}#mh-a11y-root.mh-r #mh-a11y-panel{left:auto;right:0}}',
      '#mh-a11y-panel .mh-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;font-size:15px;font-weight:700}',
      '#mh-a11y-panel .mh-x{width:30px;height:30px;padding:0;border-radius:8px;border:1px solid var(--border,#30363d);background:var(--card,#1c2128);color:inherit;font-size:16px;cursor:pointer}',
      '#mh-a11y-panel .mh-sz{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}',
      '#mh-a11y-panel .mh-sz button{flex:1;padding:8px;border-radius:8px;border:1px solid var(--border,#30363d);background:var(--card,#1c2128);color:inherit;font-size:15px;font-weight:700;cursor:pointer}',
      '#mh-a11y-panel .mh-zv{min-width:52px;text-align:center;font-weight:700}',
      '#mh-a11y-panel .mh-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
      '#mh-a11y-panel .mh-t{padding:9px 6px;border-radius:8px;border:1px solid var(--border,#30363d);background:var(--card,#1c2128);color:inherit;font-size:13px;cursor:pointer;text-align:center}',
      '#mh-a11y-panel .mh-t:hover,#mh-a11y-panel .mh-sz button:hover,#mh-a11y-panel .mh-x:hover,#mh-a11y-panel .mh-rs:hover{border-color:var(--blue,#58a6ff)}',
      '#mh-a11y-panel .mh-t[aria-pressed="true"]{background:var(--blue,#58a6ff);border-color:var(--blue,#58a6ff);color:#0d1117;font-weight:700}',
      '#mh-a11y-panel .mh-t[aria-pressed="true"]::before{content:"\\2713  "}',
      '#mh-a11y-panel .mh-ft{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px;font-size:13px}',
      '#mh-a11y-panel .mh-rs{padding:8px 10px;border-radius:8px;border:1px solid var(--border,#30363d);background:transparent;color:inherit;font-size:13px;cursor:pointer}',
      '#mh-a11y-panel a{color:var(--blue,#58a6ff);text-decoration:underline}',
      '#mh-a11y-guide{position:fixed;left:0;right:0;top:-100px;height:44px;pointer-events:none;z-index:2147482000;background:rgba(255,212,0,.16);border-top:2px solid rgba(255,212,0,.9);border-bottom:2px solid rgba(255,212,0,.9)}',
      '@media print{#mh-a11y-root,#mh-a11y-guide{display:none!important}}',
      /* ----- phone layout fixes (max-width 700px): stop pages from scrolling sideways, keep the top bar on-screen ----- */
      '@media(max-width:700px){',
        '#topbar{gap:8px;padding:0 10px}',
        '#gsearch{min-width:0;flex:1 1 0;max-width:none}',
        '#topbar .logo{font-size:15px;flex:0 0 auto}',
        '#topbar .night-toggle,#topbar a{flex:0 0 auto}',
        '#topbar .ai-btn{font-size:0;padding:6px 10px}',
        '#topbar .ai-btn::before{content:"\ud83e\udd16";font-size:17px}',
        '#topbar a[aria-label^="Switch"],#topbar a[aria-label="\u05e2\u05d1\u05e8\u05d9\u05ea"]{font-size:18px;padding:0 2px}',
        '.qc{padding:16px 8px}',
        '.qi{font-size:28px;margin-bottom:6px}',
        '.machine-grid,.mc-grid{grid-template-columns:minmax(0,1fr)}',
        '.machine-grid>*,.mc-grid>*{grid-column:auto!important;min-width:0}',
        '#main{padding-left:12px;padding-right:12px;padding-bottom:48px}',
        '.card{padding:14px}',
        '.card,.machine-card{overflow-x:auto}',
        '.card table,.machine-card table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}',
      '}',
      /* ----- opt-in modes ----- */
      'html.mh-a11y-z1 body{zoom:1.15}',
      'html.mh-a11y-z2 body{zoom:1.3}',
      'html.mh-a11y-z3 body{zoom:1.5}',
      'html.mh-a11y-contrast,html.mh-a11y-contrast body{--bg:#000;--surface:#000;--card:#0b0b0b;--border:#fff;--text:#fff;--muted:#f2f2f2;--blue:#6db8ff;--green:#66ff85;--red:#ff7b7b;--yellow:#ffe14d;--orange:#ffb347;--purple:#e0b3ff;--teal:#66ffd9}',
      'html.mh-a11y-contrast [class*="tab"].active,html.mh-a11y-contrast [class*="chip"].active{color:#000!important}',
      'html.mh-a11y-contrast #engBg{display:none!important}',
      'html.mh-a11y-invert{filter:invert(1) hue-rotate(180deg)}',
      'html.mh-a11y-invert img,html.mh-a11y-invert video{filter:invert(1) hue-rotate(180deg)}',
      'html.mh-a11y-gray{filter:grayscale(1)}',
      'html.mh-a11y-invert.mh-a11y-gray{filter:invert(1) hue-rotate(180deg) grayscale(1)}',
      'html.mh-a11y-links a{text-decoration:underline!important;text-underline-offset:3px;outline:2px dotted #ffd400;outline-offset:1px}',
      'html.mh-a11y-font body,html.mh-a11y-font body *{font-family:Arial,"Segoe UI",Helvetica,sans-serif!important}',
      'html.mh-a11y-noanim *,html.mh-a11y-noanim *::before,html.mh-a11y-noanim *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}',
      'html.mh-a11y-noanim #engBg{display:none!important}',
      'html.mh-a11y-cursor,html.mh-a11y-cursor body,html.mh-a11y-cursor *{cursor:' + curArrow + '!important}',
      'html.mh-a11y-cursor a,html.mh-a11y-cursor button,html.mh-a11y-cursor select,html.mh-a11y-cursor label,html.mh-a11y-cursor summary,html.mh-a11y-cursor [role="button"],html.mh-a11y-cursor [onclick]{cursor:' + curClick + '!important}'
    ].join('\n');
    var styleEl = doc.createElement('style');
    styleEl.id = 'mh-a11y-css';
    styleEl.appendChild(doc.createTextNode(css));
    (doc.head || html).appendChild(styleEl);

    /* ---------- DOM ---------- */
    function el(tag, attrs, text) {
      var e = doc.createElement(tag), k;
      if (attrs) { for (k in attrs) { if (Object.prototype.hasOwnProperty.call(attrs, k)) { e.setAttribute(k, attrs[k]); } } }
      if (text != null) { e.textContent = text; }
      return e;
    }
    var ICON = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><circle cx="12" cy="4.6" r="2.3" fill="currentColor"/><path d="M5 8.6h14M12 8.6v5.2M12 13.8l-3.2 6.2M12 13.8l3.2 6.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>';

    var root = el('div', { id: 'mh-a11y-root', dir: HE ? 'rtl' : 'ltr' });
    if (!HE) { root.className = 'mh-r'; }
    var btn = el('button', { id: 'mh-a11y-btn', type: 'button', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-controls': 'mh-a11y-panel', 'aria-label': T.open, title: T.title });
    btn.innerHTML = ICON;
    var panel = el('div', { id: 'mh-a11y-panel', role: 'dialog', 'aria-labelledby': 'mh-a11y-title', tabindex: '-1' });
    panel.hidden = true;

    var hd = el('div', { 'class': 'mh-hd' });
    hd.appendChild(el('span', { id: 'mh-a11y-title' }, T.title));
    hd.appendChild(el('button', { type: 'button', 'class': 'mh-x', 'data-act': 'close', 'aria-label': T.close }, '\u2715'));
    panel.appendChild(hd);

    var sz = el('div', { 'class': 'mh-sz', role: 'group', 'aria-label': T.zlabel });
    sz.appendChild(el('button', { type: 'button', 'data-act': 'zminus', 'aria-label': T.zminus }, 'A\u2212'));
    var zv = el('span', { 'class': 'mh-zv', 'aria-live': 'polite' }, '100%');
    sz.appendChild(zv);
    sz.appendChild(el('button', { type: 'button', 'data-act': 'zplus', 'aria-label': T.zplus }, 'A+'));
    panel.appendChild(sz);

    var grid = el('div', { 'class': 'mh-grid' });
    var toggleBtns = {};
    TOGGLES.forEach(function (k) {
      var b = el('button', { type: 'button', 'class': 'mh-t', 'data-k': k, 'aria-pressed': 'false' }, T[k]);
      toggleBtns[k] = b;
      grid.appendChild(b);
    });
    panel.appendChild(grid);

    var ft = el('div', { 'class': 'mh-ft' });
    ft.appendChild(el('button', { type: 'button', 'class': 'mh-rs', 'data-act': 'reset' }, T.reset));
    ft.appendChild(el('a', { href: STATEMENT_URL }, T.statement));
    panel.appendChild(ft);

    root.appendChild(btn);
    root.appendChild(panel);
    body.appendChild(root);

    /* ---------- reading guide ---------- */
    var guideEl = null;
    function inv() { return state.z > 0 ? String(1 / ZOOMS[state.z]) : ''; }
    function onMove(e) { if (guideEl) { guideEl.style.top = (e.clientY - 22) + 'px'; } }
    function setGuide(on) {
      if (on && !guideEl) {
        guideEl = el('div', { id: 'mh-a11y-guide', 'aria-hidden': 'true' });
        body.appendChild(guideEl);
        doc.addEventListener('mousemove', onMove, false);
      } else if (!on && guideEl) {
        doc.removeEventListener('mousemove', onMove, false);
        if (guideEl.parentNode) { guideEl.parentNode.removeChild(guideEl); }
        guideEl = null;
      }
      if (guideEl) { guideEl.style.zoom = inv(); }
    }

    /* ---------- apply ---------- */
    function apply() {
      var i, k;
      for (i = 0; i < TOGGLES.length; i++) {
        k = TOGGLES[i];
        if (state[k]) { html.classList.add('mh-a11y-' + k); } else { html.classList.remove('mh-a11y-' + k); }
        toggleBtns[k].setAttribute('aria-pressed', state[k] ? 'true' : 'false');
      }
      for (i = 1; i < ZOOMS.length; i++) { html.classList.remove('mh-a11y-z' + i); }
      if (state.z > 0) { html.classList.add('mh-a11y-z' + state.z); }
      root.style.zoom = inv();
      zv.textContent = Math.round(ZOOMS[state.z] * 100) + '%';
      setGuide(state.guide);
    }

    /* ---------- open / close ---------- */
    function openPanel() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); panel.focus(); }
    function closePanel(refocus) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (refocus) { btn.focus(); } }
    btn.addEventListener('click', function () { if (panel.hidden) { openPanel(); } else { closePanel(true); } });
    doc.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && !panel.hidden) { closePanel(true); }
    });
    doc.addEventListener('click', function (e) {
      if (!panel.hidden && !root.contains(e.target)) { closePanel(false); }
    });

    panel.addEventListener('click', function (e) {
      var t = e.target, k, a, i;
      while (t && t !== panel && !(t.getAttribute && (t.getAttribute('data-act') || t.getAttribute('data-k')))) { t = t.parentNode; }
      if (!t || t === panel) { return; }
      k = t.getAttribute('data-k');
      a = t.getAttribute('data-act');
      if (k) { state[k] = !state[k]; }
      else if (a === 'zplus') { if (state.z < ZOOMS.length - 1) { state.z++; } }
      else if (a === 'zminus') { if (state.z > 0) { state.z--; } }
      else if (a === 'reset') {
        state.z = 0;
        for (i = 0; i < TOGGLES.length; i++) { state[TOGGLES[i]] = false; }
        try { window.localStorage.removeItem(KEY); } catch (er) { /* ignore */ }
        apply();
        return;
      }
      else if (a === 'close') { closePanel(true); return; }
      apply();
      save();
    });

    /* ---------- statement link in the page footer ---------- */
    (function addStatementLink() {
      if (doc.querySelector('a[data-mh-statement]')) { return; }
      var f = doc.querySelector('footer');
      var a = el('a', { href: STATEMENT_URL, 'data-mh-statement': '1' }, T.statement);
      if (f) {
        a.className = 'home-link';
        a.style.display = 'inline';
        f.appendChild(doc.createTextNode(' \u00B7 '));
        f.appendChild(a);
      } else {
        var wrap = el('div', { style: 'margin:6px 0 24px;font-size:12px;text-align:center' });
        a.style.color = 'var(--muted,#8b949e)';
        a.style.textDecoration = 'underline';
        wrap.appendChild(a);
        body.appendChild(wrap);
      }
    })();


    /* ---------- English: make the top-bar search box work ---------- */
    (function englishSearch() {
      if (HE) { return; }
      var inp = doc.getElementById('gsearch');
      if (!inp) { return; }
      var isHome = /^\/en\/?(index\.html)?$/.test(location.pathname);
      if (isHome) {
        /* arrived from a sub-page with ?q=...: run that search on the home page */
        var q = '';
        try { q = new URLSearchParams(location.search).get('q') || ''; } catch (e) { q = ''; }
        if (!q) { return; }
        var fire = function () {
          if (inp.value !== '' && inp.value !== q) { return; }      /* the visitor already typed something else */
          inp.value = q;
          inp.dispatchEvent(new Event('input', { bubbles: true }));
        };
        var start = function () { setTimeout(fire, 300); setTimeout(fire, 1500); };
        if (doc.readyState === 'complete') { start(); } else { window.addEventListener('load', start); }
        try { history.replaceState(null, '', location.pathname); } catch (e2) { /* ignore */ }
        return;
      }
      inp.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') { return; }
        var v = inp.value.replace(/^\s+|\s+$/g, '');
        if (v) { location.href = '/en/?q=' + encodeURIComponent(v); }
      });
    })();

    apply();
  }
})();
