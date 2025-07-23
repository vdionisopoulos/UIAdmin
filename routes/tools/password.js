const express = require('express');
const router = express.Router();

router.get('/password-generator', (req, res) => {
  res.render('tools/password-generator', { title: 'Password Generator' });
});

router.get('/passphrase-generator', (req, res) => {
  res.render('tools/passphrase-generator', { title: 'Passphrase Generator' });
});

router.get('/password-checker', (req, res) => {
  res.render('tools/password-checker', { title: 'Password Checker' });
});


module.exports = router;
