# Roadmap
- [x] Sprint 1: User can login/register
- [x] Sprint 2: User Can CRUD programs
- [x] Sprint 3: user can CRUD workouts
- [ ] Sprint 4: user can CRUD exercises
- [ ] Sprint 5: Create minimal frontend
- [ ] Sprint 6: Implement workoutSession flow
- [ ] Sprint 7: Implement sets
- [ ] Sprint 8: show sets history



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
- [x] Create get all workouts controller, only show workouts that match both userId, and programId
- [x] create get specific workout controller, it should match the userId
- [x] Create a workout validation util that will be used for both POST and PATCH
- [x] Create post workout controller, validate with util
- [x] Create PATCH workout controller, validate with util, only data that has been sent, leave the rest alone.
- [x] Create a delete controller

### Endpoints
- [x] Create GET all workout endpoint, use requireAuth
- [x] Create GET one workout endpoint, use requireAuth
- [x] Create POST workout endpoint, use requireAuth
- [x] Create PATCH workout endpoint, use requireAuth
- [x] Create DELETE workout endpoint, use requireAuth
- [x] Create an endpoint from server.js to workoutRoutes.js

## Definition of done
- User can CRUD a workout
- when getting all workouts only workouts inside parent program appear

## Deadline
- 2026-05-4
- Reached deadline?
    - [ ] Yes
    - [x] No, [1] day too late, because [I had to learn concepts I hadn't tought of before like indexes and B-trees, and mongosh tho I don't understand it fully yet, I know way more than the me before this sprint.]

## reflection

### What went good
- I went through concepts even tho I had the intense urge of going through the sprint as fast as possible. 
- I was able to write controllers on my own much quicker.
- I asked AI less about error handling and tried handling my own errors, 99% of the times I was able to solve it. One time it took me 10 mins, but at the end it was a very stupid bug. So that kinda makes me question whether asking AI would have been better because it was a stupid small bug with no deep meaning. Tho after solbing it I did feel good and I felt knowing my code better.
- I had already assumed that I will finish this screem tomorrow (a day later than the day I actually finished it) But I locked in, went in flow, and finsihed a lot of work with a solid understanding with almost no AI helo. I thought of an Alex Hormozi quote about most people not knowing that we are capable of achieving much more wokrk in a day than we think, turns out that's true.
- Finally I feel like this sprint I learned a lot about stuff I didn't know. It is funny tho, cuz one would think that this sprint is so much like sprint 2 (User Can CRUD programs) that I wouldnt learn anything new. But I learned about:
    - indexes and why we use them and how it works under the hood.
    - B-trees
    - mongosh
    Even tho I dont understand them fully, the fact that I know about them is already pretty good for one sprint. Besides, the more I work with them the better my understanding will get.

### What could have gone better
- Even tho learning new concepts (index, B-tree, mongosh) was one of the good points in this sprint, I still feel like I spent more time there consuming theory that I actually should have. I kept reading and reading about it and even watched a youtube vid. I don't know whether that was the good approach or not, but what I can tell you is that speaking from past experiences, the best way to learn a new concept is by actually doing it and repeating it over and over again, and when you actually do it you get all kidn of errors and failures and through that I tend to build a sold understanding of concepts that used to be intimidating.
- Sometimes, after finishing a controller or a function I send it to AI to doublecheck if there are any stupid errors or security holes, now with this I honestly don't know if it is a good or bad thing but I feel like I should first try to run the function myself, see if I encounter errors, if that's the case solve them and when it works send it to AI to check for stupid mistakes/security holes.
- And of course the fact that I didn't finish the sprint on time, even if it is just one day, it is still late.

## Techincal decisions
- I chose to keep the workout schema simple and the user has only to enter two fields:
    - Name
    - Dutation
   Even tho I might have missed some features by choosing this path, it undoubtedly enhances the UX and allow the user to get his program asap, and because it is still V1 and I shouldn't make it too complicated. Besides, I can always upgrade this in future versions, tho that might be difficult since we have to keep existing data in mind.
- I used indexes because it makes the search for specifc fields much more efficient and faster, I honestly can't think of a downside when it comes to indexes, and the only reason why I haven't used it so far is because I simply didn't know about it.
- I decided to create a separte model for Programs, workouts and exercises because that way it will be way clerer and much more managable when for example I want to loop just over workouts or to get one specific exercise.

# Sprint 4 - user can CRUD exercises

## Goal
- An exercise is in a specifc workout that belongs to specific program.
- User can create an exercise
- User can view one specific exercise
- User can view all exercises that belong to a specifc workout
- User can update a workout
- User can delete a workout

## Tasks

### Data structure
- [x] Create an exercise schema
    - User
    - Workout
    - order
    - name
    - Enum of target muscle with all the possible muscle groups (exactly 1)
    - rest time in seconds (min 10 max 600)
    - sets (min 1 max 20)
    - min reps (min 1 max 50)
    - max reps (min 1 max 50)
- [x] Create Exercise model
- [x] Create muscle group constant

### Controllers
- [x] Create a GET all exercises (within a workout) controller
- [x] Create a GET one specifc exercise (within a workout) controller
- [x] Create a validation util function to validate the submited fields for POST & PATCH
- [x] Create a POST exercise controller, use the exercise validation util
- [x] Create a PATCH exercise controller, use the exercise validation util
- [x] Create a DELETE exercise controller

### Endponts
- [x] Create a GET all exercises endpoint, use requireAuth
- [x] Create a GET one exercises endpoint, use requireAuth
- [x] Create a POST one exercises endpoint, use requireAuth
- [x] Create a PATCH one exercises endpoint, use requireAuth
- [x] Create a DELETE one exercises endpoint, use requireAuth
- [x] Add an endpoint to server.js that reference all '/api/programs/:programId/workouts/:workoutId/exercises' to the exercise router
- [x] Create muscle group endpoint

## Definition of done
- User can CRUD exercises
- Each exercise belongs to a specific workout

## Deadline
- 2026-05-8
- Reached deadline?
    - [x] Yes, completed on [2026-05-8]
    - [ ] No, [] day too late, because []

## Reflection

### What went good