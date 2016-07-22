var qs = require('querystring');
var jsonfile = require('jsonfile')
var Router = require("express").Router();
var request = require('request');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

Router.route("/jobs/view").get(retrieveJobs);
Router.route("/assets/view/v1").get(retrieveAssets);
Router.route("/assets/associations/v1/:associationId").get(retrieveAssetsAssociations);
Router.route("/assets/associations/v1").put(postAssetsAssociations);
Router.route("/batchIndex/all").get(retireveBatches);
Router.route("/batchIndex").delete(deleteBatch);
Router.route("/usb/view").get(retrieveViewBatch);
Router.route("/vmservice/createImage/v1").post(postCreateBatch);
Router.route("/vmservice/updateImage/v1").post(postUpdateBatch);
Router.route("/usb/checkTable").get(retrieveCheckTable);
Router.route("/usb/getUsbBatchEntriesListForTable").get(retireveBatchEnteries);

var domainURL = "http://mediatools.stage.gogoair.com";
//var tmpdomainURL = "http://dataacess.ggvsd.dev.gogoair.com";

function retrieveJobs(req, res){
	//jobs listing
	_pageNum = req.query.pageNum==undefined?0:req.query.pageNum;
	_pageSize = req.query.pageSize==undefined?10:req.query.pageSize;

	file = domainURL + "/jobs/view?pageNum=" + _pageNum + "&pageSize=" + _pageSize;

	file += req.query.airline!=undefined?'&airline='+req.query.airline:'';
	file += req.query.searchTerm!=undefined?'&searchTerm='+req.query.searchTerm:'';

	console.log('file=' + file)

	request.get(file, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.header("ContentType","application/json");
			res.json(body);
		}
	});

}

