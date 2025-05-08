# Custom Rug Builder

## Project Overview

This is an interactive web application that allows users to design and customize their own rugs. The Custom Rug Builder provides a step-by-step interface for users to select materials, colors, borders, and sizes to create their perfect rug.

## How to Set Up and Run the Project Locally

This project requires Node.js & npm to be installed on your system. If you don't have them installed, you can [install Node.js from the official website](https://nodejs.org/).

Follow these steps to set up and run the project:

```sh
# Step 1: Navigate to the project directory
cd path/to/custom-rug-builder

# Step 2: Install the necessary dependencies
npm install

# Step 3: Start the development server
npm run dev
```

After running these commands, the application will be available at http://localhost:8080 in your web browser.

## Features

The Custom Rug Builder offers a comprehensive set of features to help users design their perfect rug:

- **Multi-step Design Process**: Guided workflow through material selection, border options, and sizing
- **Material Selection**: Choose from a variety of natural materials including jute, sisal, seagrass, coir, wool, and sisool
- **Border Customization**: Options for border types, widths, materials, and colors
- **Size Configuration**: Select from standard sizes or specify custom dimensions
- **Moodboard**: Save multiple rug designs for comparison and future reference
- **Visual Feedback**: Interactive UI that updates as selections are made

## Technology Stack

This project is built with:

- **React** with **TypeScript** - For a robust, type-safe UI
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **shadcn/ui** - High-quality UI components built on Radix UI
- **@tanstack/react-query** - For efficient data fetching and state management
- **lucide-react** - Beautiful, consistent icon set

## Project Structure

The project follows a modular component architecture with a focus on small, reusable components:

```
src/
├── components/     # UI components
│   ├── ui/         # shadcn/ui components
│   └── RugBuilder.tsx  # Main rug builder component
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and helpers
├── pages/          # Page components
└── App.tsx         # Main application entry point
```

## Coding Standards

This project adheres to the following coding standards:

- Small, focused components (under 50 lines where possible)
- TypeScript for all JavaScript/React files
- Responsive design using Tailwind CSS
- Consistent error handling with toast notifications
- Comprehensive console logging for debugging

## Deployment

To deploy this project to a production environment, you can use services like:

- Netlify
- Vercel
- GitHub Pages

To build the project for production:

```sh
npm run build
```

This will generate optimized files in the `dist` directory that can be deployed to any static hosting service.

## Future Development

Planned enhancements for the Custom Rug Builder include:

- 3D visualization of rug designs
- Expanded material and color options
- Price calculation based on selections
- User accounts for saving designs
- Integration with e-commerce functionality
- Mobile app version
