# Test app for All Well

Hi 👋, I hope this repo finds you well. I'm Joel Kassim and this is the code repo for your requested test app.

For deployment, I've hosted the entire application in Render, here's the link:

https://allwell-test-app.onrender.com

!!!WARNING!!!
Render is a no-cost deployment service that doesn't keep your app running 24/7, so it starts the server each time you send a request to it. With this app I've noticed slow server starts, which means long loading times on the app when you first try to load it (From 2 minutes up to 15 minutes at most, just the first time while the server is starting). For this reason, I'll ask you to be patient the first time you run the app, sorry for the inconvenience 🙏

The server/ folder corresponds to the backend code, while the client/ folder holds the fronted.

## BACKEND

STACK:
- APP: Node.js + Express.js
- DB: MongoDB (Atlas)
- ODM : Mongoose

The app circles around the proccess of creating and authenticating users. These operations are handled between the index (routes), controller (request and response handling), service (business logic) and model (db interaction).

The routes the app use for those operations are:

- POST /user/ --> To store new users in DB
- PUT /user/login --> To log the user in the app: It writes the timestamp in the db and returns a jwt token that'll be used for auth
- POST /user/password-reset --> Sends password reset link: Creates a jwt-based password reset link and sends it to the user's email
- PUT /user/:id/token --> To change the user's password: Updates the document in the DB
- PUT /user/logout/:id --> To log the user out the app: It writes the timestamp in the db, invalidating the login jwt


SOME COOL THINGS:

Custom error object:
You may come across a file called app-error.js in the config/ folder. It contains a few classes that I use to handle errors on apps. I usually launch them throwing a new error object from the desired type with the desired message. The errors are catched at the controller level and the error handler middleware (config/app.js) handles them in a proper way and returns a matching error response.


Auth:

Basic jwt auth, but it uses the log in timestamp to generate the token. That means that the same user doesn't generate the same token each time and that, when the user makes a new log in or logs out the app (the actions that overwrite the timestamp), the previous generated tokens don't pass the auth check anymore.

The tokens also expire after 1 min (It may seem a little amount but is perfect for testing).

The entire Auth process is handled by a middleware when you try to access the app view. It just uses the jwt package to verify the token in the params.


Reset password link:

It seemed challenging at the beginning but it ended up being just using jwt in a different way. This jwt generation includes the current password along the jwt secret.

The resulting link is composed of the base link, the password-reset path, the user id and the generated token. Since the jwt expires in 15 min, the link also expires in that time. Once you change the password, the next reset link will be different.

This auth process is also handled by a similar middleware when you try to access the change-password page.


Email sending:

Not much to say. I used the nodemailer package.

I wanted to create the transport using gmail as host, but Google stopped supporting "Less secure app" login last year, so I went with Outlook. The problem with this is that most services block this app emails from free hosts, so I'm also providing the reset password email in the app after you submit your email just in case.

Views:
They are also managed in the backend with routes that send HTML as the response:
GET
- / --> Redirect page (weird implementation, but cool, I'll explain it in the client section)
- /app/:id/:token --> The app
- /login --> Log in page
- /signup --> Sign up page
- /password-reset --> The password reset form
- /password-reset/:id/:token --> The change password page (corresponds to the reset link)


## Client

It was the most painful part of the entire app. Even if you said it wasn't neccessary for evaluation, I wanted to do it properly and ended up doing a mess. It works though, but it doesn't follow any architectural convention or logic, it's just lots of HTML, CSS and JS. I gave up on templates because I though it would be more complex to work with, but I'm sure it would have been easier.

- redirect.html --> An empty page that gets loaded when the user requests the plain / route. If it detects the jwt in the sessionStorage in the browser, it automatically redirects the user to the app, if not it redirects them to the login page.
- app.html --> The app with the button. Only gets loaded after auth and has a logout that ends the session and toggles to a screen with a login redirect.
- login.html --> The log in page. It validates credentials and has redirects to the sign up page and reset password page. The form sends the login request to the server, and stores the token in the sessionStorage, then it redirects the user to the app.
- signup.html --> The sign up page. Validates emails already registered and ensures both inputs have proper values. On submit it sends the signup request to the server and toggles to a screen with a redirect to login.
- forgot-password.html --> The password reset page. It has a form that validates that the email exists and requests the reset link on submit. After submitting, it toggles to a confirmation screen (You can also find the link there).
- change-password.html --> The redirect from the reset link. It validates that password and confirmation are the same value and triggers the update on the server. It the toggles to a redirect to log in.
