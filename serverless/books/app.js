import * as api from './data.js';

window.addEventListener('load', () => {
	const table = document.querySelector('table tbody');
	const title = document.getElementById('title');
	const author = document.getElementById('author');
	const isbn = document.getElementById('isbn');

	document.getElementById('loadBooks').addEventListener('click', displayBooks);
	document.getElementById('submit').addEventListener('click', addBook);
	table.addEventListener('click', (e) => {
		if (e.target.id === 'delete') {
			removeBook(e.target);
		}
	});

	async function displayBooks() {
		table.innerHTML = '<tr><td colspan="4">Loading ...</td></tr>';
		const books = await api.getAllBooks();
		table.innerHTML = '';
		books.forEach((b) => table.insertAdjacentHTML('beforeend', renderBook(b)));
		// Array.from(document.querySelectorAll('#delete')).forEach((b) => {
		// 	b.addEventListener('click', removeBook);
		// });
	}

	function renderBook(book) {
		return `
      <tr data-id="${book.objectId}">
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

	async function removeBook(target) {
		const btn = target;
		const id = target.parentNode.parentNode.getAttribute('data-id');
		const book = target.parentNode.parentNode;
		try {
			btn.disabled = true;
			btn.textContent = 'wait...';
			await api.deleteBook(id);
			book.remove();
		} catch (e) {
			btn.disabled = false;
			btn.textContent = 'Delete';
			alert(e);
			console.log(e);
		}
	}
});
