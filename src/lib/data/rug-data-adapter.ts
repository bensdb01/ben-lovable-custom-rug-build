/**
 * Adapter utility to provide compatibility between the CSV data format 
 * and the existing RugBuilder component structure
 */

import { Product } from "./data-loader";

/**
 * Convert the processed CSV data into the format expected by the RugBuilder component
 */
export function adaptRugData(
  products: Product[],
  materialCategories: { id: string; name: string; description: string }[],
  materialRanges: Record<string, { id: string; name: string; colors: string[] }[]>
) {
  // Used by the RugBuilder to get all product images for specific material/range/color
  const getProductImageMap = (): Record<string, string> => {
    const imageMap: Record<string, string> = {};
    
    products.forEach(product => {
      // Create a key using category, range, and color
      const key = `${product.category.toLowerCase()}_${product.range.toLowerCase()}_${product.colorName.toLowerCase()}`;
      imageMap[key] = product.image;
    });
    
    return imageMap;
  };
  
  return {
    // Return a function to get product image by category, range, and color
    getProductImage: (category: string, range: string, colorName: string): string | undefined => {
      const imageMap = getProductImageMap();
      const key = `${category.toLowerCase()}_${range.toLowerCase()}_${colorName.toLowerCase()}`;
      return imageMap[key];
    },
    
    // Products filtered by being enabled for the rug builder
    getRugBuilderProducts: () => {
      return products.filter(p => p.id && p.category && p.range);
    },
    
    // Return a list of unique room types from the data
    getRoomTypes: () => {
      const allRoomTypes = products.flatMap(p => p.roomTypes);
      return [...new Set(allRoomTypes)].filter(Boolean);
    },
    
    // Return a list of unique weave types from the data
    getWeaveTypes: () => {
      const allWeaveTypes = products.flatMap(p => p.weaveTypes);
      return [...new Set(allWeaveTypes)].filter(Boolean);
    },
    
    // Return a list of unique colors from the data
    getColors: () => {
      const allColors = products.flatMap(p => p.colors);
      return [...new Set(allColors)].filter(Boolean);
    }
  };
}
