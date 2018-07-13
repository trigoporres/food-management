const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({  
  name: String,
})

mongoose.model('Food', FoodSchema)

module.exports = mongoose.model('Food')