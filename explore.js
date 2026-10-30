/*! METAL HUB - smart search and concept links (explore.js) - search engine v2.
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
    var MATS = D.mats, GLOS = D.glos, CALCS = D.calcs || [], CTABS = D.ctabs || {}, LEARN = window.MH_LEARN || {}, lastRandom = -1;
    var HE = (document.documentElement.getAttribute('lang') || 'he').toLowerCase().indexOf('he') === 0;
    var P = HE ? '/' : '/en/';
    var L = HE ? {
      noRes: '\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea. \u05e0\u05e1\u05d4 \u05de\u05d9\u05dc\u05d4 \u05d0\u05d7\u05e8\u05ea, \u05d0\u05d5 \u05d0\u05ea \u05d4\u05ea\u05e8\u05d2\u05d5\u05dd \u05e9\u05dc\u05d4.', found: function (n) { return '\u05e0\u05de\u05e6\u05d0\u05d5 ' + n + ' \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea. \u05de\u05d5\u05e6\u05d2\u05d5\u05ea \u05d4\u05d8\u05d5\u05d1\u05d5\u05ea \u05d1\u05d9\u05d5\u05ea\u05e8 \u05de\u05db\u05dc \u05e1\u05d5\u05d2.'; },
      gMat: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd', gTerm: '\u05de\u05d5\u05e0\u05d7\u05d9\u05dd', gCat: '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05d1\u05d0\u05ea\u05e8', catSub: '\u05d4\u05d3\u05e3 \u05d1\u05d0\u05ea\u05e8 (\u05e0\u05e4\u05ea\u05d7 \u05d1\u05dc\u05e9\u05d5\u05e0\u05d9\u05ea \u05d7\u05d3\u05e9\u05d4)', hint: '\u05d1\u05d7\u05e8 \u05ea\u05d5\u05e6\u05d0\u05d4 \u05db\u05d3\u05d9 \u05dc\u05e8\u05d0\u05d5\u05ea \u05d0\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05e9\u05dc\u05d4 \u05d5\u05d4\u05e7\u05e9\u05e8\u05d9\u05dd \u05e9\u05dc\u05d4.',
      trail: '\u05e0\u05ea\u05d9\u05d1 \u05d4\u05dc\u05d9\u05de\u05d5\u05d3:', panel: '\u05de\u05e7\u05d5\u05e9\u05e8 \u05dc...', none: '\u05d0\u05d9\u05df \u05e2\u05d3\u05d9\u05d9\u05df \u05e7\u05e9\u05e8\u05d9\u05dd \u05dc\u05e4\u05e8\u05d9\u05d8 \u05d4\u05d6\u05d4.',
      eq: '\u05e9\u05e7\u05d9\u05dc\u05d5\u05ea \u05d1\u05ea\u05e7\u05e0\u05d9\u05dd (\u05dc\u05d7\u05e5 \u05db\u05d3\u05d9 \u05dc\u05d7\u05e4\u05e9 \u05d0\u05ea \u05d4\u05e1\u05d9\u05de\u05d5\u05df)', stds: '\u05ea\u05e7\u05e0\u05d9\u05dd: ', topics: '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05e7\u05e9\u05d5\u05e8\u05d9\u05dd \u05d1\u05d0\u05ea\u05e8', heat: '\u05d8\u05d9\u05e4\u05d5\u05dc \u05d7\u05d5\u05dd', weld: '\u05e8\u05d9\u05ea\u05d5\u05da', mach: '\u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05db\u05e0\u05d9', corr: '\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4', coat: '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd', std: '\u05ea\u05e7\u05e0\u05d9\u05dd',
      termsIn: '\u05de\u05d5\u05e0\u05d7\u05d9\u05dd \u05e9\u05de\u05d5\u05e4\u05d9\u05e2\u05d9\u05dd \u05d1\u05d7\u05d5\u05de\u05e8', similar: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05d3\u05d5\u05de\u05d9\u05dd', videos: '\u05e1\u05e8\u05d8\u05d5\u05e0\u05d9 \u05d4\u05d3\u05e8\u05db\u05d4', calc: '\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05de\u05d4\u05d9\u05e8 \u05e2\u05dd \u05e0\u05ea\u05d5\u05e0\u05d9 \u05d4\u05d7\u05d5\u05de\u05e8', calcNote: '(Vc \u05de\u05d4\u05e8\u05e9\u05d5\u05de\u05d4: ', calcFull: '\u05d4\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05d4\u05de\u05dc\u05d0 \u05d1\u05d0\u05ea\u05e8',
      seeAlso: '\u05e8\u05d0\u05d4 \u05d2\u05dd (\u05de\u05d5\u05e9\u05d2\u05d9\u05dd \u05e9\u05d4\u05d4\u05d2\u05d3\u05e8\u05d4 \u05e0\u05e9\u05e2\u05e0\u05ea \u05e2\u05dc\u05d9\u05d4\u05dd)', inDefs: '\u05de\u05d5\u05e4\u05d9\u05e2 \u05d1\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05e9\u05dc', matsMention: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05e9\u05de\u05d5\u05d6\u05db\u05e8 \u05d1\u05d4\u05dd', topicOf: '\u05e0\u05d5\u05e9\u05d0 \u05d1\u05d0\u05ea\u05e8 (', pageOf: ' \u2014 \u05d4\u05d3\u05e3 \u05d1\u05d0\u05ea\u05e8',
      learn: '\u05d8\u05d9\u05e4\u05ea \u05dc\u05d9\u05de\u05d5\u05d3', lWhy: '\ud83d\udca1 \u05dc\u05de\u05d4 \u05d6\u05d4 \u05d7\u05e9\u05d5\u05d1', lEx: '\ud83e\uddee \u05d3\u05d5\u05d2\u05de\u05d4', lMis: '\u26a0\ufe0f \u05d8\u05e2\u05d5\u05ea \u05e0\u05e4\u05d5\u05e6\u05d4', lNote: '\u05e0\u05d5\u05e1\u05d7 \u05d1\u05e2\u05d6\u05e8\u05ea AI \u05d5\u05e0\u05d1\u05d3\u05e7 \u05de\u05d5\u05dc \u05de\u05e7\u05d5\u05e8\u05d5\u05ea. \u05dc\u05e4\u05e0\u05d9 \u05d9\u05d9\u05e9\u05d5\u05dd \u05d1\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05d1\u05d3\u05d5\u05e7 \u05de\u05d5\u05dc \u05d4\u05ea\u05e7\u05df \u05d0\u05d5 \u05d4\u05e0\u05d5\u05d4\u05dc \u05e9\u05dc\u05da.', lRand: '\ud83c\udfb2 \u05e2\u05d5\u05d3 \u05db\u05e8\u05d8\u05d9\u05e1 \u05dc\u05d9\u05de\u05d5\u05d3', lBar: '\u05dc\u05de\u05d9\u05d3\u05d4:', galBtn: function (n) { return '\ud83d\udca1 \u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05dc\u05d9\u05de\u05d5\u05d3 (' + n + ')'; }, randBtn: '\ud83c\udfb2 \u05d4\u05e4\u05ea\u05e2 \u05d0\u05d5\u05ea\u05d9', galTitle: function (n) { return '\ud83d\udca1 \u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05dc\u05d9\u05de\u05d5\u05d3 (' + n + ')'; }, galSub: '\u05dc\u05d7\u05e5 \u05e2\u05dc \u05de\u05d5\u05e9\u05d2 \u05db\u05d3\u05d9 \u05dc\u05e4\u05ea\u05d5\u05d7 \u05d0\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05e9\u05dc\u05d5.',
      more: function (n) { return '\u05d4\u05e6\u05d2 \u05e2\u05d5\u05d3 (' + n + ')'; }, weak: function (n) { return '\u05d4\u05e6\u05d2 \u05d2\u05dd ' + n + ' \u05d4\u05ea\u05d0\u05de\u05d5\u05ea \u05d7\u05dc\u05e9\u05d5\u05ea \u05d9\u05d5\u05ea\u05e8 (\u05d4\u05de\u05d9\u05dc\u05d4 \u05de\u05d5\u05e4\u05d9\u05e2\u05d4 \u05e8\u05e7 \u05d1\u05ea\u05d5\u05da \u05d4\u05d8\u05e7\u05e1\u05d8)'; }, gCalc: '\u05de\u05d7\u05e9\u05d1\u05d5\u05e0\u05d9\u05dd', gVid: '\u05e1\u05e8\u05d8\u05d5\u05e0\u05d9 \u05d4\u05d3\u05e8\u05db\u05d4', calcSub: '\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05d1\u05d0\u05ea\u05e8 (\u05e0\u05e4\u05ea\u05d7 \u05d1\u05dc\u05e9\u05d5\u05e0\u05d9\u05ea \u05d7\u05d3\u05e9\u05d4)', vidSub: '\u05e1\u05d3\u05e8\u05ea \u05d4\u05d3\u05e8\u05db\u05d4 (\u05e0\u05e4\u05ea\u05d7\u05ea \u05d1\u05dc\u05e9\u05d5\u05e0\u05d9\u05ea \u05d7\u05d3\u05e9\u05d4)', relaxed: '\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d4 \u05d4\u05ea\u05d0\u05de\u05d4 \u05de\u05dc\u05d0\u05d4 \u05dc\u05db\u05dc \u05d4\u05de\u05d9\u05dc\u05d9\u05dd. \u05de\u05d5\u05e6\u05d2\u05d5\u05ea \u05d4\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d4\u05e7\u05e8\u05d5\u05d1\u05d5\u05ea \u05d1\u05d9\u05d5\u05ea\u05e8.', didYou: '\u05d4\u05d0\u05dd \u05d4\u05ea\u05db\u05d5\u05d5\u05e0\u05ea \u05dc:', noneHelp: '\u05e0\u05e1\u05d4 \u05de\u05d9\u05dc\u05d4 \u05d0\u05d7\u05e8\u05ea, \u05d0\u05d5 \u05d0\u05d7\u05ea \u05de\u05d4\u05d3\u05d5\u05d2\u05de\u05d0\u05d5\u05ea.',
      eqIs: '\u05e9\u05e7\u05d5\u05dc \u05dc-', eqOpen: '\u05e4\u05ea\u05d7 \u05d0\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1', eqNote: '\u05dc\u05e4\u05d9 \u05e0\u05ea\u05d5\u05e0\u05d9 \u05d4\u05d0\u05ea\u05e8. \u05dc\u05e4\u05e0\u05d9 \u05e9\u05d9\u05de\u05d5\u05e9 \u05d1\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05d1\u05d3\u05d5\u05e7 \u05de\u05d5\u05dc \u05d4\u05ea\u05e7\u05df.', cmpVs: ' \u05de\u05d5\u05dc ', cmpNote: '\u05d4\u05e2\u05e8\u05db\u05d9\u05dd \u05d4\u05dd \u05d8\u05d5\u05d5\u05d7\u05d9\u05dd \u05d5\u05ea\u05dc\u05d5\u05d9\u05d9\u05dd \u05d1\u05de\u05e6\u05d1 \u05d4\u05d8\u05d9\u05e4\u05d5\u05dc. \u05de\u05d5\u05d3\u05d2\u05e9 = \u05d4\u05e2\u05e8\u05da \u05d4\u05d2\u05d1\u05d5\u05d4 \u05d9\u05d5\u05ea\u05e8.', cmpGroup: '\u05e1\u05d5\u05d2', cmpEq: '\u05e9\u05e7\u05d9\u05dc\u05d5\u05d9\u05d5\u05ea', cmpUse: '\u05e9\u05d9\u05de\u05d5\u05e9', cmpStd: '\u05ea\u05e7\u05e0\u05d9\u05dd', cmpOpen: '\u05e4\u05ea\u05d7 \u05d0\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05e9\u05dc ',
      fltTitle: '\u05e1\u05d9\u05e0\u05d5\u05df \u05dc\u05e4\u05d9 \u05ea\u05db\u05d5\u05e0\u05d4', fltCount: function (n, shown) { return '\u05e0\u05de\u05e6\u05d0\u05d5 ' + n + ' \u05d7\u05d5\u05de\u05e8\u05d9\u05dd' + (n > shown ? ' (\u05de\u05d5\u05e6\u05d2\u05d9\u05dd ' + shown + ')' : ''); }, fltMore: '\u05d4\u05d8\u05d5\u05d5\u05d7 \u05e9\u05dc \u05d4\u05d7\u05d5\u05de\u05e8 \u05de\u05d2\u05d9\u05e2 \u05dc\u05e4\u05d7\u05d5\u05ea \u05dc-', fltLess: '\u05d4\u05d8\u05d5\u05d5\u05d7 \u05e9\u05dc \u05d4\u05d7\u05d5\u05de\u05e8 \u05de\u05ea\u05d7\u05d9\u05dc \u05dc\u05db\u05dc \u05d4\u05d9\u05d5\u05ea\u05e8 \u05d1-', fltNone: '\u05d0\u05d9\u05df \u05d7\u05d5\u05de\u05e8 \u05e9\u05e2\u05d5\u05e0\u05d4 \u05e2\u05dc \u05d4\u05ea\u05e0\u05d0\u05d9.', cmpBtn: '\u21c4 \u05d4\u05e9\u05d5\u05d5\u05d4: ',
      mach2: '\u05e2\u05d9\u05d1\u05d5\u05d3\u05d9\u05d5\u05ea', weld2: '\u05e8\u05d9\u05ea\u05d5\u05db\u05d9\u05d5\u05ea', ph: '\u05d7\u05e4\u05e9 \u05d7\u05d5\u05de\u05e8, \u05de\u05d5\u05e0\u05d7 \u05d0\u05d5 \u05e0\u05d5\u05e9\u05d0... (\u05dc\u05de\u05e9\u05dc: C45, \u05de\u05e1\u05d1, 4140 \u05e8\u05d9\u05ea\u05d5\u05da)',
      pl: { RM: '\u05d7\u05d5\u05d6\u05e7 \u05de\u05ea\u05d9\u05d7\u05d4', Rp0: '\u05d2\u05d1\u05d5\u05dc \u05db\u05e0\u05d9\u05e2\u05d4', HB: '\u05e7\u05e9\u05d9\u05d5\u05ea HB', E: '\u05de\u05d5\u05d3\u05d5\u05dc E', A: '\u05d4\u05ea\u05d0\u05e8\u05db\u05d5\u05ea', rho: '\u05e6\u05e4\u05d9\u05e4\u05d5\u05ea', '\u03c1': '\u05e6\u05e4\u05d9\u05e4\u05d5\u05ea' }
    } : {
      noRes: 'No results. Try another word, or its translation.', found: function (n) { return n + ' results. The best of each type are shown.'; },
      gMat: 'Materials', gTerm: 'Terms', gCat: 'Topics on the site', catSub: 'Page on the site (opens in a new tab)', hint: 'Pick a result to see its card and its links.',
      trail: 'Learning trail:', panel: 'Linked to...', none: 'No links for this item yet.',
      eq: 'Equivalents in other standards (click to search the designation)', stds: 'Standards: ', topics: 'Related topics on the site', heat: 'Heat treatment', weld: 'Welding', mach: 'Machining', corr: 'Corrosion', coat: 'Coatings', std: 'Standards',
      termsIn: 'Terms that appear in this material', similar: 'Similar materials', videos: 'Video courses', calc: 'Quick calculator fed by the material', calcNote: '(Vc from the record: ', calcFull: 'Full calculator on the site',
      seeAlso: 'See also (concepts the definition relies on)', inDefs: 'Appears in the definitions of', matsMention: 'Materials that mention it', topicOf: 'Topic on the site (', pageOf: ' \u2014 page on the site',
      learn: 'Learning card', lWhy: '\ud83d\udca1 Why it matters', lEx: '\ud83e\uddee Example', lMis: '\u26a0\ufe0f Common mistake', lNote: 'Drafted with AI and checked against sources. Before using in a project, verify against your standard or procedure.', lRand: '\ud83c\udfb2 Another learning card', lBar: 'Learn:', galBtn: function (n) { return '\ud83d\udca1 Learning cards (' + n + ')'; }, randBtn: '\ud83c\udfb2 Surprise me', galTitle: function (n) { return '\ud83d\udca1 Learning cards (' + n + ')'; }, galSub: 'Click a term to open its card.',
      more: function (n) { return 'Show more (' + n + ')'; }, weak: function (n) { return 'Also show ' + n + ' weaker matches (the word appears only inside the text)'; }, gCalc: 'Calculators', gVid: 'Video courses', calcSub: 'Calculator on the site (opens in a new tab)', vidSub: 'Video series (opens in a new tab)', relaxed: 'No exact match for all the words. Showing the closest results.', didYou: 'Did you mean:', noneHelp: 'Try another word, or one of the examples.',
      eqIs: 'is equivalent to ', eqOpen: 'Open the card', eqNote: 'Per the site data. Check against the standard before using in a project.', cmpVs: ' vs ', cmpNote: 'Values are ranges and depend on the heat-treatment condition. Bold = the higher value.', cmpGroup: 'Type', cmpEq: 'Equivalents', cmpUse: 'Use', cmpStd: 'Standards', cmpOpen: 'Open the card of ',
      fltTitle: 'Filter by property', fltCount: function (n, shown) { return n + ' materials found' + (n > shown ? ' (showing ' + shown + ')' : ''); }, fltMore: 'the material range reaches at least ', fltLess: 'the material range starts at or below ', fltNone: 'No material meets the condition.', cmpBtn: '\u21c4 Compare: ',
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
      { he: '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05ea \u05d2\u05d9\u05d0\u05d5\u05de\u05d8\u05e8\u05d9\u05ea (GD&T)', en: 'Geometric Tolerancing (GD&T)', u: ['/gdt-video/', '/en/gdt-video-en/'], pages: ['gdt', 'tol'], kw: 'gdt gd&t \u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05ea \u05d2\u05d9\u05d0\u05d5\u05de\u05d8\u05e8\u05d9\u05ea tolerancing datum' },
      { he: '\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d5\u05ea \u05d9\u05d9\u05e6\u05d5\u05e8 \u05d5\u05e2\u05d9\u05d1\u05d5\u05d3', en: 'Manufacturing Processes', u: ['/manufacturing-course.html', '/en/manufacturing-course-en.html'], pages: ['mfgtech', 'machining', 'welding', 'threads', 'dfm'], kw: '\u05d9\u05d9\u05e6\u05d5\u05e8 \u05e2\u05d9\u05d1\u05d5\u05d3 manufacturing processes cnc machining' },
      { he: '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd, \u05d2\u05d9\u05de\u05d5\u05e8\u05d9\u05dd \u05d5\u05e6\u05d1\u05e2', en: 'Coatings, Finishes & Paint', u: ['/coatings-course.html', '/en/coatings-course.html'], pages: ['coatings', 'surface', 'corrosion'], kw: '\u05e6\u05d9\u05e4\u05d5\u05d9\u05d9\u05dd \u05e6\u05d1\u05e2 \u05d2\u05d9\u05de\u05d5\u05e8 coatings paint finish anodize' },
      { he: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05d5\u05de\u05d8\u05dc\u05d5\u05e8\u05d2\u05d9\u05d4', en: 'Materials & Metallurgy', u: ['/metallurgy-course.html', '/en/metallurgy-course.html'], pages: ['materials', 'metallurgy', 'heat', 'corrosion'], kw: '\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05de\u05d8\u05dc\u05d5\u05e8\u05d2\u05d9\u05d4 metallurgy materials steel' },
      { he: '\u05e7\u05e8\u05d9\u05d0\u05ea \u05e9\u05e8\u05d8\u05d5\u05d8', en: 'Drawing Reading', u: ['/drawing-course.html', '/en/drawing-course.html'], pages: ['inspection', 'standards', 'tol', 'gdt'], kw: '\u05e9\u05e8\u05d8\u05d5\u05d8 \u05e7\u05e8\u05d9\u05d0\u05ea drawing reading blueprint' }
    ];

    /* ---------- helpers ---------- */
    var FIN = { '\u05da': '\u05db', '\u05dd': '\u05de', '\u05df': '\u05e0', '\u05e3': '\u05e4', '\u05e5': '\u05e6' };
    function norm(s) {
      s = String(s == null ? '' : s).toLowerCase().replace(/<[^>]*>/g, ' ').replace(/&/g, '').replace(/[\u0591-\u05C7]/g, '');
      s = s.replace(/([\u05D0-\u05EA])["'\u05F3\u05F4]([\u05D0-\u05EA])/g, '$1$2');   /* Hebrew acronyms keep together: \u05e1\u05dc"\u05d3, \u05d8"\u05d7 */
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
    function useOf(det) { var m = /<b>(?:\u05e9\u05d9\u05de\u05d5\u05e9|Use|Uses|Applications?)[^<]*:<\/b>\s*([^<]*)/i.exec(det || ''); return m ? m[1] : ''; }
    function addDoc(d) {
      d.an = d.aliases.map(norm).filter(Boolean);
      d.at = []; d.an.forEach(function (a) { a.split(' ').forEach(function (t) { if (t) { d.at.push(t); } }); });
      d.st = norm(d.secondary || '').split(' ').filter(Boolean);
      d.tx = ' ' + norm(d.text || '') + ' ';
      d.us = d.use ? ' ' + norm(d.use) + ' ' : '';
      DOCS.push(d);
    }
    MATS.forEach(function (m, i) {
      var al = [m.name, m.id], k;
      if (m.equiv) { for (k in m.equiv) { if (m.equiv.hasOwnProperty(k)) { al.push(m.equiv[k]); al.push(k + ' ' + m.equiv[k]); } } }
      String(m.stds || '').split(/\s*[\/\u00b7,;]\s*/).forEach(function (x) { if (x) { al.push(x); } });
      addDoc({ type: 'mat', ref: i, aliases: al, secondary: m.group, use: useOf(m.det), text: strip(m.det) + ' ' + m.stds + ' ' + m.forms + ' ' + m.makers });
    });
    GLOS.forEach(function (g, i) { addDoc({ type: 'term', ref: i, aliases: [g.he, g.en, g.abbr], secondary: g.cat, text: (g.def || '') + ' ' + (g.expand || '') }); });
    CATS.forEach(function (c, i) { addDoc({ type: 'cat', ref: i, aliases: [c.he, c.en].concat(c.kw.split(' ')), secondary: '', text: '' }); });
    CALCS.forEach(function (c, i) { addDoc({ type: 'calc', ref: i, aliases: [c.t], secondary: CTABS[c.s] || '', text: c.d || '' }); });
    VIDS.forEach(function (v, i) { addDoc({ type: 'vid', ref: i, aliases: [v.he, v.en].concat(v.kw.split(' ')), secondary: '', text: '' }); });

    /* bilingual expansion learned from the glossary itself (Hebrew <-> English <-> abbreviation) */
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

    /* curated synonyms and Hebrew transliterations of material, application and property words */
    var SYNSRC = [
      ['inconel', '\u05d0\u05d9\u05e0\u05e7\u05d5\u05e0\u05dc'], ['hastelloy', '\u05d4\u05e1\u05d8\u05dc\u05d5\u05d9', '\u05d4\u05d0\u05e1\u05d8\u05dc\u05d5\u05d9'], ['monel', '\u05de\u05d5\u05e0\u05dc'], ['titanium', '\u05d8\u05d9\u05d8\u05e0\u05d9\u05d5\u05dd', '\u05d8\u05d9\u05d8\u05d0\u05e0\u05d9\u05d5\u05dd'], ['aluminum', 'aluminium', '\u05d0\u05dc\u05d5\u05de\u05d9\u05e0\u05d9\u05d5\u05dd', '\u05d0\u05dc\u05d5\u05de\u05e0\u05d9\u05d5\u05dd'],
      ['stainless', '\u05e0\u05d9\u05e8\u05d5\u05e1\u05d8\u05d4', '\u05e0\u05d9\u05e8\u05d5\u05e1\u05d8\u05d0', 'inox'], ['brass', '\u05e4\u05dc\u05d9\u05d6'], ['bronze', '\u05d1\u05e8\u05d5\u05e0\u05d6\u05d4'], ['copper', '\u05e0\u05d7\u05d5\u05e9\u05ea'], ['steel', '\u05e4\u05dc\u05d3\u05d4', '\u05e4\u05dc\u05d3\u05ea'], ['iron', '\u05d1\u05e8\u05d6\u05dc'], ['cast', '\u05d9\u05e6\u05d9\u05e7\u05d4', '\u05d9\u05e6\u05d5\u05e7', '\u05d9\u05e6\u05d5\u05e7\u05d4'],
      ['nylon', '\u05e0\u05d9\u05d9\u05dc\u05d5\u05df'], ['delrin', '\u05d3\u05dc\u05e8\u05d9\u05df', 'pom', 'acetal', '\u05d0\u05e6\u05d8\u05dc'], ['peek', '\u05e4\u05d9\u05e7'], ['ptfe', 'teflon', '\u05d8\u05e4\u05dc\u05d5\u05df'], ['ultem', '\u05d0\u05d5\u05dc\u05d8\u05dd', 'pei'], ['kevlar', '\u05e7\u05d1\u05dc\u05e8', '\u05e7\u05d5\u05d5\u05dc\u05e8'],
      ['carbon', '\u05e4\u05d7\u05de\u05df', '\u05e7\u05e8\u05d1\u05d5\u05df'], ['fiber', 'fibre', '\u05e1\u05d9\u05d1\u05d9\u05dd', '\u05e1\u05d9\u05d1'], ['composite', '\u05de\u05e8\u05d5\u05db\u05d1', '\u05e7\u05d5\u05de\u05e4\u05d5\u05d6\u05d9\u05d8'], ['ceramic', '\u05e7\u05e8\u05de\u05d9\u05e7\u05d4', '\u05e7\u05e8\u05de\u05d9'], ['tungsten', '\u05d8\u05d5\u05e0\u05d2\u05e1\u05d8\u05df'], ['carbide', '\u05e7\u05e8\u05d1\u05d9\u05d3'],
      ['magnesium', '\u05de\u05d2\u05e0\u05d6\u05d9\u05d5\u05dd'], ['beryllium', '\u05d1\u05e8\u05d9\u05dc\u05d9\u05d5\u05dd'], ['nickel', '\u05e0\u05d9\u05e7\u05dc'], ['zinc', '\u05d0\u05d1\u05e5', '\u05e6\u05d9\u05e0\u05e7'], ['zamak', '\u05d6\u05de\u05e7', '\u05d6\u05d0\u05de\u05e7'], ['maraging', '\u05de\u05e8\u05d2\u05d9\u05e0\u05d2'], ['duplex', '\u05d3\u05d5\u05e4\u05dc\u05e7\u05e1'], ['stellite', '\u05e1\u05d8\u05dc\u05d9\u05d9\u05d8'],
      ['spring', 'springs', '\u05e7\u05e4\u05d9\u05e5', '\u05e7\u05e4\u05d9\u05e6\u05d9\u05dd'], ['bearing', 'bearings', '\u05de\u05e1\u05d1', '\u05de\u05e1\u05d1\u05d9\u05dd'], ['gear', 'gears', '\u05d2\u05d9\u05e8', '\u05d2\u05d9\u05e8\u05d9\u05dd'], ['shaft', 'shafts', '\u05e6\u05d9\u05e8', '\u05e6\u05d9\u05e8\u05d9\u05dd'], ['bolt', 'bolts', 'screw', 'screws', 'fastener', '\u05d1\u05d5\u05e8\u05d2', '\u05d1\u05e8\u05d2\u05d9\u05dd'],
      ['nut', 'nuts', '\u05d0\u05d5\u05dd'], ['seal', 'seals', '\u05d0\u05d8\u05dd', '\u05d0\u05d8\u05de\u05d9\u05dd'], ['pipe', 'pipes', 'tube', 'tubes', '\u05e6\u05d9\u05e0\u05d5\u05e8', '\u05e6\u05d9\u05e0\u05d5\u05e8\u05d5\u05ea', '\u05e6\u05e0\u05e8\u05ea'], ['tank', 'vessel', '\u05de\u05d9\u05db\u05dc', '\u05de\u05d9\u05db\u05dc\u05d9\u05dd'], ['mold', 'mould', 'die', '\u05ea\u05d1\u05e0\u05d9\u05ea', '\u05ea\u05d1\u05e0\u05d9\u05d5\u05ea', '\u05d3\u05e4\u05d5\u05e1'],
      ['medical', 'implant', 'implants', '\u05e8\u05e4\u05d5\u05d0\u05d9', '\u05e9\u05ea\u05dc', '\u05e9\u05ea\u05dc\u05d9\u05dd'], ['aerospace', 'aircraft', 'aviation', '\u05de\u05d8\u05d5\u05e1', '\u05ea\u05e2\u05d5\u05e4\u05d4', '\u05ea\u05e2\u05d5\u05e4\u05ea\u05d9'], ['marine', 'naval', '\u05d9\u05de\u05d9', '\u05e1\u05e4\u05d9\u05e0\u05d4'], ['automotive', '\u05e8\u05db\u05d1'],
      ['pump', 'pumps', '\u05de\u05e9\u05d0\u05d1\u05d4', '\u05de\u05e9\u05d0\u05d1\u05d5\u05ea'], ['valve', 'valves', '\u05e9\u05e1\u05ea\u05d5\u05dd', '\u05e9\u05e1\u05ea\u05d5\u05de\u05d9\u05dd'], ['knife', 'knives', '\u05e1\u05db\u05d9\u05df', '\u05e1\u05db\u05d9\u05e0\u05d9\u05dd'], ['cutting', '\u05d7\u05d9\u05ea\u05d5\u05da'],
      ['rpm', '\u05e1\u05dc\u05d3'], ['strength', '\u05d7\u05d5\u05d6\u05e7'], ['hardness', '\u05e7\u05e9\u05d9\u05d5\u05ea'], ['yield', '\u05db\u05e0\u05d9\u05e2\u05d4'], ['density', '\u05e6\u05e4\u05d9\u05e4\u05d5\u05ea'], ['weight', '\u05de\u05e9\u05e7\u05dc'], ['welding', 'weld', 'welds', 'weldability', '\u05e8\u05d9\u05ea\u05d5\u05da', '\u05e8\u05d9\u05ea\u05d5\u05db\u05d9\u05d5\u05ea'],
      ['machining', 'machinability', '\u05e2\u05d9\u05d1\u05d5\u05d3', '\u05e2\u05d9\u05d1\u05d5\u05d3\u05d9\u05d5\u05ea'], ['corrosion', '\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4', '\u05d7\u05dc\u05d5\u05d3\u05d4', 'rust'], ['wear', '\u05e9\u05d7\u05d9\u05e7\u05d4', '\u05d1\u05dc\u05d0\u05d9'], ['fatigue', '\u05e2\u05d9\u05d9\u05e4\u05d5\u05ea'], ['creep', '\u05d6\u05d7\u05d9\u05dc\u05d4'], ['tolerance', '\u05e1\u05d5\u05d1\u05dc\u05e0\u05d5\u05ea'],
      ['thread', 'threads', '\u05d4\u05d1\u05e8\u05d2\u05d4', '\u05d4\u05d1\u05e8\u05d2\u05d5\u05ea'], ['standard', 'standards', '\u05ea\u05e7\u05df', '\u05ea\u05e7\u05e0\u05d9\u05dd'], ['casting', '\u05d9\u05e6\u05d9\u05e7\u05d4'], ['forging', 'forged', '\u05e4\u05d5\u05e8\u05d2']
    ];
    var SYN = {};
    SYNSRC.forEach(function (set) {
      var n = set.map(norm).filter(function (x) { return x && x.indexOf(' ') < 0; });
      n.forEach(function (a) { SYN[a] = SYN[a] || []; n.forEach(function (b) { if (b !== a && SYN[a].indexOf(b) < 0) { SYN[a].push(b); } }); });
    });
    function nre(src) { return new RegExp(src.replace(/[\u05da\u05dd\u05df\u05e3\u05e5]/g, function (c) { return FIN[c]; })); }
    var PFX = '(?:^| )[\u05d1\u05dc\u05d4\u05d5\u05db\u05de\u05e9]?';
    var PHRASES = [
      { re: nre(PFX + '\u05d2\u05dc\u05d2\u05dc(?:\u05d9)? \u05e9\u05d9\u05e0\u05d9\u05d9\u05dd(?= |$)'), alts: ['\u05e9\u05d9\u05e0\u05d9\u05d9\u05dd', 'gear', 'gears', '\u05d2\u05d9\u05e8'] },
      { re: nre(PFX + '(?:\u05e2\u05de\u05d9\u05d3\\S* (?:\u05d1|\u05dc)?\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\\S*|corrosion resist\\S*|resist\\S* (?:to )?corrosion|anti corrosion)'), alts: ['stainless', '\u05e0\u05d9\u05e8\u05d5\u05e1\u05d8\u05d4', 'titanium', '\u05d8\u05d9\u05d8\u05e0\u05d9\u05d5\u05dd', 'inconel', 'hastelloy', 'duplex', 'monel', 'corrosion', '\u05e7\u05d5\u05e8\u05d5\u05d6\u05d9\u05d4'] },
      { re: nre(PFX + '(?:\u05e2\u05de\u05d9\u05d3\\S* (?:\u05d1|\u05dc)?(?:\u05d7\u05d5\u05dd|\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\\S*)|heat resist\\S*|high temp\\S*)'), alts: ['inconel', 'hastelloy', 'titanium', 'tungsten', 'ceramic', 'stellite', 'refractory', 'superalloy', '\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d4', '\u05e1\u05d5\u05e4\u05e8'] },
      { re: nre(PFX + '(?:\u05e2\u05de\u05d9\u05d3\\S* (?:\u05d1|\u05dc)?(?:\u05e9\u05d7\u05d9\u05e7\\S*|\u05d1\u05dc\u05d0\u05d9)|wear resist\\S*)'), alts: ['wear', '\u05e9\u05d7\u05d9\u05e7\u05d4', '\u05d1\u05dc\u05d0\u05d9', 'carbide', 'tungsten', 'stellite', 'hardened'] },
      { re: nre(PFX + '(?:\u05e7\u05dc(?= |$)|lightweight|light weight)'), alts: ['aluminum', 'magnesium', 'titanium', 'composite', '\u05d0\u05dc\u05d5\u05de\u05d9\u05e0\u05d9\u05d5\u05dd', '\u05de\u05d2\u05e0\u05d6\u05d9\u05d5\u05dd', '\u05d8\u05d9\u05d8\u05e0\u05d9\u05d5\u05dd', '\u05de\u05e8\u05d5\u05db\u05d1'] }
    ];
    PHRASES.forEach(function (p) { p.alts = p.alts.map(norm); });
    function setOf(map, words, val) { words.split(' ').forEach(function (w) { var n = norm(w); if (n) { map[n] = val === undefined ? 1 : val; } }); }
    var STOP = {}, HINT = {}, EQW = {}, DESIG = {}, CMPSEP = {}, MORE = {}, LESS = {}, PROPW = {};
    setOf(STOP, '\u05de\u05d4 \u05de\u05d9 \u05d0\u05d9\u05da \u05dc\u05de\u05d4 \u05d0\u05d9\u05d6\u05d4 \u05d0\u05d9\u05d6\u05d5 \u05d0\u05d9\u05e4\u05d4 \u05db\u05de\u05d4 \u05e9\u05dc \u05e2\u05dc \u05e2\u05dd \u05d1\u05d9\u05df \u05d0\u05ea \u05d6\u05d4 \u05d6\u05d5 \u05d6\u05d0\u05ea \u05d4\u05d5\u05d0 \u05d4\u05d9\u05d0 \u05d4\u05dd \u05dc\u05d9 \u05d0\u05e0\u05d9 \u05d9\u05e9 \u05d4\u05d0\u05dd \u05d0\u05d5 \u05d2\u05dd \u05db\u05dc \u05dc\u05e4\u05d9 \u05d0\u05dd \u05d0\u05d1\u05dc \u05db\u05d9 \u05e6\u05e8\u05d9\u05da \u05d0\u05e4\u05e9\u05e8 \u05d1\u05d5\u05d7\u05e8\u05d9\u05dd \u05d1\u05d5\u05d7\u05e8 \u05dc\u05d1\u05d7\u05d5\u05e8 \u05d4\u05d1\u05d3\u05dc \u05d4\u05d4\u05d1\u05d3\u05dc \u05d4\u05e9\u05d5\u05d5\u05d4 what whats how is are the of for a an to and or in on which between difference best can do does i my with be compare');
    setOf(HINT, '\u05d7\u05d5\u05de\u05e8 \u05d7\u05d5\u05de\u05e8\u05d9\u05dd material materials', 'mat'); setOf(HINT, '\u05de\u05d5\u05e0\u05d7 \u05de\u05d5\u05e0\u05d7\u05d9\u05dd term terms', 'term'); setOf(HINT, '\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05de\u05d7\u05e9\u05d1\u05d5\u05e0\u05d9\u05dd calculator calculators calc \u05d7\u05d9\u05e9\u05d5\u05d1 \u05d7\u05e9\u05d1 calculate calculation compute', 'calc'); setOf(HINT, '\u05e1\u05e8\u05d8\u05d5\u05df \u05e1\u05e8\u05d8\u05d5\u05e0\u05d9\u05dd video videos \u05e7\u05d5\u05e8\u05e1 course', 'vid');
    setOf(EQW, '\u05e9\u05e7\u05d5\u05dc \u05e9\u05e7\u05d5\u05dc\u05d9\u05dd \u05e9\u05e7\u05d9\u05dc\u05d5\u05ea \u05e9\u05e7\u05d5\u05dc\u05d4 equivalent equivalents equal equals equivalence');
    setOf(DESIG, 'din en jis bs astm ams sae aisi iso mil gb uns gost');
    setOf(CMPSEP, '\u05de\u05d5\u05dc vs versus \u05dc\u05e2\u05d5\u05de\u05ea against');
    setOf(MORE, '\u05de\u05e2\u05dc \u05dc\u05e4\u05d7\u05d5\u05ea \u05d2\u05d3\u05d5\u05dc \u05d2\u05d3\u05d5\u05dc\u05d4 \u05d2\u05d1\u05d5\u05d4 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d9\u05d5\u05ea\u05e8 above over least greater higher more'); setOf(LESS, '\u05de\u05ea\u05d7\u05ea \u05e2\u05d3 \u05e7\u05d8\u05df \u05e7\u05d8\u05e0\u05d4 \u05e0\u05de\u05d5\u05da \u05e0\u05de\u05d5\u05db\u05d4 \u05e4\u05d7\u05d5\u05ea below under less most lower max maximum');
    var PROPORDER = ['Rp0', 'HB', '\u03c1', 'E', 'A', 'RM'];
    setOf(PROPW, '\u05db\u05e0\u05d9\u05e2\u05d4 yield rp0 rp02', 'Rp0'); setOf(PROPW, 'hb \u05d1\u05e8\u05d9\u05e0\u05dc brinell \u05e7\u05e9\u05d9\u05d5\u05ea hardness', 'HB'); setOf(PROPW, '\u05e6\u05e4\u05d9\u05e4\u05d5\u05ea density', '\u03c1'); setOf(PROPW, '\u05de\u05d5\u05d3\u05d5\u05dc modulus', 'E'); setOf(PROPW, '\u05d4\u05ea\u05d0\u05e8\u05db\u05d5\u05ea elongation', 'A'); setOf(PROPW, '\u05d7\u05d5\u05d6\u05e7 \u05de\u05ea\u05d9\u05d7\u05d4 tensile strength rm uts', 'RM');
    var UNITW = {}; setOf(UNITW, 'mpa gpa mm kg g cm3 \u05d2\u05e8\u05dd \u05e1\u05de');

    function alts(t) {
      var set = {}, u; set[t] = 1;
      (SYN[t] || []).forEach(function (x) { set[x] = 1; }); (EXP[t] || []).forEach(function (x) { set[x] = 1; });
      if (/^[\u05d1\u05dc\u05d4\u05d5\u05db\u05de\u05e9][\u05D0-\u05EA]{3,}/.test(t)) { u = t.slice(1); set[u] = 1; (SYN[u] || []).forEach(function (x) { set[x] = 1; }); (EXP[u] || []).forEach(function (x) { set[x] = 1; }); }
      return Object.keys(set);
    }
    function prepTokens(tokens, hasPhrase) {
      var out = [], hint = null, eq = false, soft = [], hard = [];
      tokens.forEach(function (t) {
        var b = (t.length >= 4 && /^[\u05d1\u05dc\u05d4\u05d5\u05db\u05de\u05e9]/.test(t)) ? t.slice(1) : t;
        if (EQW[t] || EQW[b]) { eq = true; return; }
        if (HINT[t] || HINT[b]) { hint = hint || HINT[t] || HINT[b]; return; }
        if (STOP[t] || (t.length < 2 && !/^[0-9]$/.test(t))) { return; }
        out.push(t);
      });
      if (!out.length && !hasPhrase) { out = tokens.filter(function (t) { return !EQW[t]; }); hint = null; }
      out.forEach(function (t) { if (DESIG[t] && out.length > 1) { soft.push(t); } else { hard.push(t); } });
      if (!hard.length && !hasPhrase) { hard = out; soft = []; }
      return { hard: hard, soft: soft, hint: hint, eq: eq };
    }
    function numRange(str) {
      var m = String(str || '').replace(/(\d),(\d{3})/g, '$1$2').match(/[0-9]+(?:\.[0-9]+)?/g);
      if (!m) { return null; } var a = parseFloat(m[0]), b = parseFloat(m[m.length - 1]); return [Math.min(a, b), Math.max(a, b)];
    }
    function parseQuery(q) {
      var raw = String(q || '').replace(/>=|\u2265/g, ' \u05dc\u05e4\u05d7\u05d5\u05ea ').replace(/<=|\u2264/g, ' \u05e2\u05d3 ').replace(/>/g, ' \u05de\u05e2\u05dc ').replace(/</g, ' \u05de\u05ea\u05d7\u05ea ');
      var n = norm(raw); if (!n) { return null; }
      var phrase = []; PHRASES.forEach(function (p) { if (p.re.test(n)) { n = n.replace(p.re, ' ').replace(/\s+/g, ' ').trim(); phrase.push({ alts: p.alts, rank: p.rank }); } });
      var tokens = n.split(' ').filter(Boolean), i, j;
      var P = { n: norm(q), tokens: tokens, phrase: phrase, compare: null, filter: null, eq: false, hint: null, groups: [], soft: [] };
      for (i = 1; i < tokens.length - 1; i++) { if (CMPSEP[tokens[i]]) { P.compare = { a: tokens.slice(0, i), b: tokens.slice(i + 1) }; break; } }
      var use = tokens;
      if (!P.compare) {
        var prop = null, cmp = null, num = null;
        for (j = 0; j < PROPORDER.length && !prop; j++) { for (i = 0; i < tokens.length; i++) { if (PROPW[tokens[i]] === PROPORDER[j]) { prop = PROPORDER[j]; break; } } }
        for (i = 0; i < tokens.length; i++) { if (MORE[tokens[i]]) { cmp = 'more'; } else if (LESS[tokens[i]]) { cmp = 'less'; } if (num === null && /^[0-9]+(\.[0-9]+)?$/.test(tokens[i])) { num = parseFloat(tokens[i]); } }
        if (prop && cmp && num !== null) {
          P.filter = { prop: prop, cmp: cmp, num: num };
          use = tokens.filter(function (t) { return !PROPW[t] && !MORE[t] && !LESS[t] && !UNITW[t] && !/^[0-9]+(\.[0-9]+)?$/.test(t); });
        }
      }
      var pp = prepTokens(use, phrase.length > 0); P.eq = pp.eq; P.hint = pp.hint; P.soft = pp.soft;
      P.groups = pp.hard.map(function (t) { return { alts: alts(t), t: t }; }).concat(phrase);
      return P;
    }

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
      if (d.us && t.length >= 2 && d.us.indexOf(' ' + t) >= 0) { best = Math.max(best, 30); }
      if (t.length >= 4 && !isNum) {
        var max = t.length >= 8 ? 2 : 1, dd;
        for (i = 0; i < d.at.length; i++) { a = d.at[i]; if (Math.abs(a.length - t.length) <= max && a.charAt(0) === t.charAt(0)) { dd = lev(t, a, max); if (dd <= max) { best = Math.max(best, 46 - dd * 6); } } }
        if (best >= 34) { return best; }
      }
      if (best >= 30) { return best; }
      if (d.tx.indexOf(' ' + t) >= 0) { best = Math.max(best, 12); } else if (t.length >= 4 && d.tx.indexOf(t) >= 0) { best = Math.max(best, 8); }
      return best;
    }
    function groupBest(d, g) { var b = 0, k, s; for (k = 0; k < g.alts.length; k++) { s = tokScore(d, g.alts[k]); if (s > b) { b = s; } } return b; }
    var WEAK = false;
    function cutResults(out) {
      out.sort(function (a, b) { return b.s - a.s; });
      if (!WEAK && out.length && out[0].s >= 70) { var cut = Math.max(15, out[0].s * 0.25), kept = out.filter(function (r) { return r.s >= cut; }); kept.hidden = out.length - kept.length; return kept; }
      out.hidden = 0; return out;
    }
    function runGroups(groups, soft, hint, onlyType, nq, relaxed) {
      var softG = soft.map(function (t) { return { alts: alts(t) }; }), out = [], i, d, gi, b, tot, matched, need = relaxed ? Math.max(1, Math.ceil(groups.length * 0.5)) : groups.length, seen = [];
      for (gi = 0; gi < groups.length; gi++) { seen[gi] = false; }
      for (i = 0; i < DOCS.length; i++) {
        d = DOCS[i]; if (onlyType && d.type !== onlyType) { continue; }
        tot = 0; matched = 0;
        for (gi = 0; gi < groups.length; gi++) { b = groupBest(d, groups[gi]); if (b > 0) { matched++; tot += b; seen[gi] = true; } else if (!relaxed) { break; } }
        if (matched < need) { continue; }
        if (relaxed) { tot = tot * matched / groups.length; }
        softG.forEach(function (g) { if (groupBest(d, g) >= 70) { tot += 15; } });
        if (d.type === 'mat' && d.st.length && groups.some(function (g) { return g.alts.indexOf(d.st[0]) >= 0; })) { tot += 30; }
        if (hint && d.type === hint) { tot += 150; }
        if (nq && d.an.indexOf(nq) >= 0) { tot += 60; }
        if (tot > 0) { out.push({ d: d, s: tot }); }
      }
      out = relaxed ? (function (o) { o.sort(function (a, b2) { return b2.s - a.s; }); return o.length ? o.filter(function (r) { return r.s >= o[0].s * 0.4; }) : o; })(out) : cutResults(out);
      out.seen = seen; return out;
    }
    function topMat(tokens) {
      var pp = prepTokens(tokens, false); if (!pp.hard.length) { return null; }
      var res = runGroups(pp.hard.map(function (t) { return { alts: alts(t), t: t }; }), pp.soft, null, 'mat', null, false); return res.length ? res[0].d : null;
    }
    var VOCAB = null;
    function vocab() { if (VOCAB) { return VOCAB; } VOCAB = {}; DOCS.forEach(function (d) { d.at.forEach(function (t) { if (t.length >= 4 && /^[a-z\u05D0-\u05EA]+$/.test(t)) { VOCAB[t] = (VOCAB[t] || 0) + 1; } }); }); return VOCAB; }
    function nearest(t) {
      var V = vocab(), best = null, bd = 99, k, d, lim = t.length >= 6 ? 2 : 1;
      for (k in V) { if (V.hasOwnProperty(k) && Math.abs(k.length - t.length) <= lim) { d = lev(t, k, lim); if (d < bd || (d === bd && best && V[k] > V[best])) { bd = d; best = k; } } }
      return bd <= lim ? best : null;
    }
    function suggest(P) {
      var changed = false, words = P.groups.map(function (g) {
        if (!g.t || g.t.length < 4) { return g.t || ''; }
        var any = false, i; for (i = 0; i < DOCS.length && !any; i++) { if (tokScore(DOCS[i], g.t) > 0) { any = true; } }
        if (any) { return g.t; } var n = nearest(g.t); if (n) { changed = true; return n; } return g.t;
      });
      return changed ? words.join(' ') : '';
    }
    function pval(m, k) { return numRange(m.props && m.props[k]); }
    function eqAnswer(P, res, q) {
      if (!res.length || res[0].d.type !== 'mat') { return null; }
      var m = MATS[res[0].d.ref], k, via = false;
      if (!m.equiv) { return null; }
      if (P.n !== norm(m.name) && P.n !== norm(m.id)) { for (k in m.equiv) { if (m.equiv.hasOwnProperty(k) && (P.n === norm(m.equiv[k]) || P.n === norm(k + ' ' + m.equiv[k]))) { via = true; } } }
      if (!P.eq && !via) { return null; }
      var parts = []; for (k in m.equiv) { if (m.equiv.hasOwnProperty(k)) { parts.push(k + ': <b>' + esc(m.equiv[k]) + '</b>'); } }
      return '<div class="xans">\ud83d\udd01 ' + (via ? '<b>' + esc(String(q).trim()) + '</b> ' + L.eqIs + '<b>' + esc(m.name) + '</b>' : '<b>' + esc(m.name) + '</b>') + ' \u00b7 ' + esc(m.group) + '<div class="xansl">' + parts.join(' \u00b7 ') + '</div>' +
        '<div class="xchips" style="margin-top:8px"><button type="button" class="xchip mat" data-act="open" data-type="mat" data-ref="' + res[0].d.ref + '">\ud83d\udd29 ' + L.eqOpen + '</button></div><div class="xnote">' + L.eqNote + '</div></div>';
    }
    function searchFull(q) {
      var P = parseQuery(q); if (!P) { return null; }
      var R = { results: [], answer: null, compare: null, filter: null, note: '', suggestion: '', mode: 'strict', P: P };
      if (P.compare) {
        var a = topMat(P.compare.a), b = topMat(P.compare.b);
        if (a && b && a.ref !== b.ref) { R.compare = { a: a.ref, b: b.ref }; R.results = [{ d: a, s: 300 }, { d: b, s: 300 }]; R.mode = 'compare'; return R; }
      }
      if (P.filter) {
        var base = P.groups.length ? runGroups(P.groups, P.soft, null, 'mat', null, false) : null, list = [], F = P.filter;
        MATS.forEach(function (m, i) {
          var r = pval(m, F.prop); if (!r) { return; }
          if (base && !base.some(function (x) { return x.d.ref === i; })) { return; }
          if (F.cmp === 'more' ? r[1] >= F.num : r[0] <= F.num) { list.push({ i: i, r: r }); }
        });
        var famOf = function (i) { var d = DOCS[i]; return d.st.length && P.groups.some(function (g) { return g.alts.indexOf(d.st[0]) >= 0; }) ? 1 : 0; };
        list.forEach(function (x) { x.f = P.groups.length ? famOf(x.i) : 0; });
        list.sort(function (x, y) { return (y.f - x.f) || (F.cmp === 'more' ? y.r[1] - x.r[1] : x.r[0] - y.r[0]); });
        R.filter = { prop: F.prop, cmp: F.cmp, num: F.num, count: list.length, items: list.slice(0, 60) };
        R.results = list.slice(0, 60).map(function (x) { return { d: DOCS[x.i], s: 200 }; }); R.mode = 'filter'; return R;
      }
      var res = runGroups(P.groups, P.soft, P.hint, null, P.n, false), hiddenCount = res.hidden || 0;
      if (!res.length && P.groups.length > 1) { res = runGroups(P.groups, P.soft, P.hint, null, P.n, true); if (res.length) { R.mode = 'relaxed'; R.note = L.relaxed; hiddenCount = 0; } }
      else if (res.length && res.length < 5 && P.groups.length > 1) {
        var extra = runGroups(P.groups, P.soft, P.hint, null, P.n, true).filter(function (r) { return (r.d.type === 'calc' || r.d.type === 'vid') && !res.some(function (x) { return x.d === r.d; }); });
        res = res.concat(extra.slice(0, 4));
      }
      if (!res.length) { R.mode = 'none'; R.suggestion = suggest(P); }
      if (res.length && P.phrase.some(function (p) { return p.rank; })) {
        var mm = res.filter(function (r) { return r.d.type === 'mat' && pval(MATS[r.d.ref], '\u03c1'); });
        mm.sort(function (x, y) { return pval(MATS[x.d.ref], '\u03c1')[0] - pval(MATS[y.d.ref], '\u03c1')[0]; });
        mm.forEach(function (r, i) { r.s = 500 - i; });
        res = mm.concat(res.filter(function (r) { return mm.indexOf(r) < 0; }));
      }
      R.hidden = hiddenCount; R.results = res; R.answer = eqAnswer(P, res, q);
      return R;
    }
    function search(q) { var R = searchFull(q); return R === null ? null : R.results; }
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
      var sims = similar(mi, 5), simHtml = sims.map(function (j) { count++; return chipOpen('mat', j, MATS[j].name); }).join('');
      if (sims.length) { count++; simHtml += chipSearch(m.name + L.cmpVs + MATS[sims[0]].name, L.cmpBtn + MATS[sims[0]].name); }
      g += group(L.similar, simHtml);
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
    function learnBlock(i) {
      var c = LEARN[i]; if (!c) { return ''; }
      return '<div class="xlearn"><div class="xlh">\ud83d\udca1 ' + L.learn + '</div>' +
        '<div class="xlr"><b>' + L.lWhy + '</b>' + esc(c.w) + '</div><div class="xlr"><b>' + L.lEx + '</b>' + esc(c.e) + '</div><div class="xlr"><b>' + L.lMis + '</b>' + esc(c.m) + '</div>' +
        '<div class="xchips" style="margin-top:8px"><button type="button" class="xchip" data-act="random">' + L.lRand + '</button></div><div class="xnote">' + L.lNote + '</div></div>';
    }
    function renderTerm(i) {
      var t = GLOS[i], main = HE ? t.he : t.en, other = HE ? t.en : t.he;
      return '<div class="xcard"><h2>\ud83d\udcd6 ' + esc(main) + ' <span class="xalt">\u00b7 ' + esc(other) + (t.abbr ? ' (' + esc(t.abbr) + ')' : '') + '</span></h2><div class="xsub">' + esc(t.cat) + '</div><div class="xdef">' + esc(t.def) + '</div>' + (t.expand ? '<div class="xexp">' + esc(t.expand) + '</div>' : '') + learnBlock(i) + panel(relTerm(i)) + '</div>';
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

    /* ---------- result cards ---------- */
    function useText(m) { return strip(useOf(m.det)); }
    function eqStr(m) { var p = [], k; if (m.equiv) { for (k in m.equiv) { if (m.equiv.hasOwnProperty(k)) { p.push(k + ': ' + m.equiv[k]); } } } return esc(p.join(' \u00b7 ')); }
    function renderCompare(ai, bi) {
      var A = MATS[ai], B = MATS[bi], rows = '';
      function mid(m, k) { var r = pval(m, k); return r ? (r[0] + r[1]) / 2 : null; }
      function hi(va, vb) { if (va === null || vb === null || isNaN(va) || isNaN(vb) || va === vb) { return null; } return va > vb ? ['xhi', ''] : ['', 'xhi']; }
      function row(label, ta, tb, cls) { rows += '<tr><th>' + label + '</th><td class="' + (cls ? cls[0] : '') + '"><bdi>' + ta + '</bdi></td><td class="' + (cls ? cls[1] : '') + '"><bdi>' + tb + '</bdi></td></tr>'; }
      row(L.cmpGroup, esc(A.group), esc(B.group));
      ['RM', 'Rp0', 'HB', 'E', 'A', '\u03c1'].forEach(function (k) {
        var pa = A.props && A.props[k], pb = B.props && B.props[k]; if (!pa && !pb) { return; }
        row(esc(L.pl[k] || k), esc(pa || '-'), esc(pb || '-'), k === '\u03c1' ? null : hi(mid(A, k), mid(B, k)));
      });
      row(L.mach2, esc(A.mach || ''), esc(B.mach || ''), hi(parseFloat(A.mach), parseFloat(B.mach)));
      row(L.weld2, esc(A.weld || ''), esc(B.weld || ''));
      row(L.cmpEq, eqStr(A), eqStr(B)); row(L.cmpStd, esc(A.stds || ''), esc(B.stds || '')); row(L.cmpUse, esc(useText(A)), esc(useText(B)));
      return '<div class="xans"><h3 class="xcmph">\u21c4 ' + esc(A.name) + L.cmpVs + esc(B.name) + '</h3><div class="xscroll"><table class="xcmp"><thead><tr><th></th><th>' + esc(A.name) + '</th><th>' + esc(B.name) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<div class="xnote">' + L.cmpNote + '</div><div class="xchips" style="margin-top:8px"><button type="button" class="xchip mat" data-act="open" data-type="mat" data-ref="' + ai + '">\ud83d\udd29 ' + L.cmpOpen + esc(A.name) + '</button><button type="button" class="xchip mat" data-act="open" data-type="mat" data-ref="' + bi + '">\ud83d\udd29 ' + L.cmpOpen + esc(B.name) + '</button></div></div>';
    }
    function renderFilter(F) {
      var lab = L.pl[F.prop] || F.prop, cond = (F.cmp === 'more' ? L.fltMore : L.fltLess) + F.num;
      var h = '<div class="xans"><h3 class="xcmph">' + L.fltTitle + ': ' + esc(lab) + '</h3><div class="xnote" style="margin:0 0 8px">' + esc(cond) + ' \u00b7 ' + L.fltCount(F.count, Math.min(F.count, 12)) + '</div>';
      if (!F.items.length) { return h + '<div class="xempty">' + L.fltNone + '</div></div>'; }
      F.items.forEach(function (x, ix) {
        var m = MATS[x.i];
        h += '<button type="button" class="xrow' + (ix >= 12 ? ' xhid' : '') + '" data-act="open" data-type="mat" data-ref="' + x.i + '" data-idx="' + ix + '"><span class="xic" style="color:' + esc(m.color || '#adb5bd') + '">\u25cf</span><span><span class="xt">' + esc(m.name) + '</span><br><span class="xs">' + esc(m.group) + ' \u00b7 ' + esc(lab) + ': <bdi>' + esc((m.props && m.props[F.prop]) || '') + '</bdi></span></span></button>';
      });
      if (F.items.length > 12) { h += '<button type="button" class="xchip xmorebtn" data-act="more">' + L.more(F.items.length - 12) + '</button>'; }
      return h + '</div>';
    }
    function calcUrl(c) { return HE ? P + 'calc.html#sub=' + c.s : P + 'calc.html'; }

    function learnIds() { return Object.keys(LEARN).map(Number).filter(function (i) { return GLOS[i]; }); }
    function showGallery() {
      var ids = learnIds(), by = {}, order = [], html;
      ids.forEach(function (i) { var c = GLOS[i].cat; if (!by[c]) { by[c] = []; order.push(c); } by[c].push(i); });
      html = '<div class="xans"><h3 class="xcmph">' + L.galTitle(ids.length) + '</h3><div class="xnote" style="margin:0 0 6px">' + L.galSub + '</div>';
      order.forEach(function (c) { html += '<div class="xrelg"><h4>' + esc(c) + '</h4><div class="xchips">' + by[c].map(function (i) { return chipOpen('term', i, HE ? GLOS[i].he : GLOS[i].en); }).join('') + '</div></div>'; });
      $('xresults').innerHTML = html + '</div>'; $('xstatus').textContent = '';
    }
    function openRandom() {
      var ids = learnIds(), id; if (!ids.length) { return; }
      do { id = ids[Math.floor(Math.random() * ids.length)]; } while (ids.length > 1 && id === lastRandom);
      lastRandom = id; openItem('term', id);
    }

    /* ---------- results list ---------- */
    var activeIdx = -1, showWeak = false;
    function runSearch(q, keepWeak) {
      if (!keepWeak) { showWeak = false; }
      WEAK = showWeak;
      var R = searchFull(q), box = $('xresults'), st = $('xstatus');
      if (R === null) { box.innerHTML = ''; st.textContent = ''; return; }
      var html = '', idx = 0, by = { mat: [], term: [], cat: [], calc: [], vid: [] };
      if (R.answer) { html += R.answer; }
      if (R.mode === 'compare') { html += renderCompare(R.compare.a, R.compare.b); }
      else if (R.mode === 'filter') { html += renderFilter(R.filter); }
      else {
        R.results.forEach(function (r) { by[r.d.type].push(r); });
        var section = function (title, arr, lim, render) {
          if (!arr.length) { return; }
          html += '<div class="xgrp"><h3>' + title + ' <span class="xnote">(' + arr.length + ')</span></h3>';
          arr.forEach(function (r, i) { html += render(r.d, idx++, i >= lim); });
          if (arr.length > lim) { html += '<button type="button" class="xchip xmorebtn" data-act="more">' + L.more(arr.length - lim) + '</button>'; }
          html += '</div>';
        };
        section(L.gMat, by.mat, 6, function (d, ix, hid) { var m = MATS[d.ref]; return '<button type="button" class="xrow' + (hid ? ' xhid' : '') + '" data-act="open" data-type="mat" data-ref="' + d.ref + '" data-idx="' + ix + '"><span class="xic" style="color:' + esc(m.color || '#adb5bd') + '">\u25cf</span><span><span class="xt">' + hl(m.name, q) + '</span><br><span class="xs">' + esc(m.group) + ' \u00b7 <bdi>' + esc((m.props && m.props.RM) || '') + '</bdi></span></span></button>'; });
        section(L.gTerm, by.term, 6, function (d, ix, hid) { var g = GLOS[d.ref], a = HE ? g.he : g.en, b = HE ? g.en : g.he; return '<button type="button" class="xrow' + (hid ? ' xhid' : '') + '" data-act="open" data-type="term" data-ref="' + d.ref + '" data-idx="' + ix + '"><span class="xic">\ud83d\udcd6</span><span><span class="xt">' + hl(a, q) + (LEARN[d.ref] ? ' \ud83d\udca1' : '') + ' <span class="xalt">\u00b7 ' + hl(b, q) + (g.abbr ? ' (' + hl(g.abbr, q) + ')' : '') + '</span></span><br><span class="xs">' + esc(g.cat) + ' \u00b7 ' + esc((g.def || '').slice(0, 70)) + '\u2026</span></span></button>'; });
        section(L.gCalc, by.calc, 4, function (d, ix, hid) { var c = CALCS[d.ref]; return '<a class="xrow' + (hid ? ' xhid' : '') + '" data-idx="' + ix + '" href="' + calcUrl(c) + '" target="_blank" rel="noopener"><span class="xic">\ud83e\uddee</span><span><span class="xt">' + hl(c.t, q) + '</span><br><span class="xs">' + esc(CTABS[c.s] || '') + (c.d ? ' \u00b7 ' + esc(c.d) : '') + '</span></span></a>'; });
        section(L.gVid, by.vid, 3, function (d, ix, hid) { var v = VIDS[d.ref]; return '<a class="xrow' + (hid ? ' xhid' : '') + '" data-idx="' + ix + '" href="' + v.u[HE ? 0 : 1] + '" target="_blank" rel="noopener"><span class="xic">\ud83c\udfac</span><span><span class="xt">' + esc(HE ? v.he : v.en) + '</span><br><span class="xs">' + L.vidSub + '</span></span></a>'; });
        section(L.gCat, by.cat, 3, function (d, ix, hid) { var c = CATS[d.ref]; return '<a class="xrow' + (hid ? ' xhid' : '') + '" data-idx="' + ix + '" href="' + pageUrl(c.k) + '" target="_blank" rel="noopener"><span class="xic">' + c.i + '</span><span><span class="xt">' + esc(cname(c)) + '</span><br><span class="xs">' + L.catSub + '</span></span></a>'; });
        if (R.hidden > 0 && !showWeak) { html += '<div class="xgrp"><button type="button" class="xchip" data-act="weak">' + L.weak(R.hidden) + '</button></div>'; }
        if (!R.results.length) {
          html += '<div class="xempty">' + L.noRes + ' ' + L.noneHelp + (R.suggestion ? '<div style="margin-top:10px">' + L.didYou + ' <button type="button" class="xchip" data-act="search" data-q="' + esc(R.suggestion) + '">' + esc(R.suggestion) + '</button></div>' : '') + '</div>';
        }
      }
      box.innerHTML = html;
      st.textContent = (R.mode === 'compare' || R.mode === 'filter') ? '' : (R.results.length ? (R.note ? R.note + ' ' : '') + L.found(R.results.length) : '');
      activeIdx = -1;
    }
    function setActive(n) {
      var rows = document.querySelectorAll('#xresults .xrow:not(.xhid)'); if (!rows.length) { return; }
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
      else if (e.key === 'Enter') { var rows = document.querySelectorAll('#xresults .xrow:not(.xhid)'), r = rows[activeIdx >= 0 ? activeIdx : 0]; if (r) { r.click(); } }
      else if (e.key === 'Escape') { q.value = ''; runSearch(''); }
    });
    function onAct(e) {
      var el = e.target.closest ? e.target.closest('[data-act]') : null; if (!el) { return; } var a = el.getAttribute('data-act');
      if (a === 'open') { openItem(el.getAttribute('data-type'), +el.getAttribute('data-ref')); }
      else if (a === 'search') { q.value = el.getAttribute('data-q'); runSearch(q.value); q.focus(); window.scrollTo(0, 0); }
      else if (a === 'more') { var grp = el.parentNode, hid = grp.querySelectorAll('.xhid'), k; for (k = 0; k < hid.length && k < 20; k++) { hid[k].classList.remove('xhid'); } var left = grp.querySelectorAll('.xhid').length; if (left) { el.textContent = L.more(left); } else { grp.removeChild(el); } }
      else if (a === 'weak') { showWeak = true; runSearch(q.value, true); }
      else if (a === 'gallery') { showGallery(); }
      else if (a === 'random') { openRandom(); }
      else if (a === 'trail') { var s = trail[+el.getAttribute('data-i')]; if (s) { openItem(s.type, s.ref, +el.getAttribute('data-i')); } }
    }
    ['xresults', 'xdetail', 'xtrail'].forEach(function (id) { $(id).addEventListener('click', onAct); });
    $('xdetail').addEventListener('input', function (e) { if (e.target.closest && e.target.closest('.xcalc')) { calcAll(); } });
    var EX = HE ? ['C45', '\u05d0\u05d9\u05e0\u05e7\u05d5\u05e0\u05dc', '\u05e4\u05dc\u05d3\u05d4 \u05dc\u05e6\u05d9\u05e8', '4140 \u05de\u05d5\u05dc 4340', '\u05d7\u05d5\u05d6\u05e7 \u05de\u05e2\u05dc 800', '\u05de\u05d4 \u05d4\u05e9\u05e7\u05d5\u05dc \u05e9\u05dc 316L', '\u05d7\u05d9\u05e9\u05d5\u05d1 \u05e1\u05dc"\u05d3', 'DIN 1.7225', 'HRC', '1018'] : ['C45', 'inconel', 'steel for shaft', '4140 vs 4340', 'tensile over 800', 'equivalent of 316L', 'rpm calculator', 'DIN 1.7225', 'HRC', '1018'];
    var exEl = $('xex');
    EX.forEach(function (x) { var b = document.createElement('button'); b.type = 'button'; b.className = 'xchip'; b.textContent = x; b.addEventListener('click', function () { q.value = x; runSearch(x); q.focus(); }); exEl.appendChild(b); });
    /* deep link: /explore.html?q=C45 */
    try { var m = /[?&]q=([^&]*)/.exec(location.search); if (m) { var v = decodeURIComponent(m[1].replace(/\+/g, ' ')); if (v) { q.value = v; runSearch(v); } } } catch (e) { /* ignore */ }
    if (learnIds().length) {
      var bar = document.createElement('div'); bar.className = 'xex'; bar.id = 'xlearnbar';
      bar.innerHTML = '<small>' + L.lBar + '</small><button type="button" class="xchip" data-act="gallery">' + L.galBtn(learnIds().length) + '</button><button type="button" class="xchip" data-act="random">' + L.randBtn + '</button>';
      exEl.parentNode.insertBefore(bar, exEl.nextSibling); bar.addEventListener('click', onAct);
    }
    setTimeout(build, 50);
    window.__mhExploreApi = { LEARN: LEARN, learnIds: learnIds, CALCS: CALCS, VIDS: VIDS, CATS: CATS, search: search, searchFull: searchFull, parseQuery: parseQuery, openItem: openItem, build: build, MATS: MATS, GLOS: GLOS, mentionsOf: mentionsOf, isGeneric: isGeneric, similar: similar, vcOf: vcOf };
  }
})();
