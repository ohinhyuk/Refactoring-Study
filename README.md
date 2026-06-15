# JWT-Based Authentication System

A complete authentication system built with Express.js featuring JWT tokens, password hashing, and protected routes.

## Features

- ✓ User registration with email and password
- ✓ Password hashing using bcryptjs
- ✓ JWT token-based authentication
- ✓ Login endpoint with token generation
- ✓ Auth middleware for protected routes
- ✓ Comprehensive unit tests
- ✓ Input validation and error handling

## Project Structure

```
src/
  ├── app.js                 # Main Express app
  ├── server.js              # Server entry point
  ├── models/
  │   └── User.js            # User model with password hashing
  ├── middleware/
  │   └── authMiddleware.js  # JWT verification middleware
  └── routes/
      └── authRoutes.js      # Login and register endpoints
test/
  └── auth.test.js           # Unit tests
```

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test:watch
```

## Starting the Server

```bash
npm start
```

The server will run on http://localhost:3000

## API Endpoints

### Register
- **POST** `/auth/register`
- Body: `{ email: string, password: string }`
- Returns: User object (without password)

### Login
- **POST** `/auth/login`
- Body: `{ email: string, password: string }`
- Returns: JWT token and user object

### Protected Route Example
- **GET** `/api/protected`
- Headers: `Authorization: Bearer <token>`
- Returns: User information from JWT payload

### Health Check
- **GET** `/health`
- Returns: `{ status: 'ok' }`

## Configuration

Create a `.env` file (copy from `.env.example`):

```
JWT_SECRET=your-secret-key-here
PORT=3000
```

## Test Coverage

The test suite includes:
- ✓ Registration validation (missing fields, duplicate users)
- ✓ Login flow (correct/incorrect credentials)
- ✓ Password hashing and comparison
- ✓ JWT token generation and verification
- ✓ Protected route access control
- ✓ Token expiration handling
- ✓ Error handling for all scenarios

All tests pass with comprehensive coverage.
