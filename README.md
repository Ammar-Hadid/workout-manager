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
- [x] username (string, 3–25 chars)
- [x] email (string, unique, valid format)
- [x] password (hashed)
- [x] createdAt (date)

### Register Controller
- [x] Validate input
- [x] Check if username/email exists
- [x] Hash password (bcrypt)
- [x] Save user
- [x] Return JWT with userId

### Login Controller
- [x] Find user
- [x] Compare password using bcrypt.compare
- [x] Return JWT with userId

### Routes
- [x] POST /auth/register
- [x] POST /auth/login

### Middleware
- [x] Create auth middleware (verify JWT)

## Done when
- User can register
- User can login
- Protected route works

## Deadline
- 2026-01-30
- Reached deadline?
    - [x] Yes
    - [ ] No, how many days later? [ ]

## Reflection

### What went good?
- I didn't stay for too long on one task, I actually moved on knowing that it wasn't perfect and that I can always come back and improve it in next versions.
- I asked AI for answers as little as I could, I even tried diving in without knowing anything, turns out I know more than I thought.

### What could have gone better?
- Sometimes when I was very tired, I would just ask AI without really thinking myself, tho I actually read it and (try to) understand it, I would make sure to read it again next day and understand it fully.
-  80% of the times, whenever I got an error, I would just copy the error, and my code, and send it to AI to tell me what's wrong. Often times it would be something very trivial and if I just read it I would have known, so I will try not to ask AI even for error handling next sprint.

## Technical decisions
- I chose JWT because it is the most modern and secure method I know for auth
- I chose username login because it makes the app stand out more, unlike email, which is and can be used to sign in everywhere, making the users sign in with usernames gives importance to the actual usernames.
- I chose to make usernames unique because the login is with username, and I might add community features in future versions, when people search users up, they have to be unique.


# Sprint 2 - Crud programs

## Goal
- User can create programs
- User can Read (See) programs
- User can Update programs
- User can Delete programs
- User only sees his own programs

## Tasks

### Data
- [x] Design Program schema
    - Title, (min: 3, max: 25)
    - Split ('full-body', 'ppl', 'upper/lower', 'custom')
    - trainingDaysPerWeek (min 1 max 7)
    - isActive
    - createdAt
- [x] Create Program model

### Logic
- [ ] Create program controller
- [ ] Get all programs controller
- [ ] Update program controller
- [ ] Delete program controller

### Access
- [ ] Protect routes with auth middleware
- [ ] Ensure queries filter by req.userId

### API
- [ ] POST /programs
- [ ] GET /programs
- [ ] PATCH /programs/:id
- [ ] DELETE /programs/:id

## Deadline
- 2026-05-2
- Reached deadline?
    - [ ] Yes
    - [ ] No, how many days later? [ ]