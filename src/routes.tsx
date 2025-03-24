import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Details from './pages/Details';
import OurStory from './pages/OurStory';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import Registry from './pages/Registry';
import GalleryDetails from './pages/GalleryDetails';

// Get the base URL from Vite
const baseUrl = import.meta.env.BASE_URL || '/';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "our-story", element: <OurStory /> },
      { path: "details", element: <Details /> },
      { path: "gallery", element: <Gallery /> },
      { path: "rsvp", element: <RSVP /> },
      { path: "registry", element: <Registry /> },
      { path: "gallery/:location", element: <GalleryDetails /> },
    ],
  },
], {
  basename: baseUrl === '/' ? '' : baseUrl
});

export default router; 