'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');
let getenv = require('getenv');

module.exports = {
  initialize: initialize
};

let isInitialized = false, conn;

function initialize(app) {
  if (!isInitialized) {
    mongoose.Promise = global.Promise;
    const DB_USER = 'testDemo';
    const PASSWORD = encodeURIComponent('Test@123');
    //mongodb://username:password@host:port/database
    let dbUrl = `mongodb://${DB_USER}:${PASSWORD}@ds241647.mlab.com:41647/mystate`;
    mongoose.connect(dbUrl, (err, database) => {
      if (err) {
        throw err;
      }
      conn = database;
    });
    isInitialized = true;
  }

  app.use((req, res, next) => {
    req.conn = conn;
    next();
  });
}
