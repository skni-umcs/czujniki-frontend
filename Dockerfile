# Stage 1: Install dependencies (for both dev and prod)
FROM node AS base

WORKDIR /app

# Copy package manager configs and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Stage 2: Development (pnpm dev server)
FROM base AS dev

# Copy source code for development
COPY . .

EXPOSE 5173

# Run the Vite dev server
CMD ["pnpm", "dev"]

# Stage 3: Production Build
FROM base AS builder

# Copy source code and build the app
COPY . .
RUN pnpm build

# Stage 4: Serve the React app with Nginx
FROM nginx AS production

WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy React build files from builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
