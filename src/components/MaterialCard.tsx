
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
      className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50"
      onClick={onSelect}
    >
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default MaterialCard;
