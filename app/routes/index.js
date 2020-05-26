var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log(__path_views)
    res.render(__path_views + '/home');
})

router.get('/create-wallet', (req, res) => {
    console.log(__path_views)
    res.render(__path_views + '/create-wallet');
})

router.get('/access-my-wallet', (req, res) => {
    console.log(__path_views)
    res.render(__path_views + '/access-my-wallet');
})



module.exports = router;