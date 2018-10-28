## FullQuack MERN-Project (MongoDB, Express, Node, React/Redux)

<blockquote>Despite ample ‘coding interview training’ sites/resources, many developers lack the experience to improve their technical communication to excel on job interview and whiteboarding questions. </blockquote>

Hello, and welcome to our repo! Our **client** runs on localhost:3000, our express **server** runs on localhost:5000 (two terminals running <code>npm run start</code>), and **mongoDB** is currently set for the developer's local database, although an mLab URI can be substituted in <code>server/config/keys.js</code>. 

Feel free to utlize our mLab URI @ <code>mongodb://admin:fullquack3@ds119449.mlab.com:19449/fullquack</code>just don't be surprised if we pop in some new datapoints here and there as we can't wait to do more refactoring ;)

Thanks in advance for your help, feel free to ask us anything about the code, and have fun!	

![Quack Quack!](https://thumbs.dreamstime.com/t/yellow-rubber-ducks-50268179.jpg) 

**--Jonathan, Jonah, and Andrew**

## Stretch Goals / Next Steps ###

Linking up already-created back-end routes to the front-end (more details in the **[Backend Routes](#backend-routes)** section), including: liking/unliking, adding/deleting posts and comments, and deleting users' accounts. 

Currently questions are presented by the most recent -- we aim to add filtering options, including order-by-popularity and tag-names (Javascript, Google Questions, roles, etc.). 

Implementing a 'Logout User' in two ways: 1) User-controlled 'logout' button; 2) Setting an expiration timeout (jwt token expiration isn't applicable to our current codebase, since the token, once logged in is set by localStorage, not token lifespan). 

Setting up our core functionality to record and watch back 'Quacks', AKA video/audio recordings of users' answers to programming/whiteboard questions.  We are aiming to use (free and well-documented) in-browser video and/or audio recording APIs, particularly WebRTC (see [Video and Audio](#video-and-audio)
).  The first step is simply being able to record/re-watch/download users' own videos locally for each question.

In terms of layout. we envision each question having a button that toggles an embedded video/audio div either in the main feed, or on separate route/component, with a small embedded repl.it-like coding widget below to type out the code as they record. Ultimately, our grander goal is to serve up (even potentially host) all clips so that the community can view / comment / vote on each others' 'quacks', similar to how you can see spoilers of how other developers solved programming questions once you've answered them on text-based code-training sites.

We're also interested in implementing a merit-and-engagement-based points system (similar to Stack Overflow), 'verified' status for professional devs, and "Staff Pick" responses.   

While we don't mind seeing code snippets here and there on the site -- particularly necessary in the interview prompts as well as the previously mentioned code editor widget -- we nontheless aim to limit code answers/comments, perhaps through strict limits on comment length, which can be handled via adjustments to <code>server/validation</code> (similar to our email/password validation handling). If users want to speak via code, they should potentially "Quack" back with a video and/or audio comment, not 

### Backend Routes  

- [X] marked routes currently have frontend connections,  - [ ] routes are setup in mongo/express, ready to be hooked up to the client. 

*Note*: There is a proxy specified in <code>client/package.json</code> which allows you to skip the **localhost:5000** url prefix when making client-based http calls. 

1. - [X] **Register new user** via *POST* @ '/api/users/register' -- returns new MongoDB object:<blockquote>email:jonathanschwartz@gmail.com
password:123456
password2:123456
name:Jonathan Schwartz</blockquote>
**validator** *handles validation (proper email format; passwords must match; min/max password length; required inputs must exist).* 

2. - [X] **Login existing user** via *POST* @ '/api/users/login' -- returns bearer token <blockquote>email:jonathanschwartz@gmail.com
password:123456</blockquote>
**passport** *and* **passport-jwt** *facilitates jwt authentication;* **bcrypt** *for password hashing.*

3. - [ ] Using current Bearer token, **get current user** via *GET* @ '/api/users/current' -- returns current user's MongoDB id/name/email: <blockquote>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDA3Zjk1OWJiZWUxNjJjMmU4MmNiZSIsIm5hbWUiOiJKb25hdGhhbiBTY2h3YXJ0eiIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2UxYmE0ZDY1YWRjZjE3MDAwNThkYmJmMzYxNjYxMTg_cz0yMDAmcj1wZyZkPWlkZW50aWNvbiIsImlhdCI6MTU0MDM5MTkzMCwiZXhwIjoxNTQwMzk1NTMwfQ.aiLGkQyc4OIPAmbfpK-rT6yXUT3y7oc_jMlKSTOAlX0</blockquote>

14. - [ ] **Add a post** (authenticated) via *POST* **model** @ '/api/posts/' -- returns new post: <blockquote>{
    "_id": "5bd0b0cceab29e88d1ecc0a6",
    "text": "You have a five quart jug and a three quart jug, and an unlimited supply of water (but no measuring cups) How would you come up with exactly four quarts of water?",
    "name": "Jonathan Schwartz",
    "tags": "Google, Brain-Teaser, Back-End"
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [],
    "date": "2018-10-24T17:50:04.725Z",
    "__v": 0
}</blockquote>**validator** ensures mandatory text field. **Note:** Additional fields (name, avatar) will be pulled via Redux State, not necessary in post request body. 

15. - [X] **Get all users' posts** (Public) sorted by date, *GET* @ '/api/posts/' -- returns all posts, as array of Post objects:<blockquote>[
    {
        "_id": "5bd0b39feab29e88d1ecc0a8",
        "text": "I need coffee, ASAP!",
        "user": "5bd0a4652634ee4a4a9d73e2",
        "likes": [],
        "comments": [],
        "date": "2018-10-24T18:02:07.881Z",
        "__v": 0
    },
    {
        "_id": "5bd0b259eab29e88d1ecc0a7",
        "text": "Is the weather nice today?",
        "user": "5bd0aad62634ee4a4a9d73ea",
        "likes": [],
        "comments": [],
        "date": "2018-10-24T17:56:41.491Z",
        "__v": 0
    },
    {
        "_id": "5bd0b0cceab29e88d1ecc0a6",
        "text": "Does anyone want to do some pair programming this afternoon?",
        "user": "5bd0aad62634ee4a4a9d73ea",
        "likes": [],
        "comments": [],
        "date": "2018-10-24T17:50:04.725Z",
        "__v": 0
    }
]</blockquote>

