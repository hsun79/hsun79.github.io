import { createHashRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Details from './pages/Details';
import OurStory from './pages/OurStory';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import Registry from './pages/Registry';

const hashRouter = createHashRouter([
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
]);

export default hashRouter; 