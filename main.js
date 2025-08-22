//initialize empty array myLibrary//
const myLibrary = [];
//define Book(title, author, pages, readStatus)//
function Book(title, author, pages, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus; // 'Read' or 'Not Read'
}
//define Book.toggleRead()//
Book.prototype.toggleRead = function() {
    if (this.readStatus === 'Read') {
        this.readStatus = 'Not Read';
    }   else {
        this.readStatus = 'Read';
    }   
}
//Add a book to the library//
function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    displayBooks();
}
//define displayBooks()//
function displayBooks() {
    const container = document.getElementById("libraryContainer");
    container.innerHTML = "";
    
    myLibrary.forEach((Book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.setAttribute("data-id", Book.id);


        card.innerHTML = `
          <h3>${Book.title}</h3>
          <p><strong>Author:</strong> ${Book.author}</p>
          <p><strong>Pages:</strong> ${Book.pages}</p>
          <p><strong>Status:</strong> ${Book.readStatus}</p>
          <div class="actions">
            <button class="toggleBtn">Read</button>
            <button class="removeBtn">Remove</button>
          </div>
    `;
    //define removeBook(index)//
    card.querySelector(".removeBtn").addEventListener("click", () => {
        removeBook(Book.id);
    });

    //define toggleReadStatus(index)//
    card.querySelector(".toggleBtn").addEventListener("click", () => {
      toggleBookRead(Book.id);
    });

    container.appendChild(card);
   }); 
 }
 // Remove book from library
 function removeBook(bookId) {
    const index =myLibrary.findIndex((Book) => Book.id === bookId)
    if (index !== -1) {
        myLibrary.splice(index, 1)
    }
    displayBooks()
 }

 // Toggle read status
 function toggleBookRead(bookId) {
    const Book = myLibrary.find((Book) => Book.id === bookId);
    if (Book) {
        Book.toggleRead()
    }
    displayBooks();
 }

 // Form handling

 const form = document.getElementById("bookForm");
 const addBookBtn = document.getElementById("addBookBtn")
 const cancelBtn = document.getElementById("cancelBtn")

 // Show form
 addBookBtn.addEventListener("click", () => {
  form.style.display = "block";
});

// Cancel form
cancelBtn.addEventListener("click", () => {
  form.reset();
  form.style.display = "none";
});

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("readStatus").value;

  addBookToLibrary(title, author, pages, readStatus);

  form.reset();
  form.style.display = "none"; // hide form after adding
});


// Add a few sample books for testing
// ---------------------------
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Read");
addBookToLibrary("Clean Code", "Robert C. Martin", 464, "Not Read");
addBookToLibrary("1984", "George Orwell", 328, "Read");
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt & David Thomas", 352, "Read");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "Read");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "Not Read");
addBookToLibrary("JavaScript: The Good Parts", "Douglas Crockford", 176, "Not Read");
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, "Read");








