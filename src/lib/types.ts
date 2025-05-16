// src/lib/types.ts
// Centralized type definitions for the Lovable Rug Builder application

/**
 * Represents a material category in the application
 */
export interface MaterialCategory {
  id: string;
  name: string;
  description?: string;
}

/**
 * Represents a material range with associated colors (specific manufacturer color names)
 */
export interface Range {
  id: string;
  name: string;
  colors: string[]; // These are specific manufacturer color names for swatches in this range
}

/**
 * Represents a product from the CSV data, ensuring all fields are present.
 * This definition should align with the output of `data-loader.ts`.
 */
export interface Product {
  id: string;               // Manufacturer code as unique ID
  image: string;            // URL to product swatch image (100px Swatch Tiny)
  largeImage?: string;      // URL to larger product image if available (Bigger Swatch)
  category: string;         // Material category (e.g., "Wool", "Sisal")
  range: string;            // Product range/group name (Product Group Name)
  colors: string[];         // Array of GENERAL color categories this product is available in (from "Filter - Colour")
  manufacturer: string;     // Manufacturer name
  colorName: string;        // Specific display name for this product variant/swatch (Manufacturer Colour Name)
  roomTypes: string[];      // Array of room types this product is suitable for (from "Filter - Room")
  weaveTypes: string[];     // Construction/weave types (from "Filter - Construction")
  availableWidths?: string[];// Available widths in meters
  price?: number;            // Retail price
  discount?: number;         // Discount percentage
  wearRating?: string;       // Wear rating/durability
  suitableFor?: string[];    // What the product is suitable for
  // Allow for additional properties if the CSV evolves, though explicit definition is preferred for typed access
  [key: string]: string | string[] | number | undefined | boolean;
}

/**
 * Filter category types available in the application
 */
export interface FilterCategories {
  colors: string[];    // General color categories for filtering (e.g., "Red", "Beige")
  roomTypes: string[];
  weaveTypes: string[];
}

/**
 * Core options structure for the rug builder
 */
export interface RugOptions {
  step: number;
  material: {
    category: string;
    range: string;
    color: string; // This will store the specific manufacturer color name (colorName from Product)
  };
  border: {
    type: string;
    width: string;
    material: string;
    color: string;
    secondaryMaterial?: string;
    secondaryColor?: string;
  };
  size: {
    option: string;
    width?: number;
    length?: number;
    shape?: string;
  };
}

/**
 * Represents a saved rug design in the moodboard
 */
export interface MoodboardItem extends RugOptions {
  id: string;
  price: number;
  createdAt: Date;
}

/**
 * Border material type definition
 */
export interface BorderMaterial {
  id: string;
  name: string;
  description: string;
  colors: string[];
}

/**
 * Border width options
 */
export interface BorderWidth {
  id: string;
  name: string;
}

/**
 * Size option type
 */
export interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
}