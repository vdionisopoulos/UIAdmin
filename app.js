// app.js
const express = require('express');
const path = require('path');

const app = express();

// ROUTES
const indexRouter = require('./routes/index');

// VIEW ENGINE SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// ROUTES
app.use('/', indexRouter);

// 404 HANDLER
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin UI running → http://localhost:${PORT}`);
});