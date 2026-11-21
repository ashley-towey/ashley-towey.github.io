// Everything on the /experiments/ page, in display order (numbered 001, 002, …).
// Experiments don't have pages of their own: visitors stay on /experiments/.
//
// Each entry:
//   title   shown in the list
//   images  (optional) shown, a few at random, beside the list when the row
//           is hovered. Paths are relative to assets-src/portfolio/; add the
//           originals there and run `npm run images`.
//   tryIt   (optional) a live code experiment, opened in a modal by a
//           TRY IT [ ] button. Put the sketch in public/sketches/<name>/ and
//           link to its index.html itself ('/sketches/<name>/index.html'):
//           the dev server shows the app's 404 for a bare folder URL.
//           An outside URL works too if that site allows being embedded.
//
// Notes in comments are reminders, not shown on the site.
export const EXPERIMENTS = [
  { title: 'LH Interactive experiment' }, // note: but on the web
  {
    title: 'The Velocafé',
    images: [
      'velocafe/velocafe-3.jpg',
      'velocafe/velocafe-1.jpg',
      'velocafe/velocafe-2.jpg',
      'velocafe/cards-1.jpg',
      'velocafe/cards-2.jpg',
      'velocafe/computing-1.jpg',
      'velocafe/computing-2.jpg',
    ],
  },
  {
    title: 'Networked Beings',
    images: [
      'networked-beings/networked-beings-cover_2.jpg',
      'networked-beings/networked-show-1.jpg',
      'networked-beings/networked-1.jpg',
      'networked-beings/networked-show-3.jpg',
    ],
  },
  {
    title: 'Think Twice', // note: communicate the aim more clearly
    images: [
      'think-twice/think-cover-2.jpg',
      'think-twice/think_mockup_1.jpg',
      'think-twice/think_ideas_1.jpg',
      'think-twice/think_user-personas_1.jpg',
    ],
  },
  {
    title: 'Stories for the Road',
    images: [
      'stories/stories-cover_1.jpg',
      'stories/homepage-1.jpg',
      'stories/directory-1.jpg',
    ],
    tryIt: '/sketches/stories-for-the-road/index.html',
  },
  {
    title: 'Generative Identity',
    images: [
      'generative-identity/generative-identity-4.jpg',
      'generative-identity/generative-identity-1.jpg',
      'generative-identity/generative-identity-3.png',
      'generative-identity/generative-identity-2.jpg',
    ],
    tryIt: '/sketches/generative-identity/index.html',
  },
  { title: 'CSM identity experiment' },
  { title: 'The Tragic Everyday' }, // note: fun and quirky video
  { title: 'SLATE online version' },
  { title: 'The Passing Place' }, // note: simple and nice photography
  { title: 'A View to a Kill animation' }, // note: funny
  { title: 'Echelon cycling apparel' }, // note: as a throwback
];

// Every image the experiments use, for tests and tooling.
export const experimentImages = () => EXPERIMENTS.flatMap((entry) => entry.images ?? []);
