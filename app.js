var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
app = express();

var bookService = require('./services/book');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getBooks', function(req,res){
    var callback = function(data) {
        students = data;                
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    };
    bookService.getBooks(req, res, callback);
});

app.post('/addBook', function(req,res){
  var callback = function(data) {
        students = data;                
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    };
    bookService.addBook(req, res, callback);
});

app.post('/deleteBook', function(req,res){
    var _ids = req.body.id; 
    var _filter = '';
    for(var i = 0; i < _ids.length;i++){
        _filter += _ids[i].toString() + ((_ids.length-1) == i ? '' : ',');
    }
    var callback = function(data) {
        students = data;                
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    };
    bookService.deleteBook(_filter, callback);
});

app.listen(3000, function(){
    console.log('Server on!');
});
