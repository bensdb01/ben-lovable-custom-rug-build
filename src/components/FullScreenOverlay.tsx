// FullScreenOverlay.tsx
import React, { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Grid, List, FilterX } from "lucide-react";
import { MaterialCategory, Range, Product, FilterCategories, RugOptions, BorderMaterial } from "@/lib/types";
import FilterSection from "./FilterSection";
import EmptyPlaceholder from "./EmptyPlaceholder";

export interface FullScreenOverlayProps {
  materialOverlayOpen: boolean;
  setMaterialOverlayOpen: Dispatch<SetStateAction<boolean>>;
  selectedCategory: string; // This is an ID like "sisal", "wool", or "all"
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  materialCategories: MaterialCategory[];
  filterCategories: FilterCategories;
  activeFilters: { [key: string]: boolean };
  setActiveFilters: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
  getFilteredRanges: () => Range[];
  getProductImage: (category: string, range: string, color: string) => string | undefined;
  handleMaterialRangeSelect: (rangeId: string) => void;
  handleMaterialColorSelect: (color: string, index: number, closeOverlay?: boolean) => void;
  options: RugOptions;
  products: Product[];
  selectedColorIndex: number | null;
  forceUpdate: number;
  borderOverlayOpen: boolean;
  setBorderOverlayOpen: Dispatch<SetStateAction<boolean>>;
  selectedBorderType: string;
  borderMaterials: Array<{ id: string; name: string; description: string; colors: string[] }>;
  handleBorderMaterialSelect: (materialId: string) => void;
  handleBorderColorSelect: (color: string) => void;
  isInnerBorder: boolean;
}

