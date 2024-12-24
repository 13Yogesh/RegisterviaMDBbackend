
const mongoose = require('mongoose');
const { type } = require('os');

const signUpTemplate = new mongoose.Schema(
    
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {type: String, 
        required: true},
        
      contact: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      jobRole: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }         


    }

)

module.exports = mongoose.model('studentrecord', signUpTemplate); // mytable is the name of the collection in the database