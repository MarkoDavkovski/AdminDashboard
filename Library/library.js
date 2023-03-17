const books = document.querySelector('.books');
const newBookBtn = document.querySelector('.add-book');

const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.close');
const formAddBtn = document.querySelector('.form-add-button');

// function addLocalStorage() {
// 	myLibrary = JSON.parse(localStorage.getItem('library')) || '';
// }

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = Math.floor(Math.random() * 100000);
	}
}

class Library {
	constructor() {
		this.books = [];
	}

	addBookToLibrary(title, author, pages, read) {
		const book = new Book(title, author, pages, read);
		this.books.push(book);
		this.renderBooks();
	}
	deleteBook(index) {
		this.books.splice(index, 1);
		this.renderBooks();
	}

	createBookItem(book, index) {
		const bookItem = document.createElement('div');
		bookItem.setAttribute('id', index);
		bookItem.setAttribute('class', 'card book');
		bookItem.appendChild(
			createBookElement('h1', `Title:${book.title}`, 'book-title')
		);
		bookItem.appendChild(
			createBookElement('h1', `Author:${book.author}`, 'book-author')
		);
		bookItem.appendChild(
			createBookElement('h1', `Pages:${book.pages}`, 'book-pages')
		);
		bookItem.appendChild(createBookElement('button', 'X', 'delete-button'));
		bookItem.appendChild(createReadElement(bookItem, book));

		bookItem.querySelector('.delete-button').addEventListener('click', () => {
			this.deleteBook(index);
		});
		books.insertAdjacentElement('afterbegin', bookItem);
	}

	renderBooks() {
		books.textContent = '';
		this.books.forEach((book, index) => {
			this.createBookItem(book, index);
		});
	}
}

newBookBtn.addEventListener('click', (e) => {
	modal.style.display = 'block';
	document.querySelector('.form-title').textContent = 'Add Book';
	document.querySelector('.form-add-button').textContent = 'Add';
});

closeModal.addEventListener('click', () => {
	modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
	if (e.target == modal) {
		modal.style.display = 'none';
	}
});

formAddBtn.addEventListener('click', (e) => {
	e.preventDefault();

	const title = document.querySelector('#book-title').value;
	const author = document.querySelector('#book-author').value;
	const pages = document.querySelector('#book-pages').value;
	const read = document.querySelector('#book-read').checked;

	modal.style.display = 'none';

	library.addBookToLibrary(title, author, pages, read);
	resetModal();
});

function resetModal() {
	document.querySelector('#book-title').value = '';
	document.querySelector('#book-author').value = '';
	document.querySelector('#book-pages').value = '';
	document.querySelector('#book-read').checked = false;
}

function createBookElement(el, content, className) {
	const element = document.createElement(el);
	element.textContent = content;
	element.setAttribute('class', className);
	return element;
}

function createReadElement(bookItem, book) {
	const read = document.createElement('div');
	read.setAttribute('class', 'book-read');
	read.appendChild(createBookElement('h1', 'Read?', 'book-read-title'));
	let input = document.createElement('input');
	input.setAttribute('class', 'checkbox');
	input.type = 'checkbox';
	input.addEventListener('click', (e) => {
		if (e.target.checked) {
			book.read = true;
			bookItem.setAttribute('class', 'card book read-checked');
		} else {
			book.read = false;
			bookItem.setAttribute('class', 'card book read-unchecked');
		}
	});
	input.checked = book.read;
	bookItem.classList.toggle('read-checked', book.read);
	bookItem.classList.toggle('read-unchecked', !book.read);
	read.appendChild(input);
	return read;
}

function createBookItem(book, index) {
	books.insertAdjacentElement('afterbegin', bookItem);
}

// function saveAndRenderBooks() {
// 	localStorage.setItem(
// 		'library',
// 		JSON.stringify([

// 		])
// 	);
// 	renderBooks();
// }
let library = new Library();
library.addBookToLibrary('Title1', 'Author1', 123, true);
library.addBookToLibrary('Title2', 'Author2', 123, false);
