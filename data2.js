const getListings = function(req, res, next) {


    User.find({}).sort("name")
    .then(function (users) {
        data = users;
        console.log(users);
    })
    .catch(function(err){
        console.log(err);
        next(err);
    })
};


router.get("/", getListings, function(req, res){
    res.render("listing", {users: data})
});







// router.get("/login", login, function(req, res) {
//
//
//   res.render("index", {
//       messages: res.locals.getMessages()
//   });
// });

//^^^^Isaac code.
