'use strict';
var multer = require('multer');

let statesService = require('../../services/states');
let commonService = require('../../services/common');

module.exports = {
	getStateList: getStateList,
	getState: getState,
	stateDataUpload: stateDataUpload
};

function getStateList(req, res, next) {
	statesService.getStateListAsync()
		.then((result) => {
			res.json(commonService.resJson('States fetched successfully.', result));
		})
		.catch(next);
}

function getState(req, res, next) {
	let stateId = req.swagger.params.stateId.value;
	statesService.getStateAsync(stateId)
		.then((result) => {
			res.json(commonService.resJson('State fetched successfully.', result));
		})
		.catch(next);
}


function stateDataUpload(req, res, next) {
	statesService.stateDataUploadAsync(req.body)
		.then((result) => {
			res.json(commonService.resJson('State fetched successfully.', result));
		})
		.catch(next);
}