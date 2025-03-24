import { createHashRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Details from './pages/Details';
import OurStory from './pages/OurStory';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import Registry from './pages/Registry';
import RSVPResults from './pages/RSVPResults';

// Check if in development mode
const isDev = import.meta.env.DEV;

// Define routes
const routes = [
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
    ],
  },
];

// Add admin route only in development mode
if (isDev) {
  routes[0].children.push({ path: "admin/rsvp-results", element: <RSVPResults /> });
}

const hashRouter = createHashRouter(routes);

export default hashRouter; 