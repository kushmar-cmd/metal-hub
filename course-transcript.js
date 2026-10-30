/*! METAL HUB - transcript panel for the video-course pages (course-transcript.js).
 *  Shows the narration text under the video; clicking a sentence jumps to that moment. Works with a dialog player or an inline one. */
(function () {
  'use strict';
  var sc = document.currentScript || (function () { var s = document.querySelectorAll('script[data-tr]'); return s[s.length - 1]; })();
  if (!sc || window.__mhTr) { return; } window.__mhTr = true;
  var SRC = sc.getAttribute('data-tr'), PAGE = sc.getAttribute('data-page'), LANG = (document.documentElement.getAttribute('lang') || 'he').toLowerCase().indexOf('he') === 0 ? 'he' : 'en';
  var L = LANG === 'he' ? { h: '\u05ea\u05de\u05dc\u05d5\u05dc', full: '\u05e4\u05ea\u05d7 \u05d0\u05ea \u05d4\u05ea\u05de\u05dc\u05d5\u05dc \u05d4\u05de\u05dc\u05d0 \u05e9\u05dc \u05d4\u05e7\u05d5\u05e8\u05e1', auto: '\u05e0\u05d5\u05e6\u05e8 \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u05de\u05d4\u05db\u05ea\u05d5\u05d1\u05d9\u05d5\u05ea. \u05d9\u05d9\u05ea\u05db\u05e0\u05d5 \u05e9\u05d2\u05d9\u05d0\u05d5\u05ea \u05e7\u05d8\u05e0\u05d5\u05ea.' } : { h: 'Transcript', full: 'Open the full transcript of the course', auto: 'Generated automatically from the captions. Small errors are possible.' };
  function ready(fn) { if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); } else { fn(); } }
  ready(function () {
    var v = document.querySelector('video'); if (!v) { return; }
    var css = '.mh-tr{margin:8px 0;border:1px solid rgba(127,127,127,.4);border-radius:10px;background:rgba(127,127,127,.08);color:inherit;font:14px/1.6 system-ui,-apple-system,Segoe UI,Arial,sans-serif;text-align:start}' +
      '.mh-tr>summary{cursor:pointer;padding:8px 12px;font-weight:700}' +
      '.mh-tr-b{max-height:190px;overflow:auto;padding:2px 8px 6px}' +
      '.mh-tr-l{display:block;width:100%;text-align:start;background:none;border:0;color:inherit;font:inherit;padding:3px 8px;border-radius:6px;cursor:pointer}' +
      '.mh-tr-l:hover{background:rgba(127,127,127,.2)}.mh-tr-l.on{background:rgba(88,166,255,.28);font-weight:600}' +
      '.mh-tr-a{display:block;padding:2px 12px 4px;font-size:12.5px;opacity:.85}.mh-tr-a a{color:inherit;text-decoration:underline}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var panel = document.createElement('details'); panel.className = 'mh-tr'; panel.hidden = true;
    try { panel.open = localStorage.getItem('mh-tr-open') !== '0'; } catch (e) { panel.open = true; }
    panel.innerHTML = '<summary>' + L.h + '</summary><div class="mh-tr-b" role="group" aria-label="' + L.h + '"></div><span class="mh-tr-a"></span>';
    panel.addEventListener('toggle', function () { try { localStorage.setItem('mh-tr-open', panel.open ? '1' : '0'); } catch (e) { /* ignore */ } });
    v.insertAdjacentElement('afterend', panel);
    var body = panel.querySelector('.mh-tr-b'), note = panel.querySelector('.mh-tr-a'), cur = '', lines = [], loaded = false, loading = false, queue = [];
    function stemOf(src) { try { var u = decodeURIComponent(String(src).split('?')[0]); return u.substring(u.lastIndexOf('/') + 1).replace(/\.[^.]+$/, ''); } catch (e) { return ''; } }
    function ensure(cb) {
      if (loaded) { cb(); return; } queue.push(cb); if (loading) { return; } loading = true;
      var s = document.createElement('script'); s.src = SRC; s.onload = function () { loaded = true; loading = false; queue.splice(0).forEach(function (f) { f(); }); }; s.onerror = function () { loading = false; queue = []; }; document.head.appendChild(s);
    }
    function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function render(stem) {
      var d = (window.MH_TR || {})[stem]; if (!d) { panel.hidden = true; lines = []; return; }
      var h = '', i; for (i = 0; i < d.l.length; i++) { h += '<button type="button" class="mh-tr-l" dir="auto" data-t="' + d.l[i][0] + '">' + esc(d.l[i][1]) + '</button>'; }
      body.innerHTML = h; body.scrollTop = 0; lines = body.querySelectorAll('.mh-tr-l'); panel.hidden = false;
      note.innerHTML = L.auto + (PAGE ? ' <a href="' + PAGE + '#ch-' + encodeURIComponent(stem) + '" target="_blank" rel="noopener">' + L.full + '</a>' : '');
    }
    function check() { var stem = stemOf(v.currentSrc || v.getAttribute('src') || ''); if (!stem || stem === cur) { return; } cur = stem; ensure(function () { render(stem); }); }
    var act = -1;
    function highlight() {
      if (!lines.length) { return; } var t = v.currentTime + 0.25, k = -1, i;
      for (i = 0; i < lines.length; i++) { if (parseFloat(lines[i].getAttribute('data-t')) <= t) { k = i; } else { break; } }
      if (k === act) { return; } if (act >= 0 && lines[act]) { lines[act].classList.remove('on'); lines[act].removeAttribute('aria-current'); }
      act = k; if (k >= 0) { var e = lines[k]; e.classList.add('on'); e.setAttribute('aria-current', 'true'); var top = e.offsetTop - body.offsetTop; if (top < body.scrollTop || top + e.offsetHeight > body.scrollTop + body.clientHeight) { body.scrollTop = Math.max(0, top - 40); } }
    }
    body.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('.mh-tr-l') : null; if (!b) { return; } v.currentTime = parseFloat(b.getAttribute('data-t')); var p = v.play && v.play(); if (p && p.catch) { p.catch(function () { /* ignore */ }); } });
    v.addEventListener('timeupdate', highlight); v.addEventListener('seeked', highlight); v.addEventListener('loadstart', check); v.addEventListener('loadedmetadata', check); v.addEventListener('emptied', function () { act = -1; });
    if (window.MutationObserver) { new MutationObserver(function () { act = -1; check(); }).observe(v, { attributes: true, attributeFilter: ['src'] }); }
    check();
    setTimeout(function () { ensure(function () { /* data is ready before the first chapter is opened */ }); }, 1200);
    window.__mhTrApi = { check: check, stem: function () { return cur; } };
  });
})();
