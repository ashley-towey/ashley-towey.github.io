// BASE_URL is '/' (set by `base` in vite.config.js).
export const base = import.meta.env.BASE_URL;
export const basename = base.replace(/\/$/, '');
export const imageUrl = (path) => `${basename}/portfolio/${path}`;
export const projectPath = (project) => `/work/${project.slug}/`;

// Generated image variants live next to each other as <name>-<width>.<ext>.
export const imageVariant = (path, width, ext) => imageUrl(`${path.replace(/\.[^.]+$/, '')}-${width}.${ext}`);
