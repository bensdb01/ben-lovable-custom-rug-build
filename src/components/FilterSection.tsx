// FilterSection.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { MaterialCategory, FilterCategories } from "@/lib/types";

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  materialCategories: MaterialCategory[];
  filterCategories: FilterCategories;
  activeFilters: { [key: string]: boolean };
  setActiveFilters: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  isFilterOpen: false | 'material' | 'color' | 'room';
  setIsFilterOpen: React.Dispatch<React.SetStateAction<false | 'material' | 'color' | 'room'>>;
  handleColorFilterToggle: (color: string) => void;
  handleRoomFilterToggle: (room: string) => void;
  getColorHex: (colorName: string) => string;
  activeColorFilters: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  materialCategories,
  filterCategories,
  activeFilters,
  setActiveFilters,
  isFilterOpen,
  setIsFilterOpen,
  handleColorFilterToggle,
  handleRoomFilterToggle,
  getColorHex,
  activeColorFilters
}) => {
  // Get active room filters
  const activeRoomFilters = Object.keys(activeFilters)
    .filter(key => activeFilters[key] && filterCategories.roomTypes.includes(key));

  // Total active filters count
  const totalActiveFilters = Object.keys(activeFilters).filter(key => activeFilters[key]).length + 
    (selectedCategory !== 'all' ? 1 : 0);

  // Reset all filters
  const clearAllFilters = () => {
    setActiveFilters({});
    setSelectedCategory('all');
  };

  // Clear color filters
  const clearColorFilters = () => {
    const newFilters = { ...activeFilters };
    filterCategories.colors.forEach(color => {
      newFilters[color] = false;
    });
    setActiveFilters(newFilters);
    setIsFilterOpen(false);
  };

  // Clear room filters
  const clearRoomFilters = () => {
    const newFilters = { ...activeFilters };
    filterCategories.roomTypes.forEach(room => {
      newFilters[room] = false;
    });
    setActiveFilters(newFilters);
    setIsFilterOpen(false);
  };

  return (
    <div className="border-b bg-gray-50 sticky top-[calc(3.5rem+1px)] z-10">
      <div className="p-3">
        {/* Filter Row - All inline */}
        <div className="flex flex-nowrap items-center gap-2 sm:gap-3 w-full">                  
          {/* Filter Label */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="font-medium hidden sm:inline">Filters</span>
            {totalActiveFilters > 0 && (
              <span className="bg-brand-sage text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {totalActiveFilters}
              </span>
            )}
          </div>

          {/* Material Filter */}
          <div className="relative flex-shrink-0 flex-grow sm:flex-grow-0">
            <Button 
              variant="outline"
              className={`text-sm h-9 flex items-center justify-between gap-1 sm:gap-2 min-w-0 w-full sm:min-w-[120px] sm:w-auto ${isFilterOpen === 'material' ? 'border-brand-sage bg-brand-sage text-white hover:bg-brand-sage' : selectedCategory !== 'all' ? 'border-brand-sage bg-brand-sage/10 text-brand-sage font-medium' : ''}`}
              onClick={() => setIsFilterOpen(prev => prev === 'material' ? false : 'material')}
            >
              <span className="flex-1 text-left truncate">
                {selectedCategory === 'all' 
                  ? 'All Materials' 
                  : materialCategories.find(cat => cat.id === selectedCategory)?.name || 'Material'}
              </span>
              {isFilterOpen === 'material' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {isFilterOpen === 'material' && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="fixed left-0 right-0 z-20 top-[calc(3.5rem+4.5rem)] bg-white shadow-lg border-t border-b py-4">
                  <div className="max-w-full w-full px-4">
                    <div className="flex justify-between items-center mb-4">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          setSelectedCategory('all');
                          setIsFilterOpen(false);
                        }}
                        className="text-xs text-gray-600 p-0 h-auto"
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Clear
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => setIsFilterOpen(false)} 
                        className="text-xs text-brand-sage font-medium p-0 h-auto"
                      >
                        Done
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 items-start justify-start">
                      <Button
                        key="all-materials"
                        variant={!selectedCategory || selectedCategory === 'all' ? "outline" : "ghost"}
                        size="sm"
                        onClick={() => {
                          setSelectedCategory('all');
                          setIsFilterOpen(false);
                        }}
                        className={`text-xs justify-start ${!selectedCategory || selectedCategory === 'all' ? 'bg-brand-sage text-white font-medium' : 'text-gray-700'}`}
                      >
                        All Materials
                      </Button>
                      {materialCategories.map(cat => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? "outline" : "ghost"}
                          size="sm"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsFilterOpen(false);
                          }}
                          className={`text-xs justify-start ${selectedCategory === cat.id ? 'bg-brand-sage text-white font-medium' : 'text-gray-700'}`}
                        >
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Color Filter */}
          <div className="relative flex-shrink-0 flex-grow sm:flex-grow-0">
            <Button 
              variant="outline"
              className={`text-sm h-9 flex items-center justify-between gap-1 sm:gap-2 min-w-0 w-full sm:min-w-[120px] sm:w-auto ${isFilterOpen === 'color' ? 'border-brand-sage bg-brand-sage text-white hover:bg-brand-sage' : activeColorFilters.length > 0 ? 'border-brand-sage bg-brand-sage/10 text-brand-sage font-medium' : ''}`}
              onClick={() => setIsFilterOpen(prev => prev === 'color' ? false : 'color')}
            >
              {activeColorFilters.length > 0 && (
                <div 
                  className="w-5 h-5 rounded-full border border-white shadow-sm overflow-hidden" 
                  style={{ backgroundColor: getColorHex(activeColorFilters[0]), fontSize: 0 }}
                  aria-hidden="true"
                ></div>
              )}
              <span className="flex-1 text-left truncate">
                {activeColorFilters.length > 0 
                  ? activeColorFilters[0] 
                  : 'Colour'}
              </span>
              {isFilterOpen === 'color' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {isFilterOpen === 'color' && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="fixed left-0 right-0 z-20 top-[calc(3.5rem+4.5rem)] bg-white shadow-lg border-t border-b py-4">
                  <div className="max-w-full w-full px-4">
                    <div className="flex justify-between items-center mb-4">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={clearColorFilters}
                        className="text-xs text-gray-600 p-0 h-auto"
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Clear
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => setIsFilterOpen(false)} 
                        className="text-xs text-brand-sage font-medium p-0 h-auto"
                      >
                        Done
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3 items-start justify-start">
                      {filterCategories.colors.map(color => (
                        <div 
                          key={color}
                          onClick={() => {
                            handleColorFilterToggle(color);
                            setIsFilterOpen(false);
                          }}
                          className="flex flex-col items-center gap-1 cursor-pointer"
                        >
                          <div
                            className={`w-12 h-12 rounded-full transition-all relative ${
                              activeFilters[color]
                                ? 'ring-2 ring-brand-sage ring-offset-2 scale-110'
                                : 'opacity-90 hover:opacity-100 hover:scale-105'
                            }`}
                            style={{
                              backgroundColor: getColorHex(color),
                              boxShadow: activeFilters[color] ? '0 2px 4px rgba(0, 0, 0, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              fontSize: 0
                            }}
                            aria-hidden="true"
                          >
                            {activeFilters[color] && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-sage rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                                <span className="text-white text-[10px]">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-center">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Room Filter */}
          <div className="relative flex-shrink-0 flex-grow sm:flex-grow-0">
            <Button 
              variant="outline"
              className={`text-sm h-9 flex items-center justify-between gap-1 sm:gap-2 min-w-0 w-full sm:min-w-[120px] sm:w-auto ${isFilterOpen === 'room' ? 'border-brand-sage bg-brand-sage text-white hover:bg-brand-sage' : activeRoomFilters.length > 0 ? 'border-brand-sage bg-brand-sage/10 text-brand-sage font-medium' : ''}`}
              onClick={() => setIsFilterOpen(prev => prev === 'room' ? false : 'room')}
            >
              <span className="flex-1 text-left truncate">
                {activeRoomFilters.length > 0 
                  ? activeRoomFilters[0]
                  : 'Room'}
              </span>
              {isFilterOpen === 'room' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {isFilterOpen === 'room' && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="fixed left-0 right-0 z-20 top-[calc(3.5rem+4.5rem)] bg-white shadow-lg border-t border-b py-4">
                  <div className="max-w-full w-full px-4">
                    <div className="flex justify-between items-center mb-4">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={clearRoomFilters}
                        className="text-xs text-gray-600 p-0 h-auto"
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Clear
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => setIsFilterOpen(false)} 
                        className="text-xs text-brand-sage font-medium p-0 h-auto"
                      >
                        Done
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 items-start justify-start">
                      {filterCategories.roomTypes.map(room => (
                        <Button
                          key={room}
                          variant={activeFilters[room] ? "outline" : "ghost"}
                          size="sm"
                          onClick={() => {
                            handleRoomFilterToggle(room);
                            setIsFilterOpen(false);
                          }}
                          className={`text-xs justify-start ${activeFilters[room] ? 'bg-brand-sage text-white font-medium' : 'text-gray-700'}`}
                        >
                          {room}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Clear All */}
          <div className="flex-grow flex-shrink-0 hidden sm:block" />
          {totalActiveFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-xs text-gray-600 flex-shrink-0 ml-auto sm:ml-0"
              onClick={clearAllFilters}
            >
              <X className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;