import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flex, Text, Box, Container, Section, Heading } from "@radix-ui/themes";
import { Hero } from "@/components/ui/hero";
import heroImage from "@/assets/images/home_desktop.jpg";
import heroImageMobile from "@/assets/images/home_mobile.jpg";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import SimpleImageCarousel from "@/components/ui/SimpleImageCarousel";
import DSC01511 from "@/assets/images/DSC01511.jpg";
import DSC01519 from "@/assets/images/DSC01519.jpg";
import DSC01559 from "@/assets/images/DSC01559.jpg";
import DSC01569 from "@/assets/images/DSC01569.jpg";
import DSC01679 from "@/assets/images/DSC01679.jpg";
import DSC01687 from "@/assets/images/DSC01687.jpg";
import DSC01696 from "@/assets/images/DSC01696.jpg";
import DSC01756 from "@/assets/images/DSC01756.jpg";
import DSC01762 from "@/assets/images/DSC01762.jpg";
import DSC01793 from "@/assets/images/DSC01793.jpg";
import DSC01918 from "@/assets/images/DSC01918.jpg";
import DSC02042 from "@/assets/images/DSC02042.jpg";
import DSC02173 from "@/assets/images/DSC02173.jpg";
import DSC02418 from "@/assets/images/DSC02418.jpg";
import DSC02439 from "@/assets/images/DSC02439.jpg";
import DSC02482 from "@/assets/images/DSC02482.jpg";
import DSC02551 from "@/assets/images/DSC02551.jpg";
import DSC02604 from "@/assets/images/DSC02604.jpg";
import DSC02653 from "@/assets/images/DSC02653.jpg";
import DSC02681 from "@/assets/images/DSC02681.jpg";
import DSC02715 from "@/assets/images/DSC02715.jpg";
import DSC02735 from "@/assets/images/DSC02735.jpg";
import DSC02740 from "@/assets/images/DSC02740.jpg";
import DSC02754 from "@/assets/images/DSC02754.jpg";
import DSC02773 from "@/assets/images/DSC02773.jpg";
import DSC02877 from "@/assets/images/DSC02877.jpg";
import DSC02946 from "@/assets/images/DSC02946.jpg";
import DSC02965 from "@/assets/images/DSC02965.jpg";
import DSC03003 from "@/assets/images/DSC03003.jpg";
import IMG_1919 from "@/assets/images/IMG_1919.jpg";
import IMG_1920 from "@/assets/images/IMG_1920.jpg";

// You can create a Logo component or use an image
const Logo = () => (
  <div className="text-center px-4 py-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg">
    <h1 className="text-5xl md:text-6xl libre-baskerville-regular tracking-wider text-white mb-4 drop-shadow-lg">
      Kristen & Hao
    </h1>
    <p className="text-lg md:text-xl tracking-wide text-white drop-shadow-md">
      May 15, 2025 • Grand Island Mansion, California
    </p>
    <div className="mt-8">
      <Link to="/rsvp">
        <Button size="lg" className="bg-white text-black hover:bg-pink-50 font-light tracking-wider">
          RSVP Now
        </Button>
      </Link>
    </div>
  </div>
);

// You can replace this with your actual wedding photo URL
const Home = () => {
  const [heroImageDisplay, setHeroImageDisplay] = useState(heroImage);
  const isMobile = useMediaQuery(
    {query: '(max-width: 768px)'}
  );
  useEffect(() => {
    setHeroImageDisplay(isMobile ? heroImageMobile : heroImage);
  }, [isMobile]);

  return (
    <div className="w-full">
      <Hero 
        image={heroImageDisplay}
        height="90vh"
        overlayContent={<Logo />}
      />
      
      <div className="w-full bg-pink-50 py-16">
        <div className="content-container">
          <Heading as="h2" size="6" weight="light" align="center" className="text-pink-800">
            3 Year Vow Renewal
          </Heading>
          <Text align="center" size="5" className="text-pink-600 mt-2">
            Join us as we celebrate our journey
          </Text>
        </div>
      </div>
      
      <Section size="3" className="w-full">
        <div className="w-full">
          <div className="py-8">
            <Flex direction="column" align="center" gap="6">
              <Box className="text-center">
                <Heading as="h1" size="8" weight="light" className="libre-baskerville-regular text-gray-800">Kristen & Hao</Heading>
                <Heading as="h2" size="6" weight="light" className="libre-baskerville-regular text-gray-700 mt-2">3 Year Vow Renewal</Heading>
                <Text size="5" className="libre-baskerville-regular text-gray-600 mt-2 block">May 15, 2025 • Grand Island Mansion, California</Text>
              </Box>
              
              <Box className="w-full">
                <div className="bg-gray-100">
                  <div className="">
                    <SimpleImageCarousel 
                      images={[
                        DSC01511,
                        DSC01519,
                        DSC01559,
                        DSC01569,
                        DSC01679,
                        DSC01687,
                        DSC01696,
                        DSC01756,
                        DSC01762,
                        DSC01793,
                        DSC01918,
                        DSC02042,
                        DSC02173,
                        DSC02418,
                        DSC02439,
                        DSC02482,
                        DSC02551,
                        DSC02604,
                        DSC02653,
                        DSC02681,
                        DSC02715,
                        DSC02735,
                        DSC02740,
                        DSC02754,
                        DSC02773,
                        DSC02877,
                        DSC02946,
                        DSC02965,
                        DSC03003,
                        IMG_1919,
                        IMG_1920
                      ]}
                      height={isMobile ? "440px" : "600px"}
                      className="w-full"
                    />
                  </div>
                </div>
              </Box>
              
              <Text size="5" align="center" className="max-w-2xl">
                我们诚挚地邀请您加入我们的三周年誓言更新庆典，与我们一同庆祝这段美好的旅程。
              </Text>
              
              <Flex gap="4" mt="4" direction={{initial: 'column', sm: 'row'}} align="center">
                <Link to="/rsvp">
                  <Button size="lg" className="w-full sm:w-auto">
                    RSVP
                  </Button>
                </Link>
                
                <Link to="/details">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    了解详情
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home; 