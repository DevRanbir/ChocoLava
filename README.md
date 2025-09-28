# Smart City Copilot (SCC) - Emergency Vehicle Route Optimization System

A Next.js application that simulates and optimizes emergency vehicle routes through traffic-controlled intersections. This system helps emergency services navigate efficiently by controlling traffic lights and providing real-time route optimization.

## Features

- 🚑 **Emergency Vehicle Simulation**: Ambulance and fire truck route simulation
- 🚦 **Smart Traffic Light Control**: Automatic traffic light management for emergency vehicles
- 🗺️ **Interactive Google Maps Integration**: Real-time map visualization with route planning
- 📊 **Multi-Vehicle Management**: Track and manage multiple emergency vehicles
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Updates**: Live vehicle tracking and route optimization

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm
- **Google Maps API Key** - [Get one here](https://console.cloud.google.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd life-lane
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install --force
```

Or using npm:
```bash
npm install --force
```

### 3. Set Up Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Directions API**
   - **Places API** (optional, for enhanced location search)

4. Create an API key:
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy your API key

5. Configure API restrictions (recommended for security):
   - **Application restrictions**: HTTP referrers
   - Add `localhost:3000/*` and `localhost:3001/*`
   - **API restrictions**: Select only the APIs you enabled above

### 4. Environment Setup

Create environment files in the project root:

**`.env.local`** (for local development):
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-actual-google-maps-api-key-here"
```

**`.env`** (backup/fallback):
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=" AIzaSyBz4MkYPZoUi-RCNklsmYAILnAArAD9XTM" //this is fake 🤣
```

⚠️ **Important**: Replace `"your-actual-google-maps-api-key-here"` with your actual Google Maps API key from step 3.

### 5. Run the Development Server

Using pnpm:
```bash
pnpm dev
```

Using npm:
```bash
npm run dev
```

The application will start on:
- **Primary**: [http://localhost:3000](http://localhost:3000)
- **Fallback**: [http://localhost:3001](http://localhost:3001) (if port 3000 is in use)

## How to Use

### Basic Usage

1. **Set Start Point**: 
   - Use the "Start Point" dropdown to select a location
   - Or enter coordinates manually in the input field

2. **Set Destination**: 
   - Use the "Destination" dropdown to select a location
   - Or enter coordinates manually

3. **Choose Emergency Vehicle Type**: 
   - Click either "🚑 Ambulance" or "🚒 Fire Truck"

4. **Start Simulation**: 
   - Click "Start Simulation" to begin the emergency route
   - Or "Preview Route" to see the planned path first

5. **Monitor Progress**: 
   - Watch the vehicle move along the optimized route
   - Observe traffic lights automatically changing for emergency priority
   - View real-time route information and turn-by-turn directions

### Advanced Features

- **Multi-Vehicle Mode**: Add multiple emergency vehicles using the "+" button
- **Route Optimization**: The system automatically calculates the fastest route considering traffic conditions
- **Traffic Light Priority**: Traffic lights automatically switch to allow emergency vehicles to pass
- **Dark Mode**: Toggle the theme using the sun/moon icon
- **Emergency Alerts**: View system status and emergency alerts in the control panel

## Project Structure

```
life-lane/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── map-container.tsx         # Google Maps integration
│   ├── control-panel.tsx         # Main control interface
│   ├── emergency-simulation.tsx  # Emergency route logic
│   ├── vehicle-marker.tsx        # Vehicle visualization
│   └── ui/                       # Reusable UI components
├── hooks/
│   └── use-emergency-route.ts    # Emergency route management
├── services/
│   └── vehicle-manager.ts        # Vehicle state management
├── types/
│   └── google-maps.d.ts          # TypeScript definitions
└── public/                       # Static assets
```

## Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Using npm
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Troubleshooting

### Common Issues

1. **"Google Maps API error: InvalidKeyMapError"**
   - Verify your API key is correctly set in `.env.local`
   - Ensure the Maps JavaScript API is enabled in Google Cloud Console
   - Check API key restrictions match your domain/localhost

2. **Port 3000 already in use**
   - The app will automatically use port 3001
   - Or manually specify a port: `pnpm dev -- --port 3002`

3. **TypeScript errors**
   - Run `pnpm install` to ensure all dependencies are installed
   - Clear Next.js cache: `rm -rf .next` (or `rmdir .next /s` on Windows)

4. **Map not loading**
   - Check browser console for specific error messages
   - Verify internet connection
   - Try opening the test file `test-maps.html` directly in browser to isolate API key issues

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Google Maps API key and enabled APIs
3. Ensure all environment variables are properly set
4. Try clearing cache and restarting the development server

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Google Maps JavaScript API** - Map visualization and routing
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **React Hooks** - State management
- **pnpm** - Package management

## License

This project is for educational and demonstration purposes.

---


**Need help?** Check the troubleshooting section above or refer to the [Google Maps API documentation](https://developers.google.com/maps/documentation/javascript).

