const authorization =require('auth-header');
const express = require('express');
var body_parser = require('body-parser');
const app = express();
const request = require('request');
const async = require('async');
var products = require('./product.json'); 
var bonos = require('./bono.json'); 
var fs = require('fs');


app.use(body_parser.urlencoded({extended:true}));
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
app.get('/product', function(req, res) {
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
    let result = products.filter(item => item.id===parseInt(req.query.id));
    res.send(result);}
}
  });

  app.get('/bonos', (req, res) => {
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
    res.json(bonos);}
}

});
app.get('/bono', function(req, res) {
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
    let result = bonos.filter(item => item.id===parseInt(req.query.id));
    res.send(result);}
}
  });

  app.post('/newBono', function (req, res) {
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
    var bono = req.body.bono;
    bonos.push(JSON.parse(bono));
    fs.writeFile("bono.json", JSON.stringify(bonos), function(err) {
        if (err) {
          return console.log(err);
        }    
        res.send({"Mensaje":"Se ha creado correctamente el bono"});
      });}
    }
 
});
app.listen('3000', () => {
    console.log('Listening on port 3000');
});
