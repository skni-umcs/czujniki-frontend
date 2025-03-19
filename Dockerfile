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

COPY ./config/nginx.conf.template /tmp/nginx.conf.template

RUN envsubst '${BACKEND_URL}' < /tmp/nginx.conf.template > /etc/nginx/conf.d/nginx.conf

# Use local Nginx config file
RUN rm /etc/nginx/conf.d/default.conf