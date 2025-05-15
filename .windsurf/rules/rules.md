---
trigger: always_on
---

# Custom Rug Builder Project Rules

## Project Overview
The Custom Rug Builder is an interactive web application that allows users to design and customize their own rugs by selecting materials, colors, borders, and sizes. The application provides a step-by-step interface for users to make selections and visualize their custom rug.

## Technology Stack
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React hooks (useState, useContext)
- **Data Fetching**: @tanstack/react-query
- **Icons**: lucide-react
- **Notifications**: sonner toast

## Code Structure and Organization

### Component Architecture
- **Small, Focused Components**: Keep component files under 50 lines where possible
- **File Organization**:
  - `/components`: UI components
  - `/hooks`: Custom React hooks
  - `/lib` or `/utils`: Utility functions
  - `/pages`: Page components

### Component Naming Conventions
- Use PascalCase for component names (e.g., `RugBuilder`, `MaterialCard`)
- Use descriptive names that reflect the component's purpose

## Data Architecture

### CSV Data Structure
- **Location**: `/public/carpet_data.csv` - Main data source for all rug materials and options
- **Data Format**: CSV file with columns for material categories, ranges, colors, images, and other attributes

### Data Processing Flow
1. **Column Mappings**: Defined in `/src/lib/config/column-mappings.ts` to make the CSV parser flexible
2. **Data Loading**: Implemented in `/src/lib/data/data-loader.ts` which provides functions to parse the CSV
3. **Data Hook**: Custom hook in `/src/lib/hooks/useRugData.ts` that fetches and processes the CSV
4. **Context Provider**: `RugDataProvider` in `/src/components/RugDataProvider.tsx` wraps the app to provide data

### Key Data Components

#### Column Mappings Configuration
The `column-mappings.ts` file defines how CSV columns map to application data structures:
```typescript 
export const columnMappings = {
  materialCategory: "Filter - Material",
  materialRange: "Product Group Name",
  materialColor: "Manufacturer Colour Name",
  thumbnailImage: "100px Swatch Tiny",
  // Additional mappings can be added when needed
};
```

#### Data Loader
The `data-loader.ts` provides functions to fetch and process the CSV data:
```typescript
// Fetch and parse CSV data into structured format
export async function fetchCsvData(csvPath: string): Promise<Product[]> {
  const response = await fetch(csvPath);
  const csvText = await response.text();
  return getProductsFromCsv(csvText);
}

// Extract unique material categories from products
export function getMaterialCategories(products: Product[]): MaterialCategory[] {
  // Generates a unique list of material categories with IDs and names
}

// Group products by category and range for the UI
export function getMaterialRanges(products: Product[]): MaterialRanges {
  // Organizes products into a hierarchical structure by category and range
}
```

Key functionality:
- `fetchCsvData`: Fetches and parses raw CSV data from the public folder
- `getProductsFromCsv`: Converts CSV rows to structured product objects using column mappings
- `getMaterialCategories`: Extracts unique material categories for the UI navigation
- `getMaterialRanges`: Groups products by category and range for efficient access

#### useRugData Hook
The custom hook in `useRugData.ts` centralizes data fetching and processing:
```typescript
export function useRugData(csvPath: string = '/carpet_data.csv'): RugDataResult {
  // Uses react-query to fetch and cache CSV data
  // Processes raw data into categories, ranges, and products
  // Provides loading states, error handling, and refresh functionality
}
```

Key features:
- Fetches CSV data using react-query for caching and background updates
- Processes data into categories, ranges, and colors for the UI
- Manages loading and error states with appropriate feedback
- Provides refresh functionality for data updates

#### RugDataProvider Component
The context provider in `RugDataProvider.tsx` makes data available throughout the app:
```typescript
export function RugDataProvider({ children, csvPath = '/carpet_data.csv' }) {
  // Uses useRugData hook to fetch and process data
  // Provides getProductImage helper function for image paths
  // Wraps the application in a context provider
}
```

Main purpose:
- Uses the useRugData hook to load and manage CSV data
- Creates helper functions like getProductImage for accessing swatch images
- Provides a context accessible to all child components
- Centralizes data access patterns for consistent behavior

## RugBuilder Component

### Core Functionality
The `RugBuilder` component is the central feature of the application, providing a multi-step interface for users to:
1. Select rug material category, range, and color
2. Choose border options (type, width, material, color)
3. Select rug size (standard sizes or custom dimensions)
4. Review and save their design to a moodboard

### Integration with CSV Data
- Uses the `RugDataContext` to access material categories, ranges, and product data
- Dynamically builds the material selection UI based on data from the CSV
- Displays product thumbnail images from paths defined in the CSV
- Updates the main product card image when a color swatch is selected
- Always defaults to selecting the first color of each range automatically
- Uses the following pattern for image paths:
  ```typescript
  // Function to get the image path for a product swatch
  const getProductImage = (category: string, rangeName: string, color: string) => {
    // Find the matching product in the CSV data
    // Return the thumbnail image URL from the CSV
  };
  ```

### State Management
- Uses React's `useState` hook to manage the rug configuration state
- Structure the state object with clear, nested properties:
  ```typescript
  {
    step: number;
    material: {
      category: string;
      range: string;
      color: string;
    };
    