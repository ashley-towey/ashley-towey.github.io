// BASE_URL is '/preview/' until cutover, then '/'.
export const base = import.meta.env.BASE_URL;
export const basename = base.replace(/\/$/, '');
export const imageUrl = (path) => `${basename}/portfolio/${path}`;
export const projectPath = (slug) => `/work/${slug}/`;
