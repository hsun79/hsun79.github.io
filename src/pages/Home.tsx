import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Button as RadixButton, Flex, Text, Card, Box, Container, Section, Heading } from "@radix-ui/themes";
import { Hero } from "@/components/ui/hero";

// You can create a Logo component or use an image
const Logo = () => (
  <div className="text-center px-4 py-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg">
    <h1 className="text-5xl md:text-6xl font-light text-white mb-4 drop-shadow-lg">
      Jiaying & Hao
    </h1>
    <p className="text-lg md:text-xl text-white drop-shadow-md">
      May 15, 2025 • Grand Island Mansion, California
    </p>
    <div className="mt-8">
      <Link to="/rsvp">
        <Button size="lg" className="bg-white text-black hover:bg-pink-50">
          RSVP Now
        </Button>
      </Link>
    </div>
  </div>
);

// You can replace this with your actual wedding photo URL
const heroImage = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section with Parallax Effect */}
      <Hero 
        imageUrl={heroImage}
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
        <Container className="w-full">
          <div className="content-container py-8">
            <Flex direction="column" align="center" gap="6">
              <Box className="text-center">
                <Heading as="h1" size="8" weight="light" className="text-gray-800">Jiaying & Hao</Heading>
                <Heading as="h2" size="6" weight="light" className="text-gray-700 mt-2">3 Year Vow Renewal</Heading>
                <Text size="5" className="text-gray-600 mt-2 block">May 15, 2025 • Grand Island Mansion, California</Text>
              </Box>
              
              <Box className="w-full max-w-4xl">
                <div className="aspect-container bg-gray-200 rounded-lg">
                  {/* Main photo will go here */}
                  <div className="aspect-content">
                    <Text color="gray">照片敬请期待</Text>
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
              
              <Box mt="9" className="w-full max-w-xl">
                <Card size="3">
                  <Flex direction="column" gap="4" align="center" p="4">
                    <Heading size="5">Radix UI Themes Example</Heading>
                    <Text>这里展示了 Radix UI Themes 的组件样式</Text>
                    <Flex gap="4">
                      <RadixButton size="3" color="pink">Radix Button</RadixButton>
                      <RadixButton size="3" variant="outline">另一个样式</RadixButton>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
            </Flex>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Home; 