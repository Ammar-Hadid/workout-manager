# Roadmap
- Sprint 1: User can login/register
- Sprint 2: User Can CRUD programs
- Sprint 3: user can CRUD workouts
- Sprint 4: user can CRUD exercises
- Sprint 5: Implement workoutSession



# Sprint 1 – Auth

## Goal
User can register and login and receive a JWT.

## Tasks

- [x] Install dependencies (express, mongoose, bcrypt, jsonwebtoken, dotenv)
- [x] Link to mongoDB
- [x] Setup dotenv

### User Model
- [ ] username (string, 3–25 chars)
- [ ] email (string, unique, valid format)
- [ ] password (hashed)
- [ ] createdAt (date)

### Register Controller
- [ ] Validate input
- [ ] Check if username/email exists
- [ ] Hash password (bcrypt)
- [ ] Save user
- [ ] Return JWT with userId

### Login Controller
- [ ] Find user
- [ ] Compare password using bcrypt.compare
- [ ] Return JWT with userId

### Routes
- [ ] POST /auth/register
- [ ] POST /auth/login

### Middleware
- [ ] Create auth middleware (verify JWT)

## Done when
- User can register
- User can login
- Protected route works

## Deadline: 2026-01-30