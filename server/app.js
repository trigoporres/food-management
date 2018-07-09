const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./db')
const port = process.env.PORT || 3000

app.listen(port, function() {
  console.log('Express server listening on port ' + port)
});

var whitelist = [
  'http://localhost:8080',
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

const UserController = require('./user/UserController')
const FoodController = require('./food/FoodController')
const AuthController = require('./user/auth/AuthController')

app.use('/users', UserController)
app.use('/api/auth', AuthController)
app.use('/food', FoodController)

module.exports = app