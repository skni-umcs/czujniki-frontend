# Stage 1: Install dependencies (for both dev and prod)
FROM node:20 AS base

WORKDIR /app

# Enable Corepack and install dependencies
RUN corepack enable pnpm
RUN pnpm config set store-dir .pnpm-store

# Copy package manager configs and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

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
FROM nginx:stable-alpine AS production

WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy React build files from builder stage
COPY --from=builder /app/dist .

#
