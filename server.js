const express            = require('express');
// const users              = require('../data.js');
//
const mustacheExpress    = require('mustache-express')
const app                = express();
const Data               = require('./models/data.js')
const routes             = require('./routes/index.js')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.set("index", "index")


app.use(express.static('./public'));
app.use(routes);

app.listen(3000, function () {
  console.log('Successfully started express application on localhost:3000!');
})


// app.get('/listing/:id', function(req, res){
//     console.log(req.params.id);
//     res.render('profile', {users:users[i]});
//     // res.send("YAY");
// });
