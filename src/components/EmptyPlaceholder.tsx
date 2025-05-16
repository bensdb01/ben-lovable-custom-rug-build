import React from 'react';
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";

interface EmptyPlaceholderProps {
  viewMode: "grid" | "list";
  clearFilters: () => void;
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({ viewMode, clearFilters }) => {
  return (
    viewMode === "grid" ? (
      <div className="w-full max-w-[300px] mx-auto sm:max-w-none sm:w-auto md:max-w-[320px] lg:max-w-[280px] xl:max-w-[300px] 2xl:max-w-[320px] border-2 border-dashed border-brand-sage/50 rounded-lg p-4 flex flex-col bg-brand-sage/5 aspect-[4/3] justify-center">
        <div className="text-brand-sage text-center mb-2">
          <FilterX className="h-8 w-8 mx-auto mb-2 opacity-70" />
          <h3 className="text-base font-medium mb-1">No matching materials</h3>
          <p className="text-sm text-gray-600 mb-4">Your current filter combination doesn't match any available materials.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearFilters}
          className="border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white mx-auto"
        >
          <FilterX className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    ) : (
      <div className="w-full border-2 border-dashed border-brand-sage/50 rounded-lg p-4 flex flex-col bg-brand-sage/5 justify-center">
        <div className="text-brand-sage text-center mb-2">
          <FilterX className="h-8 w-8 mx-auto mb-2 opacity-70" />
          <h3 className="text-base font-medium mb-1">No matching materials</h3>
          <p className="text-sm text-gray-600 mb-4">Your current filter combination doesn't match any available materials.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearFilters}
          className="border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white mx-auto"
        >
          <FilterX className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    )
  );
};

export default EmptyPlaceholder;
