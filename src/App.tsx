import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './App.css'
import { Theme } from "@radix-ui/themes";

function App() {
  console.log("App rendering, router:", router);
  return (
    <div className="w-full overflow-hidden m-0 p-0">
      {/* Re-enable Theme provider */}
      <Theme accentColor="pink" grayColor="sand" radius="medium" scaling="100%">
        <RouterProvider router={router} />
      </Theme>
    </div>
  );
}

export default App;
