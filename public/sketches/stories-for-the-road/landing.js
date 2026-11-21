// The directory: every complete response, in three columns.
// Columns on the 'Responses' tab: 1 recommendation, 2 its location,
// 3 encouragement, 4 its location, 5 story, 6 its location.
const KINDS = [
  { label: 'Recommendation', text: 1, location: 2 },
  { label: 'Encouragement', text: 3, location: 4 },
  { label: 'Story', text: 5, location: 6 },
];

function entry(label, text, location) {
  const item = el('article', null, 'entry');
  item.append(el('p', label, 'entry__label'), el('h4', text));
  const words = what3words(location);
  const photo = photoFor(words);
  if (photo) {
    const img = document.createElement('img');
    img.src = photo;
    img.alt = `The location ///${words}`;
    img.loading = 'lazy';
    item.append(img);
  }
  const link = locationLink(location);
  if (link) {
    const p = el('p');
    p.append(link);
    item.append(p);
  }
  item.append(el('hr'));
  return item;
}

const directory = document.getElementById('directory');

loadSheet('Responses')
  .then((rows) => {
    const complete = rows.filter((row) => [1, 2, 3, 4, 5, 6].every((i) => row[i] && String(row[i]).trim()));
    const columns = KINDS.map((kind) => {
      const column = el('div', null, 'column');
      complete.forEach((row) => column.append(entry(kind.label, row[kind.text], row[kind.location])));
      return column;
    });
    directory.replaceChildren(...columns);
  })
  .catch(() => showError(directory, 'The responses couldn’t be loaded right now.'));
