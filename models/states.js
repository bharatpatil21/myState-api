'use strict';

let _ = require('lodash');
let Promise = require('bluebird');
let mongoose = require('mongoose');
mongoose.Promise = Promise;
let mongooseSchema = mongoose.Schema;
Promise.promisifyAll(mongoose);

let State = new mongooseSchema({
	state_name: { type: String, index: true },
	population: { type: Number },
	area: { type: Number },
	gdp_per_capita: { type: Number },
	literacy_rate: { type: Number },
	gender_ratio: { type: Number }
});

State.methods.formatResponse = function (dataObj) {
	return _.omit(dataObj, ['__v']);
};

module.exports = {
	stateModel: mongoose.model('states', State),
};