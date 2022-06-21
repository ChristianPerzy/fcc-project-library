/*
*
*
*       Complete the API routing below
*       
*       
*/

function Book(_id, title){
  this._id = _id;
  this.title = title;
  this.commentcount = 0;
  this.comments = [];
  this.getShortInfo = () => {
    return { _id: this._id, title: this.title };
  };
  this.addComment = (comment) => {
    this.commentcount++;
    this.comments.push(comment);
  }
}

module.exports = function (app) {
  let idi = 0;
  let books = [];

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      res.json(books);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (title === undefined || title === '') {
        res.send('missing required field title');
      } else {
        let book = new Book((idi++).toString(),title);
        books.push(book);
        res.json(book.getShortInfo());
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      books = [];
      res.send('complete delete successful');
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let book = books.find((val) => val._id === bookid);
      
      if (book === undefined) {
        res.send('no book exists');
      } else {
        res.json(book);
      }
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (comment === undefined || comment === '') {
        res.send('missing required field comment');
      } else {
        let book = books.find((val) => val._id === bookid);
        if (book === undefined) {
          res.send('no book exists');
        } else {
          book.addComment(comment);
          res.json(book);
        }
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      let bookI = books.findIndex((val) => val._id === bookid);
      if (bookI === -1) {
        res.send('no book exists');
      } else {
        books.splice(bookI,1);
        res.send('delete successful');
      }
    });
  
};
