const express = require('express');
const router = express.Router();

// Dashboard route
router.get('/', (req, res) => {
  res.render('index', { title: 'Dashboard' });
});

// Settings page
router.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings' });
});

// (Optional) Redirect unmatched tool paths
router.use('/tools', (req, res) => {
  res.status(404).render('404', { title: 'Tool Not Found' });
});

module.exports = router;