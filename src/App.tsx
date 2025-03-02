import { RouterProvider } from 'react-router-dom';
import router from './routes'; // Browser router
import hashRouter from './routes-hash'; // Hash router
import './App.css'
import { Theme } from "@radix-ui/themes";

function App() {
  console.log("App rendering");
  
  // Determine which router to use based on environment
  const isProduction = import.meta.env.PROD;
  const isGitHubPages = window.location.hostname === 'hsun79.github.io';
  
  // Use hash router in production on GitHub Pages
  const routerToUse = isProduction && isGitHubPages ? hashRouter : router;
  
  console.log("Using router:", isProduction && isGitHubPages ? "Hash Router" : "Browser Router");
  
  return (
    <div className="w-full overflow-hidden m-0 p-0">
      {/* Re-enable Theme provider */}
      <Theme accentColor="pink" grayColor="sand" radius="medium" scaling="100%">
        <RouterProvider router={routerToUse} />
      </Theme>
    </div>
  );
}

export default App;
