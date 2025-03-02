import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Heart, Menu } from "lucide-react";
import { Flex, Container } from "@radix-ui/themes";

const MainLayout = () => {
  console.log("MainLayout rendering");
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/our-story', label: '我们的故事' },
    { path: '/details', label: '婚礼详情' },
    { path: '/gallery', label: '照片集' },
    { path: '/rsvp', label: '回执' },
    { path: '/registry', label: '婚礼基金' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Desktop Fixed Header - Hidden on mobile */}
      <header className="bg-white fixed top-0 left-0 right-0 z-40 w-full hidden md:block">
        <Container>
          <div className="content-container">
            <Flex direction="row" justify="between" align="center" gap="4" py="4">
              <Flex align="center" gap="2">
                <Heart className="h-6 w-6 text-pink-500" />
                <h1 className="text-3xl font-light text-gray-900">Jiaying & Hao</h1>
              </Flex>
              
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.path}>
                      <Link to={item.path}>
                        <NavigationMenuLink 
                          className={cn(
                            navigationMenuTriggerStyle(),
                            location.pathname === item.path && "bg-accent text-accent-foreground",
                            "hover:bg-pink-50 hover:text-pink-600 focus:bg-pink-50 focus:text-pink-600"
                          )}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </Flex>
          </div>
        </Container>
      </header>
      
      {/* Mobile Header - Static (not fixed) */}
      <header className="bg-white shadow w-full md:hidden">
        <Container>
          <div className="content-container">
            <Flex direction="row" justify="center" align="center" py="4">
              <Flex align="center" gap="2">
                <Heart className="h-6 w-6 text-pink-500" />
                <h1 className="text-3xl font-light text-gray-900">Jiaying & Hao</h1>
              </Flex>
            </Flex>
          </div>
        </Container>
      </header>
      
      {/* Floating Mobile Menu Button - Fixed Position */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md bg-white hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-64 p-2 mt-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => document.body.click()} // Close dropdown after navigation
              >
                <DropdownMenuItem className={cn(
                  "my-1",
                  location.pathname === item.path && "bg-pink-50 text-pink-600 font-medium"
                )}>
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Add top padding on desktop to account for fixed header */}
      <div className="hidden md:block h-[72px]"></div>
      
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 w-full">
        <Container>
          <div className="content-container">
            <Flex direction="column" align="center" gap="2" className="text-gray-500">
              <p>Jiaying & Hao's 3 Year Vow Renewal</p>
              <p>May 15, 2025 • Grand Island Mansion, California</p>
            </Flex>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout; 