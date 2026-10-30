/*! METAL HUB - accessibility fixes (a11y-fix.js): labels for form controls, landmarks, skip link, AI dialog semantics,
 *  contrast and target-size styles. Loaded on every page after a11y.js. Pure additions; safe to load twice. */
(function () {
  'use strict';
  if (window.__mhA11yFix) { return; } window.__mhA11yFix = true;
  var d = document, html = d.documentElement;
  var HE = (html.getAttribute('lang') || 'he').toLowerCase().indexOf('he') === 0;
  var TXT = HE ? { skip: '\u05d3\u05dc\u05d2 \u05dc\u05ea\u05d5\u05db\u05df \u05d4\u05e8\u05d0\u05e9\u05d9', aiTitle: '\u05db\u05e0\u05d9\u05e1\u05d4 \u05dc-AI', pwd: '\u05e1\u05d9\u05e1\u05de\u05d4' } : { skip: 'Skip to main content', aiTitle: 'AI sign in', pwd: 'Password' };

  /* ---------- 1. styles ---------- */
  var css = [
    /* accent colours: the dark-theme tints are too light on a light background */
    'body.light-mode,html.light-mode body{--blue:#0969da;--green:#16732f;--orange:#a64200;--red:#cf222e;--yellow:#835600;--purple:#8250df;--teal:#116329}',
    /* badges and chips: keep text readable on the accent backgrounds */
    'body.light-mode .mc-badge[style*="color:#000"]{color:#fff!important}',
    'body:not(.light-mode) .mc-badge[style*="background:var(--red)"]{color:#0d1117!important}',
    '.mc-badge.b-green{background:#1a7f37!important;color:#fff!important}',
    'body:not(.light-mode) .cat-chip.active{color:#0d1117!important}',
    'body.light-mode{--muted:#4b535c}',
    'body.light-mode [style*=";color:#aaa"],body.light-mode [style^="color:#aaa"]{color:#6a737d!important}',
    /* small muted labels were dimmed to 70% opacity, which breaks contrast */
    '[style*="opacity:0.7"],[style*="opacity: 0.7"],[style*="opacity:.7"]{opacity:1!important}',
    /* YouTube buttons: white text needs a darker red (4.5:1) */
    'a[href*="youtube.com"][style*="#ff0000"],a[href*="youtube.com"][style*="#f00"],a[href*="youtu.be"][style*="#ff0000"]{background:#c4001d!important}',
    /* minimum target size 24x24 (WCAG 2.2, 2.5.8) */
    '.mat-compare-btn,.copy-btn{min-height:24px;padding-top:4px;padding-bottom:4px}',
    'a.yt-btn{background:#c4001d!important}',
    'a[href*="youtube.com"]{min-height:24px;box-sizing:border-box}',
    '#topbar>a,#topbar>.logo{display:inline-flex;align-items:center;min-height:24px}',
    /* a visible keyboard focus everywhere */
    'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--blue,#58a6ff);outline-offset:2px}',
    '#main:focus{outline:none}',
    /* skip link */
    '.mh-skip{position:fixed;top:-80px;inset-inline-start:8px;z-index:100000;background:#0969da;color:#fff;padding:10px 16px;border-radius:0 0 8px 8px;font:600 14px system-ui,sans-serif;text-decoration:none}.mh-skip:focus{top:0;outline:2px solid #fff;outline-offset:-4px}',
    /* material group colours used as small text */
    'body:not(.light-mode) [style*=";color:#1a7f37" i],body:not(.light-mode) [style*="; color:#1a7f37" i],body:not(.light-mode) [style^="color:#1a7f37" i]{color:#21a146!important}',
    'body:not(.light-mode) [style*=";color:#1f6feb" i],body:not(.light-mode) [style*="; color:#1f6feb" i],body:not(.light-mode) [style^="color:#1f6feb" i]{color:#4e8def!important}',
    'body:not(.light-mode) [style*=";color:#495057" i],body:not(.light-mode) [style*="; color:#495057" i],body:not(.light-mode) [style^="color:#495057" i]{color:#838d97!important}',
    'body:not(.light-mode) [style*=";color:#6c757d" i],body:not(.light-mode) [style*="; color:#6c757d" i],body:not(.light-mode) [style^="color:#6c757d" i]{color:#868e96!important}',
    'body:not(.light-mode) [style*=";color:#8957e5" i],body:not(.light-mode) [style*="; color:#8957e5" i],body:not(.light-mode) [style^="color:#8957e5" i]{color:#a27aea!important}',
    'body:not(.light-mode) [style*=";color:#9b59b6" i],body:not(.light-mode) [style*="; color:#9b59b6" i],body:not(.light-mode) [style^="color:#9b59b6" i]{color:#b07cc6!important}',
    'body:not(.light-mode) [style*=";color:#cf222e" i],body:not(.light-mode) [style*="; color:#cf222e" i],body:not(.light-mode) [style^="color:#cf222e" i]{color:#e55e67!important}',
    'body.light-mode [style*=";color:#1a7f37" i],body.light-mode [style*="; color:#1a7f37" i],body.light-mode [style^="color:#1a7f37" i]{color:#187733!important}',
    'body.light-mode [style*=";color:#1f6feb" i],body.light-mode [style*="; color:#1f6feb" i],body.light-mode [style^="color:#1f6feb" i]{color:#1360d8!important}',
    'body.light-mode [style*=";color:#2ea043" i],body.light-mode [style*="; color:#2ea043" i],body.light-mode [style^="color:#2ea043" i]{color:#237832!important}',
    'body.light-mode [style*=";color:#2ea44f" i],body.light-mode [style*="; color:#2ea44f" i],body.light-mode [style^="color:#2ea44f" i]{color:#217438!important}',
    'body.light-mode [style*=";color:#2f9e44" i],body.light-mode [style*="; color:#2f9e44" i],body.light-mode [style^="color:#2f9e44" i]{color:#237733!important}',
    'body.light-mode [style*=";color:#3fb950" i],body.light-mode [style*="; color:#3fb950" i],body.light-mode [style^="color:#3fb950" i]{color:#287532!important}',
    'body.light-mode [style*=";color:#56b4e9" i],body.light-mode [style*="; color:#56b4e9" i],body.light-mode [style^="color:#56b4e9" i]{color:#1571a5!important}',
    'body.light-mode [style*=";color:#58a6ff" i],body.light-mode [style*="; color:#58a6ff" i],body.light-mode [style^="color:#58a6ff" i]{color:#0062d2!important}',
    'body.light-mode [style*=";color:#6c757d" i],body.light-mode [style*="; color:#6c757d" i],body.light-mode [style^="color:#6c757d" i]{color:#636b72!important}',
    'body.light-mode [style*=";color:#74c0fc" i],body.light-mode [style*="; color:#74c0fc" i],body.light-mode [style^="color:#74c0fc" i]{color:#046cbe!important}',
    'body.light-mode [style*=";color:#80bfff" i],body.light-mode [style*="; color:#80bfff" i],body.light-mode [style^="color:#80bfff" i]{color:#0068d2!important}',
    'body.light-mode [style*=";color:#868e96" i],body.light-mode [style*="; color:#868e96" i],body.light-mode [style^="color:#868e96" i]{color:#636a72!important}',
    'body.light-mode [style*=";color:#8957e5" i],body.light-mode [style*="; color:#8957e5" i],body.light-mode [style^="color:#8957e5" i]{color:#7d45e2!important}',
    'body.light-mode [style*=";color:#8b949e" i],body.light-mode [style*="; color:#8b949e" i],body.light-mode [style^="color:#8b949e" i]{color:#626b75!important}',
    'body.light-mode [style*=";color:#98c379" i],body.light-mode [style*="; color:#98c379" i],body.light-mode [style^="color:#98c379" i]{color:#4c7132!important}',
    'body.light-mode [style*=";color:#9b59b6" i],body.light-mode [style*="; color:#9b59b6" i],body.light-mode [style^="color:#9b59b6" i]{color:#924dae!important}',
    'body.light-mode [style*=";color:#adb5bd" i],body.light-mode [style*="; color:#adb5bd" i],body.light-mode [style^="color:#adb5bd" i]{color:#5d6874!important}',
    'body.light-mode [style*=";color:#bc8cff" i],body.light-mode [style*="; color:#bc8cff" i],body.light-mode [style^="color:#bc8cff" i]{color:#8730ff!important}',
    'body.light-mode [style*=";color:#c0c0ff" i],body.light-mode [style*="; color:#c0c0ff" i],body.light-mode [style^="color:#c0c0ff" i]{color:#5050ff!important}',
    'body.light-mode [style*=";color:#cd7f32" i],body.light-mode [style*="; color:#cd7f32" i],body.light-mode [style^="color:#cd7f32" i]{color:#945b24!important}',
    'body.light-mode [style*=";color:#d29922" i],body.light-mode [style*="; color:#d29922" i],body.light-mode [style^="color:#d29922" i]{color:#835f15!important}',
    'body.light-mode [style*=";color:#d4d4d4" i],body.light-mode [style*="; color:#d4d4d4" i],body.light-mode [style^="color:#d4d4d4" i]{color:#696969!important}',
    'body.light-mode [style*=";color:#dda0dd" i],body.light-mode [style*="; color:#dda0dd" i],body.light-mode [style^="color:#dda0dd" i]{color:#a83ca8!important}',
    'body.light-mode [style*=";color:#e0e0e0" i],body.light-mode [style*="; color:#e0e0e0" i],body.light-mode [style^="color:#e0e0e0" i]{color:#6b6b6b!important}',
    'body.light-mode [style*=";color:#e8894f" i],body.light-mode [style*="; color:#e8894f" i],body.light-mode [style^="color:#e8894f" i]{color:#a74d16!important}',
    'body.light-mode [style*=";color:#e8a87c" i],body.light-mode [style*="; color:#e8a87c" i],body.light-mode [style^="color:#e8a87c" i]{color:#a4541d!important}',
    'body.light-mode [style*=";color:#f59f00" i],body.light-mode [style*="; color:#f59f00" i],body.light-mode [style^="color:#f59f00" i]{color:#8f5d00!important}',
    'body.light-mode [style*=";color:#ff6b6b" i],body.light-mode [style*="; color:#ff6b6b" i],body.light-mode [style^="color:#ff6b6b" i]{color:#d10000!important}',
    'body.light-mode [style*=";color:#ffa657" i],body.light-mode [style*="; color:#ffa657" i],body.light-mode [style^="color:#ffa657" i]{color:#a94f00!important}',
    'body.light-mode [style*=";color:#ffc078" i],body.light-mode [style*="; color:#ffc078" i],body.light-mode [style^="color:#ffc078" i]{color:#a15600!important}',
    ''
  ].join('\n');
  var st = d.createElement('style'); st.id = 'mh-a11y-fix-css'; st.textContent = css; (d.head || html).appendChild(st);

  function ready(fn) { if (d.readyState === 'loading') { d.addEventListener('DOMContentLoaded', fn); } else { fn(); } }
  function txt(el) { return (el.textContent || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim(); }

  /* ---------- 2. names for form controls ---------- */
  function ctxTitle(c) { var card = c.closest ? c.closest('.machine-card,.card') : null, t = card && card.querySelector('.mc-title,.ctitle'); return t ? txt(t) : ''; }
  function labelOne(c) {
    var type = c.type;
    if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'search' || type === 'checkbox' || type === 'radio' || c.id === 'gsearch') { return; }
    if ((c.labels && c.labels.length && txt(c.labels[0])) || c.getAttribute('aria-label') || c.getAttribute('aria-labelledby') || c.getAttribute('title')) { return; }
    var lbl = null, el = c.previousElementSibling, ls;
    while (el && !lbl) { if (el.tagName === 'LABEL' && !el.querySelector('input,select,textarea')) { lbl = el; } el = el.previousElementSibling; }
    if (!lbl && c.parentElement) { ls = c.parentElement.querySelectorAll(':scope > label'); if (ls.length === 1) { lbl = ls[0]; } }
    if (!lbl && c.parentElement && c.parentElement.parentElement) { ls = c.parentElement.parentElement.querySelectorAll(':scope > label'); if (ls.length === 1) { lbl = ls[0]; } }
    var t = lbl ? txt(lbl) : '', title = ctxTitle(c), name;
    if (t.length > 1) { name = (title ? title + ': ' : '') + t; }
    else if (t) { name = (title ? title + ': ' : '') + t; }
    else { name = (title ? title + ': ' : '') + (c.id ? c.id.split('-').pop() : c.tagName.toLowerCase()); }
    c.setAttribute('aria-label', name);
    if (lbl && c.id && !lbl.getAttribute('for')) { lbl.setAttribute('for', c.id); }
  }
  function labelAll() { var l = d.querySelectorAll('input,select,textarea'), i; for (i = 0; i < l.length; i++) { labelOne(l[i]); } }

  /* ---------- 3. landmarks and a skip link ---------- */
  function structure() {
    var main = d.getElementById('main');
    if (main && !d.querySelector('main,[role="main"]')) { main.setAttribute('role', 'main'); }
    if (main && !main.hasAttribute('tabindex')) { main.setAttribute('tabindex', '-1'); }
    var tb = d.getElementById('topbar'); if (tb && !tb.getAttribute('role')) { tb.setAttribute('role', 'banner'); }
    var f = d.querySelector('footer'); if (f && !f.getAttribute('role') && !(f.closest && f.closest('main,[role="main"]'))) { f.setAttribute('role', 'contentinfo'); }
    var kids = d.body.children, k, hasInfo = !!d.querySelector('footer,[role="contentinfo"]');
    for (k = 0; k < kids.length; k++) {   /* stray visible text blocks outside any landmark (footer-like lines) */
      var e = kids[k];
      if (e.tagName === 'DIV' && !e.id && !e.getAttribute('role') && !e.getAttribute('aria-live') && !/mh-/.test(String(e.className)) && e.offsetHeight > 0 && txt(e).length > 3 && txt(e).length < 200) {
        if (!hasInfo) { e.setAttribute('role', 'contentinfo'); hasInfo = true; } else { e.setAttribute('role', 'region'); e.setAttribute('aria-label', txt(e)); }
      }
    }
    if (main && !d.querySelector('.mh-skip')) {
      var a = d.createElement('a'); a.className = 'mh-skip'; a.href = '#main'; a.textContent = TXT.skip;
      a.addEventListener('click', function (e) { var m = d.getElementById('main'); if (m) { e.preventDefault(); m.focus(); if (m.scrollIntoView) { m.scrollIntoView(); } } });
      d.body.insertBefore(a, d.body.firstChild);
    }
  }

  /* ---------- 4. the AI sign-in window is a real dialog ---------- */
  function aiDialog() {
    var ov = d.getElementById('ai-lock-overlay'); if (!ov) { return; }
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    var h = ov.querySelector('h2'); if (h) { if (!h.id) { h.id = 'ai-lock-title'; } ov.setAttribute('aria-labelledby', h.id); } else { ov.setAttribute('aria-label', TXT.aiTitle); }
    var inp = d.getElementById('ai-pwd-input'); if (inp && !inp.getAttribute('aria-label')) { inp.setAttribute('aria-label', TXT.pwd); }
    var cn = d.getElementById('ai-pwd-cancel');
    if (cn) { cn.setAttribute('role', 'button'); cn.setAttribute('tabindex', '0'); cn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cn.click(); } }); }
    var last = null, was = false;
    d.addEventListener('focusin', function (e) { if (!ov.contains(e.target)) { last = e.target; } });
    new MutationObserver(function () { var open = ov.classList.contains('show'); if (was && !open && last && last.focus) { try { last.focus(); } catch (x) { /* ignore */ } } was = open; }).observe(ov, { attributes: true, attributeFilter: ['class'] });
    d.addEventListener('keydown', function (e) {
      if (!ov.classList.contains('show')) { return; }
      if (e.key === 'Escape') { e.preventDefault(); if (typeof window.closeAiLock === 'function') { window.closeAiLock(); } else { ov.classList.remove('show'); } }
      else if (e.key === 'Tab') {
        var f = [].slice.call(ov.querySelectorAll('input,button,[tabindex="0"]')).filter(function (x) { return x.offsetParent !== null; }); if (!f.length) { return; }
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); lastEl.focus(); } else if (!e.shiftKey && d.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- 5. text on accent backgrounds (tabs, chips, badges) gets the better of black or white ---------- */
  function rgb(c) { var m = /rgba?\(([^)]+)\)/.exec(c); if (!m) { return null; } var p = m[1].split(',').map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; }
  function lum(c) { function f(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); } return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); }
  function ratio(a, b) { var x = lum(a), y = lum(b), hi = Math.max(x, y), lo = Math.min(x, y); return (hi + 0.05) / (lo + 0.05); }
  function fixColour(el) {
    var tr = el.style.transition, marked = el.hasAttribute('data-mhc');
    el.style.transition = 'none';                                  /* read the final colour, not a value in the middle of a transition */
    if (marked) { el.style.color = el.getAttribute('data-mhc'); el.removeAttribute('data-mhc'); }
    if ((el.textContent || '').trim()) {
      var cs = getComputedStyle(el), bg = rgb(cs.backgroundColor), fg = rgb(cs.color);
      if (bg && fg && bg.a >= 0.95) {
        var need = (parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && parseInt(cs.fontWeight, 10) >= 700)) ? 3 : 4.5;
        if (ratio(fg, bg) < need) {
          var dark = { r: 13, g: 17, b: 23, a: 1 }, white = { r: 255, g: 255, b: 255, a: 1 };
          var pick = ratio(dark, bg) >= ratio(white, bg) ? '#0d1117' : '#ffffff';
          el.setAttribute('data-mhc', el.style.color || ''); el.style.setProperty('color', pick, 'important');
        }
      }
    }
    void el.offsetWidth; el.style.transition = tr;
  }
  function fixAllColours(root) {
    var l = (root || d).querySelectorAll('button,a,.mc-badge,[class*="chip"],[class*="tab"],[class*="badge"]'), i;
    for (i = 0; i < l.length; i++) { fixColour(l[i]); }
  }

  /* ---------- 6. names that contain the visible text ---------- */
  function cardNames() {
    var l = d.querySelectorAll('button[aria-label][class*="-card"],a[aria-label][class*="-card"],button.ch[aria-label]'), i;
    for (i = 0; i < l.length; i++) { if (txt(l[i]).length > 2) { l[i].removeAttribute('aria-label'); } }
    var f = d.querySelectorAll('footer'), j;
    for (j = 0; j < f.length; j++) { if (f[j].closest && f[j].closest('main,[role="main"]')) { f[j].setAttribute('role', 'none'); } }
  }

  /* ---------- 7. scrollable regions can be reached and scrolled with the keyboard ---------- */
  function scrollables() {
    var l = d.querySelectorAll('table,div,pre,section'), i, e, cs;
    for (i = 0; i < l.length; i++) {
      e = l[i]; if (e.hasAttribute('tabindex')) { continue; }
      if (e.scrollWidth <= e.clientWidth + 1 && e.scrollHeight <= e.clientHeight + 1) { continue; }
      cs = getComputedStyle(e);
      if (!/(auto|scroll)/.test(cs.overflowX + ' ' + cs.overflowY)) { continue; }
      if (e.querySelector('a[href],button,input,select,textarea,[tabindex]')) { continue; }
      e.setAttribute('tabindex', '0');
    }
  }
  ready(function () {
    structure(); labelAll(); aiDialog(); cardNames(); fixAllColours(); setTimeout(fixAllColours, 700);
    scrollables(); setTimeout(scrollables, 900); var t3 = null; window.addEventListener('resize', function () { clearTimeout(t3); t3 = setTimeout(scrollables, 300); });
    var t2 = null; function later() { clearTimeout(t2); t2 = setTimeout(function () { fixAllColours(); cardNames(); }, 420); }
    d.addEventListener('click', later);
    if (window.MutationObserver) {
      new MutationObserver(function (ms) { var k; for (k = 0; k < ms.length; k++) { if (ms[k].target === d.body || ms[k].target === html) { later(); return; } } }).observe(d.body, { attributes: true, attributeFilter: ['class'] });
      new MutationObserver(function (ms) { var k; for (k = 0; k < ms.length; k++) { var t = ms[k].target; if (t.nodeType === 1 && /tab|chip|badge|btn/.test(String(t.className))) { later(); return; } } }).observe(d.body, { attributes: true, attributeFilter: ['class'], subtree: true });
    }
    if (d.querySelector('.machine-card,.fma-sec,.grid2') && window.MutationObserver) {   /* pages that build fields later */
      var tm = null; new MutationObserver(function () { clearTimeout(tm); tm = setTimeout(labelAll, 300); }).observe(d.body, { childList: true, subtree: true });
    }
  });
})();
