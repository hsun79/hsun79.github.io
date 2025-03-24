import { RouterProvider } from 'react-router-dom';
import router from './routes'; // Browser router
// import hashRouter from './routes-hash'; // Hash router - no longer needed
import './App.css'
import './theme-variables.css'; // Import theme variables
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './radix-theme.css'; // Import our theme overrides

function App() {
  console.log("App rendering");
  
  // Use browser router on Vercel
  const routerToUse = router;
  
  return (
    <div className="w-full overflow-hidden m-0 p-0" style={{ backgroundColor: 'var(--primary-background)' }}>
      {/* Configure Theme provider with our custom theme */}
      <Theme 
        accentColor="gray" 
        grayColor="sand" 
        radius="medium" 
        scaling="100%"
        className="font-['Libre_Baskerville']"
      >
        <RouterProvider router={routerToUse} />
      </Theme>
    </div>
  );
}

export default App;
