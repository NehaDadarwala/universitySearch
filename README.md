# Universities Search App

A modern web application for searching and filtering universities worldwide, built with Next.js, TypeScript, and PostgreSQL.

## Features

- 🔍 Search universities by name
- 🌍 Filter universities by country
- 📊 Real-time API performance metrics
- 💾 PostgreSQL database with Prisma ORM
- 📱 Responsive design for all devices
- ⚡ Fast and efficient data loading
- 🎯 Pagination support
- ⭐ Favorite universities functionality

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Deployment**: Docker

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

## Getting Started

### Option 1: Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/NehaDadarwala/universitySearch.git
   cd universitySearch
   ```

2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application at `http://localhost:3000`

### Option 2: Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/NehaDadarwala/universitySearch.git
   cd universitySearch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/universities"
   ```

4. Start the PostgreSQL database:
   ```bash
   # Stop any existing PostgreSQL instances first
   docker-compose down
   
   # Remove existing PostgreSQL data (if you're having authentication issues)
   docker volume rm universitysearch_postgres_data
   
   # Start the database
   docker-compose up db
   ```

5. Wait for the database to be ready (you should see "database system is ready to accept connections" in the logs)

6. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

7. Seed the database:
   ```bash
   npx tsx src/scripts/seed.ts
   ```

8. Start the development server:
   ```bash
   npm run dev
   ```

9. Access the application at `http://localhost:3000`

### Troubleshooting PostgreSQL Authentication Issues

If you encounter PostgreSQL authentication errors, try these steps:

1. Verify the database is running:
   ```bash
   docker ps | findstr postgres
   ```

2. Check if port 5432 is available:
   ```bash
   netstat -ano | findstr :5432
   ```
   If another process is using the port, stop it or change the port in docker-compose.yml

3. Reset the database:
   ```bash
   # Stop all containers
   docker-compose down
   
   # Remove the PostgreSQL volume
   docker volume rm universitysearch_postgres_data
   
   # Start fresh
   docker-compose up db
   ```

4. Verify your .env file matches these exact credentials:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/universities"
   ```

5. Make sure no other PostgreSQL instances are running locally that might conflict with the Docker container

6. Wait at least 10-15 seconds after the database container starts before running any Prisma commands

If issues persist:
- Check Docker logs: `docker-compose logs db`
- Verify the database exists: `docker exec universitysearch_db_1 psql -U postgres -l`
- Try connecting with a PostgreSQL client using the same credentials

## Project Structure

```
university/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions
│   ├── prisma/             # Database schema and migrations
│   └── scripts/            # Database seeding scripts
├── public/                 # Static assets
├── prisma/                 # Prisma configuration
├── scripts/                # Docker initialization scripts
├── .dockerignore          # Docker ignore file
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile            # Docker build configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## API Endpoints

- `GET /api/universities` - Get all universities with pagination
- `GET /api/universities/countries` - Get unique countries
- `GET /api/universities/favorites` - Get favorite universities
- `POST /api/universities/favorites` - Add university to favorites
- `DELETE /api/universities/favorites` - Remove university from favorites

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
