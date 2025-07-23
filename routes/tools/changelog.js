const express = require('express');
const router = express.Router();

router.get('/changelog', (req, res) => {
  res.render('tools/changelog', { title: 'Changelog' });
});

module.exports = router;
