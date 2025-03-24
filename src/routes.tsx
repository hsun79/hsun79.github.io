import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Details from './pages/Details';
// import OurStory from './pages/OurStory';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import Registry from './pages/Registry';
import GalleryDetails from './pages/GalleryDetails';
import RSVPResults from './pages/RSVPResults';

// Get the base URL from Vite
const baseUrl = import.meta.env.BASE_URL || '/';
// Check if in development mode
const isDev = import.meta.env.DEV;

// Define routes
const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: "our-story", element: <OurStory /> },
      { path: "gallery", element: <Gallery /> },
      { path: "details", element: <Details /> },
      { path: "rsvp", element: <RSVP /> },
      { path: "registry", element: <Registry /> },
      { path: "gallery/:location", element: <GalleryDetails /> },
    ],
  },
];

// Add admin route only in development mode
if (isDev) {
  routes[0].children.push({ path: "admin/rsvp-results", element: <RSVPResults /> });
}

const router = createBrowserRouter(routes, {
  basename: baseUrl === '/' ? '' : baseUrl
});

export default router; 