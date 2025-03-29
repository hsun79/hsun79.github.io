import { Heading, Text, Section, Flex, Box } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { imageCollections, laCover } from "@/lib/imageUtils";
import { useMediaQuery } from "react-responsive";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});
  
  // Flatten the collections into a single array for the alternating layout
  const collections = [
    { slug: "banff", title: "A Sunrise Promise", description: "Banff, July 2022" },
    { slug: "to", title: "A Backyard Wedding", description: "Toronto, September 2022" },
    { slug: "la", title: "Disney, Makeup, and Food Adventures", description: "LA, September 2023", cover: laCover },
    { slug: "pa", title: "Photos, Pillars, and an Unforgettable Road Trip", description: "Paris, September 2024" },
    { slug: "pan", title: "Marathon, Pho, and the Eiffel Tower", description: "Paris, September 2024" },
  ];

  // Create a map to reference collection images by their slug
  const collectionMap: Record<string, {images: string[]}> = {};
  
  // Populate the map with image arrays from imageCollections
  Object.entries(imageCollections).forEach(([key, images]) => {
    collectionMap[key] = { images };
  });

  // Track which images are in view
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});
  // Create refs for each image container
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set up intersection observer to detect when images enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Get the index from the data attribute
          const index = parseInt(entry.target.getAttribute('data-index') || '-1');
          if (index >= 0) {
            setVisibleImages(prev => ({
              ...prev,
              [index]: entry.isIntersecting
            }));
            
            // Once it's been seen, we can stop observing
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    // Observe all image containers
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-index', index.toString());
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [collections.length]);

  return (
    <Section size="3">
        <Flex direction="column" align="center" gap="6" mb="8">
          <Heading size="8" align="center">Our Journey</Heading>
          <Text size="3" align="center" className="text-gray-600 max-w-2xl">
            A visual diary of our adventures together across the world.
          </Text>
        </Flex>

        <Flex justify="center" align="center">

        <Box className="space-y-24 w-full">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0;
            const photoCollection = collectionMap[collection.slug];
            if (!photoCollection) return null;
            
            // For mobile, always stack vertically with text above image
            return (
              <Box key={index} className="w-full">
                {/* Desktop layout - alternating */}
                <Flex 
                  direction={{ initial: "column", md: isEven ? "row" : "row-reverse" }} 
                  gap={{ initial: "4", md: "9" }}
                  align={{ initial: "center", md: "center" }}
                  className="w-full"
                  ml={isMobile ? "0" : (isEven ? "4" : "0")} 
                  mr={isMobile ? "0" : (isEven ? "0" : "4")}
                >
                  {/* Text Section */}
                  <Box className={`w-full md:w-1/2 ${isMobile ? 'text-center' : (isEven ? 'text-right' : 'text-left')}`}>
                    <Link 
                      to={`/gallery/${collection.slug}`}
                      className="inline-block text-pink-600 hover:text-pink-800 transition-colors"
                    >
                      <Heading size={isMobile ? "5" : "8"} mb="4" className="text-gray-500">
                        {collection.title}
                      </Heading>
                      <Text size={isMobile ? "2" : "4"} className="text-gray-600 mb-6 whitespace-pre-wrap">
                        {collection.description}
                      </Text>
                    </Link>
                  </Box>
                  
                  {/* Image Section */}
                  <Box className="w-full">
                    <Link to={`/gallery/${collection.slug}`}>
                      <Box 
                        ref={el => { imageRefs.current[index] = el; }}
                        className={cn(
                          "aspect-w-4 aspect-h-3 overflow-hidden shadow-md transition-transform duration-300 hover:scale-103 hover:shadow-lg",
                          visibleImages[index] ? 'animate-carousel-fade-in' : 'opacity-0'
                        )}
                      >
                        {photoCollection.images && photoCollection.images.length > 0 ? (
                          <img 
                            src={collection.cover || photoCollection.images[0]} 
                            alt={collection.title}
                            className="w-full h-full object-cover max-h-[680px]"
                          />
                        ) : (
                          <Flex align="center" justify="center" height="100%" className="bg-gray-100">
                            <Text color="gray">照片敬请期待</Text>
                          </Flex>
                        )}
                      </Box>
                    </Link>
                    <Text size="2" mt="2" align="center" className="text-gray-500">
                      {photoCollection.images.length} photos
                    </Text>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Section>
  );
};

export default Gallery; 