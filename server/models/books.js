/*
COMP229 - F2020 - Section 007
Aileen Nicole Alapan
301108374
MidTerm Practical Test
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
