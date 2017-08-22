const express            = require('express');
// const users              = require('../data.js');
const mustache           = require('mustache');
const mustacheExpress    = require('mustache-express')

// const Data               = require('./models/data.js')
const routes             = require('./routes/index.js')
const path               = require("path");

const app                = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.set("layout", "layout")


app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(3000, function () {
  console.log('Successfully started express application on localhost:3000!');
})


// app.get('/listing/:id', function(req, res){
//     console.log(req.params.id);
//     res.render('profile', {users:users[i]});
//     // res.send("YAY");
// });
