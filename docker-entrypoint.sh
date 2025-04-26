#!/bin/sh

set -e

echo "Installing dependencies..."
npm install
# npm install -D tsx

echo "Generating Prisma client..."
npx prisma generate

# Wait until the Prisma client is actually available
until [ -f node_modules/.prisma/client/index.js ]; do
  echo "Waiting for Prisma Client to be generated..."
  sleep 1
done

echo "Prisma Client generated!"


echo "Applying database migrations..."
npx prisma migrate deploy

echo "Verifying database schema..."
npx prisma db push --accept-data-loss

echo "Seeding database..."
npm run seed

echo "Building Next.js app..."
npm run build

echo "Starting the application..."
npm start