# Roadmap
- [x] Sprint 1: User can login/register
- [x] Sprint 2: User Can CRUD programs
- [ ] Sprint 3: user can CRUD workouts
- [ ] Sprint 4: user can CRUD exercises
- [ ] Sprint 5: Implement workoutSession



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
- [x] Create program controller
- [x] Get all programs controller
- [x] Update program controller
- [x] Delete program controller

### Access
- [x] Protect routes with auth middleware
- [x] Ensure queries filter by req.userId

### API
- [x] POST /programs
- [x] GET /programs
- [x] PATCH /programs/:id
- [x] DELETE /programs/:id

## Deadline
- 2026-05-2
- Reached deadline?
    - [x] Yes
    - [ ] No, how many days later? [ ]

## Reflection

### What went good?
- At the beginning it was difficult for me to write down controllers + endpoint without looking some things up, but this sprint I had to write 5 controllers, and even tho they are not exactly the same, the procedure is very similar, so I had no trouble at all writing down my last few controllers.
- I tried handling errors more by my self and actually found some errors without needing AI's help.

### What could have gone better?
- Even tho I tried handling errors more by myslef, the urge to ask AI didn't disappear, I sometimes just didnt feel like thking through it and wanted to move on so I again coppied and pasted my code to AI and asked what's wrong. But there is improvement since my last sprint since I did it less. 
- I know that for v1 my code shouldn't be perfect, but it still should hold up to good standards and I should still build and implement good habits. I tried using this as an excuse to not create my program validation util to move fast and prevent stopping and actually thinking and learning something new. This is bad because things like this tend up to save me time instead of losing it for now and for feature error handling. I ended up writing it anyways tho, but I just had some trouble convincing myself.
- At the same time, I should keep in mind that my code shouldn't be perfect, especially not at v1. Because I kept sending versions to some of my controllers to AI for feedback and AI kept coming with new improvements and that took a lot of time. So from now on, I will ask my self 2 questions, if both are answered with yes I will move on. 
    - Does it work?
    - Is the code written/impemented in a good way?


## Techincal decisions
- I created a program validation function, although it took me some time to learn about it and implement it, will end up saving me time, because it makes my code more DRY, and if for instance, if I wanted to update some requirements, I have one source of truth where I can edit it from now instead of all controllers that require validation. And if something goes wrong error handling will become more managable. Finally, it is much more suitable if I decide to use a testing template like jest.


# Sprint 3 - Crud workouts

## Goal
- Each workout has a program parent
- When all workouts get called, only the workouts from the program parent gets shown
- User can view a specific workout
- User can create workouts
- User can post a workout
- User can delete a workout

## Tasks

### Schema & model
- [x] Create workout schema
    - User
    - Program 
    - name (min 5, max 25)
    - order (min 1, max workouts inside program.length)
    - duration (in minutes, min 0 max 999)
- [x] Create workout model

### Controllers
- [ ] Create get all workouts controller, only show workouts that match both userId, and programId
- [ ] create get specific workout controller, it should match the userId
- [ ] Create a workout validation util that will be used for both POST and PATCH
- [ ] Create post workout controller, validate with util
- [ ] Create PATCH workout controller, validate with util, only data that has been sent, leave the rest alone.
- [ ] Create a delete controller

### Endpoints
- [ ] Create GET all workout endpoint, use requireAuth
- [ ] Create GET one workout endpoint, use requireAuth
- [ ] Create POST workout endpoint, use requireAuth
- [ ] Create PATCH workout endpoint, use requireAuth
- [ ] Create DELETE workout endpoint, use requireAuth
- [ ] Create an endpoint from server.js to workoutRoutes.js

## Definition of done
- User can CRUD a workout
- when getting all workouts only workouts inside parent program appear

## Deadline
- 2026-05-4
- Reached deadline?
    - [ ] Yes
    - [ ] No, [ ] too late, because [ ]