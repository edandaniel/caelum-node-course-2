var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var	morgan	=	require('morgan');
var	logger	=	require('../app/infra/logger.js');

module.exports = function () {
  var app = express();
  var ExpressValidator = require('express-validator');

  app.use(ExpressValidator());
  app.use(bodyParser.urlencoded({extended:	true}));
  app.use(bodyParser.json());

  app.use(morgan("common",	{
    stream:	{
      write:	function(message){
        logger.info(message)
			}
		}
	}));

  load('controllers',{cwd:'app'})
    .then('infra')
    .then('services')
    .into(app);

  return app;
};
