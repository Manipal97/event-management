# Technical Event Management Backend

A MERN stack backend for managing technical events.

## Features

- User authentication and authorization
- Event creation, management, and registration
- MongoDB database integration
- RESTful API endpoints

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGO_URI in .env file

3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Events
- GET /api/events - Get all events
- POST /api/events - Create new event
- GET /api/events/:id - Get single event
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event
- POST /api/events/:id/register - Register for event

### Users
- POST /api/users/register - Register user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile

## Environment Variables

- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key for JWT tokens
- PORT: Server port (default: 5000)