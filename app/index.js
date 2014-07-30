'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkers', function(req, res){
  res.render('checkers');
});

app.get('/add/:x/:y/:a/:b', function(req, res){
  req.params.x = parseFloat(req.params.x); 
  req.params.y = parseFloat(req.params.y); 
  req.params.a = parseFloat(req.params.a); 
  req.params.b = parseFloat(req.params.b); 
  
  req.params.color = req.query.color;
  req.params.bw = req.query.bw;
  req.params.fontsize = req.query.fontsize;
  console.log(req.params);
  console.log(req.query);

  res.render('sum', req.params);

});

app.get('/sumlist/:numbers', function (req, res){
  req.params.numbers = req.params.numbers.split(',');
  req.params.numbers = req.params.numbers.map( function(x){
    return x * 1;
  });
  req.params.oddColor = req.query.odd;
  req.params.evenColor = req.query.even;

  console.log(req.params);

  res.render('sumlist', req.params);
});


var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});

