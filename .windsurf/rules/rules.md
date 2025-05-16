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

1.  **Column Mappings**: Defined in `/src/lib/config/column-mappings.ts` (not provided)
2.  **Data Loading**: Implemented in `/src/lib/data/data-loader.ts`
3.  **Data Hook**: Custom hook in `/src/lib/hooks/useRugData.ts` that fetches and processes the CSV
4.  **Context Provider**: `RugDataProvider` in `/src/components/RugDataProvider.tsx` wraps the app to provide data

### Key Data Components

#### Data Loader

The `data-loader.ts` provides functions to fetch and process the CSV data. It parses CSV data, converts rows to product objects, and extracts unique categories, ranges, and filter categories.

#### useRugData Hook

The custom hook in `useRugData.ts` centralizes data fetching and processing using standard fetch API. It manages loading/error states and provides refresh functionality.

#### RugDataProvider Component

The context provider in `RugDataProvider.tsx` uses `useRugData` to load data and provides it, along with helper functions like `getProductImage`, via React Context.

## Filtering

Filtering is implemented to allow users to narrow material range selections.

  - **Active Filters**: The `activeFilters` state in `RugBuilder.tsx` and `FullScreenOverlay.tsx` stores selected filters (Color, Room, Weave).
  - **Filter Categories**: Available filter options (colors, room types, weave types) are determined in `data-loader.ts` from CSV columns and provided via `filterCategories`.
  - **Filtering Logic**:
      - `getFilteredRanges` in `RugBuilder.tsx` filters material ranges based on category and `activeFilters`.
      - `matchesActiveFilters` checks if a range/category context matches all active filters.
      - `isSwatchDisplayable` in `FullScreenOverlay.tsx` handles color filtering for swatches.
  - **Filter UI**: `FullScreenOverlay.tsx` provides the UI for selecting filters.

## RugBuilder Component

### Core Functionality

The `RugBuilder` component provides a multi-step interface for designing a rug:

1.  Select material (category, range, color)
2.  Choose border (type, width, material, color, secondary options for double)
3.  Select size (standard or custom dimensions/shape)
4.  Review and save to moodboard

### Integration with CSV Data

  - Uses `RugDataContext` for data access.
  - Builds UI dynamically based on CSV data.
  - Displays images using `getProductImage`.
  - Defaults to the first color of a selected range.
  - Uses `getFilteredRanges` for displaying filter-aware ranges.

### State Management

  - Uses `useState` for `options` (step, material, border, size configurations) and other UI states like `activeFilters`.

{
  step: number;
  material: {
    category: string; // ID
    range: string;    // ID
    color: string;     // Manufacturer color name
  };
  border: { // ... properties
      type: string;
      width: string;
      material: string;
      color: string;
      secondaryMaterial?: string;
      secondaryColor?: string;
  };
  size: { // ... properties
      option: string;
      width?: number;
      length?: number;
      shape?: string;
  };
}
