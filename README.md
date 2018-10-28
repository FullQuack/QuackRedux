## FullQuack MERN-Project (MongoDB, Express, Node, React/Redux)

<blockquote>Despite ample ‘coding interview training’ sites/resources, many developers lack the experience to improve their technical communication to excel on job interview and whiteboarding questions. </blockquote>

Hello, and welcome to the wonderful world of [FullQuack](https://youtu.be/bf9d7rSf_Ks?t=33)! Our **client** runs on localhost:3000, our express **server** runs on localhost:5000 (two terminals running <code>npm run start</code>), and **mongoDB** is currently set for the developer's local database, although an mLab URI can be substituted in <code>server/config/keys.js</code>. 

Feel free to utlize our **mLab URI** @ <code>mongodb://admin:fullquack3@ds119449.mlab.com:19449/fullquack</code>just don't be surprised if we pop in some new datapoints here and there as we can't wait to do more refactoring ;)

Thanks in advance for your help, feel free to ask us anything about the code, and have fun!	

![Quack Quack!](https://thumbs.dreamstime.com/t/yellow-rubber-ducks-50268179.jpg) 

**--Jonathan, Andrew, and Jonah**

## Next Steps ###

- [ ] Linking up already-created back-end routes to the front-end (more details in the **[Backend Routes](#backend-routes)** section), including: **liking/unliking**, adding/deleting **posts** and **comments**, and **deleting accounts**. 

- [ ] Questions are currently **displayed by recency**, we'd like to add more filtering/sorting options, including **popularity** and **tag-names** (Javascript, Google Questions, roles, etc.). 

- [ ] Implementing **Logout** functionality in two ways: 1) **User-controlled** logout button; 2) Setting an **expiration timeout** on the backend for perhaps 24 hours after login (we realize this isn't a high-security app, so not nearly as vital as user-controlled logout). Redux holds the "iat" issued-at time for the User's token in the store, so a little Math (i.e., Time Now - Issued At Time = Time) could do the trick. 

- [ ] Setting up our core functionality to **record**, **re-watch**, and **download** 'Quacks', AKA **video/audio recordings** of users' answers to programming/whiteboard questions.  We are aiming to use (free and well-documented) in-browser video and/or audio recording APIs, particularly **WebRTC** (see **[Additional Info](#additional-info)**
).

![Video Example](https://camo.githubusercontent.com/477fd11fb754dba293b75b89940f6d8dcfe04646/687474703a2f2f662e636c2e6c792f6974656d732f3064323233473249314b334833383176314833452f53637265656e25323053686f74253230323031332d30312d31332532306174253230332e30392e3137253230504d2e706e67)

- [ ] In terms of layout. we envision each question having a button that toggles an **embedded video** and/or **audio** widget, either in the main feed, or on a separate route/component, with a small [embedded repl.it iframe](https://repl.it/site/docs/repls/embed) below to *type code as they record*. Ultimately, our grander goal is to display (potentially host) **all clips** so that the community can **view**, **comment**, and **vote** on each others' *quacks*, similar to how on other code-training sites, users can see **spoilers of others' solutions** once they've submitted their own responses.  

- [ ] Speaking of our **front-end** design, our current **animated duck** background, made with inline CSS in <code>client/public/index.html</code>, was (lovingly) lifted from another artist for our demo.  We want **our own design** using this duck as inspiration, adding more flexibility/functionality (one limitation of the current duck is that it prevents page-scrolling). In addition to time-based css animations, we want to make it also **responsive to user actions**, for example, a **button click** on a 'record-a-quack' button -- in addition to triggering our embedded video/repl iFrame -- simultaneously triggers a <code>@keyframes</code> animation loop ([example](https://codepen.io/velopert/pen/PzoWpE)) where our duck opens it's mouth to 'speak'.  Additionally, the rest of our layout/design is hastily-added twitter **bootstrap boilerplate** classes. We'd love **thoughtfully-designed 'question' divs**, **bright buttons**, [animated CSS bubbles](https://codepen.io/Mark_Bowley/pen/mEtqj), and of course, LOTS and LOTS of **rubber ducks**. Also, we'd like to implement **input tag icons** for our question tags which, despite a plethora of react-based npms, proved difficult for us:

![tags!](https://vuejsexamples.com/content/images/2018/02/Vue-Tags-Input.gif) 

- [ ] We're also interested in implementing a merit-and-engagement-based **points system** (similar to [Stack Overflow badges](https://stackoverflow.com/help/badges)), 'verified' status for professional devs, and 'Staff Pick' responses.   

- [ ] While we don't mind seeing code snippets here and there on the site -- particularly necessary in the interview prompts as well as the previously mentioned coding widget -- we nontheless aim to **limit code** in comments, perhaps through strict limits on comment length, which can be handled via adjustments to <code>server/validation</code> (similar to our email/password validation handling). If users want to speak via code, they could potentially "Quack" back with a video and/or audio comment, just *not* with reams of code text. 

### Backend Routes  

**NOTES**: Currently **checkmarked routes** have been successfully linked to our front-end, while **unchecked routes** are setup in mongo/express, ready to be hooked up to the client. There is a **proxy** setup in <code>client/package.json</code> which allows you to skip the **localhost:5000** url prefix when making client-based http calls. 

1. - [X] **Register new user** via *POST* @ '/api/users/register' -- returns new MongoDB object:<blockquote>email:jonathanschwartz@gmail.com
password:123456
password2:123456
name:Jonathan Schwartz</blockquote>
**validator** *handles validation (proper email format; passwords must match; min/max password length; required inputs must exist).* 

2. - [X] **Login existing user** via *POST* @ '/api/users/login' -- returns bearer token <blockquote>email:jonathanschwartz@gmail.com
password:123456</blockquote>
**passport** *and* **passport-jwt** *facilitates jwt authentication;* **bcrypt** *for password hashing.*

3. - [ ] **Add a post** (authenticated) via *POST* **model** @ '/api/posts/' -- returns new post: <blockquote>{
    "_id": "5bd0b0cceab29e88d1ecc0a6",
    "text": "You have a five quart jug and a three quart jug, and an unlimited supply of water (but no measuring cups) How would you come up with exactly four quarts of water?",
    "name": "Jonathan Schwartz",
    "tags": "Google, Brain-Teaser, Back-End"
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [],
    "date": "2018-10-24T17:50:04.725Z",
    "__v": 0
}</blockquote>**validator** ensures mandatory text field. **Note:** Additional fields (name) will be pulled via Redux State, not necessary in post request body. 

4. - [X] **Get all users' posts** (Public) sorted by date, *GET* @ '/api/posts/' -- returns all posts, as array of Post objects:<blockquote>[
    {
        "_id": "5bd0b39feab29e88d1ecc0a8",
        "text": "How do you find the missing number in a given integer array of 1 to 100?",
        "user": "5bd0a4652634ee4a4a9d73e2",
        "name": "Jonah Wilkof",
        "tags": "Big Four, Algorithm, Data Structures"
        "likes": [],
        "comments": [],
        "date": "2018-10-24T18:02:07.881Z",
        "__v": 0
    },
    {
        "_id": "5bd0b259eab29e88d1ecc0a7",
        "text": "How do you find the largest and smallest number in an unsorted integer array?",
        "name": "Andrew Catalano",
        "tags": "Arrays"
        "user": "5bd0aad62634ee4a4a9d73ea",
        "likes": [],
        "comments": [],
        "date": "2018-10-24T17:56:41.491Z",
        "__v": 0
    },
    {
        "_id": "5bd0b0cceab29e88d1ecc0a6",
        "text": "How do you reverse a singly linked list without recursion?",
        "name": Jonathan Schwartz,
        "tags": "Linked Lists, Data Structures, Node Interview",
        "user": "5bd0aad62634ee4a4a9d73ea",
        "likes": [],
        "comments": [],
        "date": "2018-10-24T17:50:04.725Z",
        "__v": 0
    }
]</blockquote>

5. - [ ] **Delete a post** (authenticated) via *DELETE* @ '/api/posts/:id -- returns: <blockquote>{
    "success": true
}</blockquote>

6. - [ ] **Add a comment** (authenticated) via *POST* @ '/api/posts/comment/:id -- returns: <blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "How do you find the missing number in a given integer array of 1 to 100?",
    "name": "Jonah Wilkof",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [
        {
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "Excellent response, you spoke clearly from a high conceptual level then worked your way down.",
            "name": "Andrew Catalano",
            "user": "5bd0a4652634ee4a4a9d73e2",
            "date": "2018-10-24T18:11:22.624Z"
        },
         {
            "date": "2018-10-24T18:11:22.624Z",
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "name": "Jonathan Schwartz",
            "text": "Watch your 'um' and 'likes' -- otherwise, great answer!",
            "user": "5bd0a4652634ee4a4a9d73e2"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 1
}</blockquote>**validator** ensures mandatory text field. **Note:** Additional fields (i.e., name) will be pulled via Redux State, not necessary in post request body.

7. - [ ] **Delete a comment** (authenticated) via *DELETE* @ '/api/posts/comment/:id/:comment_id -- returns updated *Post* <blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "How do you find the missing number in a given integer array of 1 to 100?",
    "name": "Jonah Wilkof",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [
        {
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "Excellent response, you spoke clearly from a high conceptual level then worked your way down.",
            "name": "Andrew Catalano",
            "user": "5bd0a4652634ee4a4a9d73e2",
            "date": "2018-10-24T18:11:22.624Z"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 1
}</blockquote>

8. - [ ] **Like a Post** (authenticated) via *POST* @ '/api/posts/like/:id' -- returns updated post:<blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "How do you find the missing number in a given integer array of 1 to 100?",
    "name": "Jonah Wilkof",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [
        {
            "_id": "5bd0b7f8eab29e88d1ecc0ad",
            "user": "5bd0a4652634ee4a4a9d73e2",
            "name": "Jonathan Schwartz",
            "date": "2018-10-24T18:12:45.446Z",
        }
             ],
    "comments": [
        {
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "Excellent response, you spoke clearly from a high conceptual level then worked your way down.",
            "name": "Andrew Catalano",
            "user": "5bd0a4652634ee4a4a9d73e2",
            "date": "2018-10-24T18:11:22.624Z"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 1
}</blockquote>**Note:** If user already liked the post, returns error; You *can* like your own post.

9. - [ ] **Unlike a Post** (authenticated) via *POST* @ '/api/posts/unlike/:id' -- returns updated post:<blockquote>{
    "_id": "5bd0b259eab29e88d1ecc0a7",
    "text": "How do you find the missing number in a given integer array of 1 to 100?",
    "name": "Jonah Wilkof",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [
        {
            "_id": "5bd0b5caeab29e88d1ecc0aa",
            "text": "Excellent response, you spoke clearly from a high conceptual level then worked your way down.",
            "name": "Andrew Catalano",
            "user": "5bd0a4652634ee4a4a9d73e2",
            "date": "2018-10-24T18:11:22.624Z"
        }
    ],
    "date": "2018-10-24T17:56:41.491Z",
    "__v": 1
}</blockquote>**Note:** If the user has *not* already liked the post, returns error message.  

10. - [ ] **Delete a user** completely from **Profile** and **Users** collections (authenticated) via *DELETE* @ '/api/profile/' -- returns success message: <blockquote>{
    "success": true
}</blockquote>

## Additional Info

### Video and Audio

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