const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({  
  materialOverlayOpen,
  setMaterialOverlayOpen,
  selectedCategory,
  setSelectedCategory,
  materialCategories,
  filterCategories,
  activeFilters,
  setActiveFilters,
  viewMode,
  setViewMode,
  getFilteredRanges,
  getProductImage,
  handleMaterialRangeSelect,
  handleMaterialColorSelect,
  options,
  products,
  selectedColorIndex,
  forceUpdate,
  borderOverlayOpen,
  setBorderOverlayOpen,
  selectedBorderType,
  borderMaterials,
  handleBorderMaterialSelect,
  handleBorderColorSelect,
  isInnerBorder,
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<false | 'material' | 'color' | 'room'>(false);

  const getColorHex = (colorName: string) => {
    // Extract only the color name part if there's a number embedded like "Red27"
    const cleanColorName = colorName.replace(/\d+/g, '');
    const colorVariable = `--color-${cleanColorName.toLowerCase().replace(/\s+/g, '-')}`;
    if (typeof window !== 'undefined') {
      const cssVarValue = getComputedStyle(document.documentElement).getPropertyValue(colorVariable);
      if (cssVarValue) return cssVarValue.trim();
    }
    return '#CCCCCC';
  };

  const handleColorFilterToggle = (color: string) => {
    setActiveFilters(prev => {
      const newActiveFilters = { ...prev };
      Object.keys(newActiveFilters).forEach(key => {
        if (filterCategories.colors.includes(key) && key !== color) delete newActiveFilters[key];
      });
      newActiveFilters[color] = !prev[color];
      if (!newActiveFilters[color]) delete newActiveFilters[color];
      return newActiveFilters;
    });
  };

  const handleRoomFilterToggle = (room: string) => {
    setActiveFilters(prev => {
      const newActiveFilters = { ...prev };
      Object.keys(newActiveFilters).forEach(key => {
        if (filterCategories.roomTypes.includes(key) && key !== room) delete newActiveFilters[key];
      });
      newActiveFilters[room] = !prev[room];
      if (!newActiveFilters[room]) delete newActiveFilters[room];
      return newActiveFilters;
    });
  };

  const activeColorFilters = useMemo(() =>
    Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.colors.includes(key)),
    [activeFilters, filterCategories.colors]
  );

  const isSwatchDisplayable = (swatchManufacturerColorName: string, rangeName: string) => {
    if (activeColorFilters.length === 0) return true;

    const relevantProduct = products.find(p => {
      const productCategoryAsId = p.category ? p.category.toLowerCase().replace(/\s+/g, '-') : "";
      return p.range === rangeName &&
             p.colorName === swatchManufacturerColorName &&
             (selectedCategory === 'all' || productCategoryAsId === selectedCategory);
    });

    if (!relevantProduct || !Array.isArray(relevantProduct.colors)) {
      return false;
    }

    return relevantProduct.colors.some(generalProductColor =>
      activeColorFilters.some(activeFilter =>
        generalProductColor.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );
  };


  return (
    <>
      {/* Material Selection Overlay */}
      <Sheet open={materialOverlayOpen} onOpenChange={setMaterialOverlayOpen}>
        <SheetContent side="bottom" className="h-screen top-0 rounded-none max-w-none p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-20">
              <h3 className="font-serif text-xl">
                {selectedCategory && selectedCategory !== 'all' ? `Select ${materialCategories.find(c => c.id === selectedCategory)?.name} Range` : "Select Material Range"}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setMaterialOverlayOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <FilterSection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              materialCategories={materialCategories}
              filterCategories={filterCategories}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              handleColorFilterToggle={handleColorFilterToggle}
              handleRoomFilterToggle={handleRoomFilterToggle}
              getColorHex={getColorHex}
              activeColorFilters={activeColorFilters}
            />
            
            <div className="flex justify-end p-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="text-xs h-8 flex items-center gap-1 mr-2"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-3 w-3" /> Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="text-xs h-8 flex items-center gap-1"
                onClick={() => setViewMode("list")}
              >
                <List className="h-3 w-3" /> List
              </Button>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {getFilteredRanges().length === 0 ? (
                    <div className="col-span-full">
                      <EmptyPlaceholder 
                        viewMode="grid" 
                        clearFilters={() => {
                          setActiveFilters({});
                          setSelectedCategory('all');
                        }} 
                      />
                    </div>
                  ) : (
                    getFilteredRanges().map((range) => {
                    const isCurrentRangeSelected = options.material.range === range.id;
                    const displayableSwatches = range.colors.filter(colorName => isSwatchDisplayable(colorName, range.name));

                    if (displayableSwatches.length === 0 && Object.keys(activeFilters).some(key => filterCategories.colors.includes(key))) return null;

                    let thumbnailColor = displayableSwatches[0];
                    if (isCurrentRangeSelected && options.material.color && displayableSwatches.includes(options.material.color)) {
                      thumbnailColor = options.material.color;
                    }
                    if (!thumbnailColor && range.colors.length > 0) thumbnailColor = range.colors[0];

                    const categoryForImage = selectedCategory === 'all'
                         ? products.find(p => p.range === range.name && p.colorName === thumbnailColor)?.category || materialCategories[0]?.id || ""
                         : selectedCategory;

                    const imageSrc = thumbnailColor ? getProductImage(categoryForImage, range.name, thumbnailColor) : undefined;


                    return (
                      <div key={range.id} className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center" key={`${range.id}-${thumbnailColor}-gridthumb`}>
                          {imageSrc ? <img src={imageSrc} alt={`${range.name} - ${thumbnailColor}`} className="w-full h-full object-cover" onError={e => { const t = e.target as HTMLImageElement; if(t.parentElement && thumbnailColor) {t.style.display='none'; t.parentElement.style.backgroundColor = getColorHex(thumbnailColor);} else if(t.parentElement) t.parentElement.style.backgroundColor='#ECECEC';}} />
                            : <div className="w-full h-full" style={{ backgroundColor: thumbnailColor ? getColorHex(thumbnailColor) : '#ECECEC', fontSize: 0, color: 'transparent' }} aria-hidden="true"></div>}
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <div><h4 className="font-medium text-sm">{range.name}</h4><p className="text-xs text-muted-foreground mt-1">{displayableSwatches.length} colors available</p></div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {displayableSwatches.map(colorName => {
                              const originalIndex = range.colors.indexOf(colorName);
                              const swatchCat = selectedCategory === 'all' ? products.find(p => p.range === range.name && p.colorName === colorName)?.category || materialCategories[0]?.id || "" : selectedCategory;
                              const swatchImg = getProductImage(swatchCat, range.name, colorName);
                              return (
                                <div key={`${range.id}-${colorName}`} onClick={(e) => { e.stopPropagation(); handleMaterialRangeSelect(range.id); handleMaterialColorSelect(colorName, originalIndex); }} className={`border overflow-hidden ${options.material.color === colorName && isCurrentRangeSelected ? 'ring-2 ring-brand-sage ring-offset-1 scale-110 shadow-md' : 'border-gray-200'} rounded-full w-8 h-8 cursor-pointer transition-all hover:scale-110`} title={colorName}>
                                  {swatchImg ? <img src={swatchImg} alt={colorName} className="w-full h-full object-cover" onError={e => { const t = e.target as HTMLImageElement; if(t.parentElement) {t.style.display='none'; t.parentElement.style.backgroundColor = getColorHex(colorName);}}}/>
                                    : <div className="w-full h-full" style={{ backgroundColor: getColorHex(colorName), fontSize: 0, color: 'transparent' }} aria-hidden="true"></div>}
                                </div>
                              );
                            })}
                          </div>
                          <Button size="sm" variant={isCurrentRangeSelected ? "default" : "outline"} className="w-full mt-3" onClick={() => handleMaterialRangeSelect(range.id)}>{isCurrentRangeSelected ? "Selected" : `View ${range.name}`}</Button>
                        </div>
                      </div>
                    );
                    })
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {getFilteredRanges().length === 0 ? (
                    <EmptyPlaceholder 
                      viewMode="list" 
                      clearFilters={() => {
                        setActiveFilters({});
                        setSelectedCategory('all');
                      }}
                    />
                  ) : (
                    getFilteredRanges().map((range) => {
                    const isCurrentRangeSelected = options.material.range === range.id;
                    const displayableSwatches = range.colors.filter(colorName => isSwatchDisplayable(colorName, range.name));

                    if (displayableSwatches.length === 0 && Object.keys(activeFilters).some(key => filterCategories.colors.includes(key))) return null;

                    let thumbnailColor = displayableSwatches[0];
                    if (isCurrentRangeSelected && options.material.color && displayableSwatches.includes(options.material.color)) {
                      thumbnailColor = options.material.color;
                    }
                    if (!thumbnailColor && range.colors.length > 0) thumbnailColor = range.colors[0];

                    const categoryForImage = selectedCategory === 'all' ? products.find(p => p.range === range.name && p.colorName === thumbnailColor)?.category || materialCategories[0]?.id || "" : selectedCategory;
                    const imageSrc = thumbnailColor ? getProductImage(categoryForImage, range.name, thumbnailColor) : undefined;

                    return (
                      <div key={`list-${range.id}`} className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className="w-32 h-24 overflow-hidden flex-shrink-0" key={`list-${range.id}-${thumbnailColor}-listthumb`}>
                            {imageSrc ? <img src={imageSrc} alt={`${range.name} - ${thumbnailColor}`} className="w-full h-full object-cover" onError={e => { const t = e.target as HTMLImageElement; if(t.parentElement && thumbnailColor) {t.style.display='none'; t.parentElement.style.backgroundColor = getColorHex(thumbnailColor);} else if(t.parentElement) t.parentElement.style.backgroundColor='#ECECEC'; }} />
                              : <div className="w-full h-full" style={{ backgroundColor: thumbnailColor ? getColorHex(thumbnailColor) : '#ECECEC', fontSize: 0, color: 'transparent' }} aria-hidden="true"></div>}
                          </div>
                          <div className="p-3 flex-1">
                            <h4 className="font-medium">{range.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{displayableSwatches.length} colors available</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {displayableSwatches.slice(0, 8).map(colorName => {
                                const originalIndex = range.colors.indexOf(colorName);
                                const swatchCat = selectedCategory === 'all' ? products.find(p => p.range === range.name && p.colorName === colorName)?.category || materialCategories[0]?.id || "" : selectedCategory;
                                const swatchImg = getProductImage(swatchCat, range.name, colorName);
                                return (
                                  <div key={`list-swatch-${range.id}-${colorName}`} onClick={(e) => { e.stopPropagation(); handleMaterialRangeSelect(range.id); handleMaterialColorSelect(colorName, originalIndex); }} className={`border overflow-hidden ${options.material.color === colorName && isCurrentRangeSelected ? 'ring-2 ring-brand-sage ring-offset-1 scale-110 shadow-md' : 'border-gray-200'} rounded-full w-6 h-6 cursor-pointer transition-all hover:scale-110`} title={colorName}>
                                    {swatchImg ? <img src={swatchImg} alt={colorName} className="w-full h-full object-cover" onError={e => { const t = e.target as HTMLImageElement; if(t.parentElement){t.style.display='none'; t.parentElement.style.backgroundColor = getColorHex(colorName);}}}/>
                                      : <div className="w-full h-full" style={{ backgroundColor: getColorHex(colorName), fontSize: 0, color: 'transparent' }} aria-hidden="true"></div>}
                                  </div>
                                );
                              })}
                              {displayableSwatches.length > 8 && <span className="text-xs text-muted-foreground ml-1 flex items-center">+{displayableSwatches.length - 8} more</span>}
                            </div>
                          </div>
                          <div className="p-3 flex items-center">
                            <Button size="sm" variant={isCurrentRangeSelected ? "default" : "outline"} onClick={() => handleMaterialRangeSelect(range.id)}>{isCurrentRangeSelected ? "Selected" : "Select"}</Button>
                          </div>
                        </div>
                      </div>
                    );
                    })
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Border Selection Overlay */}
      <Sheet open={borderOverlayOpen} onOpenChange={setBorderOverlayOpen}>
        <SheetContent side="bottom" className="h-screen top-0 rounded-none max-w-none p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-20">
              <h3 className="font-serif text-xl">
                Select {isInnerBorder ? "Inner" : selectedBorderType === "outer" ? "Outer" : ""} Border Material
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setBorderOverlayOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterSection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              materialCategories={materialCategories}
              filterCategories={filterCategories}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              handleColorFilterToggle={(color) => setActiveFilters(prev => ({...prev, [color]: !prev[color]}))} 
              handleRoomFilterToggle={(room) => {}}
              getColorHex={getColorHex}
              activeColorFilters={activeColorFilters}
            />
            <ScrollArea className="flex-1 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {borderMaterials.filter(material => {
                  const currentActiveColorFilters = Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.colors.includes(key));
                  if (currentActiveColorFilters.length === 0) return true;
                  return material.colors.some(color => currentActiveColorFilters.includes(color));
                }).map(material => (
                  <div key={material.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                      <h4 className="font-medium">{material.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium mb-3">Available Colors:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {material.colors.filter(color => {
                          const currentActiveColorFilters = Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.colors.includes(key));
                          if (currentActiveColorFilters.length === 0) return true;
                          return currentActiveColorFilters.includes(color);
                        }).map(color => (
                          <div 
                            key={`${material.id}-${color}`} 
                            className="border p-3 rounded-lg cursor-pointer hover:shadow-sm text-center transition-all hover:scale-105 flex flex-col items-center" 
                            onClick={() => { 
                              handleBorderMaterialSelect(material.id); 
                              handleBorderColorSelect(color); 
                            }}
                          >
                            <div 
                              className="w-full h-10 rounded mb-2 mx-auto border" 
                              style={{ backgroundColor: getColorHex(color) }}
                            ></div>
                            <span className="text-xs">{color}</span>
                          </div>
                        ))}
                        {material.colors.filter(color => {
                          const currentActiveColorFilters = Object.keys(activeFilters).filter(key => activeFilters[key] && filterCategories.colors.includes(key));
                          if (currentActiveColorFilters.length === 0) return true;
                          return currentActiveColorFilters.includes(color);
                        }).length === 0 && Object.values(activeFilters).some(v => v) && (
                          <p className="text-xs text-muted-foreground col-span-full text-center">
                            No colors match the current filter for this material.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FullScreenOverlay;
