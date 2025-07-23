const express = require('express');
const router = express.Router();

// Dashboard
router.get('/', (req, res) => {
  res.render('index', { title: 'Dashboard' });
});

// Settings
router.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings' });
});

// ✅ Place real tool routes BEFORE the catch-all
router.use('/tools/sla-calculator', require('./tools/sla-calculator'));

// ❌ 404 fallback must come last
router.use('/tools', (req, res) => {
  res.status(404).render('404', { title: 'Tool Not Found' });
});

module.exports = router;
