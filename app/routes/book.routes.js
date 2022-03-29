let express = require('express');
let router = express.Router();

let books = require('../controllers/book.controller.js');

// Create a new book
router.post('/api/books', books.create);

// Retrieve all book
router.get('/api/books', books.findAll);

// Retrieve a single book by Id
router.get('/api/books/:id', books.findOne);

// Update a book with Id
router.put('/api/books', books.update);

// Delete a book with Id
router.delete('/api/books/:id', books.delete);

module.exports = router;