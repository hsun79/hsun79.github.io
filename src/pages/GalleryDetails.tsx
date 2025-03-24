import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import { Heading, Text, Container, Section, Box } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { 
  banffImages, 
  laImages, 
  toImages, 
  paImages, 
  panImages 
} from "@/lib/imageUtils";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const GalleryDetails = () => {
  const { location } = useParams<{ location: string }>();
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryTitle, setGalleryTitle] = useState<string>("");
  const [galleryDescription, setGalleryDescription] = useState<string>("");
  // Track which images are in view
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});
  // Create refs for each image container
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Responsive column counts
  const isXL = useMediaQuery({ query: '(min-width: 1440px)' });
  const isLG = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMD = useMediaQuery({ query: '(min-width: 819px)' });
  
  const getColumnCount = () => {
    if (isXL) return 4;
    if (isLG) return 3;
    if (isMD) return 2;
    return 1;
  };
  
  useEffect(() => {
    // Determine which images to show based on location param
    if (!location) return;
    
    const locationMap: Record<string, { title: string, images: string[], description: string }> = {
      'banff': { title: 'Banff', images: banffImages, description: `Some moments feel like they belong to another world — too perfect, too breathtaking to be real. That morning at Moraine Lake was one of them. The sky slowly blushed in soft pinks and golds, the glassy water reflecting the ten towering peaks like a dream. Wrapped in the crisp mountain air, still a little drowsy from our night of camping near Lake Louise, we stood together, watching the world wake up. Then, he turned to me and got down on one knee. In that quiet, endless moment, it was just us, the mountains, and the promise of forever.

        The rest of the trip was a blur of adventure. Winding roads from Banff to Jasper, French dinners after long hikes, and the view of snow-covered mountains stretching endlessly beyond us through the hotel room window. And then, of course, COVID hit us right after. But even through fevers and exhaustion, we laughed, reminisced, and held onto the magic of that trip.
        
        This was the beginning of our forever.`},
      'la': { title: 'Los Angeles', images: laImages, description: `If there’s one way to celebrate a first anniversary, it’s by eating our way through Disneyland. Rides? Fun. But the real adventure? Tasting everything we could get our hands on — except we didn’t stop at Disney food. Oh no, we treated ourselves to Korean BBQ and Sichuan cuisine that had us sweating and smiling at the same time. By the time we left, we were full, slightly delirious, and somehow still ready for a nighttime city walk.

The next day was our anniversary photoshoot at Pasadena City Hall, and here’s where things got interesting — my makeup artist? My husband. After months of practice (and a few questionable early attempts), he finally nailed it. Honestly, it was one of his proudest achievements, and I have to admit, he did a great job. If engineering doesn’t work out, there’s always the beauty industry.

After the shoot, we wrapped up the perfect weekend the only way we know how — boba and hotpot, obviously. Simple, fun, and very us.` },
      'to': { title: 'Toronto', images: toImages, description: `Our wedding wasn’t in a grand hall or a faraway destination — it was in the backyard of his childhood home, a place filled with love long before we ever stood there as bride and groom. His parents had spent months growing fresh grass and planting flowers, making sure everything felt just right for the day we said, “I do.” The air smelled of early autumn, and fallen leaves crunched softly under our feet as we celebrated with the people who mattered most.

After the vows, we traded fancy shoes for something simpler — canoes. Paddling through the quiet river near Lake Ontario, we let the golden sunset reflect off the water, soaking in the first moments of married life. No rush, no noise — just us, the ripples in the water, and the warmth of a September evening.

The adventure didn’t stop there. We packed our bags for a road trip to Quebec, winding through small towns, chasing the last colors of summer. And, of course, we made a stop at Niagara Falls, standing side by side as the roar of the water reminded us how big and unpredictable life can be.
It was a wedding, a road trip, and a new beginning — all in one. And looking back, we wouldn’t have had it any other way.
` },
      'pa': { title: 'Paris', images: paImages, description: `The moment I met KC, I knew he was the one who had to capture our two-year anniversary photos. We were lucky to shoot just one day after his vacation — that’s the only time that worked for us, and we were grateful he was kind enough to fit us in. Everything was meticulously planned for us, from the dress to the makeup to the perfect location. It even turned out to be a spot with pillars, almost identical to where we’ll hold our vow renewal in 2025.

The catch? We had to wake up at 3 AM for makeup. You can probably guess who looked a little sleepy in the photos. But KC was an absolute pro, guiding me through every step and helping me take the most natural photos I’ve ever had. I can already picture him shooting our future anniversary photos — maybe for our 5-year, 8-year, who knows? I can’t wait for more memories with him behind the camera, from his aesthetic suggestions to his guidance, his talks, and his ethics. He truly knows how to make the experience special.

After the shoot, we hopped on a train and made our way to Marseille, Nice, and Lyon. The coastline views were breathtaking, and we dove into the sea, soaked up the sun on the sand, and of course, ate a lot of pizza. The road trip was the perfect ending to an unforgettable photoshoot.

Here’s to more adventures, sleepy photoshoots, and pizza.` },
      'pan': { title: 'Paris Night', images: panImages, description: `By the third day in Paris, we had settled into our favorite routine — shopping, wandering the city streets, and sampling every delicious food we could find. We didn’t watch the Olympics, but we got to witness something just as exciting: people running the marathon right by the Seine while we were out for our photoshoot. There was something magical about the energy in the air, the lights from the Eiffel Tower twinkling as the city hummed with life. 

That night was relaxed and laid-back. We strolled along the river, taking in the view of the iconic tower as it lit up against the dark sky. And, of course, the food adventure didn’t stop. He told me the best pho was in Paris, not Vietnam, so we ventured out to a little spot far from the usual tourist paths — Pho Tai. It was well worth the trek. A steaming bowl of pho that truly lived up to the hype. These little moments made our Paris trip unforgettable. Exploring the city, indulging in food, and sharing quiet nights in one of the most vibrant cities in the world.` }
    };
    
    const gallery = locationMap[location] || { title: 'Gallery', images: [], description: "" };
    setGalleryImages(gallery.images);
    setGalleryTitle(gallery.title);
    setGalleryDescription(gallery.description);
  }, [location]);
  
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

    // Wait for imageRefs to be populated
    setTimeout(() => {
      // Observe all image containers
      imageRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.setAttribute('data-index', index.toString());
          observer.observe(ref);
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [galleryImages.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  const columnCount = getColumnCount();
  
  return (
    <Section size="3">
      <Container size="4">
        <Box mb="6">
          <Link to="/gallery" className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            <Text size="2">Back to Galleries</Text>
          </Link>
        </Box>
        <div className="mb-6">
        <Heading as="h1" size="6" mb="6">{galleryTitle}</Heading>
        <Text size="3" className="libre-baskerville-regular-italic text-gray-600 whitespace-pre-wrap">{galleryDescription}</Text>
        </div>
        
        {/* CSS-based column layout instead of JavaScript distribution */}
        <div 
          className="w-full"
          style={{
            columnCount: columnCount,
            columnGap: '16px',
            columnWidth: '320px',
          }}
        >
          {galleryImages.map((image, imageIndex) => (
            <div 
              key={imageIndex}
              ref={el => { imageRefs.current[imageIndex] = el; }}
              className={cn(
                "bg-transparent rounded-xl overflow-hidden mb-4 break-inside-avoid inline-block w-full",
                visibleImages[imageIndex] ? 'animate-carousel-fade-in' : 'opacity-0'
              )}
            >
              <img 
                src={image} 
                alt={`${galleryTitle} ${imageIndex + 1}`}
                className="w-full h-auto object-contain rounded-lg" 
                loading="lazy"
                style={{
                  maxHeight: isMD ? '2560px' : '1440px'
                }}
              />
            </div>
          ))}
        </div>
        
        {galleryImages.length === 0 && (
          <Box className="py-12 text-center">
            <Text size="4" color="gray">No images found for this gallery.</Text>
          </Box>
        )}
      </Container>
    </Section>
  );
};

export default GalleryDetails;
