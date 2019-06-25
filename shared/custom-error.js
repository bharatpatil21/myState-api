'use strict';

module.exports = customError;

function customError(options) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        value: options[key],
        writable: false
      });
    }
  }

  if (Error.hasOwnProperty('captureStackTrace')) {
    Error.captureStackTrace(this, this.constructor);
  }
}

require('util').inherits(customError, Error);
