var express = require('express');
var router = express.Router();
var sql = require("mssql");
var config = require('../config/config');
var md5 = require('md5');

router.get('/', (req, res) => {
    res.render(__path_views + '/home');
})

router.get('/create-wallet', (req, res) => {
    res.render(__path_views + '/create-wallet');
})

router.post('/create-wallet', (req, res) => {
    sql.connect(config, function(err) {
        if (err) console.log(err);
        let password = md5(req.body.password)
        let keystore = md5(new Date().getTime() + password)
        let address = md5(keystore)
        var request = new sql.Request();
        request.query(`insert into Account (password, keystore, address, balance) values ('${password}', '${keystore}', '${address}', 0)`, function(err, recordset) {
            if (err) console.log(err)
            var text = keystore;
            res.setHeader('Content-type', "application/octet-stream");
            res.setHeader('Content-disposition', 'attachment; filename=keystore.txt');
            res.send(text);
        })
    })
})

router.get('/login', (req, res, next) => {
    res.render(__path_views + '/login');
});

router.post('/login', (req, res, next) => {
    var { password, keystore } = req.body;
    sql.connect(config, function(err) {
        if (err) console.log(err);
        var request = new sql.Request();
        query = `select * from Account where password='${md5(password)}' and keystore='${keystore}'`
        request.query(query, function(err, recordset) {
            if (err) console.log(err)
            console.log(recordset.recordset[0])
            req.session.user = recordset.recordset[0]
            res.redirect('/access-my-wallet')
        });
    });

});

router.get('/access-my-wallet', (req, res) => {
    if (req.session.user !== undefined) res.render(__path_views + '/access-my-wallet');
    else res.redirect('/login');
})

module.exports = router;