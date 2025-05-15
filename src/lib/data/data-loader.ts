/**
 * Flexible CSV data loader for the rug builder application
 * This utility loads and parses CSV data with a configurable mapping system
 */

import { columnMappings } from "../config/column-mappings";

/**
 * Represents a product from the CSV data
 */
export interface Product {
  id: string;               // Manufacturer code as unique ID
  image: string;            // URL to product swatch image
  largeImage?: string;      // URL to larger product image if available
  category: string;         // Material category (e.g., "Wool", "Sisal")
  range: string;            // Product range/group name
  colors: string[];         // Array of colors this product is available in
  manufacturer: string;     // Manufacturer name
  colorName: string;        // Display name for the specific color
  roomTypes: string[];      // Array of room types this product is suitable for
  weaveTypes: string[];     // Construction/weave types
  availableWidths: string[];// Available widths in meters
  price: number;            // Retail price
  discount: number;         // Discount percentage
  wearRating: string;       // Wear rating/durability
  suitableFor: string[];    // What the product is suitable for
  [key: string]: string | string[] | number | undefined; // Allow for additional properties as CSV evolves
}

/**
 * Parse a CSV string into an array of objects
 */
interface CSVRow {
  [key: string]: string;
}

function parseCSV(csv: string): CSVRow[] {
  // Split by lines and filter out empty lines
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  
  // Get headers from the first line
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Parse each data line
  return lines.slice(1).map((line): CSVRow => {
    // Handle commas within quoted fields
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    values.push(currentValue.trim());
    
    // Create an object with headers as keys
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = index < values.length ? values[index] : '';
    });
    
    return obj;
  });
}

/**
 * Process CSV data into a structured format for the application
 */
export function processData(csvData: string): {
  products: Product[];
  materialCategories: { id: string; name: string; description: string }[];
  materialRanges: Record<string, { id: string; name: string; colors: string[] }[]>;
  filterCategories: { 
    colors: string[]; 
    roomTypes: string[]; 
    weaveTypes: string[] 
  };
} {
  console.log("Processing CSV data...");
  
  try {
    // Parse raw CSV data
    const rawData = parseCSV(csvData);
    console.log(`Parsed ${rawData.length} rows from CSV`);
    
    // Extract column names using mappings
    const categoryCol = columnMappings.materialCategory;
    const rangeCol = columnMappings.productRange;
    const colorCol = columnMappings.filterColor;
    const roomCol = columnMappings.roomTypes;
    const weaveCol = columnMappings.weaveTypes;
    const codeCol = columnMappings.materialCode;
    
    // Process into products array
    const products: Product[] = rawData
      .filter(item => item[columnMappings.isRugBuilderProduct]?.toLowerCase() === 'true')
      .map(item => {
        // Process multi-value fields by splitting on commas
        const colorValues = item[colorCol]?.split(',').map((c: string) => c.trim()) || [];
        const roomValues = item[roomCol]?.split(',').map((r: string) => r.trim()) || [];
        const weaveValues = item[weaveCol]?.split(',').map((w: string) => w.trim()) || [];
        const widthValues = item[columnMappings.availableWidths]?.split(',').map((w: string) => w.trim()) || [];
        const suitableValues = item[columnMappings.suitableFor]?.split(',').map((s: string) => s.trim()) || [];
        
        // Convert price to number, fallback to 0 if not valid
        const price = parseFloat(item[columnMappings.price]?.replace(/[^0-9.]/g, '') || '0');
        
        // Convert discount to number, fallback to 0 if not valid
        const discount = parseFloat(item[columnMappings.discountPercentage]?.replace(/[^0-9.]/g, '') || '0');
        
        return {
          id: item[codeCol] || '',
          image: item[columnMappings.swatchImageSmall] || '',
          largeImage: item[columnMappings.swatchImageLarge] || '',
          category: item[categoryCol] || '',
          range: item[rangeCol] || '',
          colors: colorValues,
          manufacturer: item[columnMappings.manufacturer] || '',
          colorName: item[columnMappings.colorName] || '',
          roomTypes: roomValues,
          weaveTypes: weaveValues,
          availableWidths: widthValues,
          price: price,
          discount: discount,
          wearRating: item[columnMappings.wearRating] || '',
          suitableFor: suitableValues,
        };
      });

    // Extract unique material categories
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const materialCategories = uniqueCategories.map(category => {
      return {
        id: category.toLowerCase().replace(/\s+/g, '-'),
        name: category,
        // Simple description for now - this could be enhanced
        description: `${category} material for rugs and carpets`,
      };
    });

    // Group products by material category and range
    const materialRanges: Record<string, { id: string; name: string; colors: string[] }[]> = {};
    
    // First populate the structure with empty arrays
    uniqueCategories.forEach(category => {
      const categoryId = category.toLowerCase().replace(/\s+/g, '-');
      materialRanges[categoryId] = [];
    });
    
    // Group products by category and range
    products.forEach(product => {
      const categoryId = product.category.toLowerCase().replace(/\s+/g, '-');
      
      // Find if the range already exists in the category
      const existingRangeIndex = materialRanges[categoryId]?.findIndex(
        r => r.name === product.range
      );
      
      if (existingRangeIndex === -1) {
        // Add new range with its first color
        const rangeId = product.range.toLowerCase().replace(/\s+/g, '-');
        materialRanges[categoryId].push({
          id: rangeId,
          name: product.range,
          colors: [product.colorName],
        });
      } else if (!materialRanges[categoryId][existingRangeIndex].colors.includes(product.colorName)) {
        // Add color to existing range if not already included
        materialRanges[categoryId][existingRangeIndex].colors.push(product.colorName);
      }
    });
    
    // Extract unique filter categories
    const allColors = [...new Set(products.flatMap(p => p.colors))];
    const allRoomTypes = [...new Set(products.flatMap(p => p.roomTypes))];
    const allWeaveTypes = [...new Set(products.flatMap(p => p.weaveTypes))];
    
    // Create filter categories object
    const filterCategories = {
      colors: allColors,
      roomTypes: allRoomTypes,
      weaveTypes: allWeaveTypes,
    };
    
    console.log("CSV data processing complete");
    
    return {
      products,
      materialCategories,
      materialRanges,
      filterCategories,
    };
  } catch (error) {
    console.error("Error processing CSV data:", error);
    // Return empty data structure in case of error
    return {
      products: [],
      materialCategories: [],
      materialRanges: {},
      filterCategories: { colors: [], roomTypes: [], weaveTypes: [] }
    };
  }
}

/**
 * Load CSV data from a file path
 * Note: In a browser environment, this will load via fetch API
 */
export async function loadCSVData(filePath: string): Promise<string> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load CSV data: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading CSV file:", error);
    throw error;
  }
}
