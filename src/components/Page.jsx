// Every route renders its content in <Page> so the skip link and the
// focus-on-navigate behaviour have a single, consistent target.
export default function Page({ className, children }) {
  return (
    <main id="main" tabIndex={-1} className={className}>
      {children}
    </main>
  );
}
