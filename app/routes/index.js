var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render(__path_views + '/home');
})

router.get('/create-wallet', (req, res) => {
    res.render(__path_views + '/create-wallet');
})

router.post('/create-wallet', (req, res) => {
    res.redirect('/access-my-wallet');
})

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

router.get('/login', (req, res, next) => {
    console.log('LOGIN-GET')
    res.render(__path_views + '/login');
});

router.post('/login', (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
});

router.get('/access-my-wallet', (req, res) => {
    console.log('ACCESS-MY-WALLET')
    if (req.isAuthenticated()) res.render(__path_views + '/access-my-wallet');
    else res.redirect('/login');
})

module.exports = router;