function retrieveAssets(req, res){
	//assets listing
	console.log(req.query);
	_pageNum = req.query.pageNum==undefined?0:req.query.pageNum;
	_pageSize = req.query.pageSize==undefined?10:req.query.pageSize;

	file = domainURL + "/assets/view/v1?pageNum=" + _pageNum + "&pageSize=" + _pageSize;

	file += req.query.airline!=undefined?'&airline='+req.query.airline:'';
	file += req.query.type!=undefined?'&type='+req.query.type:'';
	file += req.query.date!=undefined?'&date='+req.query.date:'';
	file += req.query.associationId!=undefined?'&associationId='+req.query.associationId:'';
	file += req.query.searchTerm!=undefined?'&searchTerm='+req.query.searchTerm:'';

	console.log('file=' + file)

	request.get(file, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.header("ContentType","application/json");
			res.json(body);
		}
	});
}
function retrieveAssetsAssociations(req, res){
	//associated assets
	console.log(req.query);
	file = domainURL + "/assets/associations/v1/" + req.params.associationId;
	console.log('file=' + file)

	request.get(file, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.header("ContentType","application/json");
			res.json(body);
		}
	});
}
function postAssetsAssociations(req, res){
	//Do assets associations
	file = domainURL + "/assets/associations/v1";
	console.log('file=' + file);
	console.log("options");
	
	var options = {
	method: "PUT",
	uri: file,
	json:true,
	ContentType:"application/json",
	body: req.body
	};
	console.log(options);
	request(options,
		function(error, response, body) {
			if(response != undefined){
				res.header("ContentType","application/json");
				res.json(response);
			}
		}
	);
}
function retireveBatches(req, res){
	//batch listing
	file = domainURL + "/batchIndex/all";

	file += req.query.airline!=undefined?'?airline='+req.query.airline:'';
	console.log('file=' + file)
	request.get(file, function(error, response, body){
		if (!error && response.statusCode == 200){
			res.header("ContentType","application/json");
			res.json(body);
		}else{
			console.log("in error",error)
		}
	});
}
function deleteBatch(req, res){
	//delete existing batch
	console.log("tableName=",req.query.tableName);
	file = domainURL + "/batchIndex?tableName="+req.query.tableName;
	console.log('file=' + file);

	request({
		method: "DELETE",
		uri: file
		},
		function(error, response, body) {
			console.log('error', error)
			if(response != undefined){
				console.log('statusCode=',response.statusCode)
				res.header("ContentType","application/json");
				res.json(response.statusCode);
			}	
		}
	);
}
function retrieveViewBatch(req, res){
	//batch assets browse
	_pageNum = req.query.pageNum==undefined?0:req.query.pageNum;
	_pageSize = req.query.pageSize==undefined?10:req.query.pageSize;

	file = domainURL + "/usb/view?tableName=" + req.query.tableName + "&pageNum=" + _pageNum + "&pageSize=" + _pageSize;

	file += req.query.batchNum!=undefined?'&batchNum='+req.query.batchNum:'';
	file += req.query.date!=undefined?'&date='+req.query.date:'';
	file += req.query.action!=undefined?'&action='+req.query.action:'';
	file += req.query.searchTerm!=undefined?'&searchTerm='+req.query.searchTerm:'';
	console.log('file=' + file)
	request.get(file, function(error, response, body){
	 if (!error && response.statusCode == 200){
		res.header("ContentType","application/json");
		res.json(body);
	 }else{
		 console.log("in error",error)
	 }
	});
}
function postCreateBatch(req, res){
	//create batch
	console.log("CreatBatch is called");
	var form = new formidable.IncomingForm(),
		files = [],
		fields = [];

	// parse a file upload
	form.parse(req, function(err, fields, files) {

		console.log(fields);
		console.log(files);

		var options = { method: 'POST',
			url: domainURL+'/vmservice/createImage/v1',
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'multipart/form-data;' 
			},
			formData: { 
				catName: fields.catName,
				accesName: fields.accesName,
				airline: fields.airline,
				batchNum: fields.batchNum,
				usbCapacity: fields.usbCapacity,
				catalogxmlfile: { 
					value: fs.createReadStream(files.catalogxmlfile.path),
					options: { 
						filename:files.catalogxmlfile.name
					} 
				},
				accessoriesfile: {
					value: fs.createReadStream(files.accessoriesfile.path),
					options: {
						filename:files.accessoriesfile.name
					}
				},
			}
		};

		console.log(options);
		
		request(options, function (error, response, body) {
			console.log('error', error)
			if(response != undefined){
				console.log('statusCode=',response.statusCode)		
				res.json(response.statusCode);
			}	
		});
	});
	return;
}
function postUpdateBatch(req, res){
	//update batch
	console.log("UpdateBatch > called");
	var form = new formidable.IncomingForm(),
		files = [],
		fields = [];

	// parse a file upload
	var options = { method: 'POST',
		url: domainURL + '/vmservice/updateImage/v1?airline='+req.query.airline+'&batch='+req.query.batch+'&usbCapacity='+req.query.usbCapacity+'&partNum='+req.query.partNum,
		headers: {
			'cache-control': 'no-cache',
			'content-type': 'application/json' 
		},
		json:true,
		body:req.body
	};

	console.log(options);

	request(options, function (error, response, body) {
		console.log('error', error)
		if(response != undefined){
			console.log('statusCode=',response.statusCode)
			res.json(response.statusCode);
		}	
	});
	return;
}

function retrieveCheckTable(req, res){
	//jobs listing
	_pageNum = req.query.pageNum==undefined?0:req.query.pageNum;
	_pageSize = req.query.pageSize==undefined?10:req.query.pageSize;

	file = domainURL + "/usb/checkTable?tableName=" + req.query.tableName;

	console.log('file=' + file)

	request.get(file, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.header("Content-Type","application/json");
			res.json(JSON.parse(body));
		}
	});

}

function retireveBatchEnteries(req, res){
	// Batches for a batch.

	_pageNum = req.query.pageNum==undefined?0:req.query.pageNum;
	_pageSize = req.query.pageSize==undefined?10:req.query.pageSize;

	file = domainURL + "/usb/getUsbBatchEntriesListForTable?tableName=" + req.query.tableName;

	console.log('file=' + file)

	request.get(file, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.header("Content-Type","application/json");
			res.json(JSON.parse(body));
		}
	});
}

module.exports = Router;
