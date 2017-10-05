var express = require('express');
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  //insertDocuments(db, function() {
    updateDocument(db, function() {
      db.close();
    });
  //});
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var findDocumentsQuery = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });      
}

var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}

// MongoDB
//mongoose.connect('mongodb://localhost/rent_db');
//var db = mongoose.connection;

//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function() {
//  console.log('Conectado no mongo');
//});

/*
var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

db.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
});

db.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});

db.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected');
});

db.on('open', function () {  
  console.log('Mongoose default connection is open');
});*/

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

/*app.get('/', function(req, res) {
	res.send('It works!!!');
});*/

app.listen(3000);
console.log('Listening on port 3000');