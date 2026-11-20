import { getProject, projectImages } from './projects';

// The /experiments/ list, in display order (numbered 001, 002, …).
//
// Each entry:
//   title    shown in the list
//   project  (optional) slug of an experiment in projects.js; the row then
//            links to its page and shows its images on hover
//   tryIt    (optional) URL of a live code experiment (e.g. a p5.js sketch's
//            full-screen link); adds a TRY IT [ ] button that opens it
//            embedded in a modal. The site must allow being shown in an iframe.
//
// Entries without a project are listed but not clickable yet.
export const EXPERIMENTS = [
  { title: 'Navigation tutorial' }, // note: product
  { title: 'LH Interactive experiment' }, // note: but on the web
  { title: 'The Velocafé', project: 'velocafe' },
  { title: 'Networked Beings', project: 'networked-beings' },
  { title: 'Think Twice', project: 'think-twice' }, // note: communicate the aim more clearly
  { title: 'Stories for the Road', project: 'stories-for-the-road' },
  { title: 'Generative Identity', project: 'generative-identity', tryIt: '/sketches/generative-identity/' },
  { title: 'CSM identity experiment' },
  { title: 'The Tragic Everyday' }, // note: fun and quirky video
  { title: 'SLATE online version' },
  { title: 'The Passing Place' }, // note: simple and nice photography
  { title: 'A View to a Kill animation' }, // note: funny
  { title: 'Echelon cycling apparel' }, // note: as a throwback
];

// Each entry with its number, project (if any) and hover images (if any).
export const experimentEntries = () => EXPERIMENTS.map((entry, index) => {
  const project = entry.project ? getProject(entry.project, 'experiments') : undefined;
  return {
    ...entry,
    number: String(index + 1).padStart(3, '0'),
    project,
    images: project ? [...new Set(projectImages(project))] : [],
  };
});
