const express = require("express");
const User = require("../models/user");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');
// const Data = require ('../models/data.js')

mongoose.connect("mongodb://localhost:27017/robots");

let data =[];

const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/');
  }
};


const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/user")
  } else {
    next();
  }
};


router.get("/", function(req, res){


        User.find({}).sort("name")
        .then(function (users) {
            data = users;
            // console.log(users);
            res.render("listing", {users: users})
        })
        .catch(function(err){
            console.log(err);
            next(err);
        })

});

router.get('/looking', function(req, res) {

            User.find({"job": null}).sort("name")
            .then(function (users) {
                data = users;
                // console.log(users);
                res.render("looking", {users: users})
            })
            .catch(function(err){
                console.log(err);
                next(err);
            })

});

router.get('/employed', function (req, res) {

            User.find({"job": {$nin:[null]}}).sort("name")
            .then(function (users) {
                data = users;
                // console.log(users);
                res.render("employed", {users: users})
            })
            .catch(function(err){
                console.log(err);
                next(err);
            })
});



router.get('/listing/:id', function(req, res){
    let id = req.params._id; //req comes from the parent(grab from client), params for when you build with dynamic route, and every time you call params (a property object that exists on the req object), it allows you to call dynamic parts of the object (go the dynamic route with id, or with name etc. )
    let user = data.find(function(user){
        return user._id==id; //please return any user.id that equals the id that was clicked
    })


    console.log(req.params.id);
    res.render('profile', user);
    // res.send("YAY");
});


router.get('/signup', function(req, res){
    res.render('signup', {users: data})
})

router.post('/signup', function(req, res){
    User.create({
       username: req.body.username,
       password: req.body.password,
       name: req.body.name,
       avatar:req.body.avatar,
       email: req.body.email,
       university: req.body.university,
       job: req.body.job,
       company: req.body.company,
       skills: [req.body.skills],
       phone: req.body.phone,
       address: {
           street_num: req.body.streetNum,
           street_name: req.body.streetName,
           city: req.body.city,
           state_or_province: req.body.stateProvince,
           postal_code: req.body.postalCode,
           country: req.body.country
       }
     })
     .then(function(data) {
       console.log(data);
       res.redirect("/");
     })
     .catch(function(err) {
       console.log(err);
       res.redirect("/signup");
     });

})

//
// router.get('/login',login, function(req, res){
//     res.render("index", {
//       messages: res.locals.getMessages()
//   });
// });

//
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

module.exports = router;






// const MongoClient = require('mongodb').MongoClient; //reference to the Mongo client
// const assert = require('assert'); //test to see if we have errors
//
// const url = 'mongodb://localhost:27017/robots'; //represents our mongo database,
//
// MongoClient.connect(url, function(err, db) { //we call the client and tell it what error, and what database to connect to, make sure there's no errors
//     assert.equal(null, err); //does the error equal null? if so good! if it's false, it won't even try to connect to the database
//
//     getData(db, function(){ //this is the call back function of the "getData" variable we created below
//         db.close();
//         next(); //sends us to the endpoint
//     });
// });
//
// let getData = function (db, callback) { //it calls, needs a database and gives a callback function,
//     let users = db.collection("users"); //sets the variable "user" to the dataabase we have. same as "db.users" that we did earlier
//
//     users.find({}).sort({"name": 1}).toArray().then(function(users){ //find all of the users, .toArray returns a promise, THEN set the info i received into a variable call data, then I do my callback function from line 16
//         data = users; //set the 50 objects = to the data object at the top
//         callback();
//     });
//
// };
