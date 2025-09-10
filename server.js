const express = require('express');
const app = express();
const PORT = 3000;

// Статические файлы и парсинг форм
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Настройка папки с шаблонами
app.set('views', './views');

// Подключение шаблонов
app.set('view engine', 'pug'); // PUG — основной
app.engine('ejs', require('ejs').__express); // EJS — вручную подключаем

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


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


// 👥 Маршруты пользователей (PUG)
app.get('/users', (req, res) => {
  res.render('users/index', { users });
});

app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (user) {
    res.render('users/detail', { user });
  } else {
    res.status(404).send('User not found');
  }
});


// 📄 Маршруты статей (EJS)
app.get('/articles', (req, res) => {
  res.render('articles/index.ejs', { articles });
});

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.articleId));
  if (article) {
    res.render('articles/detail.ejs', { article });
  } else {
    res.status(404).send('Article not found');
  }
});
