// Shows one random response on the phone and computer pages, over a photo
// of its location when there is one.
// Columns on the 'Responses_Duplicate' tab: 14 type, 15 message, 16 location.
document.getElementById('contribute').href = CONTRIBUTE_URL;

loadSheet('Responses_Duplicate')
  .then((rows) => {
    const usable = rows.filter((row) => row[14] && row[15]);
    if (!usable.length) throw new Error('No responses');
    const row = usable[Math.floor(Math.random() * usable.length)];
    document.getElementById('type').textContent = row[14];
    document.getElementById('content').replaceChildren(el('small', row[15]));
    const link = locationLink(row[16]);
    if (link) document.getElementById('location-information').replaceChildren(link);
    const photo = photoFor(what3words(row[16]));
    if (photo) document.body.style.backgroundImage = `url('${photo}')`;
  })
  .catch(() => showError(document.getElementById('content'), 'The stories couldn’t be loaded right now.'));
