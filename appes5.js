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

// Error alert
UI.prototype.showAlert = function(msg, classname) {
  const div = document.createElement('div');
  div.className = `alert ${classname}`;
  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  // timeout
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
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

   // validation
  if(UItitle === '' || UIauthor === '' || UIisbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {

    //confirmation
    ui.showAlert('Book added', 'success')

    // add book to list
    ui.addBookToList(book);
  
    // clear fields
    ui.clearFields();
  }
  
  
  event.preventDefault();
})
