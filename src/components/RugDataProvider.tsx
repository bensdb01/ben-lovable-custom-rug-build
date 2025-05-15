import React, { ReactNode } from 'react';
import { useRugData } from '../lib/hooks/useRugData';
import { adaptRugData } from '../lib/data/rug-data-adapter';
import { RugDataContext } from '../lib/context/RugDataContext';

// Provider component
export function RugDataProvider({ 
  children,
  csvPath = '/carpet_data.csv'
}: { 
  children: ReactNode;
  csvPath?: string;
}) {
  // Load data using our custom hook
  const { 
    isLoading, 
    error, 
    materialCategories, 
    materialRanges, 
    filterCategories, 
    products, 
    refreshData 
  } = useRugData(csvPath);
  
  // Use the adapter to get helper functions
  const adapter = adaptRugData(products, materialCategories, materialRanges);

  // Create the context value
  const contextValue = {
    isLoading,
    error,
    materialCategories,
    materialRanges,
    filterCategories,
    products,
    refreshData,
    getProductImage: adapter.getProductImage,
  };

  return (
    <RugDataContext.Provider value={contextValue}>
      {children}
    </RugDataContext.Provider>
  );
}
