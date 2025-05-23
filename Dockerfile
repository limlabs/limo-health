FROM node:20

# Install bun and curl for debugging
RUN npm install -g bun
RUN apt-get update && apt-get install -y curl

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ENV PORT=5173
ENV VITE_API_URL=/api
ENV HOST=0.0.0.0
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}

# Expose ports
EXPOSE 5173 5174

# Start the application
CMD ["sh", "-c", "bun run api & bun run dev --host 0.0.0.0"]
