var pg = require('pg');
var connect = "postgres://postgres:admin@localhost:5432/postgres";

module.exports.addBook = function(req, res, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, return : err });
            }else{
                client.query('INSERT INTO db2.book(title) values($1) RETURNING id',[req.body.title], function(err, result){
                    if(err){
                        callback({status : 500, return : err });
                    }else{
                        done();
                        callback({status : 200, return : {id : result.rows[0].id, title : req.body.title}});
                    }
                });
            }
    });
};

module.exports.getBooks = function(req, res, callback){
    pg.connect(connect, function(err, client, done){
            if(err){
                callback({status : 500, return : err });
            }else{
                client.query('SELECT id, title FROM db2.book', function(err, result){
                      if(err){
                            callback({status : 500, return : err });
                      }else{
                            done();
                            callback({status : 200, return : result.rows});
                      }
                });
            }
    });
};

module.exports.deleteBook = function(_filter, callback){
      pg.connect(connect, function(err, client, done){
           if(err){
                callback({status : 500, return : err });
            }else{
                client.query('DELETE FROM db2.book WHERE id in('+_filter+')', function(err, result){
                    if(err){
                        callback({status : 500, return : err });
                    }else{
                        done();
                        callback({status : 200, return : {id : undefined, title : undefined}});
                    }
                });
            }
         });
};