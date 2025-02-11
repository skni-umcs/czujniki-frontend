# Stage 1: Install dependencies (for both dev and prod)
FROM node AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app
COPY pnpm-lock.yaml package.json /app/
RUN pnpm install

COPY . /app
RUN pnpm build

# Stage 4: Serve the React app with Nginx
FROM nginx AS production

COPY config/ngnix.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy React build files from builder stage
COPY --from=builder /app/dist .

#
