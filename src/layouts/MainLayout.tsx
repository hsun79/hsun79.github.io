import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import ScrollToTop from '@/components/ScrollToTop';

const MainLayout = () => {
  console.log("MainLayout rendering");
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Our Story", path: "/our-story" },
    { name: "Details", path: "/details" },
    { name: "Gallery", path: "/gallery" },
    { name: "RSVP", path: "/rsvp" },
    { name: "Registry", path: "/registry" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full font-[Libre_Baskerville]">
      <ScrollToTop />
      {/* Desktop Fixed Header - Hidden on mobile */}
      <header className="py-4 bg-[color:var(--primary-background)]">
        <div className="content-container">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl libre-baskerville-regular text-[color:var(--primary-headings)]">Kristen & Hao</Link>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  {/*  */}
                    <NavigationMenuLink asChild className={cn(
                      "px-4 py-2 text-base font-medium focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:outline-none",
                      location.pathname === item.path 
                        ? "text-[color:var(--button-background)] active font-bold"
                        : "text-[color:var(--primary-paragraphs)] hover:text-[color:var(--button-background-hover)]"
                    )}>
                      <Link to={item.path}>
                        {item.name}
                      </Link>
                      
                    </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenu>
            
            {/* Mobile menu button */}
            <div className="fixed top-4 right-4 z-50 md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-md bg-[color:var(--accent-background)] hover:bg-[color:var(--primary-details)] focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:outline-none">
                    <Menu className="h-6 w-6 text-[color:var(--primary-headings)]" />
                  </button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-64 p-2 mt-2 bg-[color:var(--accent-background)]">
                  {navItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path}
                      onClick={() => document.body.click()} // Close dropdown after navigation
                    >
                      <DropdownMenuItem className={cn(
                        "my-1 text-base focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:outline-none",
                        location.pathname === item.path && "active dropdown-menu-item bg-[color:var(--accent-background)] text-[color:var(--button-background)] font-bold"
                      )}>
                        {item.name}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="py-6 bg-[color:var(--primary-background)]">
        <div className="content-container text-center">
          <p className="text-[color:var(--primary-paragraphs)]">Kristen & Hao Wedding</p>
          <p className="text-[color:var(--primary-paragraphs)] opacity-70 text-sm">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 