# UMCS Sensors – Frontend

A web application for visualizing and monitoring a network of climate sensors at Maria Curie-Skłodowska University in Lublin.

This project was created as part of the research project "Performance analysis of LoRa and MQTT protocols based on a large-scale climate sensor network."

## Features
- Interactive map with sensor locations
- Real-time data: temperature, humidity, pressure, status
- Historical measurements displayed as charts
- Sensor search and filtering
- Favorite sensors
- Accessibility settings (theme, text size, high contrast)

## Technologies
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MapLibre GL](https://maplibre.org/)
- [Recharts](https://recharts.org/)

## Requirements
- Node.js >= 18
- pnpm (recommended, but npm or yarn can also be used)

## Installation and Running

```bash
pnpm install
pnpm dev
```

The app will be available at: http://localhost:5173

### Production Build

```bash
pnpm build
```

Production files will appear in the `dist/` directory.

### Running with Docker

```bash
docker build -t czujniki-frontend .
docker run -p 8080:80 czujniki-frontend
```

The app will be available at: http://localhost:8080

## Configuration
- Backend API address for development can be set in `vite.config.js` file
- In production: the backend address can be set via the `BACKEND_URL` environment variable (see `Dockerfile` and `config/nginx.conf.template`)
