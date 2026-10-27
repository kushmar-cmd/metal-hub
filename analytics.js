/*! METAL HUB - visitor statistics (Cloudflare Web Analytics: free, no cookies, no personal data).
 *
 *  HOW TO TURN IT ON (one line, one time):
 *  1. Cloudflare dashboard -> Analytics & Logs -> Web Analytics -> Add a site -> hostname: metal.kushmar.com
 *     -> choose "Manual (JS snippet)". Copy the long code that appears after  "token":
 *  2. Paste it between the two quotes in the TOKEN line below, and save.
 *  Until a token is pasted this file does nothing.
 */
(function () {
  'use strict';
  var TOKEN = '';
  TOKEN = String(TOKEN).replace(/[^A-Za-z0-9]/g, '');
  if (!TOKEN || window.__mhAnalytics) { return; }
  if (!/(^|\.)kushmar\.com$/.test(location.hostname)) { return; }            /* never count local previews or tests */
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') { return; } /* respect "Do Not Track" */
  window.__mhAnalytics = true;
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', '{"token": "' + TOKEN + '"}');
  (document.head || document.documentElement).appendChild(s);
})();
