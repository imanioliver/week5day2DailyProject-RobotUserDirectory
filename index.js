const express            = require('express');
const users              = require('./data.js');
const mustacheExpress    = require('mustache-express')
const app                = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')



app.get('/', function (req, res) {
  res.render('index', {users: users});
});

app.listen(3000, function () {
  console.log('Successfully started express application on localhost:3000!');
})


app.get('/listing/:id', function(req, res){
    console.log(req.params.id);
    res.render('userprofile', {users: users});
    res.send("YAY");
});
