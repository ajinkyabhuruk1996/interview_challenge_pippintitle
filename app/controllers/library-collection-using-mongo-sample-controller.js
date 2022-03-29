let mongoPool = require('../mongo-pool.js');
var applicationConfig = require('../../applicationConfig.js');
const dbName = applicationConfig.databaseName;

async function insertBook(req, res) {
	let promise = new Promise((resolve, reject) => {
		mongoPool.getInstance(function (client) {
			const db = client.db(dbName);
			db.collection('Books', function (err, collection) {

				console.log("In Books collection");
				console.log(req);
				//req.book_id=collection.find().Count()+1;
				collection.insertOne(req); //insertmany//bulkWrite
				//collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });	  
				db.collection('Books').countDocuments(function (err, count) {
					if (err) throw err;
					console.log('Total Rows: ' + count);
					resolve(req);
				});
			});
		})
	});
	let result = await promise; // wait till the promise resolves (*)  
	return result;
}

//https://docs.mongodb.com/manual/reference/method/db.collection.find/
const getBookList = function getBookList(req, res) {
	console.log('get books in book controller');
	mongoPool.getInstance(function (client) {
		const db = client.db(dbName);
		db.collection('Books', function (err, collection) {
			collection.find().toArray(function (err, items) {
				console.log(items);
				res.send(items);
			});
		});
	});
}

async function getBookDetailsByBookName(inputbookname) {
	console.log('books-collection-controller: getBookDetailsByBookName: ' + inputbookname);
	let promise = new Promise((resolve, reject) => {
		mongoPool.getInstance(function (client) {
			console.log('books-collection-controller: getBookDetailsByBookName: dbName: ' + dbName);
			const db = client.db(dbName);
			db.collection('Books', function (err, collection) {
				console.log('books-collection-controller: getBookDetailsByBookName: collection: ' );
				collection.find({ bookname: inputbookname }).toArray(function (err, items) {
					console.log('books-collection-controller: getBookDetailsByBookName: items: ' + JSON.stringify(items, null, 2));
					resolve(items);
				});
			});
		})
	});
	let result = await promise; // wait till the promise resolves (*)  
	return result;
}

async function updateBook(inputbookname, newpassword, cpassword) {
	let promise = new Promise((resolve, reject) => {
		mongoPool.getInstance(function (client) {
			const db = client.db(dbName);
			db.collection('Books', function (err, collection) {
				collection.update({ bookname: inputbookname },
					{ $set: { 'password': newpassword, 'cpassword': cpassword } }, function (err, getBookListresult) {
						if (err) { throw err; }
						resolve(result);
					});
			});
		})
	});
	let result = await promise; // wait till the promise resolves (*)  
	return result;
}

module.exports = {
	insertBook,
	updateBook,
	getBookList,
	getBookDetailsByBookName
}
