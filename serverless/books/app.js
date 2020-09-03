import * as api from './data.js';

window.addEventListener('load', () => {
	const table = document.querySelector('table tbody');
	const title = document.getElementById('title');
	const author = document.getElementById('author');
	const isbn = document.getElementById('isbn');

	document.getElementById('loadBooks').addEventListener('click', displayBooks);
	document.getElementById('submit').addEventListener('click', addBook);

	async function displayBooks() {
		table.innerHTML = '<tr><td colspan="4">Loading ...</td></tr>';
		const books = await api.getAllBooks();
		table.innerHTML = '';
		books.forEach((b) => table.insertAdjacentHTML('beforeend', renderBook(b)));
	}

	function renderBook(book) {
		return `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
          <button id="edit">Edit</button>
          <button id="delete">Delete</button>
        </td>
      </tr>
    `;
	}

	async function addBook(e) {
		e.preventDefault();
		let valid = true;

		const book = {
			title: title.value,
			author: author.value,
			isbn: isbn.value,
		};

		Object.entries(book).find(([k, v]) => {
			if (v.trim().length === 0) {
				alert(`${k} cannot be empty!`);
				valid = false;
				return true;
			} else {
				return false;
			}
		});

		if (valid === false) return;

		try {
			const created = await api.createBook(book);
			table.insertAdjacentHTML('beforeend', renderBook(created));
		} catch (e) {
			alert(e);
			console.error(e);
		}
	}
});
