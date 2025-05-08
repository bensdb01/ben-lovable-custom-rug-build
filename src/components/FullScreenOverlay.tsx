
import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types for material data
export interface MaterialColor {
  name: string;
  hex: string;
}

export interface MaterialRange {
  id: string;
  name: string;
  description?: string;
  colors: MaterialColor[];
  thumbnail: string;
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  ranges: MaterialRange[];
}

interface FilterOption {
  id: string;
  label: string;
}

interface FullScreenOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  materialCategories: MaterialCategory[];
  initialCategory?: string;
  initialRange?: string;
  initialColor?: string;
  onSelect: (category: string, range: string, color: string) => void;
  filters?: {
    options: FilterOption[];
    activeFilter: string;
    onFilterChange: (filterId: string) => void;
  };
}

const FullScreenOverlay = ({
  isOpen,
  onClose,
  title,
  description,
  materialCategories,
  initialCategory,
  initialRange,
  initialColor,
  onSelect,
  filters
}: FullScreenOverlayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [selectedRange, setSelectedRange] = useState<string | undefined>(initialRange);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(initialColor);
  const [colorFilter, setColorFilter] = useState("");
  const [activeRangeThumbnail, setActiveRangeThumbnail] = useState<string>("");
  
  // Reset selections when overlay opens with new initial values
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory);
      setSelectedRange(initialRange);
      setSelectedColor(initialColor);
      
      // Set the active thumbnail when opening
      if (initialCategory && initialRange) {
        const category = materialCategories.find(cat => cat.id === initialCategory);
        const range = category?.ranges.find(r => r.id === initialRange);
        if (range) {
          setActiveRangeThumbnail(range.thumbnail);
        }
      }
    }
  }, [isOpen, initialCategory, initialRange, initialColor, materialCategories]);

  const handleConfirmSelection = () => {
    if (selectedCategory && selectedRange && selectedColor) {
      onSelect(selectedCategory, selectedRange, selectedColor);
      onClose();
    }
  };

  const handleRangeSelect = (categoryId: string, rangeId: string) => {
    const category = materialCategories.find(cat => cat.id === categoryId);
    const range = category?.ranges.find(r => r.id === rangeId);
    
    // Check if this range is already selected
    const isAlreadySelected = selectedRange === rangeId && selectedCategory === categoryId;
    
    setSelectedCategory(categoryId);
    setSelectedRange(rangeId);
    
    // Update the active thumbnail
    if (range) {
      setActiveRangeThumbnail(range.thumbnail);
    }
    
    // If clicking the same range again and a color is already selected, confirm the selection
    if (isAlreadySelected && selectedColor) {
      handleConfirmSelection();
    }
  };

  const handleColorSelect = (colorName: string, colorHex: string) => {
    setSelectedColor(colorName);
    
    // Change the thumbnail background color to represent the selected color
    if (selectedRange && selectedCategory) {
      // This would ideally update the thumbnail image, but for now we'll rely on the color confirmation display
    }
  };

  // Find the current category and range
  const currentCategory = materialCategories.find(cat => cat.id === selectedCategory);
  const currentRange = currentCategory?.ranges.find(r => r.id === selectedRange);
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[90vh] w-full sm:max-w-full p-0 overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex justify-between items-center">
            <SheetHeader className="text-left">
              <SheetTitle className="text-xl">{title}</SheetTitle>
              {description && <SheetDescription>{description}</SheetDescription>}
            </SheetHeader>
            <SheetClose className="rounded-full p-2 hover:bg-gray-100">
              <X size={20} />
            </SheetClose>
          </div>
          
          {/* Material Category Filters */}
          {filters && filters.options.length > 0 && (
            <Tabs 
              defaultValue={filters.activeFilter} 
              value={filters.activeFilter}
              onValueChange={filters.onFilterChange}
              className="mt-4"
            >
              <TabsList className="w-full flex overflow-x-auto">
                {filters.options.map(filter => (
                  <TabsTrigger 
                    key={filter.id}
                    value={filter.id}
                    className="flex-1 min-w-[100px]"
                  >
                    {filter.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>

        <div className="p-4">
          {/* Material Categories and Ranges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column: Categories and ranges */}
            <div className="col-span-1 md:col-span-1 space-y-6">
              {(selectedCategory ? 
                materialCategories.filter(cat => cat.id === selectedCategory) : 
                materialCategories
              ).map(category => (
                <div key={category.id} className="space-y-6">
                  {!selectedCategory && (
                    <h3 className="text-lg font-medium">{category.name}</h3>
                  )}
                  
                  {category.ranges.map(range => {
                    const isRangeSelected = selectedRange === range.id && selectedCategory === category.id;
                    
                    return (
                      <div key={range.id} 
                        className={`border rounded-lg overflow-hidden transition-all ${isRangeSelected ? 'ring-2 ring-brand-accent' : 'border-gray-200'}`}
                        onClick={() => handleRangeSelect(category.id, range.id)}
                      >
                        <div className="p-4 cursor-pointer">
                          <h4 className="font-medium">{range.name}</h4>
                          {range.description && <p className="text-sm text-gray-500 mt-1">{range.description}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            {/* Center/right columns: Selected range preview and colors */}
            <div className="col-span-1 md:col-span-2">
              {selectedRange && selectedCategory && currentRange && (
                <div className="space-y-6">
                  {/* Large thumbnail view */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-50 relative">
                      {/* Range Thumbnail */}
                      <div
                        className="w-full h-full"
                        style={{ 
                          backgroundColor: selectedColor ? 
                            currentRange.colors.find(c => c.name === selectedColor)?.hex || "#e2e8f0" : 
                            "#e2e8f0",
                          backgroundImage: `url(${activeRangeThumbnail || currentRange.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundBlendMode: 'multiply'
                        }}
                      />
                      
                      {/* Material info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4">
                        <h3 className="font-medium">{currentCategory?.name} - {currentRange.name}</h3>
                        {selectedColor && (
                          <div className="flex items-center gap-2 mt-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ 
                                backgroundColor: currentRange.colors.find(c => c.name === selectedColor)?.hex || "#e2e8f0" 
                              }}
                            />
                            <span className="text-sm">{selectedColor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Color selection */}
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-3">Select Color</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {currentRange.colors.map(color => {
                        const isColorSelected = selectedColor === color.name;
                        
                        return (
                          <div
                            key={color.name}
                            onClick={() => handleColorSelect(color.name, color.hex)}
                            className={`p-3 rounded-lg cursor-pointer transition-all border ${
                              isColorSelected ? 'ring-2 ring-brand-accent border-brand-accent' : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-full" 
                                style={{ backgroundColor: color.hex }}
                              />
                              <div className="flex-1">
                                <span className="block text-sm font-medium">{color.name}</span>
                                <span className="block text-xs text-gray-500">{color.hex}</span>
                              </div>
                              {isColorSelected && <Check size={16} className="text-brand-accent" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Confirm selection button */}
                  {selectedColor && (
                    <div className="mt-8">
                      <Button 
                        onClick={handleConfirmSelection}
                        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white"
                      >
                        Confirm Selection: {currentCategory?.name} {currentRange.name} {selectedColor}
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {!selectedRange && (
                <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
                  <p className="text-gray-500">Select a material and range to view details</p>
                </div>
              )}
            </div>
          </div>

          {/* Selected material summary (only visible when something is selected) */}
          {selectedCategory && selectedRange && selectedColor && (
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 mt-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">Selected Material</h4>
                  <p className="text-sm text-gray-500">
                    {materialCategories.find(c => c.id === selectedCategory)?.name || ''} {' '}
                    {currentCategory?.ranges.find(r => r.id === selectedRange)?.name || ''} {' '}
                    {selectedColor}
                  </p>
                </div>
                <Button 
                  onClick={handleConfirmSelection}
                  className="bg-brand-accent hover:bg-brand-accent/90 text-white"
                >
                  Confirm Selection
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Helper function to determine if a color is dark (for text contrast)
function isDarkColor(hexColor: string): boolean {
  // Remove the leading # if it exists
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if the color is dark
  return luminance < 0.5;
}

export default FullScreenOverlay;
