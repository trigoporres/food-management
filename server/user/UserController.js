const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./User');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find()
        .then((users) => res.status(200).send(users))
        .catch(() => res.status(500).send("There was a problem finding the users."))
})

// RETURNS USERS IN THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) return res.status(404).send("No user found.")
            res.status(200).send(user)
        })
        .catch(() => res.status(500).send("There was a problem finding the user."))
})

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id)
        .then((user) => res.status(200).send("User "+ user.name +" was deleted."))
        .catch(() => res.status(500).send("There was a problem deleting the user."))
})

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => res.status(200).send(user))
        .catch(() => res.status(500).send("There was a problem updating the user."))
})

module.exports = router;