15. - [ ] **Delete a post** (authenticated) via *DELETE* @ '/api/posts/:id -- returns: <blockquote>{
    "success": true
}</blockquote>

16. - [ ] **Add a comment** (authenticated) via *POST* @ '/api/posts/comment/:id -- returns: <blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "Is the weather nice today?",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [
        {
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "It's pretty cold ... wearing shorts was a bad choice ...",
            "user": "5bd0a4652634ee4a4a9d73e2",
            "date": "2018-10-24T18:11:22.624Z"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 1
}</blockquote>**validator** ensures mandatory text field. **Note:** Additional fields (name, avatar) will be pulled via Redux State, not necessary in post request body.

17. - [ ] **Delete a comment** (authenticated) via *DELETE* @ '/api/posts/comment/:id/:comment_id -- returns updated *Post* <blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "Is the weather nice today?",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [
        {
            "date": "2018-10-24T18:12:45.446Z",
            "_id": "5bd0b61deab29e88d1ecc0ab",
            "text": "Update: I just changed into pants!",
            "user": "5bd0a4652634ee4a4a9d73e2"
        },
        {
            "date": "2018-10-24T18:11:22.624Z",
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "It's pretty cold ... wearing shorts was a bad choice ...",
            "user": "5bd0a4652634ee4a4a9d73e2"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 4
}</blockquote>

