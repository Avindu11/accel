# Project Overview

Accel is a multi-user (sales persons) CRM system managed by an admin or even can be managed by several admin. Accel is designed to ease the process of managing leads by sales persons. The admins of Accel can view and track each leads managed by each sales person

# Tech Stack
Frontend
- React.js
- Tailwindcss

Backend
- Node.js
- Express.js
- Typescript

Database
- MySQL with Drizzle ORM

Authentication
- Passport JWT

# Features Implemented

User (sales person)
- Sign In
- Add Leads
- View / Search & Filter Leads
- Update Leads
- Delete Leads
- Dashboard (summary of individual user)

Admin
- All of User
- Admin Dashboard (summary of all users)

# How to run locally

1 - Clone repository

```
git clone https://github.com/Avindu11/accel.git
```

2 - Create an `.env.dev` file at `accel-api/`
3 - Fill out variables as in `.env.example`
4- Create an `.env` file at `accel-ui/`

```
VITE_BASE_URL=http://localhost:4100/api
```

5- open terminal (backend) and run:
    `cd/accel-api`
    `npm run dev`

6- open another terminal (frontend) and run:
    `cd/accel-ui`
    `npm run dev`

# Environment Variables

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

# Test Login credentials

```
    email: demo@admin.com
    password: admin123

```

# Database Setup

Database creation and seeding is handled by Drizzle ORM. Please check for database credentials

# Known Limitations

- Auth Limitations
    - No Refresh Token Logic
    - No Password Recovery Logic
    - Frontend Auth improvements needed (fallback mechanisms)

- Admin Limitations
    - Can't add sales persons yet
    - No user management facility

# Reflection

Building Accel provided valuable insights on my current skill levels, coding and problem-solving and also pin pointed which areas should I improve. Also, this is the first time building an API with typescript. 