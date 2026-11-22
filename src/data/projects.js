// Portfolio projects, in display order.
//
// Image paths are relative to assets-src/portfolio/ (run `npm run images` after
// adding one). Each project page renders:
//   - an intro from title, client, year, disciplines, description, credits, links
//   - then `blocks`, in order:
//       { type: 'images', label, heading?, body?, credits?, images: [{ src, alt, caption?, wide? }], columns?, square?, masonry?, lightbox? }
//         (masonry: images keep their own shape in columns; lightbox: click an image to view it full screen)
//         (with a heading, body or credits, the text sits beside the images; columns defaults to 1 there)
//         (tryIt?: { label?, title, src } adds a TRY IT button (or `label`) under the text that opens a live sketch in a pop-up)
//         (an item can use `clip: 'folder/file.gif'` instead of `src` for a looping
//          silent video made by `npm run videos`)
//       { type: 'text', label?, heading, body: [paragraphs], list?: [items] }
//       { type: 'quote', label?, quote: [paragraphs], cite }
//       { type: 'feature', label, main: { src, alt }, side?: { src, alt }, stat?: { value, text } }
//         (a large image beside a smaller image and a big dot-matrix stat)
//       { type: 'video', label, videos: [{ vimeo, title, ratio, credits? }], columns? }
//         (credits: [{ role, names }], shown under the video one role per line)
// `hero` (optional) is the image beside the title on the project page; it
// defaults to `cover`. If it also appears in a block, it's left out there.
// `summary` is the short text used on the home page card and in search/share previews.
// Every project is portfolio work, at /work/<slug>/. Experiments live in
// data/experiments.js instead and have no pages of their own.
//
// Projects are shown newest first, sorted by `year` (projects from the same year
// keep the order they're listed in here).

