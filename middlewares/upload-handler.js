'use strict';

let multer = require('multer');
const _ = require('lodash');
const getenv = require('getenv');
const uuid = require('uuid');
const fs = require('fs');
module.exports = {
	initialize: initialize
};

let isInitialized = false, upload;

function initialize(app) {
	if (!isInitialized) {
		let storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'upload');
			},
			filename: function (req, file, cb) {
				let extArray = file.mimetype.split('/');
				let extension = extArray[extArray.length - 1];
				let imageName = uuid.v4() + '.' + extension;
				cb(null, imageName);
			}
		});

		const fileFilter = function (req, file, cb) {
			// accept image only
			if (!file.originalname.match(/\.(json|JSON)$/)) {
				return cb(new Error('Only image files are allowed!'), false);
			}
			cb(null, true);
		};


		upload = multer({
			limits: {
				fileSize: 2097152 // TODO: Put in env
			},
			storage,
			fileFilter
		}).fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 1 }]);
		isInitialized = true;
	}


	app.use(upload, (req, res, next) => {

		function onClose() {
			let images = (req['files'] && req['files']['images'] && req['files']['images'].length) ? req.files.images : [];
			let image = (req['files'] && req['files']['image'] && req['files']['image'].length) ? req.files.image : [];
			let reqImages = _.concat(images, image);
			// Check if request has files and delte if not deleted
			_.forEach(reqImages, (image) => {
				let path = 'upload' + '/' + image.filename;
				fs.stat(path, (errState, stateObj) => {
					if (errState) next(errState);
					if (stateObj.isFile()) {
						fs.unlink(path, (err) => {
							if (err) next(err);
						});
					}
				});
			});
		}
		req.on('abort', onClose);
		res.on('close', onClose);
		res.on('finish', onClose);
		next();
	});
}
