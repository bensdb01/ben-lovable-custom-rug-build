
import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

interface MaterialCardProps {
  name: string;
  description: string;
  image: string;
  features: string[];
  delay: number;
  onSelect?: () => void;
  colors?: { name: string; hex: string }[];
}

const MaterialCard = ({ name, description, image, features, delay, onSelect, colors = [] }: MaterialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollAnimation delay={delay}>
      <div 
        className="group relative overflow-hidden rounded-xl border border-border/50 bg-white transition-all duration-300 h-full hover:shadow-material"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-xl md:text-2xl mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          
          {/* Show color swatches if available */}
          {colors && colors.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">{colors.length} colors available</p>
              <div className="flex flex-wrap gap-1">
                {colors.slice(0, 5).map((color, idx) => (
                  <div 
                    key={idx} 
                    className="w-6 h-6 rounded-full border border-gray-200" 
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {colors.length > 5 && (
                  <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-xs bg-gray-100">
                    +{colors.length - 5}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <ul className="space-y-2 mt-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-baseline gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0 mt-1"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div 
          onClick={onSelect}
          className={`absolute bottom-0 left-0 right-0 bg-secondary text-white text-center py-3 text-sm transition-transform duration-300 cursor-pointer ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          Choose {name}
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default MaterialCard;