const allProjects = [
  {
    slug: 'long-horizon-summit',
    title: 'Long Horizon Summit',
    client: 'Encord',
    year: '2026',
    disciplines: ['Campaign design', 'Signage & wayfinding', 'Creative technology'],
    // DRAFT copy — to review
    summary: 'Billboard campaigns, event signage and an interactive installation for Long Horizon, Encord’s first Physical AI summit, held at Fort Mason in San Francisco.',
    description: [
      'Long Horizon is Encord’s inaugural Physical AI summit, bringing together the people building robotics, embodied AI and autonomous systems for two days at Fort Mason, San Francisco, in October 2026.',
      'Working within Encord’s design team, I helped bring the event to life from the first announcement to the venue itself: billboard campaigns to build awareness ahead of the summit, signage and wayfinding on site, and an interactive installation for attendees to explore during the event.',
    ],
    cover: 'long-horizon-summit/lh-expo-hall.jpg',
    alt: 'The Long Horizon hall at Fort Mason: attendees at tables and stands under a white steel roof, a robot demo in the aisle and a large Long Horizon banner at the far end',
    blocks: [
      {
        type: 'feature',
        label: 'Billboards',
        main: { src: 'long-horizon-summit/billboard-street.png', alt: 'Street billboard: “Qasar Younis is speaking at Long Horizon”, with his portrait and the Applied Intuition logo, presented by Encord, 20–21 October, Fort Mason, SF' },
        side: { src: 'long-horizon-summit/billboard-wall.png', alt: 'Wall-mounted Long Horizon billboard showing five speakers from Google X, Skild AI, DeepMind, Boston Dynamics and Waymo' },
        // DRAFT copy — to review
        stat: { value: '1500', text: 'Tickets sold in the summit’s first year, helped in part by a billboard campaign across San Francisco that featured the top speakers. Many of them shared their billboards on LinkedIn, carrying the campaign well beyond the streets and extending the conference’s reach.' },
      },
      {
        type: 'images',
        label: 'Signage',
        columns: 3,
        masonry: true,
        lightbox: true,
        images: [
          { src: 'long-horizon-summit/signage-1.png', alt: 'Long Horizon banners above the doors of Gateway Pavilion at Fort Mason as attendees arrive' },
          { src: 'long-horizon-summit/signage-2.png', alt: 'A tall “What’s On” sign with floor plans of both floors and a QR code for the full programme, between two plants' },
          { src: 'long-horizon-summit/signage-3.png', alt: 'An orange coffee cart wrapped in repeating “Coffee” type, with a coffee cup worked into the O' },
          { src: 'long-horizon-summit/signage-4.png', alt: 'An orange “Elevator” wayfinding sign with three arrows, beside a robotics demo' },
          { src: 'long-horizon-summit/signage-5.png', alt: 'Attendees talking in front of a large green Long Horizon wall' },
          { src: 'long-horizon-summit/signage-6.png', alt: 'The busy main hall from above: the Frontier Stage, the What’s On sign and a hanging Long Horizon banner' },
        ],
      },
      {
        type: 'images',
        label: 'Installation',
        heading: 'Interactive installation',
        // DRAFT copy — to review
        body: [
          'Alongside the event signage, I designed and built an interactive installation for the summit floor. Two tall screens, each with its own camera, turn the people walking past into live portraits of the event.',
        ],
        // The same web version as the experiments page's Long Horizon installation.
        tryIt: { title: 'Long Horizon installation', src: '/sketches/lh-installation/index.html' },
        images: [
          { clip: 'long-horizon-summit/installation.mov', alt: 'Two tall Long Horizon screens on stands. As people walk past, their silhouettes appear on screen, built from tiny LONG HORIZON letters', wide: true },
        ],
      },
      {
        type: 'video',
        label: 'Recap',
        videos: [
          {
            vimeo: '1249142318',
            title: 'Long Horizon Recap',
            ratio: 16 / 9,
            credits: [
              { role: 'Editing & Direction', names: 'Oliver Blair' },
              { role: 'Filming', names: 'Oliver Wang & Nat Mannering' },
            ],
          },
        ],
      },
      {
        type: 'images',
        label: 'The team',
        heading: 'Thank you!',
        body: [
          'A shoutout to the amazing team who made Long Horizon possible. It was a huge effort from everyone, and an absolute pleasure to be part of.',
        ],
        credits: 'Hyemin Kang, Oliver Blair, Mavis Lok, Nat Mannering, Jack Henchy, Tom Kennedy, George Burton-Fletcher and so many more!',
        images: [
          { src: 'long-horizon-summit/lh-team.jpg', alt: 'The Encord team in green T-shirts outside Gateway Pavilion at Fort Mason, beneath Long Horizon summit banners', wide: true },
        ],
      },
    ],
  },
  {
    slug: 'domestique-display',
    title: 'The Domestique Display',
    client: 'Central Saint Martins Shows',
    year: '2024',
    disciplines: ['Creative technology', 'Data visualisation', 'Physical computing'],
    summary: 'The word domestique describes the rider who supports their team and leader. This customisable matrix display brings spectators closer to a cycling event by combining live data with audience interaction. It was shown at Central Saint Martins Shows 2024.',
    description: [
      'The word domestique in road cycling describes the rider who supports their team and leader. The Domestique Display embodies the role of the helper by building a stronger rider–audience relationship through the introduction of a customisable matrix LED display. By combining live data and interactions, the display creates a more engaging experience, bringing the spectators closer to the event.',
      'Shown at Central Saint Martins Shows 2024.',
    ],
    links: [{ label: 'Showcase details', href: 'https://www.arts.ac.uk/colleges/central-saint-martins/whats-on/central-saint-martins-shows-2024' }],
    cover: 'domestique-displays/cover-domestique.jpg',
    alt: 'The Domestique Display showing live race positions beside a cycling circuit while a spectator holds a phone',
    blocks: [
      {
        type: 'images',
        label: 'The display',
        images: [
          { src: 'domestique-displays/domestique_1.jpg', alt: 'The display showing an animated star graphic at the trackside as riders pass, with a spectator holding a phone controller', wide: true },
          { src: 'domestique-displays/input-device_1.jpg', alt: 'Handheld input device with a small screen, a dial and twelve icon buttons' },
          { src: 'domestique-displays/screen-data-display.jpg', alt: 'The LED matrix showing race positions and time gaps' },
          { src: 'domestique-displays/spectator-gif-playing.jpg', alt: 'A framed wide-format display playing an animation of a group of cyclists', wide: true },
        ],
      },
      {
        type: 'images',
        label: 'Process',
        images: [
          { src: 'domestique-displays/sq_coding-screen_1.jpg', alt: 'LED matrix panels wired to a microcontroller during coding, showing team names' },
          { src: 'domestique-displays/physical-display_1.jpg', alt: 'Close-up of the LED matrix lighting up a purple outline' },
          { src: 'domestique-displays/physical-display_2.jpg', alt: 'Ashley assembling the wooden display enclosure' },
          { src: 'domestique-displays/physical-display_3.jpg', alt: 'Two people testing the display on a stepladder beside the circuit' },
          { src: 'domestique-displays/figma-mockups.jpg', alt: 'Figma mockups of the companion phone interface', wide: true },
        ],
      },
    ],
  },
  {
    slug: 'slate',
    title: 'SLATE',
    hero: 'SLATE/slate-2.jpg',
    client: 'SLATE',
    year: '2022', // PLACEHOLDER year — confirm
    disciplines: ['Accessible design', 'Creative computing', 'Branding'],
    summary: 'A collection of tools designed to help people with additional needs communicate with family, friends and guardians. SLATE explores how tactile objects and a shared visual language can make everyday communication more accessible.',
    description: [
      'This project is a collection of tools created for people with varying levels of additional needs to be able to communicate more easily with their family, friends and guardians. The name SLATE is symbolic of taking each day as it comes, and offers the user a clean slate from which to communicate. A core aim is to produce tactile kinaesthetic experiences that are engaging and tactile.',
    ],
    cover: 'SLATE/slate-box-1.jpg',
    alt: 'The SLATE card box, with braille embossed on its copper-coloured lid',
    blocks: [
      {
        type: 'images',
        label: 'Daily Routine card deck',
        images: [
          { src: 'SLATE/slate-3.jpg', alt: 'SLATE routine cards in their box, with a toilet icon card on top', wide: true },
          { src: 'SLATE/slate-2.jpg', alt: 'Grid of SLATE routine cards with icons for sleep, conversation, friendship, an alarm and a drink' },
          { src: 'SLATE/slate-box-1.jpg', alt: 'The SLATE card box, with braille embossed on its copper-coloured lid' },
        ],
      },
      {
        type: 'text',
        heading: 'Process',
        body: [
          'The SLATE Daily Routine card deck is an initial exploration into the field of accessible design. It is the formalisation of a semiotic language that can be used to communicate routine by arranging activities in the order of your morning or evening routine.',
          'The SLATE Emotion Communication Cube further expands the scope for learning through the addition of physical computing elements. It is a visually engaging tool that, through the use of tactile touch-sensitive buttons, gives the user the ability to communicate their emotions.',
          'The project at large continues to explore the many ways in which physical computing can be used to enable children and young adults with learning disabilities to engage with the people around them, their learning and the world at large.',
        ],
      },
      {
        type: 'images',
        label: 'Emotion Communication Cube',
        columns: 3,
        square: true,
        images: [
          { src: 'SLATE/process-2.jpg', alt: 'Cardboard prototype of the cube opened out on a desk, with exposed wiring and LED strips' },
          { src: 'SLATE/process-1.jpg', alt: 'Inside the cube prototype, lit up green' },
          { src: 'SLATE/process-3.jpg', alt: 'Cube prototype with folded foil panels, next to a laptop' },
        ],
      },
      {
        type: 'images',
        label: 'Four faces',
        columns: 4,
        square: true,
        images: [
          { src: 'SLATE/excited.jpg', alt: 'Excited face: yellow felt covered in colourful pom-poms', caption: 'Excited' },
          { src: 'SLATE/anxious.jpg', alt: 'Anxious face: folded silver foil pyramids', caption: 'Anxious' },
          { src: 'SLATE/happy.jpg', alt: 'Happy face: a smooth bright green panel', caption: 'Happy' },
          { src: 'SLATE/sad.jpg', alt: 'Sad face: red felt with stitched lines', caption: 'Sad' },
        ],
      },
    ],
  },
  {
    slug: 'csm-showcase',
    title: 'CSM Showcase Identity',
    client: 'Central Saint Martins (finalist proposal)',
    year: '2024',
    disciplines: ['Identity', 'Art direction', 'Digital design'],
    summary: 'Our finalist proposal for the 2024 Central Saint Martins Showcase identity: a visual system bringing together the energy, independence and craft of the graduating community across digital and physical spaces.',
    description: [
      'A group project in which we were the finalists for the Central Saint Martins Showcase Identity for 2024. Through our collective time at the Creative Computing Institute we honed our skills in bridging the gap between the digital and physical in order to bring the audience into the design, allowing us to create a cohesive identity from web, to print, to physical space.',
    ],
    credits: 'Jacob David Lloyd, Katie Kollmer, William Westwood and Harvey Prendergast',
    cover: 'csm-shows/csm-shows_1.jpg',
    alt: 'CSM Shows 2024 key visual with a sculpted gold star on a pale blue background',
    blocks: [
      {
        type: 'images',
        label: 'Proposal',
        images: [
          { src: 'csm-shows/granary-window-1.jpg', alt: 'Mockup of the proposed CSM Shows 2024 identity in a window of the Granary Building', wide: true },
        ],
      },
      {
        type: 'images',
        label: 'Building blocks',
        columns: 4,
        square: true,
        images: [
          { clip: 'csm-shows/idea-generation_1.gif', alt: 'A mirrored cube tumbles across a pale grey surface', caption: 'Idea generation' },
          { clip: 'csm-shows/research_1.gif', alt: 'A translucent green and yellow segmented disc rolls across a pale grey surface', caption: 'Research' },
          { clip: 'csm-shows/iteration_1.gif', alt: 'A glossy pink ring rolls across a pale grey surface', caption: 'Iteration & reflection' },
          { clip: 'csm-shows/independence_1.gif', alt: 'A yellow pyramid drops into a pale grey space', caption: 'Independence' },
        ],
      },
      {
        type: 'text',
        heading: 'Concept',
        body: ['Our proposal brings together the building blocks of each individual’s creative processes to create a moment of focus and tactile interaction that is the final show.'],
      },
      {
        type: 'images',
        label: 'The final show',
        columns: 3,
        square: true,
        images: [
          { clip: 'csm-shows/craft_1.gif', alt: 'A crumpled gold star bounces across a pale grey surface', caption: 'Craft & skill' },
          { clip: 'csm-shows/experimentation_1.gif', alt: 'A glossy red blob wobbles across a pale grey surface', caption: 'Experimentation & chaos' },
          { clip: 'csm-shows/Collaboration_video_2.gif', alt: 'Two fuzzy blue shapes bounce together on a pale grey surface', caption: 'Sharing & collaboration' },
        ],
      },
      {
        type: 'images',
        label: 'Identity',
        images: [
          { src: 'csm-shows/shows-posters-1.jpg', alt: 'Proposed posters for the Foundation, 2024 and Postgraduate Art shows' },
          { src: 'csm-shows/lethaby-window_1.jpg', alt: 'Mockup of the proposed identity on the glass doors of the Lethaby Building' },
        ],
      },
      {
        type: 'text',
        heading: 'Multiple shows',
        body: ['The showcase needed three separate identities for the different shows. To differentiate them we used scale, supported by colour. The gradual zooming in from Foundation, through Undergraduate, to Postgraduate shows the level of detail increasing as you move through your studies.'],
      },
      {
        type: 'images',
        label: 'In use',
        images: [
          { clip: 'csm-shows/ar-example_1.mp4', alt: 'A phone held up to a CSM Shows 2024 poster reveals the 3D shapes in augmented reality', caption: 'Augmented reality poster', wide: true },
          { clip: 'csm-shows/instagram-mockup_2.mp4', alt: 'Three phones cycle through CSM Shows 2024 Instagram posts and stories', caption: 'Instagram', wide: true },
        ],
      },
    ],
  },
  {
    slug: 'london-to-paris',
    title: 'London to Paris',
    client: 'Kalas / Cure Leukaemia',
    year: '2019',
    disciplines: ['Sportswear', 'Art direction', 'Print design'],
    summary: 'A series of cycling jerseys created for Cure Leukaemia’s London to Paris event. The designs bring riders together around a shared journey and a shared cause.',
    description: [
      'Created in collaboration with Kalas, this series of jerseys was designed for Cure Leukaemia’s four-day London to Paris cycling event. Each of the four jerseys is inspired by the six-day jerseys worn by track riders and incorporates the flag or crest of that day’s destination town, to inspire the riders towards it.',
      'The project spans two years of the event: 2019, and 2020, which unfortunately didn’t take place due to the pandemic.',
    ],
    cover: 'l2p/L2P_cover.jpg',
    alt: 'Four London to Paris jerseys numbered 1 to 4',
    blocks: [
      {
        type: 'images',
        label: '2020 collection',
        images: [
          { src: 'l2p/L2P_2020_Lineup_2.jpg', alt: 'The four 2020 jerseys side by side', wide: true },
        ],
      },
      {
        type: 'text',
        heading: 'Process',
        body: [
          'The jerseys are a marker of each day of the event, with a distinct design for each stage. The design takes cues from the town or city the riders are heading towards, to help push them through the difficult moments and onwards to their destination for the evening.',
          'Inspired by traditional six-day cycling jerseys, the number of each day is placed on the arms, along with a blocky design that reflects the classic six-day jersey. With the crest proudly displayed on the chest and supported by the sponsors, each jersey is a special piece of memorabilia for the riders to take home.',
        ],
      },
      {
        type: 'quote',
        quote: ['“Incredible, amazing, life-changing!”'],
        cite: 'Riders of the event',
      },
      {
        type: 'images',
        label: '2019 event',
        columns: 3,
        square: true,
        images: [
          { src: 'l2p/l2p-design.jpg', alt: 'Design references: town crests alongside the 2019 jersey designs' },
          { src: 'l2p/l2p-flat_1.jpg', alt: 'Flat artwork for the blue Wheyd. jersey' },
          { src: 'l2p/l2p-event.jpg', alt: 'Riders wearing the jerseys during the 2019 event, including at the Eiffel Tower' },
        ],
      },
      {
        type: 'images',
        label: '2020 event',
        columns: 4,
        square: true,
        images: [
          { src: 'l2p/L2P_day1_2.jpg', alt: 'Day 1 jersey in red and blue with a white cross', caption: 'Day 1: to Calais' },
          { src: 'l2p/L2P_day2_1.jpg', alt: 'Day 2 jersey in blue and yellow with diagonal stripes', caption: 'Day 2: to Abbeville' },
          { src: 'l2p/L2P_day3_1.jpg', alt: 'Day 3 jersey in red and black with vertical stripes', caption: 'Day 3: to Beauvais' },
          { src: 'l2p/L2P_day4_1.jpg', alt: 'Day 4 jersey in blue and red with gold fleurs-de-lis', caption: 'Day 4: to Paris' },
        ],
      },
    ],
  },
  {
    slug: 'leanne-prosvic',
    title: 'Leanne Prosvic',
    client: 'Leanne Prosvic',
    year: '2022', // PLACEHOLDER year — confirm
    disciplines: ['Brand identity', 'Print design', 'Art direction'],
    summary: 'A warm and considered identity for Leanne Prosvic’s counselling and psychotherapy practice, based in Oxford and Henley-on-Thames.',
    description: [
      'Leanne Prosvic MA, UKCP, MBACP is an accredited existential psychotherapist practising in Oxford and Henley-on-Thames. Our aim with the design approach was to provide a nurturing environment to facilitate growth, through a welcoming, caring and empathic brand voice.',
    ],
    links: [{ label: 'Live website', href: 'https://www.leanneprosvic.co.uk/' }],
    cover: 'leanne-prosvic/leanne-cover.jpg',
    alt: 'The Leanne Prosvic website on a laptop',
    blocks: [
      {
        type: 'images',
        label: 'Identity',
        images: [
          { src: 'leanne-prosvic/leanne-prosvic-2.jpeg', alt: 'Rows of Leanne Prosvic business cards on a patterned teal background', wide: true },
        ],
      },
      {
        type: 'text',
        heading: 'Process',
        body: [
          'Using a process of reduction, the logotype is born from a typeface.',
          'The two most important places the brand appears are the website and physical touchpoints such as business cards and letterheads.',
        ],
      },
      {
        type: 'images',
        label: 'Brand development',
        images: [
          { src: 'leanne-prosvic/brand-process-23.jpg', alt: 'The Leanne Prosvic logotype in three typeface explorations' },
          { src: 'leanne-prosvic/brand-process-25.jpg', alt: 'Monogram sketches reducing L and P into a seedling mark' },
          { src: 'leanne-prosvic/brand-process-24.jpg', alt: 'The final mark and logotype in coral on teal, and teal on white' },
          { src: 'leanne-prosvic/branding-13.jpg', alt: 'A repeating pattern of the seedling mark in green and coral' },
          { src: 'leanne-prosvic/branding-26.jpg', alt: 'The logotype in coral on a teal background', wide: true },
        ],
      },
      {
        type: 'images',
        label: 'Touchpoints',
        images: [
          { src: 'leanne-prosvic/leanne-prosvic-1.jpeg', alt: 'The Leanne Prosvic website homepage on a laptop' },
          { src: 'leanne-prosvic/leanne-prosvic-3.jpg', alt: 'A letterhead invoice using the Leanne Prosvic identity' },
        ],
      },
    ],
  },
  {
    slug: 'jupiter-heating',
    title: 'Jupiter Heating Solutions',
    client: 'Jupiter Heating Solutions',
    year: '2024', // PLACEHOLDER year — confirm
    disciplines: ['3D visualisation', 'Product communication', 'Art direction'],
    summary: 'Over 80 refreshed 3D constructions and an animation for Jupiter Heating Solutions’ website redesign. The imagery explains the configurable underfloor heating system across the website and technical materials.',
    description: [
      'As part of their website redesign, Jupiter hired me to create a collection of 3D images of their underfloor heating constructions. The project included designing over 80 different construction images and a video animation to highlight the configurable nature of the Jupiter underfloor heating system.',
      'Using Blender, I refreshed the look of the existing imagery and created the new constructions in the same design style.',
    ],
    links: [{ label: 'Live website', href: 'https://jupiterunderfloorheating.com/technical/floor-construction/floor-and-wall-build-ups/' }],
    cover: 'jupiter-heating/jupiter-cover_1.jpg',
    alt: 'Cutaway render of an underfloor heating construction',
    blocks: [
      {
        type: 'images',
        label: 'Constructions',
        images: [
          { src: 'jupiter-heating/jupiter-hero-3.jpg', alt: 'Exploded render of underfloor heating boards and panels on a dark background', wide: true },
        ],
      },
      {
        type: 'images',
        label: 'Refresh',
        columns: 3,
        images: [
          { src: 'jupiter-heating/EPS-40G_1.jpg', alt: 'The original construction render', caption: 'Pre-existing imagery' },
          { src: 'jupiter-heating/EPS-40G_2.jpg', alt: 'Line drawing of the construction during modelling', caption: 'Design process' },
          { src: 'jupiter-heating/EPS-40G_3.jpg', alt: 'The refreshed construction render', caption: 'Updated output' },
        ],
      },
      {
        type: 'quote',
        label: 'Testimonial',
        quote: [
          '“As part of the revamp of our website we were looking to refresh our range of isometric 3D representations of our underfloor heating floor constructions. As well as updating and refreshing our existing images, we also required a range of images that illustrated new products.',
          'Although having no experience of our products and marketplace, Ashley understood our requirements early on and used actual product samples to create realistic renders. Willing to make minor adjustments where necessary, the end result was a new, vibrant range of 3D images that can be used across our website and technical datasheets. With his professional approach and fast turnaround times we would certainly recommend his services to other clients.”',
        ],
        cite: 'Chris Kollmer, Jupiter Heating Solutions',
      },
      {
        type: 'images',
        label: 'Applications',
        columns: 3,
        square: true,
        images: [
          { src: 'jupiter-heating/floor-finishes-1.png', alt: 'Render of a heated floor with different floor finishes', caption: 'Floor finishes' },
          { src: 'jupiter-heating/acoustics_1.png', alt: 'Render of an acoustic floor construction over timber joists', caption: 'Acoustics' },
          { src: 'jupiter-heating/low-profile_1.png', alt: 'Render of a thin, low-profile heating panel', caption: 'Low-profile' },
          { src: 'jupiter-heating/levelling_1.png', alt: 'Render of a construction with a levelling layer', caption: 'Levelling' },
          { src: 'jupiter-heating/fire-resilient_1.png', alt: 'Render of a fire-resilient construction', caption: 'Fire resilient' },
        ],
      },
    ],
  },
];

