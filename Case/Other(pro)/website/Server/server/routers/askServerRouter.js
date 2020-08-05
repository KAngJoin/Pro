const express = require('express');
const router = express.Router();
const url = require('url');

const askController = require('../controllers/askController');

//post
router.post('/*', function (req, res) {
    let pathname = url.parse(req.url).pathname;
    if (pathname == '/all') {
        //发布
        askController.askAllData(req, res)
    }
});

module.exports = router;