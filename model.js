const mongoose = require('mongoose');

// Define schema for data collection
const dataSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
  age: Number,
  amount: Number
});

// Create model based on schema
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;