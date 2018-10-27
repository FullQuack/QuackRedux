## Latest Changes
1. Added Create-React-App, took out boilerplate
2. Installed/scripted **concurrently** package (To Run Front + Backend Servers, in main dir, "npm run dev").
3. Setup **proxy** in package.json to shorten server http requests urls, i.e., axios.get("/api/posts") as opposed to axios.get("http://localhost:5000/api/posts)
4. Added **/config/keys.js** (which holds Mongoose hosted mLab URI) to .gitignore file to avoid accidentally giving away mlab credentials. When you clone/fork, add the following config/keys.js file: <blockquote>module.exports = {
  mongoURI: 'mongodb://localhost/DevNetwork',
  secretOrKey: 'secret'
}</blockquote>Jonathan will pass along actual mlab credentials in person...
5. Added react-router-dom package, created components for splash page and registration page/route. (Functional Client, fields not typeable yet).
6. Completed 'Success' Routes for Login/Registration, saved jwt token to Local Storage. 
7. New NPM packages (on client), react-router-dom, axios, jwt-decode. 
8. 
 
## FullQuack Previous Backend Route Directory

### Backend (MongoDB, Express.js, Node.js) 

1. **Register new user** via *POST* @ '/api/users/register' -- returns new MongoDB object:<blockquote>email:jonathanschwartz@gmail.com
password:123456
password2:123456
name:Jonathan Schwartz</blockquote>
**validator** *handles validation (proper email format; passwords must match; min/max password length; required inputs must exist).* 

2. **Login existing user** via *POST* @ '/api/users/login' -- returns bearer token (expires after 1 hour): <blockquote>email:jonathanschwartz@gmail.com
password:123456</blockquote>
**passport** *and* **passport-jwt** *facilitates jwt authentication;* **bcrypt** *for password hashing.*

3. Using current Bearer token, **get current user** via *GET* @ '/api/users/current' -- returns current user's MongoDB id/name/email: <blockquote>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDA3Zjk1OWJiZWUxNjJjMmU4MmNiZSIsIm5hbWUiOiJKb25hdGhhbiBTY2h3YXJ0eiIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2UxYmE0ZDY1YWRjZjE3MDAwNThkYmJmMzYxNjYxMTg_cz0yMDAmcj1wZyZkPWlkZW50aWNvbiIsImlhdCI6MTU0MDM5MTkzMCwiZXhwIjoxNTQwMzk1NTMwfQ.aiLGkQyc4OIPAmbfpK-rT6yXUT3y7oc_jMlKSTOAlX0</blockquote>

4. **Make new (or update existing) Profile** for the *jwt-authenticated* user via *POST* @ '/api/profile' -- returns newly created MongoDB *Profile* (connected via Object.Id to User-collection): <blockquote>handle:jsxtreme
company:Codesmith
website:www.jonathanschwartz.com
location:NYC
status:Seeking Employment
youtube:www.youtube.com/joingenerationwifi
linkedin:www.linkedin/jonathanpschwartz
twitter:www.twitter.com/pickingdailies
facebook:www.facebook.com/jonathanschwartz
instagram:www.instagram/filmboy3
skills:HTML, CSS, Javascript</blockquote> **validator** checks url formatting for optional social media, ensures mandatory *skills* (array), *handle*, and *status* are present. **Note:** *bio*, *githubusername*, *social* (obj), *experience* (obj), *education* (obj) are optional. 

5. **Get existing profile** for the *jwt-authenticated* user via *GET* @ '/api/profile' -- returns existing MongoDB *Profile*: <blockquote>{
    "social": {
        "youtube": "www.youtube.com/joingenerationwifi",
        "twitter": "www.twitter.com/pickingdailies",
        "facebook": "www.facebook.com/jonathanschwartz",
        "linkedin": "www.linkedin/jonathanpschwartz",
        "instagram": "www.instagram/filmboy3"
    },
    "skills": [
        "HTML",
        " CSS",
        " Javascript"
    ],
    "_id": "5bd08a8c9bbee162c2e82cbf",
    "user": {
        "_id": "5bd07f959bbee162c2e82cbe",
        "name": "Jonathan Schwartz",
        "avatar": "//www.gravatar.com/avatar/ce1ba4d65adcf1700058dbbf36166118?s=200&r=pg&d=identicon"
    },
    "handle": "jsxtreme",
    "company": "Codesmith",
    "website": "www.jonathanschwartz.com",
    "location": "NYC",
    "status": "Seeking Employment",
    "experience": [
        {
            "current": false,
            "description": false,
            "_id": "5bd09117b5e5e318cd4c32c7",
            "title": "Original Cast Member ",
            "company": "Aladdin on Broadway",
            "location": "New Amsterdam Theater",
            "from": "2013-01-01T00:00:00.000Z"
        }
    ],
    "education": [
        {
            "current": false,
            "_id": "5bd08f0fb5e5e318cd4c32c6",
            "school": "Cranford High School",
            "degree": "GED",
            "fieldofstudy": "General High School Education",
            "from": "2002-01-01T00:00:00.000Z",
            "to": "2006-01-01T00:00:00.000Z",
            "description": "Graduated as Valedictorian with a 4.64 weighted GPA"
        },
        {
            "current": false,
            "description": "false",
            "_id": "5bd08e499bbee162c2e82cc0",
            "school": "Princeton University",
            "degree": "BA",
            "fieldofstudy": "Sociology",
            "from": "2006-01-01T00:00:00.000Z"
        }
    ],
    "date": "2018-10-24T15:06:52.983Z",
    "__v": 3
}</blockquote>

6. **Get all existing profiles** @ GET '/api/profile/all' -- returns existing MongoDB *Profiles* as Array of *Profile* objects (Public Route). 

7. **Get profile by handle** @ GET '/api/profile/handle/:handle -- returns *Profile* by handle param (Public Route). 

8. **Get profile by user id** @ GET '/api/profile/user/:user_id -- returns *Profile* by user_id (users collection) param (Public Route). 

9. **Add an Education record** to profile for (authenticated) user via *POST* @ '/api/profile/education' -- returns updated profile entry:<blockquote>school:Princeton University
degree:BA fieldofstudy:Sociology
from:2006</blockquote>**validator** ensures mandatory *school*, *degree*, *fieldofstudy* and *from* fields are present **Note:** *to*, *current*, and *description* fields are optional.

10. **Delete an Education record** from profile for (authenticated) user via *DELETE* @ '/api/profile/education/:edu_id' -- returns updated profile entry.

11. **Add an Experience record** to profile for (authenticated) user via *POST* @ '/api/profile/experience' -- returns updated profile entry:<blockquote>title:Original Cast Member 
company:Aladdin on Broadway
from:2013
location:New Amsterdam Theater</blockquote>**validator** ensures mandatory *title*, *company*, *from* fields are present. **Note:** *location*, *current*, and *description* are optional.

12. **Delete an Experience record** from profile (authenticated) *DELETE* @ '/api/profile/experience/:exp_id' -- returns updated profile entry.

14. **Add a post** to user's profile (authenticated) via *POST* **model** @ '/api/posts/' -- returns new post: <blockquote>{
    "_id": "5bd0b0cceab29e88d1ecc0a6",
    "text": "Does anyone want to do some pair programming this afternoon?",
    "user": "5bd0aad62634ee4a4a9d73ea",
    "likes": [],
    "comments": [],
    "date": "2018-10-24T17:50:04.725Z",
    "__v": 0
}</blockquote>**validator** ensures mandatory text field. **Note:** Additional fields (name, avatar) will be pulled via Redux State, not necessary in post request body. 

