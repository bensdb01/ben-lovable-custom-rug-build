import { createContext, useContext } from 'react';
import { Product } from '@/lib/data/data-loader';

// Context type definition
export interface RugDataContextType {
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
  getProductImage: (category: string, range: string, colorName: string) => string | undefined;
}

// Create the context
export const RugDataContext = createContext<RugDataContextType | undefined>(undefined);

// Custom hook to use the rug data context
export function useRugDataContext() {
  const context = useContext(RugDataContext);
  if (context === undefined) {
    throw new Error('useRugDataContext must be used within a RugDataProvider');
  }
  return context;
}
