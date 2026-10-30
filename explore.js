/*! METAL HUB - smart search and concept links (explore.js).
 *  Loaded by /explore.html and /en/explore.html together with the data file (explore-data.js). Self-contained.
 *  Language comes from <html lang>. Every link between concepts is computed here from the existing texts. */
(function () {
  'use strict';
  if (window.__mhExplore) { return; }
  window.__mhExplore = true;
  function run() { try { init(); } catch (e) { if (window.console && console.warn) { console.warn('[explore]', e); } } }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', run); } else { run(); }

  function init() {
    var D = window.MH_EXPLORE, root = document.getElementById('xroot');
    if (!D || !root) { return; }
    var MATS = D.mats, GLOS = D.glos;
    var HE = (document.documentElement.getAttribute('lang') || 'he').toLowerCase().indexOf('he') === 0;
    var P = HE ? '/' : '/en/';
    var L = HE ? {
      noRes: '\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea. \u05e0\u05e1\u05d4 \u05de\u05d9\u05dc\u05d4 \u05d0\u05d7\u05e8\u05ea, \u05d0\u05d5 \u05d0\u05ea \u05d4\u05ea\u05e8\u05d2\u05d5\u05dd \u05e9\u05dc\u05d4.', found: function (n) { return '\u05e0\u05de\u05e6\u05d0\u05d5 ' + n + ' \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea. \u05de\u05d5\u05e6\u05d2\u05d5\u05ea \u05d4\u05d8\u05d5\u05d1\u05d5\u05ea \u05d1\u05d9\u05d5\u05ea\u05e8 \u05de\u05db\u05dc \u05e1\u05d5\u05d2.'; },
      gMat: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd', gTerm: '\u05de\u05d5\u05e0\u05d7\u05d9\u05dd', gCat: '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05d1\u05d0\u05ea\u05e8', catSub: '\u05d4\u05d3\u05e3 \u05d1\u05d0\u05ea\u05e8 (\u05e0\u05e4\u05ea\u05d7 \u05d1\u05dc\u05e9\u05d5\u05e0\u05d9\u05ea \u05d7\u05d3\u05e9\u05d4)', hint: '\u05d1\u05d7\u05e8 \u05ea\u05d5\u05e6\u05d0\u05d4 \u05db\u05d3\u05d9 \u05dc\u05e8\u05d0\u05d5\u05ea \u05d0\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05e9\u05dc\u05d4 \u05d5\u05d4\u05e7\u05e9\u05e8\u05d9\u05dd \u05e9\u05dc\u05d4.',
      trail: '\u05e0\u05ea\u05d9\u05d1 \u05d4\u05dc\u05d9\u05de\u05d5\u05d3:', panel: '\u05de\u05e7\u05d5\u05e9\u05e8 \u05dc...', none: '\u05d0\u05d9\u05df \u05e2\u05d3\u05d9\u05d9\u05df \u05e7\u05e9\u05e8\u05d9\u05dd \u05dc\u05e4\u05e8\u05d9\u05d8 \u05d4\u05d6\u05d4.',
      eq: '\u05e9\u05e7\u05d9\u05dc\u05d5\u05ea \u05d1\u05ea\u05e7\u05e0\u05d9\u05dd (\u05dc\u05d7\u05e5 \u05db\u05d3\u05d9 \u05dc\u05d7\u05e4\u05e9 \u05d0\u05ea \u05d4\u05e1\u05d9\u05de\u05d5\u05df)', stds: '\u05ea\u05e7\u05e0\u05d9\u05dd: ', topics: '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05e7\u05e9\u05d5\u05e8\u05d9\u05dd \u05d1\u05d0\u05ea\u05e8', heat: '\u05d8\u05d9\u05e4\u05d5\u05dc \u05d7\u05d5\u05dd', weld: '\u05e8\u05d9\u05ea\u05d5\u05da', mach: '\u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05db\u05e0\u05d9', corr: '\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4', coat: '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd', std: '\u05ea\u05e7\u05e0\u05d9\u05dd',
      termsIn: '\u05de\u05d5\u05e0\u05d7\u05d9\u05dd \u05e9\u05de\u05d5\u05e4\u05d9\u05e2\u05d9\u05dd \u05d1\u05d7\u05d5\u05de\u05e8', similar: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05d3\u05d5\u05de\u05d9\u05dd', videos: '\u05e1\u05e8\u05d8\u05d5\u05e0\u05d9 \u05d4\u05d3\u05e8\u05db\u05d4', calc: '\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05de\u05d4\u05d9\u05e8 \u05e2\u05dd \u05e0\u05ea\u05d5\u05e0\u05d9 \u05d4\u05d7\u05d5\u05de\u05e8', calcNote: '(Vc \u05de\u05d4\u05e8\u05e9\u05d5\u05de\u05d4: ', calcFull: '\u05d4\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05d4\u05de\u05dc\u05d0 \u05d1\u05d0\u05ea\u05e8',
      seeAlso: '\u05e8\u05d0\u05d4 \u05d2\u05dd (\u05de\u05d5\u05e9\u05d2\u05d9\u05dd \u05e9\u05d4\u05d4\u05d2\u05d3\u05e8\u05d4 \u05e0\u05e9\u05e2\u05e0\u05ea \u05e2\u05dc\u05d9\u05d4\u05dd)', inDefs: '\u05de\u05d5\u05e4\u05d9\u05e2 \u05d1\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05e9\u05dc', matsMention: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05e9\u05de\u05d5\u05d6\u05db\u05e8 \u05d1\u05d4\u05dd', topicOf: '\u05e0\u05d5\u05e9\u05d0 \u05d1\u05d0\u05ea\u05e8 (', pageOf: ' \u2014 \u05d4\u05d3\u05e3 \u05d1\u05d0\u05ea\u05e8',
      mach2: '\u05e2\u05d9\u05d1\u05d5\u05d3\u05d9\u05d5\u05ea', weld2: '\u05e8\u05d9\u05ea\u05d5\u05db\u05d9\u05d5\u05ea', ph: '\u05d7\u05e4\u05e9 \u05d7\u05d5\u05de\u05e8, \u05de\u05d5\u05e0\u05d7 \u05d0\u05d5 \u05e0\u05d5\u05e9\u05d0... (\u05dc\u05de\u05e9\u05dc: C45, \u05de\u05e1\u05d1, 4140 \u05e8\u05d9\u05ea\u05d5\u05da)',
      pl: { RM: '\u05d7\u05d5\u05d6\u05e7 \u05de\u05ea\u05d9\u05d7\u05d4', Rp0: '\u05d2\u05d1\u05d5\u05dc \u05db\u05e0\u05d9\u05e2\u05d4', HB: '\u05e7\u05e9\u05d9\u05d5\u05ea HB', E: '\u05de\u05d5\u05d3\u05d5\u05dc E', A: '\u05d4\u05ea\u05d0\u05e8\u05db\u05d5\u05ea', rho: '\u05e6\u05e4\u05d9\u05e4\u05d5\u05ea', '\u03c1': '\u05e6\u05e4\u05d9\u05e4\u05d5\u05ea' }
    } : {
      noRes: 'No results. Try another word, or its translation.', found: function (n) { return n + ' results. The best of each type are shown.'; },
      gMat: 'Materials', gTerm: 'Terms', gCat: 'Topics on the site', catSub: 'Page on the site (opens in a new tab)', hint: 'Pick a result to see its card and its links.',
      trail: 'Learning trail:', panel: 'Linked to...', none: 'No links for this item yet.',
      eq: 'Equivalents in other standards (click to search the designation)', stds: 'Standards: ', topics: 'Related topics on the site', heat: 'Heat treatment', weld: 'Welding', mach: 'Machining', corr: 'Corrosion', coat: 'Coatings', std: 'Standards',
      termsIn: 'Terms that appear in this material', similar: 'Similar materials', videos: 'Video courses', calc: 'Quick calculator fed by the material', calcNote: '(Vc from the record: ', calcFull: 'Full calculator on the site',
      seeAlso: 'See also (concepts the definition relies on)', inDefs: 'Appears in the definitions of', matsMention: 'Materials that mention it', topicOf: 'Topic on the site (', pageOf: ' \u2014 page on the site',
      mach2: 'Machinability', weld2: 'Weldability', ph: 'Search a material, term or topic... (e.g. C45, bearing, 4140 welding)',
      pl: { RM: 'Tensile strength', Rp0: 'Yield strength', HB: 'Hardness HB', E: 'Modulus E', A: 'Elongation', rho: 'Density', '\u03c1': 'Density' }
    };
    var CATS = [
      ['mfgtech', '\ud83c\udfed', '\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d5\u05ea \u05d9\u05d9\u05e6\u05d5\u05e8', 'Manufacturing Technologies', 'cnc \u05d9\u05e6\u05d9\u05e7\u05d4 \u05d7\u05d9\u05e9\u05d5\u05dc \u05d7\u05d9\u05ea\u05d5\u05da \u05db\u05d9\u05e4\u05d5\u05e3 edm \u05ea\u05dc\u05ea\u05de\u05d9\u05de\u05d3 casting forging'],
      ['machining', '\ud83d\udd27', '\u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05db\u05e0\u05d9', 'Machining', '\u05d7\u05e8\u05d9\u05d8\u05d4 \u05db\u05e8\u05e1\u05d5\u05dd \u05de\u05d4\u05d9\u05e8\u05d5\u05ea turning milling cutting feed rpm'],
      ['threads', '\ud83d\udd29', '\u05d4\u05d1\u05e8\u05d2\u05d5\u05ea', 'Threads', '\u05d4\u05d1\u05e8\u05d2\u05d4 \u05d1\u05e8\u05d6 thread tap metric unc unf bsp npt'],
      ['welding', '\u26a1', '\u05e8\u05d9\u05ea\u05d5\u05da', 'Welding', 'weld mig tig stick'],
      ['heat', '\ud83d\udd25', '\u05d8\u05d9\u05e4\u05d5\u05dc\u05d9 \u05d7\u05d5\u05dd', 'Heat Treatment', '\u05d4\u05e7\u05e9\u05d9\u05d4 \u05e8\u05d9\u05db\u05d5\u05da \u05d0\u05e0\u05d9\u05dc\u05d9\u05e0\u05d2 hardening annealing tempering'],
      ['coatings', '\ud83c\udfa8', '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd', 'Coatings', '\u05d0\u05e0\u05d5\u05d3\u05d9\u05d9\u05d6 \u05e6\u05d1\u05e2 coating anodize plating pvd'],
      ['dfm', '\ud83c\udfd7\ufe0f', '\u05ea\u05db\u05df \u05dc\u05d9\u05d9\u05e6\u05d5\u05e8', 'Design for Manufacturing', 'dfm dfa'],
      ['materials', '\ud83e\uddf1', '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd', 'Materials', '\u05d7\u05d5\u05de\u05e8\u05d2\u05dc\u05dd \u05e4\u05dc\u05d3\u05d4 \u05d0\u05dc\u05d5\u05de\u05d9\u05e0\u05d9\u05d5\u05dd material steel aluminum'],
      ['metallurgy', '\ud83d\udd2c', '\u05de\u05d8\u05dc\u05d5\u05e8\u05d2\u05d9\u05d4', 'Metallurgy', '\u05e4\u05d0\u05d6\u05d5\u05ea \u05d2\u05d1\u05d9\u05e9\u05d9 phase diagram grain'],
      ['corrosion', '\u26a1', '\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4', 'Corrosion', '\u05d7\u05dc\u05d5\u05d3\u05d4 galvanic'],
      ['chem', '\ud83e\uddea', '\u05db\u05d9\u05de\u05d9\u05d4 \u05d4\u05e0\u05d3\u05e1\u05d9\u05ea', 'Engineering Chemistry', '\u05d3\u05d1\u05e7 chemistry adhesive loctite'],
      ['bearings', '\u2699\ufe0f', '\u05de\u05e1\u05d1\u05d9\u05dd', 'Bearings', 'bearing'],
      ['gears', '\u2699\ufe0f', '\u05d2\u05dc\u05d2\u05dc\u05d9 \u05e9\u05d9\u05e0\u05d9\u05d9\u05dd', 'Gears', '\u05d2\u05d9\u05e8 gear'],
      ['powertrans', '\u26d3\ufe0f', '\u05d4\u05e2\u05d1\u05e8\u05ea \u05db\u05d5\u05d7', 'Power Transmission', '\u05d7\u05d2\u05d5\u05e8\u05d4 \u05e9\u05e8\u05e9\u05e8\u05ea belt chain coupling'],
      ['springs', '\ud83c\udf00', '\u05e7\u05e4\u05d9\u05e6\u05d9\u05dd', 'Springs', 'spring'],
      ['seals', '\ud83d\udd35', '\u05d0\u05d8\u05de\u05d9\u05dd', 'Seals & Gaskets', 'seal oring gasket'],
      ['fasteners', '\ud83d\udd17', '\u05d7\u05d9\u05d1\u05d5\u05e8\u05d9\u05dd', 'Fasteners', '\u05d1\u05d5\u05e8\u05d2 \u05d0\u05d5\u05dd \u05e4\u05d9\u05df fastener bolt nut rivet'],
      ['inserts', '\ud83d\udd29', '\u05e7\u05e9\u05d9\u05d7\u05d9\u05dd', 'Threaded Inserts', 'helicoil insert keensert'],
      ['hydraulics', '\ud83d\udca7', '\u05d4\u05d9\u05d3\u05e8\u05d0\u05d5\u05dc\u05d9\u05e7\u05d4', 'Hydraulics', '\u05e4\u05e0\u05d0\u05d5\u05de\u05d8\u05d9\u05e7\u05d4 hydraulic pneumatic'],
      ['stress', '\ud83d\udcca', '\u05e0\u05d9\u05ea\u05d5\u05d7 \u05e2\u05d5\u05de\u05e1\u05d9\u05dd', 'Stress Analysis', '\u05de\u05d0\u05de\u05e5 \u05e2\u05d9\u05d9\u05e4\u05d5\u05ea stress fatigue beam'],
      ['gdt', '\u2295', 'GD&T', 'GD&T', '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05ea\u05d2\u05d9\u05d0\u05d5\u05de\u05d8\u05e8\u05d9\u05ea datum position'],
      ['tol', '\ud83d\udccf', '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05d9\u05d5\u05ea \u05d5\u05d4\u05ea\u05d0\u05de\u05d5\u05ea', 'Tolerances & Fits', 'tolerance fit iso286'],
      ['surface', '\u2726', '\u05d8\u05d9\u05d1 \u05e9\u05d8\u05d7', 'Surface Finish', '\u05d7\u05e1\u05e4\u05d5\u05e1 roughness ra'],
      ['inspection', '\ud83d\udd0d', '\u05d1\u05d3\u05d9\u05e7\u05d4 \u05d5\u05d0\u05d9\u05db\u05d5\u05ea', 'Inspection & Quality', '\u05de\u05d3\u05d9\u05d3\u05d4 cmm spc quality'],
      ['pressure', '\ud83d\udd2c', '\u05d1\u05d3\u05d9\u05e7\u05d5\u05ea \u05dc\u05d7\u05e5', 'Pressure Testing', 'pressure test'],
      ['fmea', '\u26a0\ufe0f', 'FMEA', 'FMEA', '\u05ea\u05e7\u05dc\u05d5\u05ea failure mode'],
      ['changes', '\ud83d\udcc4', '\u05e0\u05d9\u05d4\u05d5\u05dc \u05e9\u05d9\u05e0\u05d5\u05d9\u05d9\u05dd', 'Change Management', 'eco'],
      ['standards', '\ud83d\udccb', '\u05ea\u05e7\u05e0\u05d9\u05dd', 'Standards', 'standard iso asme din'],
      ['calc', '\ud83e\uddee', '\u05de\u05d7\u05e9\u05d1\u05d5\u05e0\u05d9\u05dd', 'Calculators', 'calculator'],
      ['pricing', '\ud83d\udcb0', '\u05ea\u05de\u05d7\u05d9\u05e8', 'Pricing & Cost', '\u05de\u05d7\u05d9\u05e8 \u05e2\u05dc\u05d5\u05ea cost quote'],
      ['glossary', '\ud83d\udcd6', '\u05de\u05d9\u05dc\u05d5\u05df \u05de\u05d5\u05e0\u05d7\u05d9\u05dd', 'Glossary', 'term']
    ].map(function (c) { return { k: c[0], i: c[1], he: c[2], en: c[3], kw: c[4] }; });
    var VIDS = [
      { he: '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05ea \u05d2\u05d9\u05d0\u05d5\u05de\u05d8\u05e8\u05d9\u05ea (GD&T)', en: 'Geometric Tolerancing (GD&T)', u: ['/gdt-video/', '/en/gdt-video-en/'], pages: ['gdt', 'tol'] },
      { he: '\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d5\u05ea \u05d9\u05d9\u05e6\u05d5\u05e8 \u05d5\u05e2\u05d9\u05d1\u05d5\u05d3', en: 'Manufacturing Processes', u: ['/manufacturing-course.html', '/en/manufacturing-course-en.html'], pages: ['mfgtech', 'machining', 'welding', 'threads', 'dfm'] },
      { he: '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd, \u05d2\u05d9\u05de\u05d5\u05e8\u05d9\u05dd \u05d5\u05e6\u05d1\u05e2', en: 'Coatings, Finishes & Paint', u: ['/coatings-course.html', '/en/coatings-course.html'], pages: ['coatings', 'surface', 'corrosion'] },
      { he: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05d5\u05de\u05d8\u05dc\u05d5\u05e8\u05d2\u05d9\u05d4', en: 'Materials & Metallurgy', u: ['/metallurgy-course.html', '/en/metallurgy-course.html'], pages: ['materials', 'metallurgy', 'heat', 'corrosion'] },
      { he: '\u05e7\u05e8\u05d9\u05d0\u05ea \u05e9\u05e8\u05d8\u05d5\u05d8', en: 'Drawing Reading', u: ['/drawing-course.html', '/en/drawing-course.html'], pages: ['inspection', 'standards', 'tol', 'gdt'] }
    ];

    /* ---------- helpers ---------- */
    var FIN = { '\u05da': '\u05db', '\u05dd': '\u05de', '\u05df': '\u05e0', '\u05e3': '\u05e4', '\u05e5': '\u05e6' };
    function norm(s) {
      s = String(s == null ? '' : s).toLowerCase().replace(/<[^>]*>/g, ' ').replace(/&/g, '').replace(/[\u0591-\u05C7]/g, '');
      s = s.replace(/[\u05da\u05dd\u05df\u05e3\u05e5]/g, function (c) { return FIN[c]; });
      return s.replace(/[^a-z0-9\u05D0-\u05EA.]+/g, ' ').replace(/(^|\s)\.+|\.+(\s|$)/g, ' ').replace(/\s+/g, ' ').trim();
    }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function strip(h) { return String(h || '').replace(/<br\s*\/?>/gi, ' \u00b7 ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
    function lev(a, b, max) {
      if (Math.abs(a.length - b.length) > max) { return max + 1; }
      var prev = [], cur = [], i, j, rowMin, t;
      for (j = 0; j <= b.length; j++) { prev[j] = j; }
      for (i = 1; i <= a.length; i++) {
        cur[0] = i; rowMin = cur[0];
        for (j = 1; j <= b.length; j++) {
          cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1));
          if (cur[j] < rowMin) { rowMin = cur[j]; }
        }
        if (rowMin > max) { return max + 1; }
        t = prev; prev = cur; cur = t;
      }
      return prev[b.length];
    }
    function byKey(k) { for (var i = 0; i < CATS.length; i++) { if (CATS[i].k === k) { return CATS[i]; } } return null; }
    function cname(c) { return HE ? c.he : c.en; }
    function pageUrl(k) { return P + k + '.html'; }
    function $(id) { return document.getElementById(id); }

    /* ---------- index ---------- */
    var DOCS = [];
    function addDoc(d) {
      d.an = d.aliases.map(norm).filter(Boolean);
      d.at = []; d.an.forEach(function (a) { a.split(' ').forEach(function (t) { if (t) { d.at.push(t); } }); });
      d.st = norm(d.secondary || '').split(' ').filter(Boolean);
      d.tx = ' ' + norm(d.text || '') + ' ';
      DOCS.push(d);
    }
    MATS.forEach(function (m, i) {
      var al = [m.name, m.id], k; if (m.equiv) { for (k in m.equiv) { if (m.equiv.hasOwnProperty(k)) { al.push(m.equiv[k]); } } }
      addDoc({ type: 'mat', ref: i, aliases: al, secondary: m.group, text: strip(m.det) + ' ' + m.stds + ' ' + m.forms + ' ' + m.makers });
    });
    GLOS.forEach(function (g, i) { addDoc({ type: 'term', ref: i, aliases: [g.he, g.en, g.abbr], secondary: g.cat, text: (g.def || '') + ' ' + (g.expand || '') }); });
    CATS.forEach(function (c, i) { addDoc({ type: 'cat', ref: i, aliases: [c.he, c.en].concat(c.kw.split(' ')), secondary: '', text: '' }); });

    var EXP = {}, EXPP = {};
    function addExp(a, b) {
      if (!a || !b || a === b) { return; }
      if (b.indexOf(' ') < 0 && a.indexOf(' ') < 0) { EXP[a] = EXP[a] || []; if (EXP[a].indexOf(b) < 0) { EXP[a].push(b); } }
      if (!EXPP[a]) { EXPP[a] = b; }
    }
    GLOS.forEach(function (g) {
      var he = norm(g.he), en = norm(g.en), ab = norm(g.abbr);
      addExp(he, en); addExp(en, he); if (ab) { addExp(ab, en); addExp(en, ab); addExp(ab, he); addExp(he, ab); }
    });
    CATS.forEach(function (c) { var he = norm(c.he), en = norm(c.en); addExp(he, en); addExp(en, he); });

    /* ---------- search ---------- */
    function tokScore(d, t) {
      var best = 0, i, a, isNum = /^[0-9.]+$/.test(t);
      for (i = 0; i < d.at.length; i++) {
        a = d.at[i];
        if (a === t) { return 100; }
        if (a.indexOf(t) === 0 && t.length >= 2) { best = Math.max(best, 70); }
        else if (t.length >= 3 && a.indexOf(t) > 0) { best = Math.max(best, isNum ? 55 : 38); }
      }
      if (best >= 70) { return best; }
      for (i = 0; i < d.st.length; i++) { a = d.st[i]; if (a === t) { best = Math.max(best, 60); } else if (t.length >= 3 && a.indexOf(t) === 0) { best = Math.max(best, 42); } }
      if (best >= 42) { return best; }
      if (t.length >= 4 && !isNum) {
        var max = t.length >= 8 ? 2 : 1, dd;
        for (i = 0; i < d.at.length; i++) { a = d.at[i]; if (Math.abs(a.length - t.length) <= max && a.charAt(0) === t.charAt(0)) { dd = lev(t, a, max); if (dd <= max) { best = Math.max(best, 46 - dd * 6); } } }
        if (best >= 34) { return best; }
      }
      if (d.tx.indexOf(' ' + t) >= 0) { best = Math.max(best, 12); } else if (t.length >= 4 && d.tx.indexOf(t) >= 0) { best = Math.max(best, 8); }
      return best;
    }
    function scoreDoc(d, groups, nq) {
      var total = 0, gi, ti, best, s;
      for (gi = 0; gi < groups.length; gi++) {
        best = 0; for (ti = 0; ti < groups[gi].length; ti++) { s = tokScore(d, groups[gi][ti]); if (s > best) { best = s; } }
        if (best <= 0) { return 0; } total += best;
      }
      if (d.an.indexOf(nq) >= 0) { total += 60; }
      return total;
    }
    function buildGroups(n) { return n.split(' ').filter(Boolean).map(function (t) { var alts = [t]; (EXP[t] || []).forEach(function (x) { if (alts.indexOf(x) < 0) { alts.push(x); } }); return alts; }); }
    function search(q) {
      var n = norm(q); if (!n) { return null; }
      var variants = [{ groups: buildGroups(n), nq: n }];
      if (EXPP[n]) { variants.push({ groups: buildGroups(EXPP[n]), nq: EXPP[n] }); }
      var out = [], i, v, s, best;
      for (i = 0; i < DOCS.length; i++) {
        best = 0; for (v = 0; v < variants.length; v++) { s = scoreDoc(DOCS[i], variants[v].groups, variants[v].nq); if (s > best) { best = s; } }
        if (best > 0) { out.push({ d: DOCS[i], s: best }); }
      }
      out.sort(function (a, b) { return b.s - a.s; });
      if (out.length && out[0].s >= 70) { var cut = Math.max(15, out[0].s * 0.25); out = out.filter(function (r) { return r.s >= cut; }); }
      return out;
    }
    function hl(text, q) {
      var out = esc(text);
      norm(q).split(' ').filter(function (t) { return t.length >= 2; }).forEach(function (t) {
        try { out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); } catch (e) { /* ignore */ }
      });
      return out;
    }

    /* ---------- links between concepts (built once from the existing text) ---------- */
    var SIGS = [], GTX = [], MTX = [], MENT = [], DF = [], RMENT = [], MATS_OF = [], built = false;
    function build() {
      if (built) { return; } built = true;
      GLOS.forEach(function (g, i) {
        var seen = {};
        [g.he, g.en, g.abbr].forEach(function (s) {
          var n = norm(s); if (!n || seen[n]) { return; } seen[n] = 1;
          var lat = /^[a-z0-9. ]+$/.test(n);
          if (/^[0-9. ]+$/.test(n)) { return; }
          if (n.length < 4 && !(lat && n.length >= 3 && String(s) === String(s).toUpperCase())) { return; }
          SIGS.push({ i: i, sig: n, lat: lat });
        });
        GTX[i] = ' ' + norm((g.def || '') + ' ' + (g.expand || '')) + ' '; MENT[i] = []; DF[i] = 0; RMENT[i] = []; MATS_OF[i] = [];
      });
      function has(txt, s) { return s.lat ? txt.indexOf(' ' + s.sig) >= 0 : txt.indexOf(s.sig) >= 0; }
      GLOS.forEach(function (g, i) {
        var found = {};
        SIGS.forEach(function (s) { if (s.i !== i && !found[s.i] && has(GTX[i], s)) { found[s.i] = 1; MENT[i].push(s.i); DF[s.i]++; RMENT[s.i].push(i); } });
      });
      MATS.forEach(function (m, mi) {
        MTX[mi] = ' ' + norm(strip(m.det) + ' ' + m.group) + ' ';
        var found = {}; SIGS.forEach(function (s) { if (!found[s.i] && has(MTX[mi], s)) { found[s.i] = 1; MATS_OF[s.i].push(mi); } });
      });
    }
    function genLimit() { return Math.max(25, Math.round(GLOS.length * 0.03)); }
    function isGeneric(j) { return DF[j] > genLimit(); }
    function mentionsOf(i, n) { return MENT[i].filter(function (j) { return !isGeneric(j); }).sort(function (a, b) { return DF[a] - DF[b]; }).slice(0, n); }
    function mentionedIn(i, n) { var c = GLOS[i].cat; return RMENT[i].slice().sort(function (a, b) { return (GLOS[b].cat === c) - (GLOS[a].cat === c); }).slice(0, n); }
    function matTerms(mi, n) { var out = [], j; for (j = 0; j < GLOS.length; j++) { if (!isGeneric(j) && MATS_OF[j].indexOf(mi) >= 0) { out.push(j); } } return out.sort(function (a, b) { return DF[a] - DF[b]; }).slice(0, n); }
    function numRM(m) { var x = String((m.props && m.props.RM) || '').match(/[0-9]+(\.[0-9]+)?/); return x ? parseFloat(x[0]) : 0; }
    function similar(mi, n) {
      var m = MATS[mi], fam = m.group.split(' ')[0], rm = numRM(m), codes = {}, out = [], k;
      if (m.equiv) { for (k in m.equiv) { if (m.equiv.hasOwnProperty(k)) { codes[norm(m.equiv[k])] = 1; } } }
      MATS.forEach(function (o, oi) {
        if (oi === mi) { return; } var s = 0, k2, d, r2;
        if (o.equiv) { for (k2 in o.equiv) { if (o.equiv.hasOwnProperty(k2) && codes[norm(o.equiv[k2])]) { s += 50; break; } } }
        if (o.group === m.group) { s += 30; } else if (o.group.split(' ')[0] === fam) { s += 10; }
        r2 = numRM(o); if (rm && r2) { d = Math.abs(Math.log(rm / r2)); s += Math.max(0, 20 * (1 - Math.min(1, d / 0.4))); }
        if (s >= 28) { out.push({ i: oi, s: s }); }
      });
      out.sort(function (a, b) { return b.s - a.s; }); return out.slice(0, n).map(function (x) { return x.i; });
    }
    function vcOf(m) {
      var d = strip(m.det), x = d.match(/Vc\s*=\s*(\d+)\s*[-\u2013]\s*(\d+)/);
      if (x) { return { lo: +x[1], hi: +x[2], mid: Math.round((+x[1] + +x[2]) / 2) }; }
      x = d.match(/Vc\s*=\s*(\d+)/); return x ? { lo: +x[1], hi: +x[1], mid: +x[1] } : null;
    }
    function videosFor(keys, n) { var out = []; VIDS.forEach(function (v) { if (keys.some(function (k) { return v.pages.indexOf(k) >= 0; })) { out.push(v); } }); return out.slice(0, n || 2); }

    /* ---------- rendering ---------- */
    var trail = [];
    function chipOpen(type, ref, label, cls) { return '<button type="button" class="xchip ' + (cls || type) + '" data-act="open" data-type="' + type + '" data-ref="' + ref + '">' + (type === 'mat' ? '\ud83d\udd29 ' : '\ud83d\udcd6 ') + esc(label) + '</button>'; }
    function chipSearch(q, label) { return '<button type="button" class="xchip mat" data-act="search" data-q="' + esc(q) + '">' + esc(label || q) + '</button>'; }
    function chipLink(url, label, cls) { return '<a class="xchip ' + (cls || 'cat') + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + label + '</a>'; }
    function group(title, html, note) { if (!html) { return ''; } return '<div class="xrelg"><h4>' + title + (note ? ' <span class="xnote">' + note + '</span>' : '') + '</h4><div class="xchips">' + html + '</div></div>'; }
    function relMat(mi) {
      var m = MATS[mi], txt = strip(m.det), g = '', count = 0, pages = [], k;
      var eq = ''; if (m.equiv) { for (k in m.equiv) { if (m.equiv.hasOwnProperty(k)) { eq += chipSearch(m.equiv[k], k + ': ' + m.equiv[k]); count++; } } }
      g += group(L.eq, eq, m.stds ? L.stds + esc(m.stds) : '');
      var ch = '';
      if (/\u05d8"\u05d7|Q&T|Case Hard|Nitrid|Induction|\u05d4\u05e7\u05e9\u05d9\u05d4|Anneal|\u05d0\u05e0\u05d9\u05dc\u05d9\u05e0\u05d2|HRC|Heat Treat/i.test(txt)) { pages.push('heat'); ch += chipLink(pageUrl('heat'), '\ud83d\udd25 ' + L.heat, 'cat'); count++; }
      pages.push('welding'); ch += chipLink(pageUrl('welding'), '\u26a1 ' + L.weld + ': ' + esc(m.weld || ''), 'cat'); count++;
      pages.push('machining'); ch += chipLink(pageUrl('machining'), '\ud83d\udd27 ' + L.mach + ': ' + esc(m.mach || ''), 'cat'); count++;
      if (/\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4|PREN|Pitting|\u05e0\u05d9\u05e8\u05d5\u05e1\u05d8\u05d4|\u05d7\u05dc\u05d5\u05d3\u05d4|Galvanic|\u05d2\u05dc\u05d5\u05d5\u05df|corrosion|stainless|rust|galvaniz/i.test(txt + ' ' + m.group)) { pages.push('corrosion'); ch += chipLink(pageUrl('corrosion'), '\u26a1 ' + L.corr, 'cat'); count++; }
      if (/\u05d0\u05e0\u05d5\u05d3\u05d9\u05d9\u05d6|\u05e6\u05d9\u05e4\u05d5\u05d9|PVD|Passiv|\u05e6\u05d1\u05d9\u05e2\u05d4|anodiz|coating|paint/i.test(txt)) { pages.push('coatings'); ch += chipLink(pageUrl('coatings'), '\ud83c\udfa8 ' + L.coat, 'cat'); count++; }
      pages.push('standards'); ch += chipLink(pageUrl('standards'), '\ud83d\udccb ' + L.std, 'cat'); count++;
      g += group(L.topics, ch);
      g += group(L.termsIn, matTerms(mi, 6).map(function (j) { count++; return chipOpen('term', j, HE ? GLOS[j].he : GLOS[j].en); }).join(''));
      g += group(L.similar, similar(mi, 5).map(function (j) { count++; return chipOpen('mat', j, MATS[j].name); }).join(''));
      g += group(L.videos, videosFor(pages, 2).map(function (v) { count++; return chipLink(v.u[HE ? 0 : 1], '\ud83c\udfac ' + esc(HE ? v.he : v.en), 'vid'); }).join(''));
      var vc = vcOf(m);
      if (vc) {
        g += '<div class="xrelg"><h4>' + L.calc + ' <span class="xnote">' + L.calcNote + vc.lo + (vc.hi !== vc.lo ? '\u2013' + vc.hi : '') + ' m/min)</span></h4>' +
          '<div class="xcalc" data-vc="1">Vc <input class="vc" type="number" value="' + vc.mid + '" aria-label="Vc"> m/min &nbsp; \u2300 <input class="dia" type="number" value="50" aria-label="diameter"> mm &nbsp;=&nbsp; <output>\u2014</output> RPM ' +
          '<a class="xchip cat" href="' + pageUrl('machining') + '" target="_blank" rel="noopener">\ud83d\udd17 ' + L.calcFull + '</a></div></div>';
      }
      return { html: g, count: count };
    }
    function relTerm(i) {
      var t = GLOS[i], g = '', count = 0, pages = [];
      function nm(j) { return HE ? GLOS[j].he : GLOS[j].en; }
      g += group(L.seeAlso, mentionsOf(i, 6).map(function (j) { count++; return chipOpen('term', j, nm(j)); }).join(''));
      g += group(L.inDefs, mentionedIn(i, 6).map(function (j) { count++; return chipOpen('term', j, nm(j)); }).join(''));
      g += group(L.matsMention, MATS_OF[i].slice(0, 5).map(function (j) { count++; return chipOpen('mat', j, MATS[j].name); }).join(''));
      var c = t.pk ? byKey(t.pk) : null, cl = '';
      if (c) { pages.push(t.pk); cl += chipLink(pageUrl(t.pk), c.i + ' ' + esc(cname(c)) + L.pageOf, 'cat'); count++; }
      g += group(L.topicOf + esc(t.cat) + ')', cl);
      g += group(L.videos, videosFor(pages, 2).map(function (v) { count++; return chipLink(v.u[HE ? 0 : 1], '\ud83c\udfac ' + esc(HE ? v.he : v.en), 'vid'); }).join(''));
      return { html: g, count: count };
    }
    function panel(r) {
      if (!r.count) { return '<div class="xnote" style="margin-top:12px">' + L.none + '</div>'; }
      return '<details class="xrel" open><summary>' + L.panel + ' (' + r.count + ')</summary>' + r.html + '</details>';
    }
    function renderMat(mi) {
      var m = MATS[mi], p = m.props || {}, rows = '', k;
      for (k in p) { if (p.hasOwnProperty(k)) { rows += '<div><b>' + esc(L.pl[k] || k) + '</b><bdi>' + esc(p[k]) + '</bdi></div>'; } }
      rows += '<div><b>' + L.mach2 + '</b><bdi>' + esc(m.mach || '') + '</bdi></div><div><b>' + L.weld2 + '</b><bdi>' + esc(m.weld || '') + '</bdi></div>';
      return '<div class="xcard"><h2>\ud83d\udd29 ' + esc(m.name) + '</h2><div class="xsub">' + esc(m.group) + (m.forms ? ' \u00b7 ' + esc(m.forms) : '') + '</div><div class="xprops">' + rows + '</div><div class="xdet">' + m.det + '</div>' + panel(relMat(mi)) + '</div>';
    }
    function renderTerm(i) {
      var t = GLOS[i], main = HE ? t.he : t.en, other = HE ? t.en : t.he;
      return '<div class="xcard"><h2>\ud83d\udcd6 ' + esc(main) + ' <span class="xalt">\u00b7 ' + esc(other) + (t.abbr ? ' (' + esc(t.abbr) + ')' : '') + '</span></h2><div class="xsub">' + esc(t.cat) + '</div><div class="xdef">' + esc(t.def) + '</div>' + (t.expand ? '<div class="xexp">' + esc(t.expand) + '</div>' : '') + panel(relTerm(i)) + '</div>';
    }
    function labelOf(type, ref) { return type === 'mat' ? MATS[ref].name : (HE ? GLOS[ref].he : GLOS[ref].en); }
    function renderTrail() {
      var h = ''; trail.forEach(function (s, i) {
        h += (i ? '<span class="xsep">\u2039</span>' : '<span>' + L.trail + '</span>') + '<button type="button" class="xchip ' + (s.type === 'mat' ? 'mat' : 'term') + (i === trail.length - 1 ? ' xcur' : '') + '" data-act="trail" data-i="' + i + '">' + esc(labelOf(s.type, s.ref)) + '</button>';
      });
      $('xtrail').innerHTML = h;
    }
    function calcAll() {
      var c = document.querySelector('.xcalc[data-vc]'); if (!c) { return; }
      var vc = parseFloat(c.querySelector('.vc').value), dia = parseFloat(c.querySelector('.dia').value), o = c.querySelector('output');
      o.textContent = (vc > 0 && dia > 0) ? Math.round(1000 * vc / (Math.PI * dia)).toLocaleString('en-US') : '\u2014';
    }
    function openItem(type, ref, fromTrail) {
      build();
      if (fromTrail === undefined) { trail.push({ type: type, ref: ref }); if (trail.length > 9) { trail.shift(); } } else { trail = trail.slice(0, fromTrail + 1); }
      $('xdetail').innerHTML = type === 'mat' ? renderMat(ref) : renderTerm(ref);
      $('xresults').innerHTML = ''; $('xstatus').textContent = '';
      renderTrail(); calcAll();
      var d = $('xdetail'); if (d.scrollIntoView) { d.scrollIntoView({ block: 'nearest' }); }
    }

    /* ---------- results list ---------- */
    var activeIdx = -1;
    function runSearch(q) {
      var res = search(q), box = $('xresults'), st = $('xstatus');
      if (res === null) { box.innerHTML = ''; st.textContent = ''; return; }
      var by = { mat: [], term: [], cat: [] }; res.forEach(function (r) { by[r.d.type].push(r); });
      var html = '', idx = 0;
      function section(title, arr, lim, render) {
        if (!arr.length) { return; }
        html += '<div class="xgrp"><h3>' + title + ' <span class="xnote">(' + arr.length + ')</span></h3>';
        arr.slice(0, lim).forEach(function (r) { html += render(r.d, idx++); });
        html += '</div>';
      }
      section(L.gMat, by.mat, 6, function (d, ix) { var m = MATS[d.ref]; return '<button type="button" class="xrow" data-act="open" data-type="mat" data-ref="' + d.ref + '" data-idx="' + ix + '"><span class="xic" style="color:' + esc(m.color || '#adb5bd') + '">\u25cf</span><span><span class="xt">' + hl(m.name, q) + '</span><br><span class="xs">' + esc(m.group) + ' \u00b7 <bdi>' + esc((m.props && m.props.RM) || '') + '</bdi></span></span></button>'; });
      section(L.gTerm, by.term, 6, function (d, ix) { var g = GLOS[d.ref], a = HE ? g.he : g.en, b = HE ? g.en : g.he; return '<button type="button" class="xrow" data-act="open" data-type="term" data-ref="' + d.ref + '" data-idx="' + ix + '"><span class="xic">\ud83d\udcd6</span><span><span class="xt">' + hl(a, q) + ' <span class="xalt">\u00b7 ' + hl(b, q) + (g.abbr ? ' (' + hl(g.abbr, q) + ')' : '') + '</span></span><br><span class="xs">' + esc(g.cat) + ' \u00b7 ' + esc((g.def || '').slice(0, 70)) + '\u2026</span></span></button>'; });
      section(L.gCat, by.cat, 3, function (d, ix) { var c = CATS[d.ref]; return '<a class="xrow" data-idx="' + ix + '" href="' + pageUrl(c.k) + '" target="_blank" rel="noopener"><span class="xic">' + c.i + '</span><span><span class="xt">' + esc(cname(c)) + '</span><br><span class="xs">' + L.catSub + '</span></span></a>'; });
      box.innerHTML = html || '<div class="xempty">' + L.noRes + '</div>';
      st.textContent = res.length ? L.found(res.length) : ''; activeIdx = -1;
    }
    function setActive(n) {
      var rows = document.querySelectorAll('#xresults .xrow'); if (!rows.length) { return; }
      activeIdx = (n + rows.length) % rows.length; Array.prototype.forEach.call(rows, function (r, i) { r.classList.toggle('xact', i === activeIdx); });
      if (rows[activeIdx].scrollIntoView) { rows[activeIdx].scrollIntoView({ block: 'nearest' }); }
    }

    /* ---------- wiring ---------- */
    var q = $('xq'); q.placeholder = L.ph;
    $('xdetail').innerHTML = '<div class="xhint">' + L.hint + '</div>';
    q.addEventListener('input', function () { runSearch(q.value); });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
      else if (e.key === 'Enter') { var rows = document.querySelectorAll('#xresults .xrow'), r = rows[activeIdx >= 0 ? activeIdx : 0]; if (r) { r.click(); } }
      else if (e.key === 'Escape') { q.value = ''; runSearch(''); }
    });
    function onAct(e) {
      var el = e.target.closest ? e.target.closest('[data-act]') : null; if (!el) { return; } var a = el.getAttribute('data-act');
      if (a === 'open') { openItem(el.getAttribute('data-type'), +el.getAttribute('data-ref')); }
      else if (a === 'search') { q.value = el.getAttribute('data-q'); runSearch(q.value); q.focus(); window.scrollTo(0, 0); }
      else if (a === 'trail') { var s = trail[+el.getAttribute('data-i')]; if (s) { openItem(s.type, s.ref, +el.getAttribute('data-i')); } }
    }
    ['xresults', 'xdetail', 'xtrail'].forEach(function (id) { $(id).addEventListener('click', onAct); });
    $('xdetail').addEventListener('input', function (e) { if (e.target.closest && e.target.closest('.xcalc')) { calcAll(); } });
    var EX = HE ? ['C45', '42CrMo4', '\u05de\u05e1\u05d1', 'bearing', 'inconell', 'HRC', '4140 \u05e8\u05d9\u05ea\u05d5\u05da', '1018', 'H7'] : ['C45', '42CrMo4', 'bearing', '\u05de\u05e1\u05d1', 'inconell', 'HRC', '4140 welding', '1018', 'H7'];
    var exEl = $('xex');
    EX.forEach(function (x) { var b = document.createElement('button'); b.type = 'button'; b.className = 'xchip'; b.textContent = x; b.addEventListener('click', function () { q.value = x; runSearch(x); q.focus(); }); exEl.appendChild(b); });
    /* deep link: /explore.html?q=C45 */
    try { var m = /[?&]q=([^&]*)/.exec(location.search); if (m) { var v = decodeURIComponent(m[1].replace(/\+/g, ' ')); if (v) { q.value = v; runSearch(v); } } } catch (e) { /* ignore */ }
    setTimeout(build, 50);
    window.__mhExploreApi = { search: search, openItem: openItem, build: build, MATS: MATS, GLOS: GLOS, mentionsOf: mentionsOf, isGeneric: isGeneric, similar: similar, vcOf: vcOf };
  }
})();
