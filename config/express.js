var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function () {
  var app = express();
  var ExpressValidator = require('express-validator');

  app.use(ExpressValidator());

  load('controllers',{cwd:'app'})
    .then('infra')
    .into(app);

  return app;
};
