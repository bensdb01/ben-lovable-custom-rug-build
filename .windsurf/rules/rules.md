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

## RugBuilder Component

### Core Functionality
The `RugBuilder` component is the central feature of the application, providing a multi-step interface for users to:
1. Select rug material category, range, and color
2. Choose border options (type, width, material, color)
3. Select rug size (standard sizes or custom dimensions)
4. Review and save their design to a moodboard

### State Management
- Use React's `useState` hook to manage the rug configuration state
- Structure the state object with clear, nested properties:
  ```typescript
  {
    step: number;
    material: {
      category: string;
      range: string;
      color: string;
    };
    border: {
      type: string;
      width: string;
      material: string;
      color: string;
    };
    size: {
      option: string;
      width?: number;
      length?: number;
      shape?: string;
    }
  }
  ```

### UI Structure
- **Step Navigation**: Provide clear navigation between steps with progress indicators
- **Material Selection**: Use grid or list views for material options
- **Color Selection**: Display color swatches with names and hex values
- **Border Options**: Show border types with visual representations
- **Size Selection**: Offer standard sizes and custom size inputs
- **Moodboard**: Allow users to save multiple rug designs for comparison

## UI/UX Guidelines

### Layout
- Use responsive design principles with Tailwind CSS
- Implement mobile-first approach with appropriate breakpoints
- Maintain consistent spacing and alignment

### Typography
- Use a clear hierarchy with different font sizes for headings and body text
- Maintain readable line heights and letter spacing
- Use the font stack: Inter for UI elements, Playfair Display for headings

### Colors
- Follow a consistent color scheme using Tailwind's color palette
- Use semantic color naming in the UI (primary, secondary, muted, etc.)
- Ensure sufficient contrast for accessibility

### Interactive Elements
- Provide clear visual feedback for interactive elements (hover, focus, active states)
- Use consistent button styles across the application
- Implement smooth transitions and animations for state changes

### Accessibility
- Ensure proper keyboard navigation
- Use appropriate ARIA attributes
- Maintain sufficient color contrast
- Provide alternative text for images

## Material Data Structure
```typescript
// Material categories
const materialCategories = [
  { id: "jute", name: "Jute", description: "Soft, durable, and versatile natural fiber" },
  { id: "sisal", name: "Sisal", description: "Strong, resilient fiber in various colors and weaves" },
  // Additional categories...
];

// Material ranges for each category
const materialRanges = {
  jute: [
    { id: "jute-boucle", name: "Jute Boucle", colors: ["Natural", "Bleached", "Grey"] },
    // Additional ranges...
  ],
  // Additional categories...
};
```

## Error Handling and Feedback
- Use toast notifications to inform users about actions and errors
- Include console logs for debugging purposes
- Provide clear validation messages for user inputs
- Guide users through the process with helpful tooltips and information

## Performance Considerations
- Optimize component rendering with appropriate React patterns
- Lazy-load components and assets when possible
- Use memoization for expensive calculations
- Implement virtualization for long lists

## Development Practices
- Write clean, self-documenting code with appropriate comments
- Follow TypeScript best practices with proper type definitions
- Use consistent code formatting
- Test components thoroughly before implementation
