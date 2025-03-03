import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type MenuHoverCardProps = {
  triggerText?: string;
}

const translations = {
  en: {
    menuOptions: "Menu Options",
    option1: {
      title: "Red Wine Braised Short Ribs",
      description: "Creamy Stone Ground Polenta, Wilted Tatsoi Spinach, Crispy Shallots, Natural Jus"
    },
    option2: {
      title: "Pan Seared Filet of Salmon",
      description: "Served with Fresh Pineapple, Mango Salsa & Rice Pilaf"
    },
    option3: {
      title: "Vegetarian Napoleon",
      description: "Fresh Grilled Eggplant, Zucchini, Squash, Bell Peppers, Portabello Mushrooms, Red Onion, with Verde Drizzle."
    }
  },
  cn: {
    menuOptions: "菜单",
    option1: {
      title: "红酒炖牛排",
      description: "奶油石磨玉米粥，嫩塔塔菠菜，香脆葱头，天然肉汁"
    },
    option2: {
      title: "香煎三文鱼",
      description: "配新鲜菠萝，芒果莎莎酱和米饭"
    },
    option3: {
      title: "素食拿破仑",
      description: "新鲜烤茄子，西葫芦，南瓜，彩椒，波特菇，红洋葱，配青酱"
    }
  }
};

const MenuHoverCard = ({}: MenuHoverCardProps) => {
  const [language, setLanguage] = useState<'en' | 'cn'>('en');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'cn' : 'en');
  };
  
  const t = translations[language];
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-1 cursor-help">
          <InfoIcon className="h-4 w-4 text-[color:var(--button-background)]" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 bg-[color:var(--accent-background)] border border-[color:var(--accent-details)]">
      <div className="flex justify-between items-center mb-2">
          <div className="w-[60px]"></div> {/* Empty div with same width as button */}
            <h4 className="font-semibold text-[color:var(--primary-headings)]">{t.menuOptions}</h4>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLanguage();
              }}
              className="h-7 text-xs ghost-button w-[60px]"
            >
              {language === 'en' ? 'CN' : 'EN'}
            </Button>
          </div>
        <div className="space-y-3">
          <div>
            <p className="font-bold">{t.option1.title}</p>
            <p className="text-sm">{t.option1.description}</p>
          </div>
          <div>
            <p className="font-bold">{t.option2.title}</p>
            <p className="text-sm">{t.option2.description}</p>
          </div>
          <div>
            <p className="font-bold">{t.option3.title}</p>
            <p className="text-sm">{t.option3.description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MenuHoverCard; 