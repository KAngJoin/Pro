const express = require('express');
const router = express.Router();
const url = require('url');

const addController = require('../controllers/addController');

//post
router.post('/*', function (req, res) {
    let pathname = url.parse(req.url).pathname;
    if (pathname == '/index') {
        //发布
        addController.addHistory(req, res)
    }
});

module.exports = router;