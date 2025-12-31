# Fastify + Better Auth Starter Kit

A production-ready starter template for building authenticated APIs with [Fastify](https://fastify.dev/) and [Better Auth](https://www.better-auth.com/).

## Features

- **Better Auth** - Modern authentication with email/password, social logins, and more
- **Fastify** - High-performance web framework
- **Drizzle ORM** - Type-safe database operations with SQLite
- **TypeScript** - Full type safety throughout
- **Session Management** - Secure cookie-based sessions
- **Plugin Architecture** - Modular and extensible design
- **Clean Structure** - Well-organized codebase

## Project Structure

```
src/
├── app.ts                 # Application entry point
├── drizzle.config.ts      # Drizzle Kit configuration
├── config/
│   ├── env.ts             # Environment variables validation
│   └── logger.ts          # Logger configuration
├── db/
│   ├── index.ts           # Database connection
│   ├── schema.ts          # Database schema (Better Auth tables)
│   └── migrate.ts         # Migration runner
├── lib/
│   └── auth.ts            # Better Auth configuration
├── middleware/
│   ├── index.ts           # Middleware exports
│   └── require-auth.ts    # Authentication middleware
├── plugins/
│   ├── index.ts           # Plugin exports
│   ├── auth.ts            # Auth plugin (handles /api/auth/*)
│   ├── cors.ts            # CORS plugin
│   └── db.ts              # Database plugin
├── routes/
│   ├── index.ts           # Route registration
│   ├── health.ts          # Health check routes
│   └── user.ts            # User routes (examples)
└── types/
    └── fastify.d.ts       # Type declarations
```

##  Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd fastify-better-auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your values:
   ```env
   BETTER_AUTH_SECRET=your-secret-key-at-least-32-characters-long
   BETTER_AUTH_URL=http://localhost:3000
   CLIENT_ORIGIN=http://localhost:5173
   ```

4. **Generate and push database schema**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3000`

## Authentication Endpoints

Better Auth provides these endpoints automatically:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/sign-up/email` | Register with email/password |
| POST | `/api/auth/sign-in/email` | Sign in with email/password |
| POST | `/api/auth/sign-out` | Sign out (invalidate session) |
| GET | `/api/auth/session` | Get current session |

### Example: Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Example: Sign In

```bash
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Example: Access Protected Route

```bash
curl http://localhost:3000/api/user/me \
  -b cookies.txt
```

## Protecting Routes

Use the provided middleware to protect your routes:

```typescript
import { requireAuth, optionalAuth } from "./middleware/index.js";

// Requires authentication - returns 401 if not logged in
fastify.get("/api/protected", { preHandler: requireAuth }, async (request) => {
  return { user: request.user };
});

// Optional authentication - populates user if logged in
fastify.get("/api/public", { preHandler: optionalAuth }, async (request) => {
  if (request.user) {
    return { message: `Hello, ${request.user.name}!` };
  }
  return { message: "Hello, guest!" };
});
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate database migrations |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `BETTER_AUTH_SECRET` | Auth secret key (min 32 chars) | Required |
| `BETTER_AUTH_URL` | Base URL for auth | `http://localhost:3000` |
| `DATABASE_URL` | SQLite database path | `./data/app.db` |
| `CLIENT_ORIGIN` | CORS allowed origin | `http://localhost:5173` |

### Adding Social Providers

Edit `src/lib/auth.ts` to add social authentication:

```typescript
export const auth = betterAuth({
  // ... existing config
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

## Learn More

- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Fastify Documentation](https://fastify.dev/docs/latest/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)

