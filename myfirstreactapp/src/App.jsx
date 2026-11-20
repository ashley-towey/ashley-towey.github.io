// Global styles load first so page and component styles can build on them.
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import RouteEffects from './components/RouteEffects';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

// Rendered inside a router: BrowserRouter in the browser (main.jsx),
// StaticRouter when prerendering (entry-server.jsx), MemoryRouter in tests.
export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link caption-1" href="#main">Skip to content</a>
      <RouteEffects />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
