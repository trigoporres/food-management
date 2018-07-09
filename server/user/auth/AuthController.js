const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const VerifyToken = require('./VerifyToken');
const config = require('./config');
const User = require('../User');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// REGISTER NEW USER
router.post('/register', function(req, res) {
  
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  })
    .then((user) => {
      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    })
    .catch(() => res.status(500).send("There was a problem registering the user."))
})

// CHECK TOKEN USER
router.get('/me', VerifyToken, function(req, res, next) {
  User.findById(req.userId, { password: 0 })
    .then((user) => {
      if (!user) return res.status(404).send("No user found.")
      res.status(200).send(user)
    })
    .catch(() => res.status(500).send("There was a problem finding the user."))
})

// LOGIN USER
router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(404).send('No user found.')
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token })
    })
    .catch(() => res.status(500).send('Error on the server.'))
});

// LOGOUT USER
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;