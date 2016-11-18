'use strict'
let express = require('express'),
    compress = require('compression'),
    app = express(),
    http = require('http'),
    engines = require('consolidate'),
    defaultPort = 8090;

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(compress({
  filter: function (req, res) {
    return true;
  }
}));
app.use(express['static'](__dirname + '/public'));
app.use("*", function(req, res, next){
  res.sendFile(__dirname + '/public/index.html');
});
http.createServer(app).listen(defaultPort);



