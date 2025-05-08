
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Info, ChevronRight, ChevronDown, X } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import FullScreenOverlay, { MaterialCategory } from "./FullScreenOverlay";
import MaterialCard from "./MaterialCard";

// Enhanced material categories with more colors and consistent structure
const materialCategories: MaterialCategory[] = [
  { 
    id: "jute", 
    name: "Jute", 
    description: "Soft, durable, and versatile natural fiber",
    ranges: [
      { 
        id: "jute-boucle", 
        name: "Jute Boucle", 
        description: "Textured loop weave with rich depth",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Bleached", hex: "#E8E4D9" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Wheat", hex: "#F5DEB3" },
          { name: "Sienna", hex: "#A0522D" },
          { name: "Moss", hex: "#8A9A5B" },
          { name: "Stone", hex: "#928E85" },
          { name: "Driftwood", hex: "#C4B6AB" },
          { name: "Amber", hex: "#FFBF00" },
          { name: "Clay", hex: "#BDB2A4" },
          { name: "Honey", hex: "#E6C17A" },
          { name: "Taupe", hex: "#483C32" },
          { name: "Slate", hex: "#708090" }
        ]
      },
      { 
        id: "jute-herringbone", 
        name: "Jute Herringbone", 
        description: "Classic zigzag pattern with timeless appeal",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Washed", hex: "#E6E6DC" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Sandy", hex: "#E0CDA9" },
          { name: "Caramel", hex: "#C19A6B" },
          { name: "Earth", hex: "#9F8170" },
          { name: "Flax", hex: "#EEDC82" },
          { name: "Straw", hex: "#E4D96F" },
          { name: "Raw", hex: "#BFB48F" },
          { name: "Gold", hex: "#D4AF37" },
          { name: "Suntan", hex: "#E3AB76" },
          { name: "Barley", hex: "#B5A642" },
          { name: "Hazelnut", hex: "#9E7A50" },
          { name: "Wheat", hex: "#F5DEB3" },
          { name: "Dune", hex: "#E1C699" }
        ]
      },
      { 
        id: "jute-panama", 
        name: "Jute Panama",
        description: "Simple basketweave with clean lines", 
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Bleached", hex: "#E8E4D9" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Beige", hex: "#F5F5DC" },
          { name: "Oatmeal", hex: "#E0DAB8" },
          { name: "Almond", hex: "#EFDECD" },
          { name: "Ecru", hex: "#F4F0CB" },
          { name: "Clay", hex: "#BDB2A4" },
          { name: "Rustic", hex: "#AE8F65" },
          { name: "Sandstone", hex: "#C9AE5D" },
          { name: "Macadamia", hex: "#DBC7AA" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Sisal", hex: "#D3BC8D" },
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Cream", hex: "#FFFDD0" }
        ]
      }
    ]
  },
  { 
    id: "sisal", 
    name: "Sisal", 
    description: "Strong, resilient fiber in 15 different colors and weaves",
    ranges: [
      { 
        id: "sisal-malay", 
        name: "Sisal Malay", 
        description: "Fine weave with subtle texture",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Bleached", hex: "#E8E4D9" },
          { name: "Pewter", hex: "#8A9A5B" },
          { name: "Graphite", hex: "#474B4E" },
          { name: "Ebony", hex: "#555D50" },
          { name: "Toffee", hex: "#A67B5B" },
          { name: "Almond", hex: "#EFDECD" },
          { name: "Cream", hex: "#FFFDD0" },
          { name: "Sage", hex: "#BCB88A" },
          { name: "Mink", hex: "#705B35" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Sandstorm", hex: "#ECD9A4" },
          { name: "Porcelain", hex: "#F6F2E8" },
          { name: "Cappuccino", hex: "#B49A84" },
          { name: "Olive", hex: "#808000" }
        ]
      },
      { 
        id: "sisal-boucle", 
        name: "Sisal Boucle", 
        description: "Looped texture with rich visual interest",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Limestone", hex: "#D3D3C5" },
          { name: "Steel", hex: "#71797E" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Dune", hex: "#E1C699" },
          { name: "Espresso", hex: "#4E3629" },
          { name: "Bisque", hex: "#FFE4C4" },
          { name: "Mushroom", hex: "#988F81" },
          { name: "Latte", hex: "#C8AD7F" },
          { name: "Ginger", hex: "#B87333" },
          { name: "Fossil", hex: "#D7D0C0" },
          { name: "Hazel", hex: "#AE8F65" },
          { name: "Parchment", hex: "#F6F0E0" },
          { name: "Mocha", hex: "#967969" },
          { name: "Chai", hex: "#B6A88B" }
        ]
      },
      { 
        id: "sisal-herringbone", 
        name: "Sisal Herringbone", 
        description: "Classic pattern with distinctive character",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Taupe", hex: "#483C32" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Antique", hex: "#FAEBD7" },
          { name: "Desert", hex: "#C19A6B" },
          { name: "Ash", hex: "#B2BEB5" },
          { name: "Bark", hex: "#8B7355" },
          { name: "Pearl", hex: "#F0EAD6" },
          { name: "Bronze", hex: "#CD7F32" },
          { name: "Clay", hex: "#BDB2A4" },
          { name: "Cocoa", hex: "#D2691E" },
          { name: "Bone", hex: "#E3DAC9" },
          { name: "Fawn", hex: "#E4C29F" },
          { name: "Flax", hex: "#EEDC82" }
        ]
      },
      { 
        id: "sisal-tigereye", 
        name: "Sisal Tigereye", 
        description: "Distinctive striping with bold texture",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Silver", hex: "#C0C0C0" },
          { name: "Bronze", hex: "#CD7F32" },
          { name: "Copper", hex: "#B87333" },
          { name: "Gold", hex: "#D4AF37" },
          { name: "Platinum", hex: "#E5E4E2" },
          { name: "Smoke", hex: "#738276" },
          { name: "Cinnamon", hex: "#D2691E" },
          { name: "Slate", hex: "#708090" },
          { name: "Buff", hex: "#F0DC82" },
          { name: "Mercury", hex: "#A3A9B1" },
          { name: "Amber", hex: "#FFBF00" },
          { name: "Pewter", hex: "#8A9A5B" },
          { name: "Burnished", hex: "#AA8736" },
          { name: "Gilded", hex: "#CFB53B" }
        ]
      }
    ]
  },
  { 
    id: "seagrass", 
    name: "Seagrass", 
    description: "Hardwearing, stain-resistant natural fiber",
    ranges: [
      { 
        id: "seagrass-herringbone", 
        name: "Seagrass Herringbone", 
        description: "Traditional pattern with natural sheen",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Olive", hex: "#808000" },
          { name: "Sage", hex: "#BCB88A" },
          { name: "Marsh", hex: "#A9A450" },
          { name: "Tan", hex: "#D2B48C" },
          { name: "Reed", hex: "#C5B358" },
          { name: "Khaki", hex: "#C3B091" },
          { name: "Malt", hex: "#DDBC8B" },
          { name: "Meadow", hex: "#8A9A5B" },
          { name: "Wheat", hex: "#F5DEB3" },
          { name: "Fern", hex: "#71A95A" },
          { name: "Willow", hex: "#9A8E51" },
          { name: "Forest", hex: "#4A7C59" },
          { name: "Moss", hex: "#8A9A5B" },
          { name: "Thatch", hex: "#B89C50" }
        ]
      },
      { 
        id: "seagrass-basketweave", 
        name: "Seagrass Basketweave", 
        description: "Classic woven pattern with robust texture",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Coastal", hex: "#C7C2AA" },
          { name: "Sand", hex: "#C2B280" },
          { name: "Driftwood", hex: "#C4B6AB" },
          { name: "Tide", hex: "#BFB48F" },
          { name: "Bay", hex: "#7DA98D" },
          { name: "Moss", hex: "#8A9A5B" },
          { name: "Aloe", hex: "#85C17E" },
          { name: "Fern", hex: "#71A95A" },
          { name: "Marina", hex: "#4A7C59" },
          { name: "Shore", hex: "#DEC6A4" },
          { name: "Lagoon", hex: "#4F9D69" },
          { name: "Harbor", hex: "#8EAFA6" },
          { name: "Surf", hex: "#B2C9BF" },
          { name: "Pebble", hex: "#958E7D" }
        ]
      },
      { 
        id: "seagrass-panama", 
        name: "Seagrass Panama", 
        description: "Simple weave with smooth finish",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Blonde", hex: "#FAF0BE" },
          { name: "Pebble", hex: "#958E7D" },
          { name: "Earth", hex: "#9F8170" },
          { name: "Stone", hex: "#928E85" },
          { name: "Kelp", hex: "#4F7942" },
          { name: "Straw", hex: "#E4D96F" },
          { name: "Shore", hex: "#DEC6A4" },
          { name: "Flax", hex: "#EEDC82" },
          { name: "Raw", hex: "#BFB48F" },
          { name: "Flaxen", hex: "#CD9354" },
          { name: "Reedy", hex: "#BDB562" },
          { name: "Oat", hex: "#CEC1A0" },
          { name: "Sedge", hex: "#BDB40A" },
          { name: "Barley", hex: "#B5A642" }
        ]
      }
    ]
  },
  { 
    id: "coir", 
    name: "Coir", 
    description: "Tough, moisture-resistant coconut fiber",
    ranges: [
      { 
        id: "coir-boucle", 
        name: "Coir Boucle", 
        description: "Textured loop with robust durability",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Rustic", hex: "#AE8F65" },
          { name: "Bark", hex: "#8B7355" },
          { name: "Coconut", hex: "#965A3E" },
          { name: "Husk", hex: "#BA8759" },
          { name: "Nut", hex: "#886B43" },
          { name: "Hazelnut", hex: "#9E7A50" },
          { name: "Amber", hex: "#FFBF00" },
          { name: "Nutmeg", hex: "#7B3F00" },
          { name: "Cedar", hex: "#8B4513" },
          { name: "Hickory", hex: "#8D6645" },
          { name: "Mahogany", hex: "#C04000" },
          { name: "Almond", hex: "#EFDECD" },
          { name: "Tawny", hex: "#CD5700" },
          { name: "Shell", hex: "#FFF5EE" }
        ]
      },
      { 
        id: "coir-panama", 
        name: "Coir Panama", 
        description: "Traditional weave with rugged appeal",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Walnut", hex: "#773F1A" },
          { name: "Teak", hex: "#A67B5B" },
          { name: "Espresso", hex: "#4E3629" },
          { name: "Ginger", hex: "#B87333" },
          { name: "Mahogany", hex: "#C04000" },
          { name: "Cinnamon", hex: "#D2691E" },
          { name: "Chocolate", hex: "#7B3F00" },
          { name: "Caramel", hex: "#C19A6B" },
          { name: "Mocha", hex: "#967969" },
          { name: "Oak", hex: "#806517" },
          { name: "Russet", hex: "#80461B" },
          { name: "Saddle", hex: "#8B4513" },
          { name: "Pecan", hex: "#A67B5B" },
          { name: "Sepia", hex: "#704214" }
        ]
      }
    ]
  },
  { 
    id: "wool", 
    name: "Wool", 
    description: "Soft, insulating, and naturally flame-retardant",
    ranges: [
      { 
        id: "wool-berber", 
        name: "Wool Berber", 
        description: "Traditional flecked pattern with deep comfort",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Pewter", hex: "#8A9A5B" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Navy", hex: "#000080" },
          { name: "Oatmeal", hex: "#E0DAB8" },
          { name: "Cream", hex: "#FFFDD0" },
          { name: "Dove", hex: "#8B8589" },
          { name: "Slate", hex: "#708090" },
          { name: "Stone", hex: "#928E85" },
          { name: "Snow", hex: "#FFFAFA" },
          { name: "Parchment", hex: "#F6F0E0" },
          { name: "Smoke", hex: "#738276" },
          { name: "Shadow", hex: "#8B8589" },
          { name: "Steel", hex: "#71797E" }
        ]
      },
      { 
        id: "wool-loop", 
        name: "Wool Loop", 
        description: "Plush texture with luxurious feel",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Cream", hex: "#FFFDD0" },
          { name: "Beige", hex: "#F5F5DC" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Black", hex: "#000000" },
          { name: "Eggshell", hex: "#F0EAD6" },
          { name: "Linen", hex: "#FAF0E6" },
          { name: "Silver", hex: "#C0C0C0" },
          { name: "Graphite", hex: "#474B4E" },
          { name: "Alabaster", hex: "#F2F0E6" },
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Ash", hex: "#B2BEB5" },
          { name: "Pearl", hex: "#F0EAD6" },
          { name: "Oyster", hex: "#E9E1D4" }
        ]
      },
      { 
        id: "wool-herringbone", 
        name: "Wool Herringbone", 
        description: "Elegant pattern with sophisticated appeal",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Cream", hex: "#FFFDD0" },
          { name: "Taupe", hex: "#483C32" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Slate", hex: "#708090" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Almond", hex: "#EFDECD" },
          { name: "Mushroom", hex: "#988F81" },
          { name: "Ash", hex: "#B2BEB5" },
          { name: "Pewter", hex: "#8A9A5B" },
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Linen", hex: "#FAF0E6" },
          { name: "Mist", hex: "#C4C4BC" },
          { name: "Stone", hex: "#928E85" },
          { name: "Shadow", hex: "#8B8589" }
        ]
      }
    ]
  },
  { 
    id: "sisool", 
    name: "Sisool", 
    description: "A blend of sisal and wool, combining durability with softness",
    ranges: [
      { 
        id: "sisool-chunky", 
        name: "Sisool Chunky", 
        description: "Bold texture with dimensional appeal",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Limestone", hex: "#D3D3C5" },
          { name: "Taupe", hex: "#483C32" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Charcoal", hex: "#36454F" },
          { name: "Pearl", hex: "#F0EAD6" },
          { name: "Flax", hex: "#EEDC82" },
          { name: "Dove", hex: "#8B8589" },
          { name: "Wheat", hex: "#F5DEB3" },
          { name: "Oatmeal", hex: "#E0DAB8" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Stone", hex: "#928E85" },
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Silver", hex: "#C0C0C0" },
          { name: "Linen", hex: "#FAF0E6" }
        ]
      },
      { 
        id: "sisool-fine", 
        name: "Sisool Fine", 
        description: "Delicate blend with refined appearance",
        thumbnail: "/placeholder.svg",
        colors: [
          { name: "Natural", hex: "#D6C7A9" },
          { name: "Chalk", hex: "#F5F5F5" },
          { name: "Beige", hex: "#F5F5DC" },
          { name: "Grey", hex: "#A9A9A9" },
          { name: "Ivory", hex: "#FFFFF0" },
          { name: "Cream", hex: "#FFFDD0" },
          { name: "Bone", hex: "#E3DAC9" },
          { name: "Silver", hex: "#C0C0C0" },
          { name: "Stone", hex: "#928E85" },
          { name: "Pebble", hex: "#958E7D" },
          { name: "Pearl", hex: "#F0EAD6" },
          { name: "Ecru", hex: "#F4F0CB" },
          { name: "Alabaster", hex: "#F2F0E6" },
          { name: "Ash", hex: "#B2BEB5" },
          { name: "Mist", hex: "#C4C4BC" }
        ]
      }
    ]
  }
];

