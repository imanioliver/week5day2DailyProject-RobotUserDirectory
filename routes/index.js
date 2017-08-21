const express = require('express');
const Data = require ('../models/data.js')
const router = express.Router();



router.get('/', function (req, res) {
  res.render('index', {users: Data.allUsers});
});


router.get('/listing/:id', function(req, res){
    let id = req.params.id; //req comes from the parent(grab from client), params for when you build with dynamic route, and every time you call params (a property object that exists on the req object), it allows you to call dynamic parts of the object (go the dynamic route with id, or with name etc. )

    let user = Data.allUsers.find(function(user){
        return user.id==id; //please return any user.id that equals the id that was clicked

    });


    console.log(req.params.id);
    res.render('profile', user);
    // res.send("YAY");
});


module.exports = router;
