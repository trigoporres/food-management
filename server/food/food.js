const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({  
  name: String,
  origin: String,
  temporality: String,
  price: Number,
  proveedor: {
    name: String,
    phone: Number,
    address: String,
    mail: String
  }
})

mongoose.model('Food', FoodSchema)

module.exports = mongoose.model('Food')