// Border types and their options
const borderTypes = [
  { id: "none", name: "No Border" },
  { 
    id: "whipped", 
    name: "Whipped Border",
    widths: ["3cm"],
    materials: [
      { id: "cotton", name: "Cotton", colors: ["White", "Cream", "Beige", "Grey", "Black", "Navy", "Green", "Burgundy"] },
      { id: "linen", name: "Linen", colors: ["Natural", "Stone", "Grey", "Charcoal"] }
    ]
  },
  { 
    id: "single", 
    name: "Single Border",
    widths: ["3cm", "5.5cm", "7.5cm"],
    materials: [
      { id: "cotton", name: "Cotton", colors: ["White", "Cream", "Beige", "Grey", "Black", "Navy", "Green", "Burgundy"] },
      { id: "linen", name: "Linen", colors: ["Natural", "Stone", "Grey", "Charcoal"] },
      { id: "leather", name: "Leather", colors: ["Tan", "Brown", "Black"] },
      { id: "suede", name: "Suede", colors: ["Sand", "Taupe", "Chocolate", "Grey", "Black"] }
    ]
  },
  { 
    id: "double", 
    name: "Double Border",
    widths: ["5.5cm+3cm", "7.5cm+3cm"],
    materials: [
      { id: "cotton-combo", name: "Cotton Combination", colors: ["White/Black", "Cream/Brown", "Grey/Black", "Navy/White"] },
      { id: "linen-combo", name: "Linen Combination", colors: ["Natural/Grey", "Stone/Charcoal"] },
      { id: "leather-linen", name: "Leather & Linen", colors: ["Tan/Natural", "Brown/Stone", "Black/Grey"] }
    ]
  }
];

