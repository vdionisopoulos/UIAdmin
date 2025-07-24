const express = require('express');
const router = express.Router();

// ✅ Utility function to calculate downtime
function calculateSla(uptimePercent) {
  const secondsIn = {
    day: 86400,
    month: 2592000,
    quarter: 7776000,
    year: 31536000,
  };

  const downtime = {};
  for (const period in secondsIn) {
    downtime[period] = ((1 - uptimePercent / 100) * secondsIn[period]).toFixed(2);
  }

  return downtime;
}

// ✅ SLA Calculator UI
router.get('/sla-calculator', (req, res) => {
  res.render('tools/sla-calculator', { title: 'SLA Calculator' });
});

// ✅ SLA Calculator API (secure backend logic)
router.post('/sla-calculate', (req, res) => {
  const { uptime } = req.body;

  const parsed = parseFloat(uptime);
  if (!uptime || isNaN(parsed) || parsed < 90.001 || parsed >= 100) {
    return res.status(400).json({ error: 'Invalid uptime value. Must be between 90.001 and 99.999.' });
  }

  const result = calculateSla(parsed);
  res.json(result);
});

// ✅ SLA Comparison
router.get('/sla-comparison', (req, res) => {
  res.render('tools/sla-comparison', { title: 'SLA Comparison' });
});

// ✅ SLA Reverse (placeholder)
router.get('/sla-reverse', (req, res) => {
  res.render('tools/sla-reverse', { title: 'SLA Reverse' });
});

module.exports = router;
