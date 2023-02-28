const books = document.querySelector('.books');
const newBookBtn = document.querySelector('.add-book');

const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.close');
const formAddBtn = document.querySelector('.form-add-button');

let myLibrary = [
	{
		title: 'Book1',
		author: 'Author1',
		pages: 100,
		read: true,
	},
	{
		title: 'Book2',
		author: 'Author2',
		pages: 10,
		read: false,
	},
];
// function addLocalStorage() {
// 	myLibrary = JSON.parse(localStorage.getItem('library')) || '';
// }

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = Math.floor(Math.random() * 100000);
}

function addBookToLibrary(title, author, pages, read) {
	myLibrary.push(new Book(title, author, pages, read));
	renderBooks();
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
	const read = document.querySelector('#book-read').value;

	modal.style.display = 'none';

	addBookToLibrary(title, author, pages, read);
});

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
	if (book.read) {
		input.checked = true;
		bookItem.setAttribute('class', 'card book read-checked');
	} else {
		input.checked = false;
		bookItem.setAttribute('class', 'card book read-unchecked');
	}
	read.appendChild(input);
	return read;
}

function deleteBook(index) {
	myLibrary.splice(index, 1);
	renderBooks();
}

function createBookItem(book, index) {
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

	bookItem
		.querySelector('.delete-button')
		.addEventListener('click', () => {
			deleteBook(index);
		});
	books.insertAdjacentElement('afterbegin', bookItem);
}

function renderBooks() {
	books.textContent = '';
	myLibrary.map((book, id) => {
		createBookItem(book, id);
	});
}
// function saveAndRenderBooks() {
// 	localStorage.setItem(
// 		'library',
// 		JSON.stringify([

// 		])
// 	);
// 	renderBooks();
// }
renderBooks();