// Rug sizes
const rugSizes = [
  { id: "small", name: "Small", dimensions: "120 x 170 cm" },
  { id: "medium", name: "Medium", dimensions: "160 x 230 cm" },
  { id: "large", name: "Large", dimensions: "200 x 290 cm" },
  { id: "xlarge", name: "Extra Large", dimensions: "240 x 340 cm" },
  { id: "runner-s", name: "Runner - Small", dimensions: "70 x 200 cm" },
  { id: "runner-m", name: "Runner - Medium", dimensions: "70 x 300 cm" },
  { id: "runner-l", name: "Runner - Large", dimensions: "70 x 400 cm" },
  { id: "custom", name: "Custom Size", dimensions: "Enter your dimensions" }
];

interface RugOptions {
  materialCategory: string;
  materialRange: string;
  materialColor: string;
  borderType: string;
  borderWidthOuter: string;
  borderMaterialOuter: string;
  borderColorOuter: string;
  borderWidthInner: string;
  borderMaterialInner: string;
  borderColorInner: string;
  size: string;
  customWidth: string;
  customLength: string;
}

const RugBuilder = () => {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState("category"); // For material: "category", "range", "color"
  const [borderSubStep, setBorderSubStep] = useState("type"); // For border: "type", "width", "material", "color"
  const [borderPart, setBorderPart] = useState("outer"); // For double borders: "outer" or "inner"
  
  const [materialOverlayOpen, setMaterialOverlayOpen] = useState(false);
  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState("");
  const [borderSheetOpen, setBorderSheetOpen] = useState(false);
  
  // Filter states for material overlay
  const [colorFilter, setColorFilter] = useState("");
  const [weaveFilter, setWeaveFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  
  const [options, setOptions] = useState<RugOptions>({
    materialCategory: "",
    materialRange: "",
    materialColor: "",
    borderType: "",
    borderWidthOuter: "",
    borderMaterialOuter: "",
    borderColorOuter: "",
    borderWidthInner: "",
    borderMaterialInner: "",
    borderColorInner: "",
    size: "",
    customWidth: "",
    customLength: ""
  });

  // Calculate the progress percentage based on steps
  const calculateProgress = () => {
    if (step === 1) {
      if (subStep === "category") return 10;
      if (subStep === "range") return 20;
      if (subStep === "color") return 30;
      if (options.materialColor) return 33;
    }
    if (step === 2) {
      if (options.borderType === "none") return 66;
      if (borderSubStep === "type") return 40;
      if (borderSubStep === "width") return 50;
      if (borderSubStep === "material") return 55;
      if (borderSubStep === "color") {
        if (options.borderType === "double" && borderPart === "outer") return 60;
        return 65;
      }
    }
    if (step === 3) {
      if (!options.size) return 70;
      if (options.size === "custom" && (!options.customWidth || !options.customLength)) return 80;
      return 100;
    }
    return 0;
  };

  const handleMaterialCategorySelect = (categoryId: string) => {
    setSelectedMaterialCategory(categoryId);
    setMaterialOverlayOpen(true);
  };

  const handleMaterialSelect = (categoryId: string, rangeId: string, colorName: string) => {
    setOptions({
      ...options, 
      materialCategory: categoryId, 
      materialRange: rangeId, 
      materialColor: colorName
    });
    setMaterialOverlayOpen(false);
  }
  
  const handleBorderTypeSelect = (borderType: string) => {
    setOptions({ 
      ...options, 
      borderType: borderType,
      borderWidthOuter: "",
      borderMaterialOuter: "",
      borderColorOuter: "",
      borderWidthInner: "",
      borderMaterialInner: "",
      borderColorInner: ""
    });
    
    if (borderType === "none") {
      setStep(3);
    } else {
      setBorderSubStep("width");
      setBorderPart("outer");
    }
  };
  
  const handleBorderWidthSelect = (width: string) => {
    if (borderPart === "outer") {
      setOptions({ ...options, borderWidthOuter: width });
    } else {
      setOptions({ ...options, borderWidthInner: width });
    }
    setBorderSubStep("material");
    setBorderSheetOpen(true);
  };
  
  const handleBorderMaterialSelect = (material: string) => {
    if (borderPart === "outer") {
      setOptions({ ...options, borderMaterialOuter: material, borderColorOuter: "" });
    } else {
      setOptions({ ...options, borderMaterialInner: material, borderColorInner: "" });
    }
    setBorderSubStep("color");
  };
  
  const handleBorderColorSelect = (color: string) => {
    if (borderPart === "outer") {
      setOptions({ ...options, borderColorOuter: color });
      if (options.borderType === "double") {
        setBorderPart("inner");
        setBorderSubStep("width");
        setBorderSheetOpen(false);
      } else {
        setStep(3);
        setBorderSheetOpen(false);
      }
    } else {
      setOptions({ ...options, borderColorInner: color });
      setStep(3);
      setBorderSheetOpen(false);
    }
  };
  
  const handleSizeSelect = (sizeId: string) => {
    if (sizeId === "custom") {
      setOptions({ ...options, size: sizeId });
    } else {
      setOptions({ ...options, size: sizeId, customWidth: "", customLength: "" });
    }
  };
  
  const handleCustomSizeChange = (dimension: "width" | "length", value: string) => {
    if (dimension === "width") {
      setOptions({ ...options, customWidth: value });
    } else {
      setOptions({ ...options, customLength: value });
    }
  };
  
  const getSelectedMaterial = () => {
    const category = materialCategories.find(cat => cat.id === options.materialCategory);
    if (!category) return null;
    
    const range = category.ranges.find(r => r.id === options.materialRange);
    return { category, range };
  };
  
  const getSelectedBorder = () => {
    const borderType = borderTypes.find(type => type.id === options.borderType);
    if (!borderType || borderType.id === "none") return { borderType };
    
    const materialOuter = borderType.materials?.find(m => m.id === options.borderMaterialOuter);
    const materialInner = borderType.materials?.find(m => m.id === options.borderMaterialInner);
    return { borderType, materialOuter, materialInner };
  };
  
  const getEstimate = () => {
    // This would be replaced with actual pricing logic
    const basePrice = 250;
    const materialMultiplier = options.materialCategory === "wool" ? 1.5 : options.materialCategory === "sisool" ? 1.3 : 1;
    const borderPrice = options.borderType === "none" ? 0 : 
                         options.borderType === "whipped" ? 30 :
                         options.borderType === "single" ? 60 :
                         options.borderType === "double" ? 90 : 0;
    
    const sizeMultiplier = 
      options.size === "small" ? 0.8 :
      options.size === "medium" ? 1 :
      options.size === "large" ? 1.3 :
      options.size === "xlarge" ? 1.6 :
      options.size === "runner-s" ? 0.7 :
      options.size === "runner-m" ? 0.9 :
      options.size === "runner-l" ? 1.1 :
      options.size === "custom" ? 1.2 : 1;
    
    return Math.round((basePrice * materialMultiplier + borderPrice) * sizeMultiplier);
  };

  // Generate a placeholder color based on the material name (for preview)
  const getMaterialColorCode = (colorName: string) => {
    // First check if the color exists in our material categories
    for (const category of materialCategories) {
      for (const range of category.ranges) {
        const colorObj = range.colors.find(c => c.name === colorName);
        if (colorObj) {
          return colorObj.hex;
        }
      }
    }
    
    // Default colors as fallback
    const colorMap: Record<string, string> = {
      "Natural": "#D6C7A9",
      "Bleached": "#E8E4D9",
      "Grey": "#A9A9A9",
      "Charcoal": "#36454F",
      "White": "#F5F5F5", 
      "Cream": "#FFFDD0",
      "Beige": "#F5F5DC",
      "Taupe": "#483C32",
      "Slate": "#708090",
      "Ebony": "#555D50",
      "Limestone": "#D3D3C5",
      "Steel": "#71797E",
      "Silver": "#C0C0C0",
      "Bronze": "#CD7F32",
      "Copper": "#B87333",
      "Ivory": "#FFFFF0",
      "Pewter": "#8A9A5B",
      "Navy": "#000080",
      "Chalk": "#F5F5F5",
      "Stone": "#A9A9A9",
      "Washed": "#E6E6DC",
      "Sand": "#C2B280"
    };
    
    return colorMap[colorName] || "#D6C7A9";
  };

  return (
    <section id="process" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="mb-4 inline-flex">
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                BESPOKE DESIGN
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Create Your Perfect Rug</h2>
            <p className="text-muted-foreground">
              Our simple three-step process helps you design a rug that's perfectly tailored to your space and style. Choose your material, border, and size.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Builder Controls */}
          <ScrollAnimation delay={100}>
            <div className="bg-white rounded-xl p-8 border border-border/50">
              {/* Steps Indicator */}
              <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 bg-gray-200 -translate-y-1/2"></div>
                <Progress value={calculateProgress()} className="absolute top-1/2 w-[66%] left-[16.67%] h-0.5 -translate-y-1/2" />
                
                {[1, 2, 3].map((stepNumber) => (
                  <div 
                    key={stepNumber} 
                    className="flex flex-col items-center relative z-10 cursor-pointer"
                    onClick={() => {
                      if (
                        (stepNumber === 2 && options.materialColor) ||
                        (stepNumber === 3 && options.materialColor && 
                          (options.borderType === "none" || 
                           (options.borderType === "whipped" && options.borderColorOuter) ||
                           (options.borderType === "single" && options.borderColorOuter) ||
                           (options.borderType === "double" && options.borderColorOuter && options.borderColorInner)
                          )
                        )
                      ) {
                        setStep(stepNumber);
                      }
                    }}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= stepNumber 
                          ? "bg-secondary text-white" 
                          : stepNumber === 2 && options.materialColor 
                            ? "border-2 border-secondary/50 text-secondary" 
                            : stepNumber === 3 && options.materialColor && 
                              (options.borderType === "none" || 
                               (options.borderType === "whipped" && options.borderColorOuter) ||
                               (options.borderType === "single" && options.borderColorOuter) ||
                               (options.borderType === "double" && options.borderColorOuter && options.borderColorInner)
                              )
                              ? "border-2 border-secondary/50 text-secondary" 
                              : "border border-gray-300 text-gray-400"
                      }`}
                    >
                      {step > stepNumber ? <Check size={18} /> : stepNumber}
                    </div>
                    <span 
                      className={`text-xs mt-2 font-medium ${
                        step >= stepNumber ? "text-secondary" : "text-gray-500"
                      }`}
                    >
                      {stepNumber === 1 ? "Material" : stepNumber === 2 ? "Border" : "Size"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Material Selection */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl">Step 1: Choose Your Material</h3>
                    <p className="text-muted-foreground text-sm">
                      Select from our range of premium natural fibers, each with unique textures and properties.
                    </p>
                  </div>

                  {/* Display material categories */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {materialCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleMaterialCategorySelect(category.id)}
                        className={`border rounded-lg p-4 cursor-pointer transition hover:border-secondary hover:shadow ${
                          options.materialCategory === category.id
                            ? "border-secondary bg-secondary/5"
                            : "border-gray-200"
                        }`}
                      >
                        <h4 className="font-medium mb-1">{category.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Your Selection */}
                  <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                    <h4 className="font-medium">Your Selection:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Material</span>
                        <span className="font-medium">
                          {options.materialCategory ? materialCategories.find(c => c.id === options.materialCategory)?.name : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Range</span>
                        <span className="font-medium">
                          {options.materialRange ? getSelectedMaterial()?.range?.name : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Color</span>
                        {options.materialColor ? (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{
                                backgroundColor: getMaterialColorCode(options.materialColor)
                              }}
                            ></div>
                            <span className="font-medium">{options.materialColor}</span>
                          </div>
                        ) : (
                          <span>—</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!options.materialColor}
                    className="w-full"
                  >
                    Continue to Border
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              )}

              {/* Step 2: Border Selection */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl">Step 2: Choose Your Border</h3>
                    <p className="text-muted-foreground text-sm">
                      Add a border to define the edges of your rug and complement your interior design.
                    </p>
                  </div>

                  {borderSubStep === "type" && (
                    <div className="grid grid-cols-2 gap-4">
                      {borderTypes.map((border) => (
                        <div
                          key={border.id}
                          onClick={() => handleBorderTypeSelect(border.id)}
                          className={`border rounded-lg p-4 cursor-pointer transition hover:border-secondary hover:shadow ${
                            options.borderType === border.id
                              ? "border-secondary bg-secondary/5"
                              : "border-gray-200"
                          }`}
                        >
                          <h4 className="font-medium mb-1">{border.name}</h4>
                          {border.id !== "none" && (
                            <p className="text-xs text-muted-foreground">
                              {border.id === "whipped" && "Simple, elegant finish"}
                              {border.id === "single" && "Classic border style"}
                              {border.id === "double" && "Sophisticated double border"}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {borderSubStep === "width" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">
                        {borderPart === "outer" ? "Border Width" : "Inner Border Width"}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {getSelectedBorder().borderType?.widths?.map((width) => (
                          <div
                            key={width}
                            onClick={() => handleBorderWidthSelect(width)}
                            className="border rounded-lg p-4 cursor-pointer transition hover:border-secondary hover:shadow"
                          >
                            <span className="font-medium">{width}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {borderSubStep === "material" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">
                        {borderPart === "outer" ? "Border Material" : "Inner Border Material"}
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {getSelectedBorder().borderType?.materials?.map((material) => (
                          <div
                            key={material.id}
                            onClick={() => handleBorderMaterialSelect(material.id)}
                            className={`border rounded-lg p-4 cursor-pointer transition hover:border-secondary hover:shadow ${
                              (borderPart === "outer" ? options.borderMaterialOuter : options.borderMaterialInner) === material.id
                                ? "border-secondary bg-secondary/5"
                                : "border-gray-200"
                            }`}
                          >
                            <span className="font-medium">{material.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {borderSubStep === "color" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">
                        {borderPart === "outer" ? "Border Color" : "Inner Border Color"}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {getSelectedBorder().borderType?.materials?.find(
                          m => m.id === (borderPart === "outer" ? options.borderMaterialOuter : options.borderMaterialInner)
                        )?.colors.map((color) => (
                          <div
                            key={color}
                            onClick={() => handleBorderColorSelect(color)}
                            className={`border rounded-lg p-3 cursor-pointer transition hover:border-secondary hover:shadow ${
                              (borderPart === "outer" ? options.borderColorOuter : options.borderColorInner) === color
                                ? "border-secondary bg-secondary/5"
                                : "border-gray-200"
                            }`}
                          >
                            <span className="font-medium text-sm">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Your Selection */}
                  <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                    <h4 className="font-medium">Selected Options:</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Material</span>
                          <span className="font-medium">
                            {options.materialCategory && options.materialRange && options.materialColor ?
                              `${materialCategories.find(c => c.id === options.materialCategory)?.name} ${getSelectedMaterial()?.range?.name} ${options.materialColor}` : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Border Type</span>
                          <span className="font-medium">
                            {options.borderType ? borderTypes.find(b => b.id === options.borderType)?.name : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Border Width</span>
                          <span className="font-medium">{options.borderWidthOuter || '—'}</span>
                        </div>
                      </div>

                      {options.borderType && options.borderType !== "none" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Border Material</span>
                            <span className="font-medium">
                              {options.borderMaterialOuter ? 
                                getSelectedBorder().borderType?.materials?.find(m => m.id === options.borderMaterialOuter)?.name : 
                                '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Border Color</span>
                            <span className="font-medium">{options.borderColorOuter || '—'}</span>
                          </div>
                        </div>
                      )}
                      
                      {options.borderType === "double" && (
                        <div className="grid grid-cols-3 gap-4 border-t pt-3">
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Inner Width</span>
                            <span className="font-medium">{options.borderWidthInner || '—'}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Inner Material</span>
                            <span className="font-medium">
                              {options.borderMaterialInner ? 
                                getSelectedBorder().borderType?.materials?.find(m => m.id === options.borderMaterialInner)?.name : 
                                '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Inner Color</span>
                            <span className="font-medium">{options.borderColorInner || '—'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      <ChevronDown size={16} className="mr-2" />
                      Back
                    </Button>

                    <Button 
                      onClick={() => setStep(3)} 
                      disabled={
                        options.borderType === "" ||
                        (options.borderType !== "none" && !options.borderWidthOuter) ||
                        (options.borderType !== "none" && !options.borderMaterialOuter) ||
                        (options.borderType !== "none" && !options.borderColorOuter) ||
                        (options.borderType === "double" && !options.borderWidthInner) ||
                        (options.borderType === "double" && !options.borderMaterialInner) ||
                        (options.borderType === "double" && !options.borderColorInner)
                      }
                      className="flex-1"
                    >
                      Continue to Size
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Size Selection */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl">Step 3: Choose Your Size</h3>
                    <p className="text-muted-foreground text-sm">
                      Select from our standard sizes or specify custom dimensions.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {rugSizes.map((size) => (
                      <div
                        key={size.id}
                        onClick={() => handleSizeSelect(size.id)}
                        className={`border rounded-lg p-4 cursor-pointer transition hover:border-secondary hover:shadow ${
                          options.size === size.id
                            ? "border-secondary bg-secondary/5"
                            : "border-gray-200"
                        }`}
                      >
                        <h4 className="font-medium mb-1">{size.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {size.dimensions}
                        </p>
                      </div>
                    ))}
                  </div>

                  {options.size === "custom" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Custom Dimensions (cm)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Width</label>
                          <input
                            type="number"
                            value={options.customWidth}
                            onChange={(e) => handleCustomSizeChange("width", e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Width in cm"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Length</label>
                          <input
                            type="number"
                            value={options.customLength}
                            onChange={(e) => handleCustomSizeChange("length", e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Length in cm"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Note: Custom sizes may affect pricing and delivery time.
                      </p>
                    </div>
                  )}

                  {/* Your Selection */}
                  <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                    <h4 className="font-medium">Selected Options:</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Material</span>
                          <span className="font-medium">
                            {options.materialCategory && options.materialRange && options.materialColor ?
                              `${materialCategories.find(c => c.id === options.materialCategory)?.name} ${getSelectedMaterial()?.range?.name} ${options.materialColor}` : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Border</span>
                          <span className="font-medium">
                            {options.borderType ? borderTypes.find(b => b.id === options.borderType)?.name : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Size</span>
                          <span className="font-medium">
                            {options.size === "custom" 
                              ? `Custom: ${options.customWidth || '—'} x ${options.customLength || '—'} cm`
                              : options.size 
                                ? rugSizes.find(s => s.id === options.size)?.dimensions 
                                : '—'
                            }
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Estimated Price</span>
                          <span className="text-xl font-serif">£{getEstimate()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      <ChevronDown size={16} className="mr-2" />
                      Back
                    </Button>

                    <Button 
                      className="flex-1"
                      disabled={!options.size || (options.size === "custom" && (!options.customWidth || !options.customLength))}
                    >
                      Add to Cart
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Preview Panel */}
          <ScrollAnimation delay={200}>
            <div className="bg-white rounded-xl p-8 border border-border/50 space-y-6">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {options.materialCategory && options.materialColor ? (
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundColor: getMaterialColorCode(options.materialColor),
                      backgroundImage: `url(/placeholder.svg)`,
                      backgroundBlendMode: 'multiply',
                      backgroundSize: 'cover'
                    }}
                  >
                    {/* Border preview would go here */}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground mb-2">Select materials to see preview</p>
                    <Button variant="secondary" onClick={() => handleMaterialCategorySelect("jute")}>
                      Start with Jute
                    </Button>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-4">Sample Considerations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="min-w-[20px] mt-0.5 text-secondary">
                      <Check size={18} />
                    </div>
                    <span className="text-sm">
                      Natural fibers may vary slightly in color and texture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-[20px] mt-0.5 text-secondary">
                      <Check size={18} />
                    </div>
                    <span className="text-sm">
                      Custom sizes take approximately 4-6 weeks to produce
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-[20px] mt-0.5 text-secondary">
                      <Info size={18} />
                    </div>
                    <span className="text-sm">
                      Border colors shown are representative; request a sample for exact matching
                    </span>
                  </li>
                </ul>
              </div>

              {/* Swatch display */}
              {options.materialCategory && options.materialRange && (
                <div>
                  <h3 className="font-serif text-lg mb-3">Available Colors in {getSelectedMaterial()?.range?.name}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {getSelectedMaterial()?.range?.colors.slice(0, 10).map((color) => (
                      <div
                        key={color.name}
                        className={`w-full group cursor-pointer`}
                        onClick={() => {
                          setOptions({...options, materialColor: color.name});
                        }}
                      >
                        <div 
                          className={`aspect-square rounded transition-all ${options.materialColor === color.name ? 'ring-2 ring-offset-2 ring-secondary' : 'hover:scale-110'}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <span className="text-xs text-center block mt-1 truncate group-hover:text-secondary">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Full Screen Material Overlay */}
      <FullScreenOverlay
        isOpen={materialOverlayOpen}
        onClose={() => setMaterialOverlayOpen(false)}
        title="Select Your Material"
        description="Choose from our range of natural fibers, each with unique characteristics."
        materialCategories={materialCategories}
        initialCategory={options.materialCategory || selectedMaterialCategory}
        initialRange={options.materialRange}
        initialColor={options.materialColor}
        onSelect={handleMaterialSelect}
        filters={{
          options: [
            { id: "all", label: "All Materials" },
            ...materialCategories.map(cat => ({ id: cat.id, label: cat.name }))
          ],
          activeFilter: options.materialCategory || selectedMaterialCategory || "all",
          onFilterChange: (filterId: string) => {
            if (filterId !== "all") {
              setSelectedMaterialCategory(filterId);
            } else {
              setSelectedMaterialCategory("");
            }
          }
        }}
      />

      {/* Border Material Sheet */}
      <Sheet open={borderSheetOpen} onOpenChange={(open) => setBorderSheetOpen(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {borderPart === "outer" ? "Select Border Material" : "Select Inner Border Material"}
            </SheetTitle>
            <SheetDescription>
              Choose the material for your rug border.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {getSelectedBorder().borderType?.materials?.map((material) => (
              <div
                key={material.id}
                onClick={() => {
                  handleBorderMaterialSelect(material.id);
                  setBorderSheetOpen(false);
                }}
                className="border rounded-lg p-4 cursor-pointer hover:border-secondary hover:bg-secondary/5"
              >
                <h3 className="font-medium mb-2">{material.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {material.colors.map((color) => (
                    <div
                      key={color}
                      className="bg-gray-100 rounded-full px-2 py-1 text-xs"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default RugBuilder;
