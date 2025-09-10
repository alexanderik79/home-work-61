# Express Server with PUG and EJS Templates

## 📦 Overview

This project demonstrates how to integrate two templating engines — **PUG** and **EJS** — into a single Express.js server.

- `/users` and `/users/:userId` routes use **PUG** templates
- `/articles` and `/articles/:articleId` routes use **EJS** templates

The goal is to serve dynamic HTML pages using different templating engines depending on the route.

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000/users
   http://localhost:3000/articles
   ```

## 🔗 Routes

| Route               | Template | Description        |
|---------------------|----------|--------------------|
| `/users`            | PUG      | List of users      |
| `/users/:userId`    | PUG      | User details       |
| `/articles`         | EJS      | List of articles   |
| `/articles/:articleId` | EJS   | Article details    |

## 🎨 Styling

Basic styling is included via `public/styles.css`. All templates link to this stylesheet for consistent design.

## 📂 Project Structure

```
project-folder/
├── server.js
├── views/
│   ├── users/
│   │   ├── index.pug
│   │   └── detail.pug
│   ├── articles/
│   │   ├── index.ejs
│   │   └── detail.ejs
├── public/
│   └── styles.css
├── README.md
```

## 🧠 Notes

- PUG is set as the default view engine.
- EJS templates are rendered explicitly using `.ejs` extension.
- You can extend this project by adding forms, databases, or additional routes.

## 📤 License

This project is open-source and free to use for educational purposes.
