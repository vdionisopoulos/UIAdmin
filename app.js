// app.js
const express = require('express');
const path = require('path');

const app = express();

// Middleware to parse JSON requests (for POST /api/share/increment)
app.use(express.json());

// VIEW ENGINE SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// ✅ API ROUTES — register before anything else
const shareCounterRoute = require('./routes/api/share-counter');
app.use('/api/share', shareCounterRoute);

// MAIN ROUTES
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use('/js/tools', (req, res) => {
  res.status(403).send('Forbidden');
});

// 404 HANDLER (must be last)
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});



// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin UI running → http://localhost:${PORT}`);
});
