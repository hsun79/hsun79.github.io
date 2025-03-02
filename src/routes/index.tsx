import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import OurStory from '../pages/OurStory';
import Details from '../pages/Details';
import Gallery from '../pages/Gallery';
import RSVP from '../pages/RSVP';
import Registry from '../pages/Registry';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'our-story',
        element: <OurStory />,
      },
      {
        path: 'details',
        element: <Details />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'rsvp',
        element: <RSVP />,
      },
      {
        path: 'registry',
        element: <Registry />,
      },
    ],
  },
]);

export default router; 