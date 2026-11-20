// Portfolio projects, in display order.
//
// Image paths are relative to assets-src/portfolio/ (run `npm run images` after
// adding one). Each project page renders:
//   - an intro from title, client, year, disciplines, description, credits, links
//   - then `blocks`, in order:
//       { type: 'images', label, images: [{ src, alt, caption?, wide? }], columns?, square? }
//       { type: 'text', label?, heading, body: [paragraphs], list?: [items] }
//       { type: 'quote', label?, quote: [paragraphs], cite }
//       { type: 'video', label, videos: [{ vimeo, title, ratio }], columns? }
// `summary` is the short text used on the home page card and in search/share previews.

export const projects = [
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
    client: 'SLATE',
    year: '',
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
    client: 'Central Saint Martins',
    year: '2024',
    disciplines: ['Identity', 'Art direction', 'Digital design'],
    summary: 'A comprehensive identity for the 2024 Central Saint Martins Showcase. The visual system brings together the energy, independence and craft of the graduating community across digital and physical spaces.',
    description: [
      'A group project in which we were the finalists for the Central Saint Martins Showcase Identity for 2024. Through our collective time at the Creative Computing Institute we honed our skills in bridging the gap between the digital and physical in order to bring the audience into the design, allowing us to create a cohesive identity from web, to print, to physical space.',
    ],
    credits: 'Jacob David Lloyd, Katie Kollmer, William Westwood and Harvey Prendergast',
    cover: 'csm-shows/csm-shows_1.jpg',
    alt: 'CSM Shows 2024 key visual with a sculpted gold star on a pale blue background',
    blocks: [
      {
        type: 'images',
        label: 'In the building',
        images: [
          { src: 'csm-shows/granary-window-1.jpg', alt: 'The Central Saint Martins Shows 2024 identity in a window of the Granary Building', wide: true },
        ],
      },
      {
        type: 'text',
        heading: 'Concept',
        body: ['Our proposal brings together the building blocks of each individual’s creative processes to create a moment of focus and tactile interaction that is the final show.'],
      },
      {
        type: 'images',
        label: 'Identity',
        images: [
          { src: 'csm-shows/shows-posters-1.jpg', alt: 'Three posters for the Foundation, 2024 and Postgraduate Art shows' },
          { src: 'csm-shows/lethaby-window_1.jpg', alt: 'The identity applied to the glass doors of the Lethaby Building' },
        ],
      },
      {
        type: 'text',
        heading: 'Multiple shows',
        body: ['The showcase needed three separate identities for the different shows. To differentiate them we used scale, supported by colour. The gradual zooming in from Foundation, through Undergraduate, to Postgraduate shows the level of detail increasing as you move through your studies.'],
      },
    ],
  },
  {
    slug: 'velocafe',
    title: 'The Velocafé',
    client: 'Independent project',
    year: '',
    disciplines: ['Creative technology', 'Print design', 'Branding'],
    summary: 'Reimagining the cycling café through a connected design system. Computational visuals and designed ephemera make the sense of community around coffee, cake and cycling visible.',
    description: [
      'The Velocafé aims to reimagine our interaction with the cycling café through a consistent design approach. Across computational visuals and designed ephemera, the velocafé (read: cycling café) becomes part of the visual language associated with communal coffee and cake.',
    ],
    cover: 'velocafe/velocafe-3.jpg',
    alt: 'Velocafé cards for Fortitude Bakehouse and Via laid on a cycling jersey',
    blocks: [
      {
        type: 'images',
        label: 'The velocafé clock',
        images: [
          { src: 'velocafe/velocafe-1.jpg', alt: 'A visitor smiling as he raises a hand to the velocafé clock’s glowing light display', wide: true },
        ],
      },
      {
        type: 'text',
        heading: 'A Michelin star for cycling cafés',
        body: [
          'Inspired by the winged wheel symbol of the Cycling Touring Club, the velocafé ‘clock’ uses mechanical sound and proximity detection to visually display the sense of community and belonging that is felt when visiting a cycling café. Through an array of lights that only trigger when there are sounds and people around, it shows through a modern visual language that there are cyclists in the café.',
          'Like a Michelin star for cycling cafés, the velocafé ‘clock’ denotes a good cycling café, not simply through arbitrary testing, but through live data that is being collected within the café and displayed to “tempt the [passing] rider to early tea”.',
        ],
      },
      {
        type: 'images',
        label: 'Ephemera',
        columns: 3,
        square: true,
        images: [
          { src: 'velocafe/velocafe-2.jpg', alt: 'Velocafé cards for Fortitude, Rapha and Via laid on a colourful cycling jersey' },
          { src: 'velocafe/cards-1.jpg', alt: 'Three Velocafé cards with a glowing gradient badge' },
          { src: 'velocafe/cards-2.jpg', alt: 'Backs of the cards listing details for Fortitude, Rapha Soho and Via Atelier' },
        ],
      },
      {
        type: 'text',
        heading: 'Physical computing',
        body: [
          'To locate the compute elements I created a clock-like enclosure, using laser cutting to create a diffused layer with elements of the Winged Wheel symbol engraved.',
          'To house the Arduino devices and their wires I built a box with a door on the exterior that positioned the sound and ultrasonic sensors. Placing these correctly was important for collecting the sound and proximity data: the sound sensor sits close to head height, and the ultrasonic sensor lower down to reflect off the body of a passing person.',
        ],
      },
      {
        type: 'images',
        label: 'Process',
        images: [
          { src: 'velocafe/computing-1.jpg', alt: 'A laser cutter engraving the clock’s diffuser panel' },
          { src: 'velocafe/computing-2.jpg', alt: 'An Arduino, breadboard and sensors wired up on a desk' },
        ],
      },
    ],
  },
  {
    slug: 'networked-beings',
    title: 'Networked Beings',
    client: 'Independent project',
    year: '',
    disciplines: ['Physical computing', 'Product design', '3D modelling'],
    summary: 'Three networked objects explore how form changes our desire to interact. Small gestures connect the objects, turning light into a quiet language between people and things.',
    description: [
      'Three networked objects, Bool, Boid and Buzz, explore how our interaction with objects alters our desire to interact with them. Through micro-interactions of turning each other’s light on, they create a connection.',
      'Each object is created in a different form which relates directly to its output device. Bool is sharp, outputting 1 or 0 and turning the affected device on or off. Boid is square and has four outputs, each relating to a different colour state on the affected device. Buzz is circular and infinite, outputting an ever-changing random array of colours.',
    ],
    cover: 'networked-beings/networked-beings-cover_2.jpg',
    alt: 'The white, round Buzz object glowing orange, with Bool and Boid behind it',
    blocks: [
      {
        type: 'images',
        label: 'Exhibition',
        images: [
          { src: 'networked-beings/networked-show-1.jpg', alt: 'Visitors trying the Networked Beings objects at an exhibition', wide: true },
          { src: 'networked-beings/networked-1.jpg', alt: 'Hands pressing Bool (black, faceted), Boid (orange, square) and Buzz (white, round)' },
          { src: 'networked-beings/networked-show-3.jpg', alt: 'Two visitors smiling as they press the objects' },
        ],
      },
    ],
  },
  {
    slug: 'london-to-paris',
    title: 'London to Paris',
    client: 'Kalas / Cure Leukaemia',
    year: '2019–20',
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
    year: '',
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
    slug: 'think-twice',
    title: 'Think Twice',
    client: 'BBC UX&D',
    year: '',
    disciplines: ['Digital service', 'Research', 'Interaction design'],
    summary: 'A mobile experience that encourages young adults to make more conscious shopping decisions by showing the human and environmental stories behind everyday products.',
    description: [
      'A group project in collaboration with the BBC UX&D team, during which we created a mobile application to encourage young adults (18–24 year olds) to make more conscious shopping decisions by including real-time guidance and incentives.',
    ],
    credits: 'Nataliya Belova, See Wing Chun, Insiyah Haji and Bo Kang',
    cover: 'think-twice/think-cover-2.jpg',
    alt: 'Think Twice logo, in partnership with BBC UX&D',
    blocks: [
      {
        type: 'images',
        label: 'The app',
        images: [
          { src: 'think-twice/think_mockup_1.jpg', alt: 'Think Twice app screens shown on several phones', wide: true },
        ],
      },
      {
        type: 'video',
        label: 'Overview',
        videos: [{ vimeo: '930209800', title: 'Think Twice', ratio: 16 / 9 }],
      },
      {
        type: 'text',
        heading: 'User research',
        body: ['By talking with our student peers we identified a common need to become more conscious shoppers. Research shows that 41% of Generation Z consumers are impulse buyers, followed by Millennials at 34% and Generation X at 32%.'],
      },
      {
        type: 'images',
        label: 'Research',
        images: [
          { src: 'think-twice/think_ideas_1.jpg', alt: 'Sticky notes from an ideas session' },
          { src: 'think-twice/think_user-personas_1.jpg', alt: 'Three user personas: a student with no job, a student with a part-time job, and a recent graduate' },
        ],
      },
      {
        type: 'text',
        heading: 'Personas',
        body: ['To guide our design decisions we developed three user personas, with the aim of helping young adults aged 18–24 with financial planning and saving.'],
      },
      {
        type: 'text',
        heading: 'Paper prototyping',
        body: ['Key insights:'],
        list: [
          'Incorporate a goal-setting feature at the beginning of the app to increase audience retention.',
          'Use live reactions rather than full text responses.',
        ],
      },
      {
        type: 'video',
        label: 'Paper prototyping',
        videos: [{ vimeo: '930220535', title: 'Paper prototyping', ratio: 1 / 0.6081 }],
      },
      {
        type: 'video',
        label: 'User flows',
        videos: [
          { vimeo: '930211778', title: 'Primary user flow', ratio: 1.6 },
          { vimeo: '930212196', title: 'Friend’s user flow', ratio: 1.6 },
        ],
      },
    ],
  },
  {
    slug: 'jupiter-heating',
    title: 'Jupiter Heating Solutions',
    client: 'Jupiter Heating Solutions',
    year: '',
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
  {
    slug: 'stories-for-the-road',
    title: 'Stories for the Road',
    client: 'Independent project',
    year: '',
    disciplines: ['Digital service', 'Type design', 'Community'],
    summary: 'A digital service exploring how technology can help cyclists build community and take back ownership of the roads through shared recommendations, encouragement and stories.',
    description: [
      'A digital service exploring how technology can help cyclists build community and take back ownership of the roads through shared recommendations, encouragement and stories.',
    ],
    cover: 'stories/stories-cover_1.jpg',
    alt: 'Stories for the Road homepage with a recommendation for Mountbatten break water',
    blocks: [
      {
        type: 'images',
        label: 'The service',
        images: [
          { src: 'stories/homepage-1.jpg', alt: 'Homepage showing a recommendation for Mountbatten break water over a dusk photo' },
          { src: 'stories/directory-1.jpg', alt: 'Directory of recommendations and encouragements with photos of cafés and roads' },
        ],
      },
    ],
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);

// Every image a project uses (cover first), for tests and tooling.
export const projectImages = (project) => [
  project.cover,
  ...project.blocks.filter((block) => block.type === 'images').flatMap((block) => block.images.map((image) => image.src)),
];
