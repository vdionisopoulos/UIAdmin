const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('tools/sla-calculator', { title: 'SLA Calculator' });
});

module.exports = router;