15. **Get all users' posts** (Public) sorted by date, *GET* @ '/api/posts/' -- returns all posts, as array of Post objects:<blockquote>[
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

15. **Delete a post** (authenticated) via *DELETE* @ '/api/posts/:id -- returns: <blockquote>{
    "success": true
}</blockquote>

16. **Add a comment** (authenticated) via *POST* @ '/api/posts/comment/:id -- returns: <blockquote>{
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

17. **Delete a comment** (authenticated) via *DELETE* @ '/api/posts/comment/:id/:comment_id -- returns updated *Post* <blockquote>{
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

18. **Like a Post** (authenticated) via *POST* @ '/api/posts/like/:id' -- returns updated post:<blockquote>{
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

14. **Unlike a Post** (authenticated) via *POST* @ '/api/posts/unlike/:id' -- returns updated post:<blockquote>{
    "_id": "5bd0b39feab29e88d1ecc0a8",
    "text": "I need coffee, ASAP!",
    "user": "5bd0a4652634ee4a4a9d73e2",
    "likes": [],
    "comments": [],
    "date": "2018-10-24T18:02:07.881Z",
    "__v": 4
}</blockquote>**Note:** If the user has *not* already liked the post, returns error message.  

13. **Delete a user** completely from **Profile** and **Users** collections (authenticated) via *DELETE* @ '/api/profile/' -- returns success message: <blockquote>{
    "success": true
}</blockquote>