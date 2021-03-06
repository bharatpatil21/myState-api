'use strict';

let _ = require('lodash');
let Promise = require('bluebird');
let StatesModel = require('../models/states').stateModel;
let customError = require('../shared/custom-error');

module.exports = {
	getStateList: getStateList,
	getState: getState,
	stateDataUpload: stateDataUpload
};

function getStateList(cb) {
	return StatesModel.find()
		.then((states) => {
			if (!states) {
				cb(new customError({ 'custom_error': 'notFound', 'message': 'State not found.' }));
			} else {
				// TODO: 
				// let stateList = [];
				// states.forEach((state) => {
				// 	stateList.push({
				// 		stateId : state._id,
				// 		state_name: state.state_name
				// 		});
				// })
				// return stateList;
				return states;
			}
		})
		.then((res) => cb(null, res))
		.catch((err) => cb(err));
}

function getState(stateId, cb) {
	return StatesModel.findOne({ _id: stateId })
		.then((stateObj) => {
			if (!stateObj) {
				cb(new customError({ 'custom_error': 'notFound', 'message': 'State not found.' }));
			} else {
				return stateObj.formatResponse(stateObj.toObject());
			}
		})
		.then((res) => cb(null, res))
		.catch((err) => cb(err));
}

function stateDataUpload(data, cb) {
	return StatesModel.remove()
		.then(() => {
			return Promise.map(data, (item) => {
				let data = {
					state_name: item.stateName,
					population: item.population,
					area: item.area,
					gdp_per_capita: item.gdpPerCapita,
					literacy_rate: item.literacyRate,
					gender_ratio: item.genderRatio
				};
				let stateUploadObj = new StatesModel(data);
				// Insert detail in states collection
				return stateUploadObj.saveAsync();
			})
				.then(() => {
					return this.getStateListAsync();
				})
				.catch((err) => cb(err));
		})
		.then((res) => cb(null, res))
		.catch((err) => cb(err));
}

Promise.promisifyAll(module.exports);
