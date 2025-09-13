const express = require('express');
const app = express();
const PORT = 3000;

require('dotenv').config();
const SECRET = process.env.SECRET;


const jwt = require('jsonwebtoken');


const authMiddleware = require('./middleware/auth');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-theme/:theme', (req, res) => {
  const theme = req.params.theme;
  const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;
  res.cookie('theme', theme, { maxAge: tenYears });
  res.send(`Theme set to ${theme}`);
});

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');

// Подключение шаблонов
app.set('view engine', 'pug'); // PUG — основной
app.engine('ejs', require('ejs').__express); // EJS — вручную подключаем



// 👥 Данные пользователей
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 22 }
];

// 📄 Данные статей
const articles = [
  { id: 1, title: 'Express Basics', content: 'Learn the basics of Express.js' },
  { id: 2, title: 'Using PUG', content: 'How to use PUG templates in Express' },
  { id: 3, title: 'Intro to EJS', content: 'Getting started with EJS templating' }
];




app.get('/users', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('users/index', { users, theme });
});


app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  const theme = req.cookies.theme || 'light';
  if (user) {
    res.render('users/detail', { user, theme });
  } else {
    res.status(404).send('User not found');
  }
});



// 📄 Маршруты статей (EJS)
app.get('/articles', (req, res) => {
  const theme = req.cookies.theme || 'light';  
  res.render('articles/index.ejs', { articles, theme });
});



app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.articleId));
  const theme = req.cookies.theme || 'light';
  if (article) {
    res.render('articles/detail.ejs', { article, theme });
  } else {
    res.status(404).send('Article not found');
  }
});


app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send('Username required');

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  console.log(`[LOGIN] User "${username}" logged in`);
  console.log(`[LOGIN] JWT issued: ${token}`);

  res.send(`JWT: ${token}`);
});



app.get('/dashboard', authMiddleware, (req, res) => {
  console.log(`[DASHBOARD] Access granted to "${req.user.username}"`);
  res.send(`Welcome to your dashboard, ${req.user.username}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});