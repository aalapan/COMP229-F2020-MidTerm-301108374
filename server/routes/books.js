/*
COMP229 - F2020 - Section 007
Aileen Nicole Alapan
301108374
MidTerm Practical Test
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  //Find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  let AddBook = book ({
  });
  //Renders the book details page
  res.render('books/details', {
    title: 'Add Book',
    books: AddBook
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  //Processes the insertion of a new book into the database.
  let books = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  //Create method of the book model to add a new book to the database
  book.create(books, (err,book) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    res.redirect('/books')
  });
 

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    //Renders the book details page (views/books/details.ejs) and uses the id from the URL to select the book to document to be updated
    book.findById(req.params.id, (err, book) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/details', {
          title: 'Edit Book',
          books: book
        });
      }
    });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    //Processes the update request of an existing book by using its id property
    let updateBook = {
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    }
    book.update( {_id: req.params.id} , updateBook, {upsert: true}, (err, result) => {
      if (err) {
        return console.error(err);
      }
      else {
        //refresh the book list
        res.redirect('/books');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    //Processes the user’s delete request and removes an existing book from database by using its id property
    book.remove( {_id: req.params.id} , (err) => {
      if (err) {
        return console.error(err);
      }
      else {
        //Refresh
        res.redirect('/books');
      }
    });
});


module.exports = router;