export const projects = [...allProjects].sort((a, b) => Number(b.year) - Number(a.year));

// The home heading: "I design & build; websites,[5] products,[2] …". Each word's
// bracketed number links to one project (`project`, a slug) and shows that
// project's position in the portfolio, like a footnote; or links to the
// experiments page (`to`) and shows how many experiments are listed.
export const HEADLINE = [
  { label: 'websites', project: 'leanne-prosvic' },
  { label: 'products', project: 'slate' },
  { label: 'brands', project: 'csm-showcase' },
  { label: 'campaigns', project: 'london-to-paris' },
  { label: 'billboards', project: 'long-horizon-summit' },
  { label: 'etc', to: '/experiments/', linkLabel: 'Experiments' },
];

// Find a project by slug.
export const getProject = (slug) => projects.find((project) => project.slug === slug);

// The project page's hero image, with alt text from wherever it's used in blocks.
export const projectHero = (project) => {
  const src = project.hero ?? project.cover;
  const inBlocks = project.blocks.filter((block) => block.type === 'images').flatMap((block) => block.images).find((image) => image.src === src);
  return { src, alt: inBlocks?.alt ?? project.alt };
};

// Every image a project uses (cover first), for tests and tooling.
export const projectImages = (project) => [
  project.cover,
  ...project.blocks.filter((block) => block.type === 'images').flatMap((block) => block.images.filter((image) => image.src).map((image) => image.src)),
  ...project.blocks.filter((block) => block.type === 'feature').flatMap((block) => [block.main.src, block.side?.src].filter(Boolean)),
];

// Every looping clip a project uses.
export const projectClips = (project) =>
  project.blocks.filter((block) => block.type === 'images').flatMap((block) => block.images.filter((image) => image.clip).map((image) => image.clip));
