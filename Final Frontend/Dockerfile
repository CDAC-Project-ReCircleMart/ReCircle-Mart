# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --no-audit --no-fund || npm install

# Copy source code
COPY . .

# Build Vite app
RUN npm run build

# Verify build was successful
RUN test -f dist/index.html || (echo "Build failed: index.html not found" && exit 1)
RUN test -d dist/assets || (echo "Build failed: assets directory not found" && exit 1)


# ---------- Production Stage ----------
FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Verify files were copied
RUN ls -la /usr/share/nginx/html/ && \
    ls -la /usr/share/nginx/html/assets/ && \
    echo "✓ Build successful - all files copied"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/index.html || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
