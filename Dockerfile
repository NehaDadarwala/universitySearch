# Use Node.js LTS version
FROM node:20-alpine

# Install netcat for database readiness check
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install --production=false

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client with the correct binary targets
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy the rest of the application
COPY . .

# Make the initialization script executable
RUN chmod +x scripts/docker-init.sh

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application and run initialization
CMD ["sh", "-c", "./scripts/docker-init.sh && npx prisma migrate deploy && npm start"] 