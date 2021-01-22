const authorization =require('auth-header');
const express = require('express');
const app = express();
const request = require('request');
const async = require('async');
var products = require('./product.json'); 
var bonos = require('./bono.json'); 


app.get('/products', (req, res) => {
    function fail() {
        res.set('WWW-Authenticate', authorization.format('Basic'));
        res.status(401).send();
    }
    var auth = authorization.parse(req.get('authorization'));
     if (auth.scheme !== 'Basic') {
        res.status(401).send();
    }else{
    var [us, pw] = Buffer.from(auth.token, 'base64').toString().split(':', 2);
    if (us !== 'admin') {
        res.status(401).send();
    }else{
    res.json(products);}
}

});

app.listen('3000', () => {
    console.log('Listening on port 3000');
});
