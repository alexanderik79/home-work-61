# Express Server with PUG, EJS, Cookies, JWT and Static Files

## 📦 Overview

This project demonstrates an Express.js server that integrates:

- Two templating engines: **PUG** and **EJS**
- Static file serving (including `favicon.ico`)
- Cookie-based theme selection (light/dark)
- JWT-based user authentication (token in httpOnly cookie)
- A login form (served as a static page) that can display the issued token

---

## 🚀 Installation

```bash
# Install dependencies
npm install

# Start the server
node server.js
```

Then open your browser at:

```
http://localhost:3000/users
http://localhost:3000/articles
http://localhost:3000/login.html
```

---

## 🔗 Routes

| Route | Method | Template / Type | Description |
|---|---:|---|---|
| `/users` | GET | PUG | List of users |
| `/users/:userId` | GET | PUG | User details |
| `/articles` | GET | EJS | List of articles |
| `/articles/:articleId` | GET | EJS | Article details |
| `/set-theme/:theme` | GET | — | Sets theme (light or dark) via cookie |
| `/login` | POST | — | Authenticates user and sets JWT cookie |
| `/dashboard` | GET | — | Protected route, requires valid JWT |
| `/login.html` | GET | Static | Login form with token display |

---

## 🎨 Theme Switching

Users can switch between light and dark themes by visiting:

- `/set-theme/light`
- `/set-theme/dark`

Theme selection is saved in a cookie and applied to all pages. Use CSS classes `.light` and `.dark` (or server-side logic) to control styling.

---

## 🔐 JWT Authentication

- Login via `POST /login` (for example with JSON body `{ "username": "alex" }`).
- Server issues a JWT and stores it in an **httpOnly** cookie (e.g. `token`).
- Protected routes (like `/dashboard`) validate the token via middleware.
- Middleware should verify the token and attach `req.user` (decoded payload) to the request.

**Example** middleware (high-level idea):

```js
// middleware/auth.js (example)
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.redirect('/login.html'); // or 401

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}
```

---

## 🧪 Testing with Postman

**Login**

```
POST http://localhost:3000/login
Headers:
  Content-Type: application/json

Body (JSON):
{
  "username": "alex"
}
```

**Dashboard**

```
GET http://localhost:3000/dashboard
Cookie: token=YOUR_JWT_HERE
```

If using Postman, enable "Automatically follow redirects" and make sure cookies are preserved between requests.

---

## 🎨 Templates & Static Files

- **PUG** is set as the default view engine for routes under `/users`.
- **EJS** templates are rendered explicitly (e.g. `res.render('articles/index.ejs')` or `res.render('articles/index', { /* options */ })` with view engine override).
- Static assets (CSS, JS, favicon, `login.html`) are served from `/public`.

Include a `favicon.ico` file inside `public/` and link it in your templates or let Express serve it statically.

---

## 📂 Project Structure

```
project-folder/
├── server.js
├── middleware/
│   └── auth.js
├── views/
│   ├── users/
│   │   ├── index.pug
│   │   └── detail.pug
│   ├── articles/
│   │   ├── index.ejs
│   │   └── detail.ejs
├── public/
│   ├── styles.css
│   ├── favicon.ico
│   └── login.html
├── README.md
```

---

## ✅ Tips & Recommendations

- Use `cookie-parser` to read/write cookies in Express.
- Store `JWT_SECRET` in environment variables (never commit secrets).
- Set secure flags for cookies in production (`secure: true`, `sameSite`).
- Consider CSRF protection for state-changing POST routes.
- For production, use a reverse proxy (NGINX) and enable HTTPS.
- Add server-side validation for login credentials.

---

## 📤 License

This project is open-source and free to use for educational purposes.
