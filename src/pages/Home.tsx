import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flex, Text, Box, Section, Heading } from "@radix-ui/themes";
import { Hero } from "@/components/ui/hero";
import { useMediaQuery } from "react-responsive";
import SimpleImageCarousel from "@/components/ui/SimpleImageCarousel";
import { heroImages, featuredCollection } from "@/lib/imageUtils";
import { useState, useEffect } from "react";

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
  const [heroImageDisplay, setHeroImageDisplay] = useState(heroImages.desktop);
  const isMobile = useMediaQuery(
    {query: '(max-width: 768px)'}
  );
  
  useEffect(() => {
    setHeroImageDisplay(isMobile ? heroImages.mobile : heroImages.desktop);
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
              {/* <Box className="text-center">
                <Heading as="h1" size="8" weight="light" className="libre-baskerville-regular text-gray-800">Kristen & Hao</Heading>
                <Heading as="h2" size="6" weight="light" className="libre-baskerville-regular text-gray-700 mt-2">3 Year Vow Renewal</Heading>
                <Text size="5" className="libre-baskerville-regular text-gray-600 mt-2 block">May 15, 2025 • Grand Island Mansion, California</Text>
              </Box> */}
              
              <Flex direction="column" align="center" gap="9">
                {featuredCollection.map((collection) => {
                  return (<Box className="w-full animate-fade-in-up opacity-0">
                    <Flex direction="column" align="center" gap="9">
                      <SimpleImageCarousel 
                        images={collection.images}
                        height={isMobile ? "240px" : "600px"}
                        className="w-full"
                      />
                      <Link to={`/gallery/${collection.slug}`}>
                        <Text size="5" align="center" className="text-pink-600">{collection.title}</Text>
                      </Link>
                    </Flex>
                  </Box>)
                })}
              </Flex>
 
              
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