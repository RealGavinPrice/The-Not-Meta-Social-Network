const router = require('express').Router();
//importing routes from /api/index.js
const routes = require('./api');

//adding routes
router.use('/api', routes);

router.use((req, res) => {
    res.status(404).send('<h1>😵 404 -- ERROR 😬!!</h1>')
});

module.exports = router;