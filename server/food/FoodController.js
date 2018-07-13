const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Food = require('./food');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', function (req, res) {
    console.log(req.body.name)
    Food.create({
        name : req.body.name,
    })
        .then((food) => res.status(200).send(food))
        .catch(() => res.status(500).send("There was a problem adding the information to the database."))
})

router.get('/list', function (req, res) {
    Food.find()
        .then((food) => res.status(200).send(food))
        .catch(() => res.status(500).send("There was a problem finding the food."))
})

module.exports = router;
