// Portfolio projects, in display order. Image paths are relative to
// public/portfolio/.
export const projects = [
  {
    slug: 'domestique-display', title: 'The Domestique Display', client: 'Central Saint Martins Shows', year: '2024',
    disciplines: ['Creative technology', 'Data visualisation', 'Physical computing'],
    description: 'The word domestique describes the rider who supports their team and leader. This customisable matrix display brings spectators closer to a cycling event by combining live data with audience interaction. It was shown at Central Saint Martins Shows 2024.',
    cover: 'domestique-displays/cover-domestique.jpg', alt: 'The Domestique Display showing a live graphic at a cycling event',
    gallery: ['domestique-displays/domestique_1.jpg', 'domestique-displays/screen-data-display.jpg', 'domestique-displays/physical-display_1.jpg'],
  },
  {
    slug: 'slate', title: 'SLATE', client: 'SLATE', year: '',
    disciplines: ['Accessible design', 'Creative computing', 'Branding'],
    description: 'A collection of tools designed to help people with additional needs communicate with family, friends and guardians. SLATE explores how tactile objects and a shared visual language can make everyday communication more accessible.',
    cover: 'SLATE/slate-box-1.jpg', alt: 'The SLATE routine card deck and accessible communication tools',
    gallery: ['SLATE/slate-3.jpg', 'SLATE/slate-2.jpg', 'SLATE/process-2.jpg'],
  },
  {
    slug: 'csm-showcase', title: 'CSM Showcase Identity', client: 'Central Saint Martins', year: '2024',
    disciplines: ['Identity', 'Art direction', 'Digital design'],
    description: 'A comprehensive identity for the 2024 Central Saint Martins Showcase. The visual system brings together the energy, independence and craft of the graduating community across digital and physical spaces.',
    cover: 'csm-shows/csm-shows_1.jpg', alt: 'Central Saint Martins Showcase identity in a gallery setting',
    gallery: ['csm-shows/granary-window-1.jpg', 'csm-shows/shows-posters-1.jpg'],
  },
  {
    slug: 'velocafe', title: 'The Velocafé', client: 'Independent project', year: '',
    disciplines: ['Creative technology', 'Print design', 'Branding'],
    description: 'Reimagining the cycling café through a connected design system. Computational visuals and designed ephemera make the sense of community around coffee, cake and cycling visible.',
    cover: 'velocafe/velocafe-3.jpg', alt: 'Velocafé visual identity and cycling café ephemera',
    gallery: ['velocafe/computing-2.jpg', 'velocafe/velocafe-1.jpg', 'velocafe/cards-1.jpg'],
  },
  {
    slug: 'networked-beings', title: 'Networked Beings', client: 'Independent project', year: '',
    disciplines: ['Physical computing', 'Product design', '3D modelling'],
    description: 'Three networked objects explore how form changes our desire to interact. Small gestures connect the objects, turning light into a quiet language between people and things.',
    cover: 'networked-beings/networked-beings-cover_2.jpg', alt: 'Three Networked Beings objects arranged in space',
    gallery: ['networked-beings/networked-1.jpg', 'networked-beings/networked-show-3.jpg'],
  },
  {
    slug: 'london-to-paris', title: 'London to Paris', client: 'Kalas / Cure Leukaemia', year: '2019–20',
    disciplines: ['Sportswear', 'Art direction', 'Print design'],
    description: 'A series of cycling jerseys created for Cure Leukaemia’s London to Paris event. The designs bring riders together around a shared journey and a shared cause.',
    cover: 'l2p/L2P_cover.jpg', alt: 'London to Paris cycling event jersey design',
    gallery: ['l2p/L2P_2020_Lineup_2.jpg', 'l2p/l2p-event.jpg', 'l2p/L2P_day1_2.jpg'],
  },
  {
    slug: 'leanne-prosvic', title: 'Leanne Prosvic', client: 'Leanne Prosvic', year: '',
    disciplines: ['Brand identity', 'Print design', 'Art direction'],
    description: 'A warm and considered identity for Leanne Prosvic’s counselling and psychotherapy practice, based in Oxford and Henley-on-Thames.',
    cover: 'leanne-prosvic/leanne-cover.jpg', alt: 'Leanne Prosvic counselling practice identity',
    gallery: ['leanne-prosvic/leanne-prosvic-2.jpeg', 'leanne-prosvic/branding-13.jpg'],
  },
  {
    slug: 'think-twice', title: 'Think Twice', client: 'BBC UX&D', year: '',
    disciplines: ['Digital service', 'Research', 'Interaction design'],
    description: 'A mobile experience that encourages young adults to make more conscious shopping decisions by showing the human and environmental stories behind everyday products.',
    cover: 'think-twice/think-cover-2.jpg', alt: 'Think Twice project identity',
    gallery: ['think-twice/think_mockup_1.jpg', 'think-twice/think_ideas_1.jpg'],
  },
  {
    slug: 'jupiter-heating', title: 'Jupiter Heating Solutions', client: 'Jupiter Heating Solutions', year: '',
    disciplines: ['3D visualisation', 'Product communication', 'Art direction'],
    description: 'Over 80 refreshed 3D constructions and an animation for Jupiter Heating Solutions’ website redesign. The imagery explains the configurable underfloor heating system across the website and technical materials.',
    cover: 'jupiter-heating/jupiter-cover_1.jpg', alt: 'Underfloor heating product visualisation for Jupiter Heating Solutions',
    gallery: ['jupiter-heating/jupiter-hero-3.jpg', 'jupiter-heating/EPS-40G_1.jpg'],
  },
  {
    slug: 'stories-for-the-road', title: 'Stories for the Road', client: 'Independent project', year: '',
    disciplines: ['Digital service', 'Type design', 'Community'],
    description: 'A digital service exploring how technology can help cyclists build community and take back ownership of the roads through shared recommendations, encouragement and stories.',
    cover: 'stories/stories-cover_1.jpg', alt: 'Stories for the Road project cover',
    gallery: ['stories/homepage-1.jpg', 'stories/directory-1.jpg'],
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
