// RugBuilder.tsx
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
import { toast } from "sonner";
import FullScreenOverlay from './FullScreenOverlay';
import { MaterialCategory, Range, Product, FilterCategories, RugOptions, BorderMaterial, MoodboardItem } from "@/lib/types";

const borderTypes = [
  { id: "none", name: "No Border" },
  { id: "whipped", name: "Whipped Edge" },
  { id: "single", name: "Single Border" },
  { id: "double", name: "Double Border" }
];

const borderWidths: { [key: string]: Array<{ id: string; name: string }> } = {
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

const sizes = [
  { id: "small", name: "Small", dimensions: "120 x 170 cm" },
  { id: "medium", name: "Medium", dimensions: "160 x 230 cm" },
  { id: "large", name: "Large", dimensions: "200 x 290 cm" },
  { id: "xlarge", name: "Extra Large", dimensions: "240 x 340 cm" },
  { id: "custom", name: "Custom Size", dimensions: "Made to your exact measurements" }
];

const customShapes = ["Rectangle", "Square", "Circle", "Runner", "Other"];

const RugBuilder = () => {
  const {
    isLoading,
    error,
    materialCategories,
    materialRanges,
    filterCategories,
    getProductImage,
    products
  } = useRugDataContext();

  const [options, setOptions] = useState<RugOptions>({
    step: 1,
    material: {
      category: "", // Stores category ID
      range: "",    // Stores range ID
      color: ""     // Stores specific manufacturer color name
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

  const [moodboardItems, setMoodboardItems] = useState<MoodboardItem[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [materialOverlayOpen, setMaterialOverlayOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all"); // ID of the selected material category, or "all"
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({}); // Stores general filters like color and room
  const [borderOverlayOpen, setBorderOverlayOpen] = useState(false);
  const [selectedBorderType, setSelectedBorderType] = useState("");
  const [isInnerBorder, setIsInnerBorder] = useState(false);
  const [activeTab, setActiveTab] = useState("category");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null); // Index within the original range.colors array
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    // When selectedCategory (material filter) changes, we NO LONGER reset all activeFilters.
    // setActiveFilters({}); // THIS LINE IS REMOVED
    // If you needed to clear only specific types of filters that are
    // dependent on the material category, that logic would go here.
    // For global filters like Color and Room, they should persist.
  }, [selectedCategory]);

  const handleStepChange = (step: number) => {
    setOptions({ ...options, step });
    if (step === 1) setActiveTab("category");
    else if (step === 2) setActiveTab("type");
    else if (step === 3) setActiveTab(options.size.option === "custom" ? "custom" : "option");
  };

  const handleMaterialCategorySelect = (categoryId: string) => { // categoryId is an ID e.g. "sisal"
    setOptions(prev => ({ ...prev, material: { ...prev.material, category: categoryId, range: "", color: "" } }));
    setSelectedCategory(categoryId); // This will trigger the useEffect above, but it no longer clears activeFilters
    setMaterialOverlayOpen(true);
    setSelectedColorIndex(null);
  };

  const handleMaterialRangeSelect = (rangeId: string) => {
    // Determine the context for finding the range: either the explicitly selected material category or 'all' implies looking through available ranges.
    const contextCategoryKey = options.material.category && options.material.category !== 'all' 
        ? options.material.category 
        : selectedCategory; // Use selectedCategory from FullScreenOverlay if options.material.category isn't set or is 'all'

    let rangeData: Range | undefined;

    if (contextCategoryKey === 'all') {
        // If 'all' materials, search across all ranges
        const allRangesFlat = Object.values(materialRanges).flat();
        rangeData = allRangesFlat.find(r => r.id === rangeId);
    } else {
        // If a specific material category is selected
        rangeData = materialRanges[contextCategoryKey]?.find(r => r.id === rangeId);
    }
    
    const firstColorName = rangeData?.colors[0] || "";

    setOptions(prev => ({ ...prev, material: { ...prev.material, range: rangeId, color: firstColorName } }));
    setSelectedColorIndex(0);
    setForceUpdate(f => f + 1);
  };

  const handleMaterialColorSelect = (colorName: string, indexInOriginalRangeColors: number, closeOverlay: boolean = false) => {
    setSelectedColorIndex(indexInOriginalRangeColors);
    setOptions(prev => ({ ...prev, material: { ...prev.material, color: colorName } }));
    setForceUpdate(f => f + 1);
    if (closeOverlay) setMaterialOverlayOpen(false);
  };

  const handleNextStep = () => options.step < 3 && handleStepChange(options.step + 1);

  const handleBorderTypeSelect = (typeId: string) => {
    setOptions({ ...options, border: { type: typeId, width: "", material: "", color: "", secondaryMaterial: "", secondaryColor: "" } });
    if (typeId !== "none") setActiveTab("width");
  };

  const handleBorderWidthSelect = (widthId: string) => {
    setOptions({ ...options, border: { ...options.border, width: widthId } });
    setSelectedBorderType(options.border.type === "double" ? "outer" : options.border.type);
    setIsInnerBorder(options.border.type === "double" ? false : isInnerBorder);
    setBorderOverlayOpen(true);
    // setActiveFilters({}); // Do not clear filters here if they should persist for borders too
  };

  const handleBorderMaterialSelect = (materialId: string) => {
    if (isInnerBorder) {
      setOptions({ ...options, border: { ...options.border, secondaryMaterial: materialId, secondaryColor: "" } });
    } else {
      setOptions({ ...options, border: { ...options.border, material: materialId, color: "" } });
    }
  };
  
  const handleBorderColorSelect = (color: string) => {
    if (isInnerBorder) {
      setOptions({ ...options, border: { ...options.border, secondaryColor: color } });
      setBorderOverlayOpen(false); 
      setIsInnerBorder(false); 
    } else {
      setOptions({ ...options, border: { ...options.border, color } });
      if (options.border.type === "double") {
        setIsInnerBorder(true); 
        setSelectedBorderType("inner"); 
        // setActiveFilters({}); // Consider if border material/color selection should clear general filters
      } else {
        setBorderOverlayOpen(false); 
      }
    }
  };

  const handleSizeSelect = (sizeId: string) => {
    setOptions({ ...options, size: { ...options.size, option: sizeId, width: sizeId !== "custom" ? undefined : options.size.width, length: sizeId !== "custom" ? undefined : options.size.length, shape: sizeId !== "custom" ? "Rectangle" : options.size.shape } });
    setActiveTab(sizeId === "custom" ? "custom" : "option");
  };

  const handleCustomSizeChange = (field: string, value: string | number) => {
    setOptions({ ...options, size: { ...options.size, option: "custom", [field]: value } });
  };

  const addToMoodboard = () => {
    const newItem: MoodboardItem = { ...options, id: `moodboard-${Date.now()}`, price: getEstimate(), createdAt: new Date() };
    setMoodboardItems(prev => [...prev, newItem]);
    toast.success("Added to moodboard");
  };

  const removeFromMoodboard = (id: string) => {
    setMoodboardItems(prev => prev.filter(item => item.id !== id));
    toast.success("Removed from moodboard");
  };

  const loadFromMoodboard = (item: MoodboardItem) => {
    setOptions({ ...item });
    if (item.step === 1) setActiveTab("category");
    else if (item.step === 2) setActiveTab("type");
    else if (item.step === 3) setActiveTab(item.size.option === "custom" ? "custom" : "option");
    document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
    toast.success("Design loaded to builder");
  };

  const getEstimate = () => {
    const basePrice = 250;
    let materialMultiplier = 1;
    const selectedMaterial = materialCategories.find(mc => mc.id === options.material.category);
    if (selectedMaterial) {
        if (selectedMaterial.name.toLowerCase() === "wool") materialMultiplier = 1.5;
        else if (selectedMaterial.name.toLowerCase() === "sisool") materialMultiplier = 1.4;
        else if (selectedMaterial.name.toLowerCase() === "sisal") materialMultiplier = 1.2;
        else if (selectedMaterial.name.toLowerCase() === "seagrass") materialMultiplier = 1.1;
    }


    let borderPrice = 0;
    if (options.border.type === "whipped") borderPrice = 20;
    else if (options.border.type === "single") {
      if (options.border.width === "slim") borderPrice = 40;
      else if (options.border.width === "medium") borderPrice = 60;
      else if (options.border.width === "wide") borderPrice = 80;
      if (options.border.material === "leather") borderPrice += 30;
      else if (options.border.material === "suede") borderPrice += 25;
    } else if (options.border.type === "double") {
      borderPrice = 100;
      if (options.border.material === "leather" || options.border.secondaryMaterial === "leather") borderPrice += 40;
      else if (options.border.material === "suede" || options.border.secondaryMaterial === "suede") borderPrice += 30;
    }

    let sizeMultiplier = 1;
    if (options.size.option === "small") sizeMultiplier = 0.8;
    else if (options.size.option === "medium") sizeMultiplier = 1;
    else if (options.size.option === "large") sizeMultiplier = 1.3;
    else if (options.size.option === "xlarge") sizeMultiplier = 1.6;
    else if (options.size.option === "custom") {
      if (options.size.width && options.size.length) {
        const area = (options.size.width * options.size.length) / 10000;
        if (area < 2) sizeMultiplier = 0.7;
        else if (area < 3.7) sizeMultiplier = 0.8;
        else if (area < 5.8) sizeMultiplier = 1;
        else if (area < 8.2) sizeMultiplier = 1.3;
        else sizeMultiplier = 1.6 + ((area - 8.2) * 0.1);
      }
    }
    return Math.round((basePrice * materialMultiplier + borderPrice) * sizeMultiplier);
  };

  const matchesActiveFilters = (range: Range, categoryContextId: string): boolean => {
    if (!products || !Array.isArray(products)) return false;

    const currentActiveColorFilters = Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.colors.includes(key));
    const currentActiveRoomFilters = Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.roomTypes.includes(key));
    const currentActiveWeaveFilters = Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.weaveTypes.includes(key)); 

    if (currentActiveColorFilters.length === 0 && currentActiveRoomFilters.length === 0 && currentActiveWeaveFilters.length === 0) {
      return true; 
    }

    return products.some(product => {
      const productCategoryAsId = product.category ? product.category.toLowerCase().replace(/\s+/g, '-') : "";
      if (product.range.toLowerCase() !== range.name.toLowerCase()) return false;
      if (categoryContextId.toLowerCase() !== 'all' && productCategoryAsId !== categoryContextId.toLowerCase()) return false;

      const colorFilterMatch = currentActiveColorFilters.length === 0 ||
        (Array.isArray(product.colors) && product.colors.some(prodColorCat =>
          currentActiveColorFilters.some(filterColor =>
            prodColorCat.toLowerCase().includes(filterColor.toLowerCase())
          )
        ));

      const roomFilterMatch = currentActiveRoomFilters.length === 0 ||
        (Array.isArray(product.roomTypes) && product.roomTypes.some(roomType =>
          currentActiveRoomFilters.some(filterRoom =>
            roomType.toLowerCase().includes(filterRoom.toLowerCase())
          )
        ));
      
      const weaveFilterMatch = currentActiveWeaveFilters.length === 0 ||
        (Array.isArray(product.weaveTypes) && product.weaveTypes.some(weaveType =>
          currentActiveWeaveFilters.some(filterWeave =>
            weaveType.toLowerCase().includes(filterWeave.toLowerCase())
          )
        ));

      return colorFilterMatch && roomFilterMatch && weaveFilterMatch;
    });
  };

  const getFilteredRanges = (): Range[] => {
    const currentCategoryKey = selectedCategory; // This is an ID like "sisal" or "all"
    let rangesToFilter: Range[] = [];

    if (currentCategoryKey === 'all') {
      const allRangesMap = new Map<string, Range>();
      Object.values(materialRanges).flat().forEach(range => {
        if (!allRangesMap.has(range.name)) {
          allRangesMap.set(range.name, range);
        }
      });
      rangesToFilter = Array.from(allRangesMap.values());
    } else {
      rangesToFilter = materialRanges[currentCategoryKey] || [];
    }
    
    // If no filters are active (e.g. activeFilters is empty or all values are false)
    if (Object.values(activeFilters).every(val => !val)) { 
        return rangesToFilter; // Return all ranges for the current material category
    }

    // Otherwise, filter these ranges based on active filters
    return rangesToFilter.filter(range => matchesActiveFilters(range, currentCategoryKey));
  };
  
  const getSelectedRange = () => {
    if (!options.material.category || !options.material.range) return undefined;
    const rangesForCategory = materialRanges[options.material.category];
    if (!rangesForCategory) { // If category not found (e.g. 'all' or invalid id) search all
        return Object.values(materialRanges).flat().find(r => r.id === options.material.range);
    }
    return rangesForCategory.find(r => r.id === options.material.range);
  };

  const getSelectedMaterialName = () => {
    if (!options.material.category) return "";
    return materialCategories.find(c => c.id === options.material.category)?.name || "";
  };

  const getSelectedMaterialRangeName = () => {
    if (!options.material.range) return "";
    return getSelectedRange()?.name || "";
  };

  const isStepComplete = (step: number) => {
    if (step === 1) return !!(options.material.category && options.material.range && options.material.color);
    if (step === 2) {
      if (options.border.type === "none") return true;
      if (options.border.type === "whipped") return !!(options.border.width && options.border.material && options.border.color);
      if (options.border.type === "single") return !!(options.border.width && options.border.material && options.border.color);
      if (options.border.type === "double") return !!(options.border.width && options.border.material && options.border.color && options.border.secondaryMaterial && options.border.secondaryColor);
      return false;
    }
    if (step === 3) {
      if (options.size.option === "custom") return !!(options.size.width && options.size.width > 0 && options.size.length && options.size.length > 0 && options.size.shape);
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
    if (options.step > 1 || isStepComplete(1)) percent = 33.3;
    else if (options.material.category) { percent = 11.1; if (options.material.range) percent = 22.2; if (options.material.color) percent = 33.3; }
    if (options.step > 2 || isStepComplete(2)) percent += 33.3;
    else if (options.step === 2) {
      if (options.border.type) percent += 8.3; if (options.border.type === "none") percent += 25;
      else if (options.border.width) percent += 8.3; if (options.border.material) percent += 8.3;
      if (options.border.color) { if (options.border.type !== "double") percent += 8.3; else if (options.border.secondaryMaterial) percent += 4.15; if (options.border.secondaryColor) percent += 4.15; }
    }
    if (isStepComplete(3)) percent += 33.4;
    else if (options.step === 3 && options.size.option) { percent += 16.7; if (options.size.option !== "custom" || (options.size.width && options.size.length && options.size.shape)) { percent += 16.7; } }
    return Math.min(100, Math.round(percent));
  };

  const isFirstStepComplete = isStepComplete(1);
  const isSecondStepComplete = isStepComplete(2);
  const isThirdStepComplete = isStepComplete(3);

  if (isLoading) return <div className="flex flex-col items-center justify-center min-h-[300px] p-8"><div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" /><p className="text-muted-foreground">Loading rug data...</p></div>;
  if (error) return <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-destructive"><p className="font-medium mb-2">Error loading rug data</p><p className="text-sm text-muted-foreground">{error.message}</p><Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Try Again</Button></div>;

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="mb-4 inline-flex"><span className="bg-brand-sage/20 text-brand-sage px-3 py-1 rounded-full text-xs font-medium tracking-wider">BESPOKE DESIGN</span></div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Create Your Perfect Rug</h2>
            <p className="text-muted-foreground">Our custom rug builder allows you to design a rug that's perfectly tailored to your space and style. Choose from hundreds of combinations of materials, borders, and sizes.</p>
          </div>
        </ScrollAnimation>

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
          <ScrollAnimation delay={100}>
            <div className="bg-white rounded-xl p-6 md:p-8 border border-border/50">
              <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 bg-border -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-[calc(16.67%+8px)] h-0.5 bg-brand-sage -translate-y-1/2" style={{ width: `calc(${(options.step - 1) * 33.33}% + ${isStepComplete(options.step - 1) ? '33.33%' : '0%'} - ${options.step === 1 ? '16.67%' : '0px'})` }}></div>
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center relative z-10">
                    <button onClick={() => stepNumber < options.step && isStepComplete(stepNumber - 1) && handleStepChange(stepNumber)} className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 transition-colors ${stepNumber === options.step ? 'bg-brand-sage text-white cursor-default' : isStepComplete(stepNumber) ? 'bg-brand-sage/20 text-brand-sage cursor-pointer hover:bg-brand-sage/30' : stepNumber < options.step && isStepComplete(stepNumber - 1) ? 'bg-gray-200 text-gray-600 cursor-pointer hover:bg-gray-300' : 'bg-border text-muted-foreground cursor-default'}`} disabled={stepNumber > options.step && !isStepComplete(stepNumber - 1)}>
                      {isStepComplete(stepNumber) ? <Check size={16} /> : stepNumber}
                    </button>
                    <div className={`text-xs font-medium whitespace-nowrap transition-colors ${options.step === stepNumber || isStepComplete(stepNumber) ? 'text-brand-sage' : 'text-muted-foreground'}`}>{stepNumber === 1 ? "Material" : stepNumber === 2 ? "Border" : "Size"}</div>
                  </div>
                ))}
              </div>

              {options.step === 1 && ( 
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl mb-4">Choose Your Material</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select a material category for your rug:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {materialCategories.map((category) => (<div key={category.id} className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${options.material.category === category.id ? 'border-brand-sage bg-brand-sage/5 ring-2 ring-brand-sage' : 'border-border/50 bg-white hover:border-brand-sage/50'}`} onClick={() => handleMaterialCategorySelect(category.id)}><div className="flex flex-col"><span className="font-medium">{category.name}</span><span className="text-xs text-muted-foreground mt-1">{category.description}</span></div></div>))}
                    </div>
                  </div>
                  {options.material.category && (<div className="mt-4 p-4 bg-gray-50 rounded-lg border"><h4 className="font-medium text-sm mb-2">Your selection:</h4><div className="space-y-2"><div className="flex justify-between"><span className="text-sm text-muted-foreground">Material:</span><span className="text-sm font-medium">{getSelectedMaterialName()}</span></div>{options.material.range && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">Range:</span><span className="text-sm font-medium">{getSelectedMaterialRangeName()}</span></div>)}{options.material.color && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">Color:</span><span className="text-sm font-medium">{options.material.color}</span></div>)}{(!options.material.range || !options.material.color) && (<Button variant="link" className="p-0 h-auto text-brand-sage hover:text-brand-sage/80" onClick={() => setMaterialOverlayOpen(true)}>{options.material.range ? "Select Color" : "Select Range & Color"}</Button>)}</div></div>)}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 bg-accent/20 p-3 rounded-lg"><InfoIcon size={14} className="text-brand-sage flex-shrink-0" /><span>Not sure which material to choose?<a href="#" className="text-brand-sage hover:text-brand-sage/80 ml-1">Request free material samples</a></span></div>
                  <div className="flex justify-end mt-6"><Button onClick={handleNextStep} disabled={!isFirstStepComplete} className="bg-brand-sage text-foreground hover:bg-brand-sage/90 disabled:opacity-50">Continue to Border<ChevronRight size={16} className="ml-1" /></Button></div>
                </div>
              )}

              {options.step === 2 && ( 
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl mb-4">Choose Your Border</h3>
                  <div className="space-y-4"><p className="text-sm text-muted-foreground">Select a border type for your rug:</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{borderTypes.map((borderType) => (<div key={borderType.id} className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${options.border.type === borderType.id ? 'border-brand-sage bg-brand-sage/5 ring-2 ring-brand-sage' : 'border-border/50 bg-white hover:border-brand-sage/50'}`} onClick={() => handleBorderTypeSelect(borderType.id)}><span>{borderType.name}</span></div>))}</div></div>
                  {options.border.type && options.border.type !== "none" && (<div className="space-y-4"><p className="text-sm text-muted-foreground">Select a border width:</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{renderCurrentBorderWidths().map((width) => (<div key={width.id} className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${options.border.width === width.id ? 'border-brand-sage bg-brand-sage/5 ring-2 ring-brand-sage' : 'border-border/50 bg-white hover:border-brand-sage/50'}`} onClick={() => handleBorderWidthSelect(width.id)}><span>{width.name}</span></div>))}</div></div>)}
                  {options.border.type && (<div className="mt-4 p-4 bg-gray-50 rounded-lg border"><h4 className="font-medium text-sm mb-2">Your selection:</h4><div className="space-y-2"><div className="flex justify-between"><span className="text-sm text-muted-foreground">Border type:</span><span className="text-sm font-medium">{borderTypes.find(b => b.id === options.border.type)?.name || ""}</span></div>{options.border.width && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">Width:</span><span className="text-sm font-medium">{borderWidths[options.border.type as keyof typeof borderWidths]?.find(w => w.id === options.border.width)?.name || ""}</span></div>)}{options.border.material && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">{(options.border.type === "double" ? "Outer b" : "B") + "order material:"}</span><span className="text-sm font-medium">{borderMaterials.find(m => m.id === options.border.material)?.name || ""}</span></div>)}{options.border.color && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">{(options.border.type === "double" ? "Outer b" : "B") + "order color:"}</span><span className="text-sm font-medium">{options.border.color}</span></div>)}{options.border.secondaryMaterial && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">Inner border material:</span><span className="text-sm font-medium">{borderMaterials.find(m => m.id === options.border.secondaryMaterial)?.name || ""}</span></div>)}{options.border.secondaryColor && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">Inner border color:</span><span className="text-sm font-medium">{options.border.secondaryColor}</span></div>)}{options.border.type !== "none" && (!options.border.material || (options.border.type === "double" && !options.border.secondaryMaterial)) && (<Button variant="link" className="p-0 h-auto text-brand-sage hover:text-brand-sage/80" onClick={() => setBorderOverlayOpen(true)}>Select Border Material & Color</Button>)}</div></div>)}
                  <div className="flex justify-end mt-6"><Button onClick={handleNextStep} disabled={!isSecondStepComplete} className="bg-brand-sage text-foreground hover:bg-brand-sage/90 disabled:opacity-50">Continue to Size<ChevronRight size={16} className="ml-1" /></Button></div>
                </div>
              )}

              {options.step === 3 && ( 
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl mb-4">Choose Your Size</h3>
                  <Tabs value={options.size.option === 'custom' ? 'custom' : 'option'} onValueChange={(value) => handleSizeSelect(value === 'custom' ? 'custom' : options.size.option || sizes[0].id)} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4"><TabsTrigger value="option">Standard Sizes</TabsTrigger><TabsTrigger value="custom">Custom Size</TabsTrigger></TabsList>
                    <TabsContent value="option" className="space-y-4"><p className="text-sm text-muted-foreground">Select a standard size for your rug:</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{sizes.filter(s => s.id !== "custom").map((size) => (<div key={size.id} className={`border p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${options.size.option === size.id ? 'border-brand-sage bg-brand-sage/5 ring-2 ring-brand-sage' : 'border-border/50 bg-white hover:border-brand-sage/50'}`} onClick={() => handleSizeSelect(size.id)}><div className="flex flex-col"><span className="font-medium">{size.name}</span><span className="text-xs text-muted-foreground mt-1">{size.dimensions}</span></div></div>))}</div></TabsContent>
                    <TabsContent value="custom" className="space-y-4"><p className="text-sm text-muted-foreground">Enter your custom measurements:</p><div className="space-y-4 p-4 border border-border/50 rounded-lg"><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label htmlFor="customWidth" className="text-sm font-medium">Width (cm)</label><input id="customWidth" type="number" value={options.size.width || ""} onChange={(e) => handleCustomSizeChange("width", parseInt(e.target.value) || 0)} className="w-full border border-border/50 rounded p-2 text-sm" placeholder="e.g. 150" /></div><div className="space-y-2"><label htmlFor="customLength" className="text-sm font-medium">Length (cm)</label><input id="customLength" type="number" value={options.size.length || ""} onChange={(e) => handleCustomSizeChange("length", parseInt(e.target.value) || 0)} className="w-full border border-border/50 rounded p-2 text-sm" placeholder="e.g. 220" /></div></div><div className="space-y-2"><label htmlFor="customShape" className="text-sm font-medium">Shape</label><select id="customShape" value={options.size.shape} onChange={(e) => handleCustomSizeChange("shape", e.target.value)} className="w-full border border-border/50 rounded p-2 text-sm bg-white">{customShapes.map((shape) => (<option key={shape} value={shape}>{shape}</option>))}</select></div><Button size="sm" variant="outline" onClick={() => handleSizeSelect("custom")} className="mt-2">Apply Custom Size</Button></div></TabsContent>
                  </Tabs>
                  {options.size.option && (<div className="mt-4 p-4 bg-gray-50 rounded-lg border"><h4 className="font-medium text-sm mb-2">Your selection:</h4><div className="space-y-2"><div className="flex justify-between"><span className="text-sm text-muted-foreground">Size:</span><span className="text-sm font-medium">{options.size.option === "custom" ? `Custom (${options.size.width || "_"} × ${options.size.length || "_"} cm)` : sizes.find(s => s.id === options.size.option)?.name || ""}</span></div>{options.size.option === "custom" && options.size.shape && (<div className="flex justify-between"><span className="text-sm text-muted-foreground">Shape:</span><span className="text-sm font-medium">{options.size.shape}</span></div>)}</div></div>)}
                </div>
              )}
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}> 
            <div className="bg-white rounded-xl border border-border/50 overflow-hidden sticky top-20"><div className="flex flex-col h-full"><div className="p-6 border-b"><h3 className="font-serif text-xl mb-1">Your Custom Rug</h3><p className="text-sm text-muted-foreground">Preview your selections and get an instant price estimate</p></div><div className="p-6"><div className="aspect-video bg-gray-100 rounded-lg border border-border/50 flex items-center justify-center mb-6 overflow-hidden"><div className="text-center p-1 w-full h-full">{options.material.category && options.material.color ? (<div className="w-full h-full bg-gray-200 rounded-md relative"><div className="absolute inset-4 transition-all duration-300" style={{ backgroundColor: options.material.color ? `var(--color-${options.material.color.toLowerCase().replace(/\s+/g, '-')}, #D6C7A9)`: '#F3EBD5', borderWidth: options.border.type !== "none" && options.border.width ? (borderWidths[options.border.type as keyof typeof borderWidths]?.find(w => w.id === options.border.width)?.name.includes("7.5") ? '12px' : borderWidths[options.border.type as keyof typeof borderWidths]?.find(w => w.id === options.border.width)?.name.includes("5.5") ? '10px' : '6px') : "0px", borderStyle: "solid", borderColor: options.border.color ? `var(--color-${options.border.color.toLowerCase().replace(/\s+/g, '-')}, #A9907E)` : "transparent" }}>{options.border.type === "double" && options.border.secondaryColor && (<div className="absolute inset-1 transition-all duration-300" style={{ borderWidth: (borderWidths[options.border.type as keyof typeof borderWidths]?.find(w => w.id === options.border.width)?.name.includes("5.5") ? '6px' : '4px'), borderStyle: "solid", borderColor: options.border.secondaryColor ? `var(--color-${options.border.secondaryColor.toLowerCase().replace(/\s+/g, '-')}, #8D7B68)` : "transparent" }}></div>)}</div><span className="absolute bottom-2 right-2 text-xs text-gray-400 p-1 bg-white/50 rounded">Visualisation</span></div>) : (<div className="h-full flex items-center justify-center"><p className="text-muted-foreground text-sm">Select materials to see preview</p></div>)}</div></div><div className="space-y-4"><div><h4 className="text-sm font-medium mb-2">Selected Options</h4><div className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Material:</span><span className="text-sm font-medium text-right">{options.material.category ? `${getSelectedMaterialName()} - ${getSelectedMaterialRangeName()} - ${options.material.color || "Not selected"}` : "Not selected"}</span></div><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Border:</span><span className="text-sm font-medium text-right">{options.border.type === "none" ? "No Border" : options.border.type ? `${borderTypes.find(b => b.id === options.border.type)?.name}${options.border.material ? ` - ${borderMaterials.find(m => m.id === options.border.material)?.name}` : ''}${options.border.color ? ` - ${options.border.color}` : ''}` : "Not selected"}</span></div>{options.border.type === "double" && options.border.secondaryMaterial && (<div className="flex items-center justify-between"><span className="text-sm text-muted-foreground pl-2">Inner Border:</span><span className="text-sm font-medium text-right">{`${borderMaterials.find(m => m.id === options.border.secondaryMaterial)?.name} - ${options.border.secondaryColor || "Not selected"}`}</span></div>)}<div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Size:</span><span className="text-sm font-medium text-right">{options.size.option ? options.size.option === "custom" ? `${options.size.shape || "Custom Shape"} (${options.size.width || "_"}cm × ${options.size.length || "_"}cm)` : sizes.find(s => s.id === options.size.option)?.dimensions : "Not selected"}</span></div></div></div><div className="pt-4 border-t"><div className="flex items-center justify-between mb-1"><span className="font-medium">Estimated Price:</span><span className="text-xl font-serif">{(isFirstStepComplete || isSecondStepComplete || isThirdStepComplete) ? `£${getEstimate()}` : "---"}</span></div><p className="text-xs text-muted-foreground">Includes VAT and free UK delivery</p></div><Button className="w-full bg-brand-sage hover:bg-brand-sage/90" disabled={!isFirstStepComplete || !isSecondStepComplete || !isThirdStepComplete}>Add to Basket</Button><Button variant="outline" className="w-full" disabled={!(isFirstStepComplete || isSecondStepComplete || isThirdStepComplete)} onClick={addToMoodboard}>Add to Moodboard</Button><Button variant="secondary" className="w-full" onClick={() => window.location.href = "/samples"}>Order Samples</Button></div></div></div></div>
          </ScrollAnimation>
        </div>
      </div>

      {moodboardItems.length > 0 && ( 
        <div className="container mx-auto px-4 md:px-6 mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10"><h2 className="text-3xl md:text-4xl font-serif mb-4">Your Moodboard</h2><p className="text-muted-foreground">Save your favorite rug designs to compare and decide later</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodboardItems.map((item) => {
              const itemMaterialName = materialCategories.find(c => c.id === item.material.category)?.name || "Custom Rug";
              const itemMaterialRangeData = materialRanges[item.material.category as keyof typeof materialRanges]?.find(r => r.id === item.material.range);
              const itemMaterialRangeName = itemMaterialRangeData?.name || "";
              return (<div key={item.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"><div className="aspect-video relative cursor-pointer bg-gray-100" onClick={() => loadFromMoodboard(item)}><div className="absolute inset-0 flex items-center justify-center p-4"><div className="w-full h-full relative"><div className="absolute inset-2" style={{ backgroundColor: item.material.color ? `var(--color-${item.material.color.toLowerCase().replace(/\s+/g, '-')}, #D6C7A9)` : '#F3EBD5', borderWidth: item.border.type !== "none" ? '6px' : "0px", borderStyle: "solid", borderColor: item.border.color ? `var(--color-${item.border.color.toLowerCase().replace(/\s+/g, '-')}, #A9907E)` : "transparent" }}>{item.border.type === "double" && item.border.secondaryColor && (<div className="absolute inset-1" style={{ borderWidth: "3px", borderStyle: "solid", borderColor: item.border.secondaryColor ? `var(--color-${item.border.secondaryColor.toLowerCase().replace(/\s+/g, '-')}, #8D7B68)` : "transparent" }}></div>)}</div></div></div><Button variant="destructive" size="icon" className="absolute top-2 right-2 z-10 h-7 w-7" onClick={(e) => { e.stopPropagation(); removeFromMoodboard(item.id); }}><X className="h-4 w-4" /></Button></div><div className="p-4"><div className="flex justify-between items-start mb-2"><div><h3 className="font-medium">{itemMaterialName}</h3><p className="text-sm text-muted-foreground truncate w-40" title={`${itemMaterialRangeName} - ${item.material.color}`}>{itemMaterialRangeName} - {item.material.color}</p></div><span className="font-serif text-lg">£{item.price}</span></div><div className="text-xs text-muted-foreground space-y-1 mt-3"><div className="flex justify-between"><span>Size:</span><span className="font-medium">{item.size.option === "custom" ? `${item.size.width}×${item.size.length}cm, ${item.size.shape}` : sizes.find(s => s.id === item.size.option)?.name}</span></div><div className="flex justify-between"><span>Border:</span><span className="font-medium">{item.border.type === "none" ? "No Border" : `${borderTypes.find(b => b.id === item.border.type)?.name} - ${borderMaterials.find(m => m.id === item.border.material)?.name || ''}`}</span></div></div><Button variant="outline" size="sm" className="w-full mt-3" onClick={() => loadFromMoodboard(item)}>Load Design</Button></div></div>)
            })}
          </div>
        </div>
      )}

      <FullScreenOverlay
        materialOverlayOpen={materialOverlayOpen}
        setMaterialOverlayOpen={setMaterialOverlayOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        materialCategories={materialCategories}
        filterCategories={filterCategories}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        getFilteredRanges={getFilteredRanges}
        getProductImage={getProductImage}
        handleMaterialRangeSelect={handleMaterialRangeSelect}
        handleMaterialColorSelect={handleMaterialColorSelect}
        options={options}
        products={products}
        selectedColorIndex={selectedColorIndex}
        forceUpdate={forceUpdate}
        borderOverlayOpen={borderOverlayOpen}
        setBorderOverlayOpen={setBorderOverlayOpen}
        selectedBorderType={selectedBorderType}
        borderMaterials={borderMaterials}
        handleBorderMaterialSelect={handleBorderMaterialSelect}
        handleBorderColorSelect={handleBorderColorSelect}
        isInnerBorder={isInnerBorder}
      />
    </section>
  );
};

export default RugBuilder;