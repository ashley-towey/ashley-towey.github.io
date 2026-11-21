// Shared helpers for the Stories for the Road pages.
// Responses come from a Google Form, read through the Sheets API. They are
// written to the page as text (never as HTML) because anyone can submit one.

const SHEET_ID = '1j8z_HROnw6KDso52nrUP63gJ5D3AJbhbRy9y-MGxVqU';
const SHEET_KEY = 'AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ';
const CONTRIBUTE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdFPhZGmDfjLjLnVMRbOd8jxEKwMNq5ae02cEwDSPtdt7SPIQ/viewform?usp=sf_link';

// Photos exist in ./img/ for some what3words locations.
const PHOTOS = new Set([
  'almost.void.desire', 'ants.think.deny', 'broken.limp.token', 'chains.suave.hype',
  'chairs.mock.chase', 'cockle.cultivated.altering', 'codes.alive.speeds', 'comb.juices.makes',
  'crash.walks.crest', 'crowd.advice.assure', 'crunches.rebirth.lawful', 'damp.coins.tree',
  'darker.income.clues', 'deduced.booklets.nitrogen', 'editor.slogans.bulbs',
  'expecting.chariots.pounces', 'fend.speaks.goats', 'foam.derailed.agenda', 'lakes.socket.tanks',
  'operating.apple.swaps', 'pickup.dissolves.terminal', 'salon.moons.visa', 'skinny.radio.hits',
  'slug.email.boss', 'spite.brand.unfilled', 'stream.loaded.friday', 'toned.grid.civic',
]);

// Fetch the rows of a sheet tab, without its header row.
function loadSheet(tab) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tab)}?alt=json&key=${SHEET_KEY}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Sheets API ${response.status}`);
      return response.json();
    })
    .then((data) => (data.values || []).slice(1));
}

// '///Stream.Loaded.Friday ' -> 'stream.loaded.friday'; anything else -> ''.
function what3words(value) {
  const words = String(value || '').trim().replace(/^\/+/, '').toLowerCase();
  return /^[a-z]+\.[a-z]+\.[a-z]+$/.test(words) ? words : '';
}

function photoFor(words) {
  return PHOTOS.has(words) ? `./img/${words}.jpg` : '';
}

// A link to the location on what3words, or null for an unusable location.
function locationLink(value) {
  const words = what3words(value);
  if (!words) return null;
  const link = document.createElement('a');
  link.href = `https://what3words.com/${words}`;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = `///${words}`;
  return link;
}

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function showError(target, message) {
  target.replaceChildren(el('p', message, 'error'));
}
