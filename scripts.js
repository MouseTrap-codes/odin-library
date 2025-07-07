const myLibrary = [];

function Book(_id, title, author, pages) {
    if (!new.target) {
        return Error("Incorrect usage of constructor");
    }
    this._id = _id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
}

Book.prototype.toString = function() {
    return `${this.title} by ${this.author}; ${this.pages} pages.`
}

Book.prototype.toggleRead = function() {
    this.read = true;
}

function addBookToLibrary(title, author, pages) {
    const new_id = crypto.randomUUID();
    const newBook = new Book(new_id, title, author, pages);
    myLibrary.push(newBook);
}

function displayLibrary() {
    const library = document.querySelector(".library")
    library.innerHTML = "";
    for (const book of myLibrary) {
        // container for book and button
        const entry = document.createElement("div");
        // the actual book
        const div = document.createElement("div");
        div.classList.add("book");
        div.textContent = book.toString();
        div.setAttribute("data-id", book._id);

        // the the removeBookButton
        const removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove Book";

        // the isRead button
        const isReadButton = document.createElement("button")
        isReadButton.textContent = "Read?";

        isReadButton.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b._id === book._id); 
            if (index === -1) {
                return
            }
            myLibrary[index].toggleRead();
            isReadButton.classList.toggle("read");
        })


        entry.appendChild(div);
        entry.appendChild(removeBookButton)
        entry.appendChild(isReadButton);

        

        library.appendChild(entry);

        removeBookButton.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b._id === book._id); 
            if (index === -1) {
                return;
            }
            myLibrary.splice(index, 1);
            displayLibrary();
            
        })
    }
}

const addNewBookButton = document.querySelector(".add-new-book")
addNewBookButton.addEventListener("click", () => {
    const modal = document.querySelector("dialog");

    // create form stuff
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("class", "add-new-book-form")

    // get title
    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Title:"
    labelTitle.setAttribute("for", "title");
    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("id", "title");
    inputTitle.setAttribute("name", "title")
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);

    // get author
    const labelAuthor = document.createElement("label");
    labelAuthor.setAttribute("for", "author");
    labelAuthor.textContent = "Author:";
    const inputAuthor = document.createElement("input");
    inputAuthor.setAttribute("id", "author");
    inputAuthor.setAttribute("name", "author")
    form.appendChild(labelAuthor);
    form.appendChild(inputAuthor);

    // get pages
    const labelPages = document.createElement("label");
    labelPages.setAttribute("for", "pages");
    labelPages.textContent = "Pages:"
    const inputPages = document.createElement("input");
    inputPages.setAttribute("id", "pages");
    inputPages.setAttribute("name", "pages")
    form.appendChild(labelPages);
    form.appendChild(inputPages);

    // submit button
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Add New Book";
    form.appendChild(submitButton);

    // save data in a new book object and add that book to the library when the submit button is pressed
    form.addEventListener("submit", (event) => {
        event.preventDefault();
         addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value);
         displayLibrary();
         form.reset();
         modal.close();
    })

    modal.innerHTML = "";
    modal.appendChild(form);
    modal.showModal();
})