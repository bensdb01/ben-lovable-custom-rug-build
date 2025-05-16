
import React from "react";
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

// Material card component for displaying material options
const MaterialCard = ({ name, description, onSelect }: MaterialCardProps) => {
  return (
    <div 
      className="w-full max-w-[300px] mx-auto sm:max-w-none sm:w-auto md:max-w-[320px] lg:max-w-[280px] xl:max-w-[300px] 2xl:max-w-[320px] border p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 flex flex-col h-full"
      onClick={onSelect}
    >
      <h3 className="font-medium text-base sm:text-lg">{name}</h3>
      <p className="text-sm text-gray-500 mt-1 flex-grow">{description}</p>
    </div>
  );
};

export default MaterialCard;
