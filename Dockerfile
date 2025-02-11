# Stage 1: Base Node image with pnpm
FROM node:lts-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Stage 2: Install dependencies separately for better caching
FROM base AS deps
WORKDIR /app

# Copy only the package.json and lockfile first for better caching
COPY pnpm-lock.yaml package.json ./
RUN corepack install

RUN pnpm install --frozen-lockfile --prefer-offline

# Stage 3: Build the React app
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage to avoid reinstalling dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN pnpm build

# Stage 4: Serve the React app with Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy React build files from builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx
COPY ./config/nginx.conf /etc/nginx/nginx.conf