# EC-QR Generator - Improved Structure

This project has been restructured for better maintainability and organization. Here's an overview of the new architecture:

## Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── QRGenerator/           # QR-specific components
│   │   ├── QRGenerator.jsx   # Main QR generator component
│   │   ├── QRFrame.jsx       # QR code display and download component
│   │   └── *.module.css      # Component-specific styles
│   └── UI/                    # Reusable UI components
│       ├── InputField.jsx
│       ├── Button.jsx
│       └── *.module.css
├── hooks/                     # Custom React hooks
│   └── useQRDownload.js      # Hook for QR download functionality
├── utils/                     # Utility functions
│   └── qr-utils.js           # QR code related utilities
├── pages/                     # Page components
│   └── HomePage.jsx          # Main application page
├── styles/                    # Global styles
│   └── index.css             # Global styles and resets
├── constants/                 # Application constants
│   └── index.js              # Configuration values
└── App.jsx                   # Main application component
```

## Key Improvements

1. **Modular Architecture**: Components are organized by feature and reusability
2. **CSS Modules**: Each component has its own styling file to avoid conflicts
3. **Custom Hooks**: Reusable logic extracted to hooks (e.g., useQRDownload)
4. **Constants**: Configuration values centralized in constants/index.js
5. **Utility Functions**: Reusable functions in utils/qr-utils.js with proper error handling
6. **Better Validation**: URL and file name validation with clear error messages
7. **Accessibility**: Proper focus management and ARIA attributes

## Components

### QRGenerator
- Main component that handles the QR generation flow
- Includes URL input, validation, and QR display
- Uses the QRFrame component for display and download functionality

### QRFrame
- Displays the generated QR code
- Handles download functionality via useQRDownload hook
- Responsive design for different screen sizes

### UI Components
- InputField: Reusable input with label and error display
- Button: Reusable button with different variants and sizes

## Hooks

### useQRDownload
- Handles QR code download functionality
- Manages file name state
- Provides error handling for download operations

## Utilities

### qr-utils.js
- downloadQRCode: Converts SVG to downloadable PNG
- isValidUrl: Validates URL format
- sanitizeFileName: Cleans file names of invalid characters

## Constants

### APP_CONFIG
- Centralized configuration for app name, default values, and sizes
- Makes it easy to modify default behavior across the app

## Features

- URL validation with clear error messages
- QR code download functionality
- Responsive design for mobile and desktop
- Clean, maintainable code structure
- Accessibility considerations
- Input clear functionality
- Proper error handling throughout

## Development

To run the application:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## Best Practices Implemented

- Single Responsibility Principle: Each component has a single purpose
- DRY (Don't Repeat Yourself): Reusable components and hooks
- Separation of Concerns: Logic, presentation, and styling are separated
- Consistent Naming: Clear and consistent naming conventions
- Error Handling: Proper error handling throughout
- Accessibility: Proper focus management and semantic HTML
- Performance: Optimized rendering and minimal re-renders