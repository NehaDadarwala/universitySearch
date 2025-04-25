# Use Node.js LTS version
FROM node:20-alpine

# Install netcat for database readiness check
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Make the initialization script executable
RUN chmod +x scripts/docker-init.sh

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application and run initialization
CMD ["sh", "-c", "./scripts/docker-init.sh && npm start"] 