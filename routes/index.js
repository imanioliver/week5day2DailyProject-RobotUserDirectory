const express = require('express');
const router = express.Router();
// const Data = require ('../models/data.js')

let data =[];

const getListings = function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient; //reference to the Mongo client
    const assert = require('assert'); //test to see if we have errors

    const url = 'mongodb://localhost:27017/robots'; //represents our mongo database,

    MongoClient.connect(url, function(err, db) { //we call the client and tell it what error, and what database to connect to, make sure there's no errors
        assert.equal(null, err); //does the error equal null? if so good! if it's false, it won't even try to connect to the database

        getData(db, function(){ //this is the call back function of the "getData" variable we created below
            db.close();
            next(); //sends us to the endpoint
        });
    });

    let getData = function (db, callback) { //it calls, needs a database and gives a callback function,
        let users = db.collection("users"); //sets the variable "user" to the dataabase we have. same as "db.users" that we did earlier

        users.find({}).sort({"name": 1}).toArray().then(function(users){ //find all of the users, .toArray returns a promise, THEN set the info i received into a variable call data, then I do my callback function from line 16
            data = users; //set the 50 objects = to the data object at the top
            callback();
        });

    };
};

const getLooking = function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    const url = 'mongodb://localhost:27017/robots';

    MongoClient.connect(url, function(err, db) {

        getData(db, function(){
            db.close();
            next();
        });
    });

    let getData = function (db, callback) {
        let users = db.collection("users");

        users.find({"job": null}).sort({"name": 1}).toArray().then(function(users){
            callback();
        });

    };
};

const getEmployed = function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient; //reference to the Mongo client
    const assert = require('assert'); //test to see if we have errors

    const url = 'mongodb://localhost:27017/robots'; //represents our mongo database,

    MongoClient.connect(url, function(err, db) { //we call the client and tell it what error, and what database to connect to, make sure there's no errors
        assert.equal(null, err); //does the error equal null? if so good! if it's false, it won't even try to connect to the database

        getData(db, function(){ //this is the call back function of the "getData" variable we created below
            db.close();
            next(); //sends us to the endpoint
        });
    });

    let getData = function (db, callback) { //it calls, needs a database and gives a callback function,
        let users = db.collection("users"); //sets the variable "user" to the dataabase we have. same as "db.users" that we did earlier

        users.find({"job": {$nin: [null]}}).sort({"name": 1}).toArray().then(function(users){ //find all of the users, .toArray returns a promise, THEN set the info i received into a variable call data, then I do my callback function from line 16
            data = users; //set the 50 objects = to the data object at the top
            callback();
        });

    };
};

const getCountry = function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient; //reference to the Mongo client
    const assert = require('assert'); //test to see if we have errors

    const url = 'mongodb://localhost:27017/robots'; //represents our mongo database,

    MongoClient.connect(url, function(err, db) { //we call the client and tell it what error, and what database to connect to, make sure there's no errors
        assert.equal(null, err); //does the error equal null? if so good! if it's false, it won't even try to connect to the database

        getData(db, function(){ //this is the call back function of the "getData" variable we created below
            db.close();
            next(); //sends us to the endpoint
        });
    });


    let country = req.params.country;
    let getData = function (db, callback) { //it calls, needs a database and gives a callback function,
        let users = db.collection("users"); //sets the variable "user" to the dataabase we have. same as "db.users" that we did earlier

        users.find({"address.country": "country"}).sort({"name": 1}).toArray().then(function(users){ //find all of the users, .toArray returns a promise, THEN set the info i received into a variable call data, then I do my callback function from line 16

            data = users; //set the 50 objects = to the data object at the top
            callback();
        });

    };
};

router.get("/", getListings, function(req, res){
    res.render("listing", {users: data})
});

router.get('/looking',getLooking,  function(req, res) {
    res.render("looking", {users:data})
});

router.get('/employed', getEmployed, function (req, res) {
  res.render('employed', {users: data});
});

router.get('/listing/country', getCountry, function(req, res){
    let country = req.params.address.country; //req comes from the parent(grab from client), params for when you build with dynamic route, and every time you call params (a property object that exists on the req object), it allows you to call dynamic parts of the object (go the dynamic route with id, or with name etc. )
    let user = data.find(function(user){
        return user.address.country==country; //please return any user.id that equals the id that was clicked
    })


    console.log(req.params.address.country);
    res.render('country', {users:data});
    // res.send("YAY");
});

router.get('/listing/:id', function(req, res){
    let id = req.params.id; //req comes from the parent(grab from client), params for when you build with dynamic route, and every time you call params (a property object that exists on the req object), it allows you to call dynamic parts of the object (go the dynamic route with id, or with name etc. )
    let user = data.find(function(user){
        return user.id==id; //please return any user.id that equals the id that was clicked
    })


    console.log(req.params.id);
    res.render('profile', user);
    // res.send("YAY");
});

module.exports = router;
