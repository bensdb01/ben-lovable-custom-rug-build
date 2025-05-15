import { useState, useEffect } from "react";
import { useRugDataContext } from "@/lib/context/RugDataContext";
import { Button } from "@/components/ui/button";
import { Check, InfoIcon, ChevronRight, ArrowLeft, HelpCircle, X, Grid, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import ScrollAnimation from "./ScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetOverlay, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

// Border options and other static data remain hardcoded

// Border options
const borderTypes = [
  { id: "none", name: "No Border" },
  { id: "whipped", name: "Whipped Edge" },
  { id: "single", name: "Single Border" },
  { id: "double", name: "Double Border" }
];

const borderWidths = {
  whipped: [{ id: "standard", name: "Standard (2cm)" }],
  single: [
    { id: "slim", name: "Slim (3cm)" },
    { id: "medium", name: "Medium (5.5cm)" },
    { id: "wide", name: "Wide (7.5cm)" }
  ],
  double: [
    { id: "slim-slim", name: "Slim + Slim (3cm + 3cm)" },
    { id: "slim-medium", name: "Slim + Medium (3cm + 5.5cm)" },
    { id: "medium-slim", name: "Medium + Slim (5.5cm + 3cm)" },
    { id: "medium-medium", name: "Medium + Medium (5.5cm + 5.5cm)" }
  ]
};

const borderMaterials = [
  { id: "cotton", name: "Cotton", description: "Soft cotton border in herringbone and chenille weaves", colors: ["White", "Cream", "Beige", "Grey", "Charcoal", "Black", "Navy", "Forest", "Burgundy"] },
  { id: "linen", name: "Linen", description: "Natural linen border in twill and basketweave", colors: ["Natural", "Stone", "Flax", "Mushroom", "Slate"] },
  { id: "leather", name: "Leather", description: "Luxurious genuine leather border", colors: ["Brown", "Tan", "Black", "Grey"] },
  { id: "suede", name: "Suede", description: "Soft, tactile suede border", colors: ["Camel", "Chocolate", "Black", "Grey"] }
];

// Size options
const sizes = [
  { id: "small", name: "Small", dimensions: "120 x 170 cm" },
  { id: "medium", name: "Medium", dimensions: "160 x 230 cm" },
  { id: "large", name: "Large", dimensions: "200 x 290 cm" },
  { id: "xlarge", name: "Extra Large", dimensions: "240 x 340 cm" },
  { id: "custom", name: "Custom Size", dimensions: "Made to your exact measurements" }
];

// Custom size options
const customShapes = ["Rectangle", "Square", "Circle", "Runner", "Other"];

interface RugOptions {
  step: number;
  material: {
    category: string;
    range: string;
    color: string;
  };
  border: {
    type: string;
    width: string;
    material: string;
    color: string;
    secondaryMaterial?: string;
    secondaryColor?: string;
  };
  size: {
    option: string;
    width?: number;
    length?: number;
    shape?: string;
  };
}

// New interface for moodboard items
interface MoodboardItem extends RugOptions {
  id: string;
  price: number;
  createdAt: Date;
}

const RugBuilder = () => {
  // Get data from CSV context
  const { 
    isLoading, 
    error, 
    materialCategories,
    materialRanges,
    filterCategories,
    getProductImage
  } = useRugDataContext();
  const [options, setOptions] = useState<RugOptions>({
    step: 1,
    material: {
      category: "",
      range: "",
      color: ""
    },
    border: {
      type: "",
      width: "",
      material: "",
      color: "",
      secondaryMaterial: "",
      secondaryColor: ""
    },
    size: {
      option: "",
      width: undefined,
      length: undefined,
      shape: "Rectangle"
    }
  });

  // Add moodboard state
  const [moodboardItems, setMoodboardItems] = useState<MoodboardItem[]>([]);
  
  // Add view state for the material overlay
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Loading and error states will be handled in the render method

  // Material selection overlay states
  const [materialOverlayOpen, setMaterialOverlayOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeFilters, setActiveFilters] = useState<{[key: string]: boolean}>({});
  
  // Border selection overlay states
  const [borderOverlayOpen, setBorderOverlayOpen] = useState(false);
  const [selectedBorderType, setSelectedBorderType] = useState("");
  const [isInnerBorder, setIsInnerBorder] = useState(false);
  
  const [activeTab, setActiveTab] = useState("category");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);

  const handleStepChange = (step: number) => {
    setOptions({...options, step});
    
    // Reset tabs on step change
    if (step === 1) {
      setActiveTab("category");
    } else if (step === 2) {
      setActiveTab("type");
    } else if (step === 3) {
      if (options.size.option === "custom") {
        setActiveTab("custom");
      } else {
        setActiveTab("option");
      }
    }
  };
  
  const handleMaterialCategorySelect = (categoryId: string) => {
    setOptions({
      ...options,
      material: {
        ...options.material,
        category: categoryId,
        range: "",
        color: ""
      }
    });
    
    // Open the full-screen overlay for range selection
    setSelectedCategory(categoryId);
    setMaterialOverlayOpen(true);
  };

  const handleMaterialRangeSelect = (rangeId: string) => {
    // Find the range object
    const category = options.material.category || selectedCategory;
    const rangeObj = category ? materialRanges[category]?.find(r => r.id === rangeId) : null;
    
    // Get the first color if available
    const firstColor = rangeObj && rangeObj.colors.length > 0 ? rangeObj.colors[0] : "";
    
    setOptions({
      ...options,
      material: {
        ...options.material,
        range: rangeId,
        // Set the first color by default
        color: firstColor
      }
    });
    
    // Default to selecting the first color (index 0)
    setSelectedColorIndex(0);
  };

  const handleMaterialColorSelect = (color: string, index: number, closeOverlay: boolean = false) => {
    setOptions({
      ...options,
      material: {
        ...options.material,
        color
      }
    });
    setSelectedColorIndex(index);
    // Only close overlay if explicitly requested
    if (closeOverlay) {
      setMaterialOverlayOpen(false);
    }
  };

  // Fix the handleNextStep function to properly navigate to next step
  const handleNextStep = () => {
    if (options.step < 3) {
      handleStepChange(options.step + 1);
    }
  };

  const handleBorderTypeSelect = (typeId: string) => {
    setOptions({
      ...options,
      border: {
        ...options.border,
        type: typeId,
        width: "",
        material: "",
        color: "",
        secondaryMaterial: "",
        secondaryColor: ""
      }
    });
    setActiveTab("width");
  };

  const handleBorderWidthSelect = (widthId: string) => {
    setOptions({
      ...options,
      border: {
        ...options.border,
        width: widthId
      }
    });
    
    // If it's a double border, set up for outer border first
    if (options.border.type === "double") {
      setIsInnerBorder(false);
      setSelectedBorderType("outer");
    } else {
      setSelectedBorderType(options.border.type);
    }
    
    // Open the border overlay for material selection
    setBorderOverlayOpen(true);
  };

  const handleBorderMaterialSelect = (materialId: string, isSecondary = false) => {
    if (isSecondary || isInnerBorder) {
      setOptions({
        ...options,
        border: {
          ...options.border,
          secondaryMaterial: materialId,
          secondaryColor: ""
        }
      });
    } else {
      setOptions({
        ...options,
        border: {
          ...options.border,
          material: materialId,
          color: ""
        }
      });
    }
  };

  const handleBorderColorSelect = (color: string, isSecondary = false) => {
    if (isSecondary || isInnerBorder) {
      setOptions({
        ...options,
        border: {
          ...options.border,
          secondaryColor: color
        }
      });
      
      // Close overlay after inner border is selected
      setBorderOverlayOpen(false);
    } else {
      setOptions({
        ...options,
        border: {
          ...options.border,
          color
        }
      });
      
      // If it's a double border, proceed to inner border selection
      if (options.border.type === "double") {
        setIsInnerBorder(true);
        setSelectedBorderType("inner");
        // Keep the overlay open for inner border selection but reset filters
        setActiveFilters({});
      } else {
        // For single or whipped borders, close the overlay after selection
        setBorderOverlayOpen(false);
      }
    }
  };

  const handleSizeSelect = (sizeId: string) => {
    setOptions({
      ...options,
      size: {
        ...options.size,
        option: sizeId
      }
    });
    
    if (sizeId === "custom") {
      setActiveTab("custom");
    }
  };

  const handleCustomSizeChange = (field: string, value: string | number) => {
    setOptions({
      ...options,
      size: {
        ...options.size,
        [field]: value
      }
    });
  };

  // Add moodboard functions
  const addToMoodboard = () => {
    // Create a unique ID
    const newItem: MoodboardItem = {
      ...options,
      id: `moodboard-${Date.now()}`,
      price: getEstimate(),
      createdAt: new Date()
    };
    
    setMoodboardItems([...moodboardItems, newItem]);
    toast.success("Added to moodboard");
  };

  const removeFromMoodboard = (id: string) => {
    setMoodboardItems(moodboardItems.filter(item => item.id !== id));
    toast.success("Removed from moodboard");
  };

  const loadFromMoodboard = (item: MoodboardItem) => {
    setOptions({
      ...item,
    });
    
    // Scroll to the builder section
    document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
    toast.success("Design loaded to builder");
  };

  const getEstimate = () => {
    // This would be replaced with more complex pricing logic
    const basePrice = 250;
    
    // Material multipliers
    let materialMultiplier = 1;
    if (options.material.category === "wool") materialMultiplier = 1.5;
    else if (options.material.category === "sisool") materialMultiplier = 1.4;
    else if (options.material.category === "sisal") materialMultiplier = 1.2;
    else if (options.material.category === "seagrass") materialMultiplier = 1.1;
    
    // Border price based on type, width, and material
    let borderPrice = 0;
    if (options.border.type === "whipped") borderPrice = 20;
    else if (options.border.type === "single") {
      if (options.border.width === "slim") borderPrice = 40;
      else if (options.border.width === "medium") borderPrice = 60;
      else if (options.border.width === "wide") borderPrice = 80;
      
      // Add material premium
      if (options.border.material === "leather") borderPrice += 30;
      else if (options.border.material === "suede") borderPrice += 25;
    }
    else if (options.border.type === "double") {
      // Base price for double borders
      borderPrice = 100;
      
      // Add material premium for both
      if (options.border.material === "leather" || options.border.secondaryMaterial === "leather") {
        borderPrice += 40;
      } else if (options.border.material === "suede" || options.border.secondaryMaterial === "suede") {
        borderPrice += 30;
      }
    }
    
    // Size multiplier
    let sizeMultiplier = 1;
    if (options.size.option === "small") sizeMultiplier = 0.8;
    else if (options.size.option === "medium") sizeMultiplier = 1;
    else if (options.size.option === "large") sizeMultiplier = 1.3;
    else if (options.size.option === "xlarge") sizeMultiplier = 1.6;
    else if (options.size.option === "custom") {
      // Calculate custom size in square meters and compare to standard sizes
      if (options.size.width && options.size.length) {
        const area = (options.size.width * options.size.length) / 10000; // cm² to m²
        if (area < 2) sizeMultiplier = 0.7;
        else if (area < 3.7) sizeMultiplier = 0.8;
        else if (area < 5.8) sizeMultiplier = 1;
        else if (area < 8.2) sizeMultiplier = 1.3;
        else sizeMultiplier = 1.6 + ((area - 8.2) * 0.1); // Additional charge for very large rugs
      }
    }
    
    return Math.round((basePrice * materialMultiplier + borderPrice) * sizeMultiplier);
  };

  const getMaterialRanges = () => {
    if (!options.material.category) return [];
    return materialRanges[options.material.category as keyof typeof materialRanges] || [];
  };

  const getSelectedRange = () => {
    const ranges = getMaterialRanges();
    return ranges.find(range => range.id === options.material.range);
  };

  // Add getSelectedMaterialName helper
  const getSelectedMaterialName = () => {
    if (!options.material.category) return "";
    return materialCategories.find(c => c.id === options.material.category)?.name || "";
  };

  const getSelectedMaterialRange = () => {
    if (!options.material.range) return "";
    return getSelectedRange()?.name || "";
  };

  const isStepComplete = (step: number) => {
    if (step === 1) {
      return options.material.category && options.material.range && options.material.color;
    } else if (step === 2) {
      if (options.border.type === "none") return true;
      if (options.border.type === "whipped") {
        return options.border.width && options.border.material && options.border.color;
      }
      if (options.border.type === "single") {
        return options.border.width && options.border.material && options.border.color;
      }
      if (options.border.type === "double") {
        return options.border.width && options.border.material && options.border.color &&
               options.border.secondaryMaterial && options.border.secondaryColor;
      }
      return false;
    } else if (step === 3) {
      if (options.size.option === "custom") {
        return !!options.size.width && !!options.size.length && !!options.size.shape;
      }
      return !!options.size.option;
    }
    return false;
  };

  const renderCurrentBorderWidths = () => {
    if (!options.border.type || options.border.type === "none") return [];
    return borderWidths[options.border.type as keyof typeof borderWidths] || [];
  };

  const getProgressPercent = () => {
    let percent = 0;
    
    // Step 1 contributes 33.3%
    if (options.step > 1 || isStepComplete(1)) {
      percent = 33.3;
    } else if (options.material.category) {
      percent = 11.1;
      if (options.material.range) {
        percent = 22.2;
        if (options.material.color) {
          percent = 33.3;
        }
      }
    }
    
    // Step 2 contributes another 33.3%
    if (options.step > 2 || isStepComplete(2)) {
      percent += 33.3;
    } else if (options.step === 2) {
      if (options.border.type) {
        percent += 8.3;
        if (options.border.type === "none") {
          percent += 25;
        } else if (options.border.width) {
          percent += 8.3;
          if (options.border.material) {
            percent += 8.3;
            if (options.border.color) {
              if (options.border.type !== "double") {
                percent += 8.3;
              } else if (options.border.secondaryMaterial) {
                percent += 4.15;
                if (options.border.secondaryColor) {
                  percent += 4.15;
                }
              }
            }
          }
        }
      }
    }
    
    // Step 3 contributes the final 33.4%
    if (isStepComplete(3)) {
      percent += 33.4;
    } else if (options.step === 3 && options.size.option) {
      percent += 16.7;
      if (options.size.option !== "custom" || (options.size.width && options.size.length && options.size.shape)) {
        percent += 16.7;
      }
    }
    
    return Math.min(100, Math.round(percent));
  };

  const isFirstStepComplete = isStepComplete(1);
  const isSecondStepComplete = isStepComplete(2);
  const isThirdStepComplete = isStepComplete(3);

  // Function to filter ranges based on active filters
  const getFilteredRanges = () => {
    if (!selectedCategory) return [];
    
    const ranges = materialRanges[selectedCategory as keyof typeof materialRanges] || [];
    
    // If no filters are active, return all ranges
    if (Object.values(activeFilters).filter(Boolean).length === 0) {
      return ranges;
    }
    
    // Simple filter implementation - in a real app would be more sophisticated
    return ranges.filter(range => {
      // Example: filter by color availability
      const hasMatchingColor = range.colors.some(color => 
        activeFilters[color] || 
        Object.keys(activeFilters).some(filter => 
          filter.toLowerCase() === color.toLowerCase() && activeFilters[filter]
        )
      );
      
      // Example: filter by weave type
      const hasMatchingWeave = Object.keys(activeFilters).some(filter => 
        range.id.toLowerCase().includes(filter.toLowerCase()) && activeFilters[filter]
      );
      
      return hasMatchingColor || hasMatchingWeave;
    });
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-muted-foreground">Loading rug data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-destructive">
        <p className="font-medium mb-2">Error loading rug data</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="mb-4 inline-flex">
              <span className="bg-brand-sage/20 text-brand-sage px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                BESPOKE DESIGN
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Create Your Perfect Rug</h2>
            <p className="text-muted-foreground">
              Our custom rug builder allows you to design a rug that's perfectly tailored to your space and style.
              Choose from hundreds of combinations of materials, borders, and sizes.
            </p>
          </div>
        </ScrollAnimation>

        {/* Progress Bar - Updated styling for better visibility */}
        <div className="max-w-3xl mx-auto mb-10">
          <Progress value={getProgressPercent()} className="h-3" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span className={options.step >= 1 ? "font-medium text-brand-sage" : ""}>Start</span>
            <span className={isFirstStepComplete ? "font-medium text-brand-sage" : ""}>Material</span>
            <span className={isSecondStepComplete ? "font-medium text-brand-sage" : ""}>Border</span>
            <span className={isThirdStepComplete ? "font-medium text-brand-sage" : ""}>Size</span>
            <span className={getProgressPercent() === 100 ? "font-medium text-brand-sage" : ""}>Complete</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Builder Controls */}
          <ScrollAnimation delay={100}>
            <div className="bg-white rounded-xl p-6 md:p-8 border border-border/50">
              {/* Steps Indicator */}
              <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 bg-border -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-[calc(16.67%+8px)] h-0.5 bg-brand-sage -translate-y-1/2" 
                  style={{ 
                    right: `calc(${100 - ((options.step / 3) * 100)}% - 8px)` 
                  }}
                ></div>
                
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center relative z-10">
                    <button 
                      onClick={() => stepNumber < options.step && handleStepChange(stepNumber)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 ${
                        stepNumber === options.step
                          ? 'bg-brand-sage text-white cursor-default'
                          : stepNumber < options.step
                            ? 'bg-brand-sage/20 text-brand-sage cursor-pointer'
                            : 'bg-border text-muted-foreground cursor-default'
                      }`}
                      disabled={stepNumber > options.step}
                    >
                      {stepNumber < options.step && isStepComplete(stepNumber) ? <Check size={16} /> : stepNumber}
                    </button>
                    <div className="text-xs font-medium whitespace-nowrap">
                      {stepNumber === 1
                        ? "Material"
                        : stepNumber === 2
                          ? "Border"
                          : "Size"
                      }
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Step 1: Material Selection */}
              {options.step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl mb-4">Choose Your Material</h3>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select a material category for your rug:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {materialCategories.map((category) => (
                        <div
                          key={category.id}
                          className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                            options.material.category === category.id
                              ? 'border-brand-sage bg-brand-sage/5'
                              : 'border-border/50 bg-white'
                          }`}
                          onClick={() => handleMaterialCategorySelect(category.id)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-xs text-muted-foreground mt-1">{category.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Display selected options */}
                  {options.material.category && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Your selection:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Material:</span>
                          <span className="text-sm font-medium">{materialCategories.find(c => c.id === options.material.category)?.name || ""}</span>
                        </div>
                        {options.material.range && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Range:</span>
                            <span className="text-sm font-medium">{getSelectedRange()?.name || ""}</span>
                          </div>
                        )}
                        {options.material.color && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Color:</span>
                            <span className="text-sm font-medium">{options.material.color}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 bg-accent/20 p-3 rounded-lg">
                    <InfoIcon size={14} className="text-brand-sage flex-shrink-0" />
                    <span>Not sure which material to choose? 
                      <a href="#" className="text-brand-sage hover:text-brand-sage/80 ml-1">
                        Request free material samples
                      </a>
                    </span>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={handleNextStep}
                      disabled={!isStepComplete(1)}
                      className="bg-brand-sage text-foreground hover:bg-brand-sage/90 disabled:opacity-50"
                    >
                      Continue to Border
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Border Selection */}
              {options.step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl mb-4">Choose Your Border</h3>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select a border type for your rug:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {borderTypes.map((borderType) => (
                        <div
                          key={borderType.id}
                          className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                            options.border.type === borderType.id
                              ? 'border-brand-sage bg-brand-sage/5'
                              : 'border-border/50 bg-white'
                          }`}
                          onClick={() => handleBorderTypeSelect(borderType.id)}
                        >
                          <span>{borderType.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {options.border.type && options.border.type !== "none" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Select a border width:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {renderCurrentBorderWidths().map((width) => (
                          <div
                            key={width.id}
                            className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              options.border.width === width.id
                                ? 'border-brand-sage bg-brand-sage/5'
                                : 'border-border/50 bg-white'
                            }`}
                            onClick={() => handleBorderWidthSelect(width.id)}
                          >
                            <span>{width.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Display selected options */}
                  {options.border.type && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Your selection:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Border type:</span>
                          <span className="text-sm font-medium">{borderTypes.find(b => b.id === options.border.type)?.name || ""}</span>
                        </div>
                        {options.border.width && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Width:</span>
                            <span className="text-sm font-medium">
                              {borderWidths[options.border.type as keyof typeof borderWidths]?.find(w => w.id === options.border.width)?.name || ""}
                            </span>
                          </div>
                        )}
                        {options.border.material && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Outer border material:</span>
                            <span className="text-sm font-medium">{borderMaterials.find(m => m.id === options.border.material)?.name || ""}</span>
                          </div>
                        )}
                        {options.border.color && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Outer border color:</span>
                            <span className="text-sm font-medium">{options.border.color}</span>
                          </div>
                        )}
                        {options.border.secondaryMaterial && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Inner border material:</span>
                            <span className="text-sm font-medium">{borderMaterials.find(m => m.id === options.border.secondaryMaterial)?.name || ""}</span>
                          </div>
                        )}
                        {options.border.secondaryColor && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Inner border color:</span>
                            <span className="text-sm font-medium">{options.border.secondaryColor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={handleNextStep}
                      disabled={!isSecondStepComplete}
                      className="bg-brand-sage text-foreground hover:bg-brand-sage/90 disabled:opacity-50"
                    >
                      Continue to Size
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Size Selection */}
              {options.step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl mb-4">Choose Your Size</h3>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="option">Standard Sizes</TabsTrigger>
                      <TabsTrigger value="custom">Custom Size</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="option" className="space-y-4">
                      <p className="text-sm text-muted-foreground">Select a standard size for your rug:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sizes.filter(s => s.id !== "custom").map((size) => (
                          <div
                            key={size.id}
                            className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              options.size.option === size.id
                                ? 'border-brand-sage bg-brand-sage/5'
                                : 'border-border/50 bg-white'
                            }`}
                            onClick={() => handleSizeSelect(size.id)}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{size.name}</span>
                              <span className="text-xs text-muted-foreground mt-1">{size.dimensions}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="custom" className="space-y-4">
                      <p className="text-sm text-muted-foreground">Enter your custom measurements:</p>
                      
                      <div className="space-y-4 p-4 border border-border/50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Width (cm)</label>
                            <input 
                              type="number"
                              value={options.size.width || ""}
                              onChange={(e) => handleCustomSizeChange("width", parseInt(e.target.value))}
                              className="w-full border border-border/50 rounded p-2 text-sm"
                              placeholder="Enter width"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Length (cm)</label>
                            <input 
                              type="number"
                              value={options.size.length || ""}
                              onChange={(e) => handleCustomSizeChange("length", parseInt(e.target.value))}
                              className="w-full border border-border/50 rounded p-2 text-sm"
                              placeholder="Enter length"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Shape</label>
                          <select 
                            value={options.size.shape}
                            onChange={(e) => handleCustomSizeChange("shape", e.target.value)}
                            className="w-full border border-border/50 rounded p-2 text-sm"
                          >
                            <option value="" disabled>Select shape</option>
                            {customShapes.map((shape) => (
                              <option key={shape} value={shape}>{shape}</option>
                            ))}
                          </select>
                        </div>
                        
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleSizeSelect("custom")}
                          className="mt-2"
                        >
                          Apply Custom Size
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Display selected options */}
                  {options.size.option && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Your selection:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Size:</span>
                          <span className="text-sm font-medium">
                            {options.size.option === "custom" 
                              ? `Custom (${options.size.width || 0} × ${options.size.length || 0} cm)` 
                              : sizes.find(s => s.id === options.size.option)?.dimensions || ""}
                          </span>
                        </div>
                        {options.size.option === "custom" && options.size.shape && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Shape:</span>
                            <span className="text-sm font-medium">{options.size.shape}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollAnimation>
          
          {/* Preview Panel */}
          <ScrollAnimation delay={200}>
            <div className="bg-white rounded-xl border border-border/50 overflow-hidden sticky top-20">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <h3 className="font-serif text-xl mb-1">Your Custom Rug</h3>
                  <p className="text-sm text-muted-foreground">Preview your selections and get an instant price estimate</p>
                </div>
                
                <div className="p-6">
                  <div className="aspect-video bg-gray-50 rounded-lg border border-border/50 flex items-center justify-center mb-6">
                    <div className="text-center p-6">
                      <p className="text-muted-foreground text-sm mb-2">Your custom rug preview</p>
                      {options.material.category ? (
                        <div className="space-y-2">
                          <div className="w-full aspect-[4/3] bg-amber-100 rounded-md relative overflow-hidden">
                            {/* Rug visual representation */}
                            <div 
                              className="absolute inset-4" 
                              style={{ 
                                backgroundColor: options.material.color === "Natural" ? "#D6C7A9" : 
                                               options.material.color === "Bleached" ? "#E8E4D9" :
                                               options.material.color ? "#D6C7A9" : "#F3EBD5",
                                borderWidth: options.border.type !== "none" ? "8px" : "0px",
                                borderStyle: "solid",
                                borderColor: options.border.color === "Black" ? "#333" :
                                             options.border.color === "White" ? "#F5F5F5" :
                                             options.border.color ? "#A9907E" : "transparent"
                              }}
                            >
                              {/* Inner border for double border type */}
                              {options.border.type === "double" && options.border.secondaryColor && (
                                <div 
                                  className="absolute inset-2" 
                                  style={{
                                    borderWidth: "4px",
                                    borderStyle: "solid",
                                    borderColor: options.border.secondaryColor === "Black" ? "#333" :
                                                 options.border.secondaryColor === "White" ? "#F5F5F5" :
                                                 options.border.secondaryColor ? "#8D7B68" : "transparent"
                                  }}
                                ></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-32 flex items-center justify-center">
                          <p className="text-muted-foreground text-sm">Select materials to see preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Selected Options</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Material:</span>
                          <span className="text-sm font-medium">
                            {options.material.category ? 
                              `${materialCategories.find(c => c.id === options.material.category)?.name} - ${options.material.color || "Not selected"}` : 
                              "Not selected"}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Border:</span>
                          <span className="text-sm font-medium">
                            {options.border.type === "none" ? 
                              "No Border" : 
                              options.border.type ? 
                                `${borderTypes.find(b => b.id === options.border.type)?.name} - ${options.border.color || "Not selected"}` : 
                                "Not selected"}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Size:</span>
                          <span className="text-sm font-medium">
                            {options.size.option ? 
                              options.size.option === "custom" ? 
                                `${options.size.width || 0}cm × ${options.size.length || 0}cm` : 
                                sizes.find(s => s.id === options.size.option)?.dimensions : 
                              "Not selected"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Estimated Price:</span>
                        <span className="text-xl font-serif">
                          {(isFirstStepComplete || isSecondStepComplete || isThirdStepComplete) ? 
                            `£${getEstimate()}` : 
                            "---"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Includes VAT and free UK delivery</p>
                    </div>
                    
                    <Button 
                      className="w-full bg-brand-sage hover:bg-brand-sage/90"
                      disabled={!isFirstStepComplete && !isSecondStepComplete && !isThirdStepComplete}
                    >
                      Add to Basket
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={!isFirstStepComplete && !isSecondStepComplete && !isThirdStepComplete}
                      onClick={addToMoodboard}
                    >
                      Add to Moodboard
                    </Button>

                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => window.location.href = "/samples"}
                    >
                      Order Samples
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      
      {/* Moodboard Section */}
      {moodboardItems.length > 0 && (
        <div className="container mx-auto px-4 md:px-6 mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Your Moodboard</h2>
            <p className="text-muted-foreground">
              Save your favorite rug designs to compare and decide later
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodboardItems.map((item) => (
              <div 
                key={item.id} 
                className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <div 
                  className="aspect-video relative cursor-pointer"
                  onClick={() => loadFromMoodboard(item)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Rug preview */}
                    <div className="w-4/5 h-4/5 relative">
                      <div 
                        className="absolute inset-0" 
                        style={{ 
                          backgroundColor: item.material.color === "Natural" ? "#D6C7A9" : 
                                        item.material.color === "Bleached" ? "#E8E4D9" :
                                        item.material.color ? "#D6C7A9" : "#F3EBD5",
                          borderWidth: item.border.type !== "none" ? "8px" : "0px",
                          borderStyle: "solid",
                          borderColor: item.border.color === "Black" ? "#333" :
                                      item.border.color === "White" ? "#F5F5F5" :
                                      item.border.color ? "#A9907E" : "transparent"
                        }}
                      >
                        {/* Inner border for double border type */}
                        {item.border.type === "double" && item.border.secondaryColor && (
                          <div 
                            className="absolute inset-2" 
                            style={{
                              borderWidth: "4px",
                              borderStyle: "solid",
                              borderColor: item.border.secondaryColor === "Black" ? "#333" :
                                          item.border.secondaryColor === "White" ? "#F5F5F5" :
                                          item.border.secondaryColor ? "#8D7B68" : "transparent"
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromMoodboard(item.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        {materialCategories.find(c => c.id === item.material.category)?.name || "Custom Rug"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getSelectedRange()?.name || ""} - {item.material.color}
                      </p>
                    </div>
                    <span className="font-serif text-lg">£{item.price}</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1 mt-3">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">
                        {item.size.option === "custom" 
                          ? `${item.size.width}×${item.size.length}cm` 
                          : sizes.find(s => s.id === item.size.option)?.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Border:</span>
                      <span className="font-medium">
                        {item.border.type === "none" 
                          ? "No Border" 
                          : borderTypes.find(b => b.id === item.border.type)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => loadFromMoodboard(item)}
                  >
                    Load Design
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Material Selection Full Screen Overlay */}
      <Sheet open={materialOverlayOpen} onOpenChange={setMaterialOverlayOpen}>
        <SheetContent side="bottom" className="h-[90vh] max-w-none p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-serif text-xl">
                {selectedCategory && `Select ${materialCategories.find(c => c.id === selectedCategory)?.name} Range`}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setMaterialOverlayOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* No preview section here - as requested */}
            
            <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center mr-4">
                  <span className="text-sm font-medium mr-2">Filter by:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {filterCategories.colors.map(color => (
                    <Button 
                      key={color}
                      variant={activeFilters[color] ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveFilters({...activeFilters, [color]: !activeFilters[color]})}
                      className="text-xs h-8"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center mr-4">
                  <span className="text-sm font-medium mr-2">Room:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {filterCategories.roomTypes.map(room => (
                    <Button 
                      key={room}
                      variant={activeFilters[room] ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveFilters({...activeFilters, [room]: !activeFilters[room]})}
                      className="text-xs h-8"
                    >
                      {room}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center mr-4">
                  <span className="text-sm font-medium mr-2">Weave:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {filterCategories.weaveTypes.map(weave => (
                    <Button 
                      key={weave}
                      variant={activeFilters[weave] ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveFilters({...activeFilters, [weave]: !activeFilters[weave]})}
                      className="text-xs h-8"
                    >
                      {weave}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={() => setActiveFilters({})}
                  >
                    Clear All
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {Object.values(activeFilters).filter(Boolean).length} filters applied
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm" 
                    className="text-xs h-8 flex items-center gap-1"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-3 w-3" />
                    Grid
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className="text-xs h-8 flex items-center gap-1"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-3 w-3" />
                    List
                  </Button>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedCategory && getFilteredRanges().map((range) => (
                    <div 
                      key={range.id}
                      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                        {/* Use the selected color's image or the first color by default */}
                        {(() => {
                          // Get the selected color or default to first color
                          const isRangeSelected = options.material.range === range.id;
                          const colorToShow = isRangeSelected && options.material.color ? options.material.color : range.colors[0];
                          
                          // Get the image for this color
                          const imageSrc = getProductImage(selectedCategory, range.name, colorToShow);
                          
                          return imageSrc ? (
                            <img 
                              src={imageSrc}
                              alt={`${range.name} - ${colorToShow}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback if image fails to load
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.style.backgroundColor = "#D6C7A9";
                              }}
                            />
                          ) : (
                            <div 
                              className="w-full h-full"
                              style={{ 
                                backgroundColor: range.id.includes("natural") ? "#D6C7A9" : 
                                              range.id.includes("grey") ? "#A9A9A9" : 
                                              "#D6C7A9" 
                              }}
                            />
                          );
                        })()}
                      </div>
                      
                      <div className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm">{range.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {range.colors.length} colors available
                            </p>
                          </div>
                        </div>
                        
                         <div className="mt-3 flex flex-wrap gap-2">
                          {range.colors.map((color, index) => {
                            // Try to get product image using the context helper
                            const swatchImage = getProductImage(
                              selectedCategory || "", 
                              range.name,
                              color
                            );
                            
                            return (
                              <div
                                key={`${color}-${index}`}
                                onClick={() => {
                                  handleMaterialRangeSelect(range.id);
                                  handleMaterialColorSelect(color, index, false); // Keep overlay open
                                }}
                                className={`border overflow-hidden ${selectedColorIndex === index && options.material.range === range.id ? 'ring-2 ring-brand-sage' : 'border-gray-200'} rounded-full w-8 h-8 cursor-pointer transition-all hover:scale-110`}
                                title={color}
                              >
                                {swatchImage ? (
                                  <img 
                                    src={swatchImage} 
                                    alt={color}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      // Fallback to color if image fails to load
                                      e.currentTarget.style.display = 'none';
                                      e.currentTarget.parentElement!.style.backgroundColor = 
                                        color === "Natural" ? "#D6C7A9" : 
                                        color === "Bleached" ? "#E8E4D9" :
                                        color === "Grey" ? "#A9A9A9" : 
                                        "#D6C7A9";
                                    }}
                                  />
                                ) : (
                                  <div 
                                    className="w-full h-full"
                                    style={{ 
                                      backgroundColor: color === "Natural" ? "#D6C7A9" : 
                                                    color === "Bleached" ? "#E8E4D9" :
                                                    color === "Grey" ? "#A9A9A9" : 
                                                    "#D6C7A9",
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-3"
                          onClick={() => {
                            handleMaterialRangeSelect(range.id);
                            // Keep overlay open for color selection
                          }}
                        >
                          View {range.name}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCategory && getFilteredRanges().map((range) => (
                    <div 
                      key={range.id}
                      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="w-32 h-24 overflow-hidden">
                          {/* Use the selected color's image or the first color by default */}
                          {(() => {
                            // Get the selected color or default to first color
                            const isRangeSelected = options.material.range === range.id;
                            const colorToShow = isRangeSelected && options.material.color ? options.material.color : range.colors[0];
                            
                            // Get the image for this color
                            const imageSrc = getProductImage(selectedCategory, range.name, colorToShow);
                            
                            return imageSrc ? (
                              <img 
                                src={imageSrc}
                                alt={`${range.name} - ${colorToShow}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement!.style.backgroundColor = "#D6C7A9";
                                }}
                              />
                            ) : (
                              <div 
                                className="w-full h-full"
                                style={{ 
                                  backgroundColor: range.id.includes("natural") ? "#D6C7A9" : 
                                                range.id.includes("grey") ? "#A9A9A9" : 
                                                "#D6C7A9" 
                                }}
                              />
                            );
                          })()}
                        </div>
                        
                        <div className="p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{range.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {range.colors.length} colors available
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {range.colors.slice(0, 8).map((color, index) => {
                              // Try to get product image using the context helper
                              const swatchImage = getProductImage(
                                selectedCategory || "", 
                                range.name,
                                color
                              );
                              
                              return (
                                <div
                                  key={`${color}-${index}`}
                                  onClick={() => {
                                    handleMaterialRangeSelect(range.id);
                                    handleMaterialColorSelect(color, index, false); // Keep overlay open
                                  }}
                                  className={`border overflow-hidden ${selectedColorIndex === index && options.material.range === range.id ? 'ring-2 ring-brand-sage' : 'border-gray-200'} rounded-full w-6 h-6 cursor-pointer transition-all hover:scale-110`}
                                  title={color}
                                >
                                  {swatchImage ? (
                                    <img 
                                      src={swatchImage} 
                                      alt={color}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        // Fallback to color if image fails to load
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.style.backgroundColor = 
                                          color === "Natural" ? "#D6C7A9" : 
                                          color === "Bleached" ? "#E8E4D9" :
                                          color === "Grey" ? "#A9A9A9" : 
                                          "#D6C7A9";
                                      }}
                                    />
                                  ) : (
                                    <div 
                                      className="w-full h-full"
                                      style={{ 
                                        backgroundColor: color === "Natural" ? "#D6C7A9" : 
                                                      color === "Bleached" ? "#E8E4D9" :
                                                      color === "Grey" ? "#A9A9A9" : 
                                                      "#D6C7A9",
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                            {range.colors.length > 8 && (
                              <span className="text-xs text-muted-foreground ml-1 flex items-center">
                                +{range.colors.length - 8} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-3 flex items-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              handleMaterialRangeSelect(range.id);
                            }}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Border Selection Full Screen Overlay */}
      <Sheet open={borderOverlayOpen} onOpenChange={setBorderOverlayOpen}>
        <SheetContent side="bottom" className="h-[90vh] max-w-none p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-serif text-xl">
                {selectedBorderType && `Select ${selectedBorderType === "outer" ? "Outer" : "Inner"} Border Material`}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setBorderOverlayOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center mr-4">
                  <span className="text-sm font-medium mr-2">Filter by:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {filterCategories.colors.map(color => (
                    <Button 
                      key={color}
                      variant={activeFilters[color] ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveFilters({...activeFilters, [color]: !activeFilters[color]})}
                      className="text-xs h-8"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={() => setActiveFilters({})}
                  >
                    Clear All
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {Object.values(activeFilters).filter(Boolean).length} filters applied
                  </span>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {borderMaterials.map((material) => (
                  <div key={material.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                      <h4 className="font-medium">{material.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm font-medium mb-3">Available Colors:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {material.colors.map((color) => (
                          <div
                            key={color}
                            className="border p-3 rounded-lg cursor-pointer hover:shadow-sm text-center transition-all hover:scale-105"
                            onClick={() => {
                              handleBorderMaterialSelect(material.id, isInnerBorder);
                              handleBorderColorSelect(color, isInnerBorder);
                            }}
                          >
                            <div 
                              className="w-full h-10 rounded mb-2 mx-auto"
                              style={{ 
                                backgroundColor: color === "Natural" ? "#D6C7A9" : 
                                               color === "Black" ? "#333333" :
                                               color === "Grey" ? "#A9A9A9" :
                                               color === "White" ? "#F5F5F5" :
                                               color === "Brown" ? "#8D6E63" : 
                                               "#D6C7A9" 
                              }}
                            ></div>
                            <span className="text-xs">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default RugBuilder;
