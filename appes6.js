class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `

    list.appendChild(row);
  }

  showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    console.log(isbn);
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add books

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

    //add to local storage
    Store.addBook(book);
  
    // clear fields
    ui.clearFields();
  }    
  event.preventDefault();
})

// Delete books
document.querySelector('#book-list').addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);

  // remove from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show message
  ui.showAlert('Book removed', 'success');

  e.preventDefault();
})

