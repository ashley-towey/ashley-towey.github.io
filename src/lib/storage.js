// localStorage can be unavailable (private mode, blocked site data, SSR).
// These helpers fail quietly so callers can treat storage as a nicety.
export function readStored(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore: the choice still applies for this visit.
  }
}
