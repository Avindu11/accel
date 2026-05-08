## Accel CRM

Accel is a multi-user CRM system designed to streamline lead management for sales teams.
It allows sales persons to manage their leads efficiently while enabling admins to monitor, track, and analyze sales activities across the organization.
## Tech Stack

### Frontend
- React.js
- Tailwindcss
### Backend
- Node.js
- Express.js
- Typescript
### Database
- MySQL with Drizzle ORM
### Authentication
- Passport JWT

## Features Implemented

### User (sales person)
    - Sign In and Authentication
    - Add New Leads
    - View Leads
    - Search & Filter Leads
    - Update Leads
    - Delete Leads
    - Personal Dashboard with Leads Summary
### Admin
    - All of User
    - Admin Dashboard (summary of all users)
## How to run locally

1.  Clone repository
```
git clone https://github.com/Avindu11/accel.git
```

2. Create an `.env.dev` file at `accel-api/`
3. Fill out variables as in `.env.example`
4. Create an `.env` file at `accel-ui/`

```
VITE_BASE_URL=http://localhost:{PORT}/api
```

5. open terminal (backend) and run:

    `cd/accel-api`
    `npm i`
    `npm run dev`
    
6. open another terminal (frontend) and run:

    `cd/accel-ui`
    `npm i`
    `npm run dev`

## Environment Variables

`accel-api/.env.dev`

```
#PORT
PORT=

#DATABASE
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

DATABASE_URL=mysql://{username}:{password}@{host}:{port}/{db name}

#JWT_SECRET_KEY 
JWT_SECRET=

```

`accel-ui/.env`

```
VITE_BASE_URL=http://localhost:4100/api
```

## Test Login credentials

```
email: demo@admin.com
password: admin123
```
## Database Setup

Database creation and seeding is handled by Drizzle ORM. Please check for database credentials
## Known Limitations

- Auth Limitations
    - No Refresh Token Logic
    - No Password Recovery Logic
    - Frontend Auth improvements needed (fallback mechanisms)

- Admin Limitations
    - Can't add sales persons yet
    - No user management facility
## Reflection

Building Accel helped improve my understanding of:

    - Building scalable REST APIs using TypeScript
    - Authentication using Passport JWT
    - Structuring full-stack applications
    - Working with Drizzle ORM and MySQL
    - State management and protected routes in React
    - Problem-solving and debugging real-world issues

This project also highlighted areas where I can continue improving, especially in authentication architecture, production-level backend structure, and frontend reliability.