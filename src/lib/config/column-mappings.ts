/**
 * Configuration file that maps CSV column names to application data structure
 * This makes it easy to adapt to changes in the CSV structure without modifying application code
 */

export const columnMappings = {
  // Material category mapping
  materialCategory: "Filter - Material",
  
  // Product range mapping
  productRange: "Product Group Name",
  
  // Color mappings
  materialCode: "Manufacturer Code", // Used for color code/ID
  filterColor: "Filter - Colour",    // Used for color categories
  colorName: "Manufacturer Colour Name", // Display name for the color
  
  // Room types and weave types for filtering
  roomTypes: "Filter - Room",
  weaveTypes: "Filter - Construction",
  
  // Swatch and image mappings
  swatchImageSmall: "100px Swatch Tiny",
  swatchImageLarge: "Bigger Swatch",
  
  // Additional metadata mappings
  manufacturer: "Manufacturer",
  availableWidths: "Available Widths (m)",
  productType: "Rug Builder Product Type",
  wearRating: "Wear Rating",
  isRugBuilderProduct: "Rug Builder Product?",
  price: "RRP",
  discountPercentage: "Discount (%)",
  styleFilter: "Filter - Style",
  suitableFor: "Filter - Suitable For"
};

/**
 * Helper function to get a column name from its mapping key
 */
export function getColumnName(key: keyof typeof columnMappings): string {
  return columnMappings[key];
}
