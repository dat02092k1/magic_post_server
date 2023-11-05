const express = require('express');

const router = express.Router();

router.get('/heh', (req, res) => {
    res.send('hef');
});

module.exports = router;