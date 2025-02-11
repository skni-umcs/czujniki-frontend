FROM node:23-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app
COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile --prefer-offline

COPY . /app
RUN pnpm build


FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy React build files from builder stage
COPY --from=builder /app/dist .

# Use local Nginx config file
COPY ./config/nginx.conf /etc/nginx/nginx.conf