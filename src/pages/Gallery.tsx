import { Card as ShadcnCard, CardContent as ShadcnCardContent } from "@/components/ui/card";
import { Heading, Text, Container, Section, Grid, Flex, Box } from "@radix-ui/themes";

const Gallery = () => {
  // Placeholder for gallery images
  const seasons = [
    { name: "春季", images: [] },
    { name: "夏季", locations: ["Banff", "巴黎"] },
    { name: "秋季", locations: ["多伦多", "LA"] },
    { name: "冬季", images: [] },
  ];

  return (
    <Section size="3">
      <Container size="4">
        <Flex direction="column" align="center" gap="6">
          <Heading size="6" align="center">照片集</Heading>
          
          <Box className="space-y-12 w-full">
            {seasons.map((season, index) => (
              <Box key={index}>
                <Heading size="4" mb="4">{season.name}</Heading>
                
                {season.locations ? (
                  <Grid columns={{initial: "1", md: "2", lg: "3", xl: "4"}} gap="6">
                    {season.locations.map((location, locIndex) => (
                      <ShadcnCard key={locIndex}>
                        <ShadcnCardContent className="p-4">
                          <Heading size="3" mb="3">{location}</Heading>
                          <Box className="aspect-w-16 aspect-h-9 bg-gray-200 rounded">
                            <Flex align="center" justify="center" height="100%">
                              <Text color="gray">照片敬请期待</Text>
                            </Flex>
                          </Box>
                        </ShadcnCardContent>
                      </ShadcnCard>
                    ))}
                  </Grid>
                ) : (
                  <Grid columns={{initial: "1", md: "2", lg: "3"}} gap="6">
                    {[1, 2, 3].map((item) => (
                      <ShadcnCard key={item}>
                        <ShadcnCardContent className="p-4">
                          <Box className="aspect-w-16 aspect-h-9 bg-gray-200 rounded">
                            <Flex align="center" justify="center" height="100%">
                              <Text color="gray">照片敬请期待</Text>
                            </Flex>
                          </Box>
                        </ShadcnCardContent>
                      </ShadcnCard>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
          </Box>
        </Flex>
      </Container>
    </Section>
  );
};

export default Gallery; 