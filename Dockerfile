# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies) for building
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN echo "Building client and server..." && \
    npm run build:client && \
    npm run build:server && \
    echo "Build completed. Contents of /app/dist:" && \
    ls -la /app/dist

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Verify the build files were copied
RUN ls -la /app/dist

# Copy server files
COPY src/server ./src/server

# Set proper permissions
RUN chown -R nobody:nogroup /app

# Set environment variables
ENV PORT=3000 \
    NODE_ENV=production \
    VITE_API_URL=/api

# Document which port the application listens on
EXPOSE 3000

# Debug: Show directory structure and files
RUN echo "=== Current Directory Structure ===" && \
    ls -la /app && \
    echo "\n=== Dist Directory ===" && \
    ls -la /app/dist && \
    echo "\n=== Server Directory ===" && \
    ls -la /app/src/server

# Set the correct working directory for the server
WORKDIR /app/dist

# Start the server with explicit path to the server file
CMD ["node", "src/server/api.js"]
