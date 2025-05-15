/**
 * Custom hook for loading and accessing rug product data from CSV
 * This provides a flexible interface that can adapt to CSV structure changes
 */

import { useState, useEffect, useCallback } from "react";
import { loadCSVData, processData, Product } from "../data/data-loader";
import { toast } from "sonner";

// Define the return type for our hook
export interface RugDataResult {
  isLoading: boolean;
  error: Error | null;
  materialCategories: { id: string; name: string; description: string }[];
  materialRanges: Record<string, { id: string; name: string; colors: string[] }[]>;
  filterCategories: {
    colors: string[];
    roomTypes: string[];
    weaveTypes: string[];
  };
  products: Product[];
  refreshData: () => Promise<void>;
}

/**
 * Hook to load and use rug data from a CSV file
 */
export function useRugData(csvPath: string = '/carpet_data.csv'): RugDataResult {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{
    products: Product[];
    materialCategories: { id: string; name: string; description: string }[];
    materialRanges: Record<string, { id: string; name: string; colors: string[] }[]>;
    filterCategories: {
      colors: string[];
      roomTypes: string[];
      weaveTypes: string[];
    };
  }>({
    products: [],
    materialCategories: [],
    materialRanges: {},
    filterCategories: {
      colors: [],
      roomTypes: [],
      weaveTypes: [],
    },
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Loading CSV data from:", csvPath);
      const csvData = await loadCSVData(csvPath);
      const processedData = processData(csvData);
      
      setData(processedData);
      console.log("Data loaded successfully", {
        categories: processedData.materialCategories.length,
        products: processedData.products.length,
      });
    } catch (err) {
      console.error("Error in useRugData:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to load rug data. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [csvPath]);

  // Load data on initial mount
  useEffect(() => {
    loadData();
  }, [csvPath, loadData]);

  // Return both the data and a function to refresh it
  return {
    isLoading,
    error,
    ...data,
    refreshData: loadData,
  };
}
