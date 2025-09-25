# 🌦️ WeatherWise  

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)  
[![Vite](https://img.shields.io/badge/Vite-Build-orange?logo=vite)](https://vitejs.dev/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  

A sleek, modern weather dashboard built with **React + Vite** that provides real-time weather updates, forecasts, and location-based insights with an intuitive UI.  


---

## ✨ Features  

- 🌍 **Location Search** – Find weather conditions by city or region  
- 📊 **Current Weather Stats** – Temperature, feels-like, humidity, UV index, wind speed, and precipitation  
- 🌄 **Sunrise & Sunset** – Accurate timings for your location  
- 📈 **7-Day Forecast** – Interactive graph for temperature, humidity & rain trends  
- 📌 **Recent Searches** – Quickly revisit your last searched locations  
- 🌙 **Dynamic UI** – Night/day theme background for immersive experience  
- ⚡ **Fast & Modern** – Powered by Vite + React for blazing performance  

---

## 🛠️ Tech Stack  

- **Frontend:** React (with Vite bundler)  
- **Styling:** TailwindCSS (or your chosen CSS solution)  
- **Charts:** Recharts (for forecast visualization)  
- **APIs:**  
  - [Visual Crossing Weather API](https://www.visualcrossing.com/)  
  - [Google Maps API](https://developers.google.com/maps)  

---

## 🚀 Getting Started  

Follow these steps to run the project locally:  

### 1. Clone the repository  
```bash
git clone https://github.com/yourusername/weatherwise.git
cd weatherwise 
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add environment variables

#### Create a .env file in the root folder and add your API keys:
```bash
VITE_WEATHER_API_KEY=your_visual_crossing_api_key
VITE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Run development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
npm run preview
```

## Project Structure 
```bash
weatherwise/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # App pages and layout
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── App.jsx          # Root component
├── .env                 # Environment variables
├── package.json
└── vite.config.js
```


## 🤝 Contributing

### Contributions, issues, and feature requests are welcome!
### Feel free to fork the project and open a PR.



# 💡 Inspiration
### Built as a personal project to practice React, API integrations, and modern UI design.