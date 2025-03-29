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
import { Button } from "@/components/ui/button";

const GalleryDetails = () => {
  const { location } = useParams<{ location: string }>();
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryTitle, setGalleryTitle] = useState<string>("");
  const [galleryDescription, setGalleryDescription] = useState<string>("");
  // Add language state
  const [language, setLanguage] = useState<'en' | 'cn'>('en');
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
  
  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'cn' : 'en');
  };
  
  useEffect(() => {
    // Determine which images to show based on location param
    if (!location) return;
    
    const locationMap: Record<string, { 
      title: string, 
      titleCN: string,
      images: string[], 
      description: string,
      descriptionCN: string 
    }> = {
      'banff': { 
        title: 'Banff', 
        titleCN: '班夫',
        images: banffImages, 
        description: `Some moments feel like they belong to another world — too perfect, too breathtaking to be real. That morning at Moraine Lake was one of them. The sky slowly blushed in soft pinks and golds, the glassy water reflecting the ten towering peaks like a dream. Wrapped in the crisp mountain air, still a little drowsy from our night of camping near Lake Louise, we stood together, watching the world wake up. Then, he turned to me and got down on one knee. In that quiet, endless moment, it was just us, the mountains, and the promise of forever.

        The rest of the trip was a blur of adventure. Winding roads from Banff to Jasper, French dinners after long hikes, and the view of snow-covered mountains stretching endlessly beyond us through the hotel room window. And then, of course, COVID hit us right after. But even through fevers and exhaustion, we laughed, reminisced, and held onto the magic of that trip.
        
        This was the beginning of our forever.`,
        descriptionCN: `有些瞬间美好得恍如异世——太过完美，令人屏息到难以置信。梦莲湖的晨曦便是这样的存在。当粉金朝霞在天际晕染，十座雪峰倒映在明镜般的湖面，我们在清冽的山岚中相拥而立。昨夜露易丝湖畔的露营凉意未褪，晨雾中仍带着几分睡眼惺忪，却见证着天地初醒的奇迹。就在万物屏息之际，他忽然单膝跪地，群山为证，许下承诺。

班夫到贾斯珀的九曲冰原大道，每一道转弯都藏着惊喜；徒步后的法式晚餐里，刀叉轻碰烛光摇曳；酒店窗前延展的雪山银链，将我们的剪影拓进亘古风景。即便后来疫情裹挟着高烧来袭，那些浸透笑语的回忆，始终是暗夜中最温暖的光。

这山河为证的爱情，便是我们故事的开端。`
      },
      'la': { 
        title: 'Los Angeles', 
        titleCN: '洛杉矶',
        images: laImages, 
        description: `If there's one way to celebrate a first anniversary, it's by eating our way through Disneyland. Rides? Fun. But the real adventure? Tasting everything we could get our hands on — except we didn't stop at Disney food. Oh no, we treated ourselves to Korean BBQ and Sichuan cuisine that had us sweating and smiling at the same time. By the time we left, we were full, slightly delirious, and somehow still ready for a nighttime city walk.

The next day was our anniversary photoshoot at Pasadena City Hall, and here's where things got interesting — my makeup artist? My husband. After months of practice (and a few questionable early attempts), he finally nailed it. Honestly, it was one of his proudest achievements, and I have to admit, he did a great job. If engineering doesn't work out, there's always the beauty industry.

After the shoot, we wrapped up the perfect weekend the only way we know how — boba and hotpot, obviously. Simple, fun, and very us.`,
        descriptionCN: `庆祝周年最好的方式，或许就是回到我们最熟悉的模样。在迪士尼疯玩，拍照，啃完汉堡后，我们选择专门打车去吃韩国烤肉。夜深时消食散步，没有对流浪汉的恐惧，街角排长队的冰淇淋意外成了当日最佳彩蛋。

第二天我们在帕萨迪纳市政厅拍照。学习化妆半年后他给我画出了迄今最满意的妆容，开玩笑说以后还能失业再就业。

收尾照例是火锅配奶茶。玻璃窗上的雾气歪歪扭扭画着"365"，像我们永远对不齐的作息表。`
      },
      'to': { 
        title: 'Toronto', 
        titleCN: '多伦多',
        images: toImages, 
        description: `Our wedding wasn't in a grand hall or a faraway destination — it was in the backyard of his childhood home, a place filled with love long before we ever stood there as bride and groom. His parents had spent months growing fresh grass and planting flowers, making sure everything felt just right for the day we said, "I do." The air smelled of early autumn, and fallen leaves crunched softly under our feet as we celebrated with the people who mattered most.

After the vows, we traded fancy shoes for something simpler — canoes. Paddling through the quiet river near Lake Ontario, we let the golden sunset reflect off the water, soaking in the first moments of married life. No rush, no noise — just us, the ripples in the water, and the warmth of a September evening.

The adventure didn't stop there. We packed our bags for a road trip to Quebec, winding through small towns, chasing the last colors of summer. And, of course, we made a stop at Niagara Falls, standing side by side as the roar of the water reminded us how big and unpredictable life can be.
It was a wedding, a road trip, and a new beginning — all in one. And looking back, we wouldn't have had it any other way.`,
        descriptionCN: `我们的婚礼不在恢弘殿堂或异国海岛——在他从小长大的后院，这块草坪早被岁月浸透了温情。爸爸妈妈提前半年重新铺草，鲜花在九月初的风里开得正好。落叶在我们与至亲碰杯时发出细碎声响，像大地在轻轻鼓掌。

仪式后我们褪去皮鞋，开上小跑车，划着独木舟漂进安大略湖的支流。金橙色波光在桨尖流转，九月的风裹着松香灌满衣袖。没有交响乐团与香槟塔，只有船尾惊起的白鹭，差点撞上的芦苇丛，对岸钓鱼的老头朝我们挥了挥啤酒罐。

沿着圣劳伦斯河自驾漫游，穿越藏着古董店的小镇，收集夏日最后的余温。当然少不了在尼亚加拉瀑布前驻足，如同预演未来人生里所有突如其来的风雨。
这就是我们的婚礼，带着草屑、引擎声和所有不完美的完美。`
      },
      'pa': { 
        title: 'Paris', 
        titleCN: '巴黎',
        images: paImages, 
        description: `The moment I met KC, I knew he was the one who had to capture our two-year anniversary photos. We were lucky to shoot just one day after his vacation — that's the only time that worked for us, and we were grateful he was kind enough to fit us in. Everything was meticulously planned for us, from the dress to the makeup to the perfect location. It even turned out to be a spot with pillars, almost identical to where we'll hold our vow renewal in 2025.

The catch? We had to wake up at 3 AM for makeup. You can probably guess who looked a little sleepy in the photos. But KC was an absolute pro, guiding me through every step and helping me take the most natural photos I've ever had. I can already picture him shooting our future anniversary photos — maybe for our 5-year, 8-year, who knows? I can't wait for more memories with him behind the camera, from his aesthetic suggestions to his guidance, his talks, and his ethics. He truly knows how to make the experience special.

After the shoot, we hopped on a train and made our way to Marseille, Nice, and Lyon. The coastline views were breathtaking, and we dove into the sea, soaked up the sun on the sand, and of course, ate a lot of pizza. The road trip was the perfect ending to an unforgettable photoshoot.

Here's to more adventures, sleepy photoshoots, and pizza.`,
        descriptionCN: `当我认识KC那一刻，我就知道我一定会找他当我们的摄影师。在我死缠烂打下 (bushi)，我们很幸运赶上了他休假回来头一天。所有的细节都精心设计，从裙子到妆容到拍摄的场景。我们甚至拍到了和25年仪式一模一样的罗马柱，不知是巧合还是奇妙的默契。

后果就是当天凌晨三点起来化妆。你可以猜猜照片里谁看起来更困哈哈。但KC超级专业细心，连动作和表情都不需要我们来想。我们遇到很美的晨光正好洒向塞纳河畔——那个困到灵魂出窍的瞬间，他按下快门的时机比我本人更懂如何成为我。

收工后跳上开往里昂的火车，海岸线在取景框外铺展得更肆意。我们在里昂品尝美食，在马赛俯瞰落日，在尼斯跳进海里。尼斯的海水比想象中更冷，阳光却瞬间晒化了意大利冰淇淋。

在南法的艳阳里，想再一次当KC镜头里的女明星，也永远做你镜头里的美人鱼。`
      },
      'pan': { 
        title: 'Paris Night', 
        titleCN: '巴黎夜景',
        images: panImages, 
        description: `By the third day in Paris, we had settled into our favorite routine — shopping, wandering the city streets, and sampling every delicious food we could find. We didn't watch the Olympics, but we got to witness something just as exciting: people running the marathon right by the Seine while we were out for our photoshoot. There was something magical about the energy in the air, the lights from the Eiffel Tower twinkling as the city hummed with life. 

That night was relaxed and laid-back. We strolled along the river, taking in the view of the iconic tower as it lit up against the dark sky. And, of course, the food adventure didn't stop. He told me the best pho was in Paris, not Vietnam, so we ventured out to a little spot far from the usual tourist paths — Pho Tai. It was well worth the trek. A steaming bowl of pho that truly lived up to the hype. These little moments made our Paris trip unforgettable. Exploring the city, indulging in food, and sharing quiet nights in one of the most vibrant cities in the world.`,
        descriptionCN: `在巴黎的第三天，我们继续着熟悉的活动：购物，散步，尝尽一切美食。没看成奥运会，倒是在拍摄那晚碰见了塞纳河畔的闭幕马拉松。铁塔的灯光在十点准时闪烁，整座城市弥漫着浪漫的味道。

他告诉我，最好的越南粉不在越南，而在巴黎。我们远离闹市来到了十三区的小巷，成为本次旅行最明智的反叛。铁塔不会告诉你转角越南河粉店蒸汽氤氲的玻璃窗后，藏着比明信片更鲜活的巴黎。`
      }
    };
    
    const gallery = locationMap[location] || { title: 'Gallery', titleCN: '画廊', images: [], description: "", descriptionCN: "" };
    setGalleryImages(gallery.images);
    // Set title and description based on current language
    setGalleryTitle(language === 'en' ? gallery.title : gallery.titleCN);
    setGalleryDescription(language === 'en' ? gallery.description : gallery.descriptionCN);
  }, [location, language]); // Add language as dependency
  
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
          <div className="relative mb-4">
            <Heading as="h1" size="6" className="text-center">{galleryTitle}</Heading>
            <div className="absolute bottom-0 right-0">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleLanguage}
                className="ghost-button text-xs h-7"
              >
                {language === 'en' ? '中文' : 'EN'}
              </Button>
            </div>
          </div>
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
                "bg-transparent overflow-hidden mb-4 break-inside-avoid inline-block w-full",
                visibleImages[imageIndex] ? 'animate-carousel-fade-in' : 'opacity-0',
                getColumnCount() === 1 ? 'rounded-none' : 'rounded-lg'
              )}
            >
              <img 
                src={image} 
                alt={`${galleryTitle} ${imageIndex + 1}`}
                className={`w-full h-auto object-contain`}
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
            <Text size="4" color="gray">
              {language === 'en' ? 'No images found for this gallery.' : '没有找到此画廊的图片。'}
            </Text>
          </Box>
        )}
      </Container>
    </Section>
  );
};

export default GalleryDetails;
