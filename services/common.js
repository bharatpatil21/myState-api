'use strict';
let Promise = require('bluebird');

module.exports = {
	resJson: resJson
};


function resJson(message, data) {
	return {
		statusCode: 200,
		message,
		data
	};
}

Promise.promisifyAll(module.exports);
