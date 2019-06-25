'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
let _ = require('lodash');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  _.extend(app.config, swaggerExpress.runner.config);

  // install middleware
  require('./middlewares/dbconnect').initialize(app);
  // require('./middlewares/upload-handler').initialize(app);
  
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;

  app.listen(port, () => {
    console.log('server started on http://127.0.0.1:' + port );
  });
});
