const router = require('express').Router();
//Import all API routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('404!'));

module.exports = router;
