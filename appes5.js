// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ui constructor

function UI() {}

// add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');

  // create table row element
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `

  list.appendChild(row);

  console.log(row);
}

UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// Event Listeners

document.querySelector('#book-form').addEventListener('submit', (event) => {
  
  // get form values
  const UItitle = document.querySelector('#title').value,
        UIauthor = document.querySelector('#author').value,
        UIisbn = document.querySelector('#isbn').value;
  
  // instatiate a book
  const book = new Book(UItitle, UIauthor, UIisbn);
  
  // instantiate UI
  const ui = new UI();
  
  // add book to list
  ui.addBookToList(book);

  // clear fields
  ui.clearFields();
  
  event.preventDefault();
})