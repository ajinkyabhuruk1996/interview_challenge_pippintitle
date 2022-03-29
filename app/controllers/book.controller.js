// 1. The server should operate locally and be accessible at the http://localhost URL. 
// 2. No data persistence is required as part of this challenge. All data can be kept in memory. 3. All the services to be written as part of the challenge should include test cases. The test cases should account for success and failure scenarios and cover all methods. 
// 4. As mentioned above, no external libraries are required. 
// 5. Any enhancements beyond the requirements included here should be marked as such, and reasoning should be  provided for why the enhancements were made. However, the API should remain strictly adherent to the  requirements present here. 
// 6. Appropriate errors should be thrown whenever an exception is encountered. 

let books = {
				book1: {
					id: 1,
					firstname: "Joe",
					lastname: "Thomas",
					age: 36
				},
				book2: {
					id: 2,
					firstname: "Peter",
					lastname: "Smith",
					age: 18
				},
				book3: {
					id: 3,
					firstname: "Lauren",
					lastname: "Taylor",
					age: 31
				},
				book4: {
					id: 4,
					firstname: "Mary",
					lastname: "Taylor",
					age: 24
				},
				book5: {
					id: 5,
					firstname: "David",
					lastname: "Moore",
					age: 25
				},
				book6: {
					id: 6,
					firstname: "Holly",
					lastname: "Davies",
					age: 27
				},
				book7: {
					id: 7,
					firstname: "Michael",
					lastname: "Brown",
					age: 45
				}
			}
 
exports.create = function(req, res) {
	// find the largest ID
	let arr = Object.keys( books ).map(function ( key ) { return books[key].id; });
	let newId = Math.max.apply( null, arr ) + 1;
	
	let newbook = req.body;
	newbook.id = newId;
    books["book" + newId] = newbook;
    res.json(newbook);
};
 
exports.findAll = function(req, res) {
    res.json(Object.values(books));  
};
 
exports.findOne = function(req, res) {
    let book = books["book" + req.params.id];
    res.json(book);
};
 
exports.update = function(req, res) {
	let updatedbook = req.body; 
	books["book" + updatedbook.id] = updatedbook;
	res.json({msg: "book Updated Successfully!"});
};

//DELETE 
//This method is used to remove a book from the library.
// Errors should be thrown for attempted removal of non-existent books.
// If a book is removed, all subsequent books are shifted up by 1 index. soln--- automatic shifting
//The body of this DELETE request should  contain a “book” parameter with
// the name of the book to be removed from existence. 
exports.delete = function(req, res) {
    delete books["book" + req.params.id];
    res.json({msg: "book Deleted Successfully!"});
};