18. - [ ] **Like a Post** (authenticated) via *POST* @ '/api/posts/like/:id' -- returns updated post:<blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "Is the weather nice today?",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [
        {
            "_id": "5bd0b7f8eab29e88d1ecc0ad",
            "user": "5bd0a4652634ee4a4a9d73e2"
        }
    ],
    "comments": [
        {
            "date": "2018-10-24T18:12:45.446Z",
            "_id": "5bd0b61deab29e88d1ecc0ab",
            "text": "Update: I just changed into pants!",
            "user": "5bd0a4652634ee4a4a9d73e2"
        },
        {
            "date": "2018-10-24T18:11:22.624Z",
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "It's pretty cold ... wearing shorts was a bad choice ...",
            "user": "5bd0a4652634ee4a4a9d73e2"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 5
}</blockquote>**Note:** If user already liked the post, returns error; You *can* like your own post.

14. - [ ] **Unlike a Post** (authenticated) via *POST* @ '/api/posts/unlike/:id' -- returns updated post:<blockquote>{
    "_id": "5bd0b39feab29e88d1ecc0a8",
    "text": "I need coffee, ASAP!",
    "user": "5bd0a4652634ee4a4a9d73e2",
    "likes": [],
    "comments": [],
    "date": "2018-10-24T18:02:07.881Z",
    "__v": 4
}</blockquote>**Note:** If the user has *not* already liked the post, returns error message.  

13. - [ ] **Delete a user** completely from **Profile** and **Users** collections (authenticated) via *DELETE* @ '/api/profile/' -- returns success message: <blockquote>{
    "success": true
}</blockquote>

## Additional Info

### Video and Audio demos and documentation

- https://developers.google.com/web/updates/2016/01/mediarecorder
- https://quickblox.github.io/javascript-media-recorder/sample/
- https://mdn.github.io/web-dictaphone/
- https://webrtc.github.io/samples/src/content/getusermedia/record/
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API#Capturing_the_media_stream
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
- https://github.com/chrisjohndigital/TutorRoom
- https://github.com/chrisjohndigital/OpenLang
- https://addpipe.com/blog/mediarecorder-api/
- https://github.com/QuickBlox/javascript-media-recorder/
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia


### Coding Challenge Sites and Front-End Layout Inspiration:

- https://news.ycombinator.com/show
- https://www.glassdoor.com/Interview/software-developer-interview-questions-SRCH_KO0,18_SDMC.htm
- https://www.interviewcake.com/
- https://www.codewars.com/
- https://leetcode.com/
- https://careercup.com/
- https://www.toptal.com/ios/interview-questions
- https://www.reddit.com/r/cscareerquestions/comments/20ahfq/heres_a_pretty_big_list_of_programming_interview/
- https://programmingpraxis.com/
- https://codingbat.com/java
- https://github.com/andreis/interviewhttps://www.spoj.com/
- https://www.interviewbit.com/
- https://www.codechef.com/

### Rubber-Ducking Background Research:
- https://nickjanetakis.com/blog/solve-programming-problems-with-rubber-duck-debugging
- https://rubberduckdebugging.com/cyberduck/ (‘Chat’ out your issues with a bot)
- https://en.wikipedia.org/wiki/Rubber_duck_debugging
- https://blog.wsol.com/how-a-rubber-duck-taught-me-to-be-a-better-programmer
 

### Hack Reactor Rubber-Ducking Instructions:

1) Prepare to record & time

Prepare your screencasting (both video and audio) setup all ready to go before de-obfuscating the problem statement.
Prepare an audible countdown timer (say, the Clock app on your phone).

2) Begin the problem

Go to http://www.rot13.com/ and de-obfuscate the problem statement.
Paste the problem statement into the work area in Repl.it (replace the original, obfuscated version).
Start your timer for: 20 minutes / TWENTY MINUTES
Start recording.

3) Do the problem in a structured way

Note: Since you are working by yourself, you have to mimic the live experience by asking rhetorical questions, then provisionally answering them yourself on behalf of your imaginary live interviewer. Ask those questions out loud anyway!
